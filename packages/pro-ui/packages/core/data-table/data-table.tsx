import type {
  DataTableColumn,
  DataTableProps,
  DataTablePagination,
  DataTableTypeColumn,
  DataTableBaseColumn,
} from "./types";
import type { PropType } from "vue";
import type {
  ColumnDef,
  ColumnFiltersState,
  ColumnPinningState,
  PaginationState,
  RowSelectionState,
  SortingState,
} from "@tanstack/vue-table";
import { defineComponent, ref, toValue, computed } from "vue";
import {
  FlexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  useVueTable,
} from "@tanstack/vue-table";
import {
  Table,
  TableHeader,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Typography,
  Checkbox,
} from "@mineo/ui";
import { cn } from "@mineo/utils";

import { ProPagination } from "../pagination";
import { getPinningClass } from "./helper";

export function transformColumn<TData, TValue = any>(
  columns: DataTableColumn<TData, TValue>[],
): ColumnDef<TData>[] {
  const columnDefs: ColumnDef<TData>[] = [];

  columns.forEach((column: DataTableColumn<TData, TValue>) => {
    const { align, titleAlign, currency } = column as DataTableBaseColumn;

    const isCurrency = currency && typeof currency === "object";
    const currencyConfig = isCurrency
      ? currency
      : {
          symbol: "¥",
          decimal: 2,
          thousand: ",",
        };

    const headerAlign = () => {
      if (currency) {
        return "text-right";
      } else if (titleAlign) {
        return `text-${titleAlign}`;
      } else if (align) {
        return `text-${align}`;
      }
      return "text-left";
    };
    const cellAlign = () => {
      if (currency) {
        return "text-right";
      } else if (align) {
        return `text-${align}`;
      }
      return "text-left";
    };

    if ((column as DataTableTypeColumn).type === "selection") {
      const fixed = (column as DataTableTypeColumn).fixed;
      columnDefs.push({
        accessorKey: "selection",
        id: 'selection',
        header: ({ table }) => (
          <div class="w-6">
            <Checkbox
              modelValue={
                table.getIsAllPageRowsSelected() ||
                (table.getIsSomePageRowsSelected() && "indeterminate")
              }
              onUpdate:modelValue={(value: boolean | "indeterminate") =>
                table.toggleAllRowsSelected(!!value)
              }
              aria-label="选择所有行"
              class="cursor-pointer"
            />
          </div>
        ),
        cell: ({ row }) => (
          <div class="min-w-6">
            <Checkbox
              modelValue={row.getIsSelected()}
              onUpdate:modelValue={(value: boolean | "indeterminate") =>
                row.toggleSelected(!!value)
              }
              aria-label="选择行"
              class="cursor-pointer"
            />
          </div>
        ),
        meta: {
          ...column,
          width: 32,
        },
        enableSorting: false,
        enableHiding: false,
        enablePinning: !!fixed,
      });
    } else if ((column as DataTableTypeColumn).type === "index") {
      const fixed = (column as DataTableTypeColumn).fixed;
      columnDefs.push({
        accessorKey: "index",
        id: 'index',
        header: ({ table }) => (
            column.title
        ),
        cell: ({ row }) => (
            row.index + 1
        ),
        meta: {
          ...column,
          width: 48,
        },
        enablePinning: !!fixed,
        enableHiding: false,
        enableSorting: false,
      });
    } else {
      const { dataIndex, align, className, copyable, render, fixed, ellipsis } = column as DataTableBaseColumn;
      const cellClasses = cn(
        cellAlign(),
        className,
        ellipsis && "truncate",
        !ellipsis && "whitespace-normal break-words"
      );
      columnDefs.push({
        accessorKey: dataIndex as string,
        id: dataIndex as string,
        header: () => {
          const headerClass = cn(
            headerAlign(),
            "font-medium",
            getPinningClass(fixed),
            ellipsis && "truncate"
          );
          return <div class={headerClass}>{column.title}</div>;
        },
        cell: ({ row }) => {
          if (isCurrency) {
            const {
              symbol = "¥",
              decimal = 2,
              thousand = ",",
            } = currencyConfig;
            const value = Number(row.getValue(dataIndex as string));
            const formattedValue = value
              .toFixed(decimal)
              .replace(/\B(?=(\d{3})+(?!\d))/g, thousand);
            const currencyAlign = align || "text-right";
            return (
              <div class={cellClasses}>
                {symbol}
                {formattedValue}
              </div>
            );
          }
          if (copyable) {
            return (
              <Typography copyable class={cellClasses}>
                {row.getValue(dataIndex as string)}
              </Typography>
            );
          }
          return (
            <div class={cellClasses}>
              {(() => {
                const val = row.getValue(dataIndex as string) as TValue;
                return render?.(val, { ...row.original }, dataIndex as string) || val;
              })()}
            </div>
          );
        },
        enableSorting: false,
        enablePinning: !!fixed,
        meta: column,
      });
    }
  });
  return columnDefs;
}

