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
      columnDefs.push({
        accessorKey: "selection",
        header: ({ table }) => (
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
        ),
        cell: ({ row }) => (
          <Checkbox
            modelValue={row.getIsSelected()}
            onUpdate:modelValue={(value: boolean | "indeterminate") =>
              row.toggleSelected(!!value)
            }
            aria-label="选择行"
            class="cursor-pointer"
          />
        ),
        enableSorting: false,
        enableHiding: false,
        enablePinning: false,
      });
    } else if ((column as DataTableTypeColumn).type === "index") {
      columnDefs.push({
        accessorKey: "index",
        header: ({ table }) => (
          <div class={cn('text-center', 'w-8')}>{column.title}</div>
        ),
        cell: ({ row }) => (
          <div class={cn('text-center')}>{row.index + 1}</div>
        ),
        enablePinning: false,
        enableHiding: false,
        enableSorting: false,
      });
    } else {
      const { dataIndex, align, className, copyable, render, fixed } = column as DataTableBaseColumn;
      columnDefs.push({
        accessorKey: dataIndex as string,
        header: () => {
          const headerClass = cn(headerAlign(), "font-medium", getPinningClass(fixed));
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
              <div class={cn(cellAlign(), className, getPinningClass(fixed))}>
                {symbol}
                {formattedValue}
              </div>
            );
          }
          if (copyable) {
            return (
              <Typography copyable class={getPinningClass(fixed)}>
                {row.getValue(dataIndex as string)}
              </Typography>
            );
          }
          return (
            <div class={getPinningClass(fixed)}>
              {(() => {
                const val = row.getValue(dataIndex as string) as TValue;
                return render?.(val, row.original) || val;
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
  },
  setup(props) {
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

    const EmptyRow = () => (
      <TableRow>
        <TableCell colspan={columnsValue.value.length} class="h-24 text-center">
          No results.
        </TableCell>
      </TableRow>
    );

    return () => (
      <div>
        <Table>
          <TableHeader>
            {headerGroups.value.map((headerGroup) => (
              <TableRow key={headerGroup.id} class="relative">
                {headerGroup.headers.map((header) => {
                  const columnMeta = header.column.columnDef.meta as DataTableBaseColumn;
                  const fixed = columnMeta?.fixed;
                  return (
                    <TableHead key={header.id} class={getPinningClass(fixed)}>
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
                    const columnMeta = cell.column.columnDef.meta as DataTableBaseColumn;
                    const fixed = columnMeta?.fixed;
                    return (
                      <TableCell key={cell.id} class={getPinningClass(fixed)}>
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
        <div class="flex justify-end mt-2">
          <ProPagination
            v-model:page={paginationValue.value.current}
            v-model:pageSize={paginationValue.value.pageSize}
            total={paginationValue.value.total}
          />
        </div>
      </div>
    );
  },
});