export const DataTable = defineComponent({
  name: "DataTable",
  props: {
    columns: {
      type: Array as PropType<DataTableColumn<any, any>[]>,
      default: () => [],
    },
    data: {
      type: Array as PropType<any[]>,
      default: () => [],
    },
    pagination: {
      type: Object as PropType<DataTablePagination>,
      default: () => ({
        current: 1,
        pageSize: 10,
        total: 0,
      }),
    },
    bordered: {
      type: Boolean as PropType<DataTableProps["bordered"]>,
      default: undefined,
    },
    remote: {
      type: Boolean as PropType<DataTableProps["remote"]>,
      default: false,
    },
  },
  emits: ["update:page", "update:pageSize"],
  setup(props, { emit }) {
    const columnsValue = computed(
      () => props.columns as DataTableColumn<any, any>[],
    );
    const dataValue = computed(() => props.data as any[]);
    const paginationValue = computed(
      () => props.pagination as DataTablePagination,
    );

    const sorting = ref<SortingState>([]);
    const columnFilters = ref<ColumnFiltersState>([]);
    const columnVisibility = ref<Record<string, any>>({});
    const columnPinning = ref<ColumnPinningState>({});
    const rowSelection = ref<RowSelectionState>({});
    const paginationState = ref<PaginationState>({
      pageIndex: 0,
      pageSize: 10,
    });

    const table = useVueTable({
      get data() {
        return dataValue.value;
      },
      get columns() {
        return transformColumn(columnsValue.value);
      },
      state: {
        get sorting() {
          return sorting.value;
        },
        get columnFilters() {
          return columnFilters.value;
        },
        get columnVisibility() {
          return columnVisibility.value;
        },
        get columnPinning() {
          return columnPinning.value;
        },
        get rowSelection() {
          return rowSelection.value;
        },
        get pagination() {
          return paginationState.value;
        },
      },
      enableRowSelection: true,
      onSortingChange: (updater) => {
        sorting.value =
          typeof updater === "function" ? updater(sorting.value) : updater;
      },
      onColumnFiltersChange: (updater) => {
        columnFilters.value =
          typeof updater === "function"
            ? updater(columnFilters.value)
            : updater;
      },
      onColumnVisibilityChange: (updater) => {
        columnVisibility.value =
          typeof updater === "function"
            ? updater(columnVisibility.value)
            : updater;
      },
      onColumnPinningChange: (updater) => {
        columnPinning.value =
          typeof updater === "function"
            ? updater(columnPinning.value)
            : updater;
      },
      onRowSelectionChange: (updater) => {
        rowSelection.value =
          typeof updater === "function" ? updater(rowSelection.value) : updater;
      },
      onPaginationChange: (updater) => {
        const newPagination =
          typeof updater === "function"
            ? updater(paginationState.value)
            : updater;

        paginationState.value = newPagination;
        paginationValue.value.current = newPagination.pageIndex + 1;
        paginationValue.value.pageSize = newPagination.pageSize;
      },
      getCoreRowModel: getCoreRowModel(),
      getPaginationRowModel: getPaginationRowModel(),
      getSortedRowModel: getSortedRowModel(),
      getFilteredRowModel: getFilteredRowModel(),
    });

    const rows = computed(() => table.getRowModel().rows);
    const headerGroups = computed(() => table.getHeaderGroups());

    const handlePageChange = (page: number) => {
      paginationState.value.pageIndex = page - 1;
      emit("update:page", page);
    };

    const handlePageSizeChange = (pageSize: number) => {
      paginationState.value.pageSize = pageSize;
      emit("update:pageSize", pageSize);
    };

    const EmptyRow = () => (
      <TableRow>
        <TableCell colspan={columnsValue.value.length} class="h-24 text-center">
          No results.
        </TableCell>
      </TableRow>
    );

    return () => (
      <div>
        <div class="overflow-x-auto">
          <Table class={cn(props.bordered && "border border-border")}>
            <TableHeader>
              {headerGroups.value.map((headerGroup) => (
                <TableRow key={headerGroup.id} class="relative">
                  {headerGroup.headers.map((header) => {
                    const columnMeta = header.column.columnDef
                      .meta as DataTableBaseColumn;
                    const fixed = columnMeta?.fixed;
                    return (
                      <TableHead
                        key={header.id}
                        class={getPinningClass(fixed)}
                        style={{
                          width: columnMeta.width + "px" || "auto",
                          whiteSpace: columnMeta.width ? "normal" : "nowrap",
                          minWidth: columnMeta.minWidth
                            ? columnMeta.minWidth + "px"
                            : columnMeta.width + "px" || "auto",
                          maxWidth: columnMeta.maxWidth
                            ? columnMeta.maxWidth + "px"
                            : columnMeta.width + "px" || "auto",
                        }}
                      >
                        {!header.isPlaceholder && (
                          <FlexRender
                            render={header.column.columnDef.header}
                            props={header.getContext()}
                          />
                        )}
                      </TableHead>
                    );
                  })}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {rows.value?.length ? (
                rows.value.map((row) => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() ? "selected" : undefined}
                  >
                    {row.getVisibleCells().map((cell) => {
                      const columnMeta = cell.column.columnDef
                        .meta as DataTableBaseColumn;
                      const fixed = columnMeta?.fixed;
                      return (
                        <TableCell
                          key={cell.id}
                          class={cn(getPinningClass(fixed), {
                            'text-center': cell.column.columnDef.id === 'index',
                            // "flex justify-center items-center": columnMeta?.align === "center",
                          })}
                          style={{
                            width: columnMeta.width + "px" || "auto",
                            whiteSpace: columnMeta.width ? "normal" : "nowrap",
                            minWidth: columnMeta.minWidth
                              ? columnMeta.minWidth + "px"
                              : columnMeta.width + "px" || "auto",
                            maxWidth: columnMeta.maxWidth
                              ? columnMeta.maxWidth + "px"
                              : columnMeta.width + "px" || "auto",
                          }}
                        >
                          <FlexRender
                            render={cell.column.columnDef.cell}
                            props={cell.getContext()}
                          />
                        </TableCell>
                      );
                    })}
                  </TableRow>
                ))
              ) : (
                <EmptyRow />
              )}
            </TableBody>
          </Table>
        </div>
        <div class="flex justify-end mt-2">
          <ProPagination
            v-model:page={paginationValue.value.current}
            v-model:pageSize={paginationValue.value.pageSize}
            total={paginationValue.value.total}
            onUpdate:page={handlePageChange}
            onUpdate:pageSize={handlePageSizeChange}
          />
        </div>
      </div>
    );
  },
});
