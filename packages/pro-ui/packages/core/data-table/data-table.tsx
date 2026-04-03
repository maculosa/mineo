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
import { defineComponent, ref, computed } from "vue";
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
  return columns.map((column: DataTableColumn<TData, TValue>) => {
    if ((column as DataTableTypeColumn).type === "selection") {
      const fixed = (column as DataTableTypeColumn).fixed;
      return {
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
      };
    } else if ((column as DataTableTypeColumn).type === "index") {
      const fixed = (column as DataTableTypeColumn).fixed;
      return {
        accessorKey: "index",
        id: 'index',
        header: () => column.title,
        cell: ({ row }) => row.index + 1,
        meta: {
          ...column,
          width: 48,
        },
        enablePinning: !!fixed,
        enableHiding: false,
        enableSorting: false,
      };
    } else {
      const { dataIndex, align, titleAlign, className, copyable, render, fixed, ellipsis, currency } = column as DataTableBaseColumn;
      
      const isCurrency = currency && typeof currency === "object";
      const currencyConfig = isCurrency
        ? currency
        : {
            symbol: "¥",
            decimal: 2,
            thousand: ",",
          };

      const getHeaderAlign = () => {
        if (currency) {
          return "text-right";
        } else if (titleAlign) {
          return `text-${titleAlign}`;
        } else if (align) {
          return `text-${align}`;
        }
        return "text-left";
      };
      
      const getCellAlign = () => {
        if (currency) {
          return "text-right";
        } else if (align) {
          return `text-${align}`;
        }
        return "text-left";
      };

      const cellClasses = cn(
        getCellAlign(),
        className,
        ellipsis && "truncate",
        !ellipsis && "whitespace-normal break-words"
      );

      return {
        accessorKey: dataIndex as string,
        id: dataIndex as string,
        header: ({ column }) => {
          const headerClass = cn(
            getHeaderAlign(),
            "font-medium",
            ellipsis && "truncate",
            "flex flex-col items-start gap-1 p-1"
          );
          const isSorted = column.getIsSorted();
          const isFiltered = column.getIsFiltered();
          const columnMeta = column.columnDef.meta as DataTableBaseColumn | undefined;
          const columnTitle = typeof columnMeta?.title === 'string' ? columnMeta.title : '';
          
          return (
            <div class={headerClass}>
              <div class="flex items-center gap-1 w-full">
                <div onClick={() => column.toggleSorting()} class="flex items-center gap-1 cursor-pointer hover:bg-muted/50 transition-colors">
                  {columnTitle}
                  {isSorted === 'asc' && (
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 10l7-7m0 0l7 7m-7-7v18"></path>
                    </svg>
                  )}
                  {isSorted === 'desc' && (
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
                    </svg>
                  )}
                </div>
                {isFiltered && (
                  <div class="ml-1 flex items-center">
                    <svg class="w-3 h-3 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                    </svg>
                  </div>
                )}
              </div>
              {/* <div class="w-full">
                <input
                  type="text"
                  class="w-full px-2 py-1 text-xs border border-border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                  placeholder="筛选..."
                  value={column.getFilterValue() || ''}
                  onChange={(e: Event) => column.setFilterValue((e.target as HTMLInputElement).value)}
                />
              </div> */}
            </div>
          );
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
            return (
              <div class={cellClasses}>
                {symbol}
                {formattedValue}
              </div>
            );
          }
          if (copyable) {
            return (
              <Typography copyable as="span" class={cn(cellClasses, 'rounded px-2 py-1')}>
                {row.getValue(dataIndex as string)}
              </Typography>
            );
          }
          const val = row.getValue(dataIndex as string) as TValue;
          if (render) {
            return (
              <div class={cellClasses}>
                {render?.(val, { ...row.original }, dataIndex as string)}
              </div>
            );
          }
          return (
            <div class={cellClasses}>
              {val}
            </div>
          );
        },
        enableSorting: true,
        enablePinning: !!fixed,
        meta: column,
      };
    }
  });
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
    loading: {
      type: Boolean as PropType<DataTableProps["loading"]>,
      default: false,
    },
    error: {
      type: String as PropType<DataTableProps["error"]>,
      default: undefined,
    },
    onRetry: {
      type: Function as PropType<DataTableProps["onRetry"]>,
      default: undefined,
    },
    enableVirtualization: {
      type: Boolean as PropType<DataTableProps["enableVirtualization"]>,
      default: false,
    },
    virtualizationHeight: {
      type: Number as PropType<DataTableProps["virtualizationHeight"]>,
      default: 400,
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

    const tableContainerRef = ref<HTMLElement | null>(null);
    const rowHeight = 48; // 假设每行高度为 48px

    const columnSizing = ref<Record<string, number>>({});

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
        get columnSizing() {
          return columnSizing.value;
        },
      },
      enableRowSelection: true,
      enableColumnResizing: true,
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
      onColumnSizingChange: (updater) => {
        columnSizing.value =
          typeof updater === "function" ? updater(columnSizing.value) : updater;
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

    const LoadingRow = () => (
      <TableRow>
        <TableCell colspan={columnsValue.value.length} class="h-48 text-center">
          <div class="flex flex-col items-center justify-center gap-2">
            <div class="w-8 h-8 border-4 border-blue-200 border-t-blue-500 rounded-full animate-spin"></div>
            <span class="text-sm text-muted-foreground">Loading...</span>
          </div>
        </TableCell>
      </TableRow>
    );

    const ErrorRow = () => (
      <TableRow>
        <TableCell colspan={columnsValue.value.length} class="h-48 text-center">
          <div class="flex flex-col items-center justify-center gap-4">
            <svg class="w-12 h-12 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
            <div class="text-center">
              <p class="text-sm text-muted-foreground mb-2">{props.error || 'An error occurred'}</p>
              {props.onRetry && (
                <button
                  class="px-4 py-2 text-sm bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
                  onClick={props.onRetry}
                >
                  Retry
                </button>
              )}
            </div>
          </div>
        </TableCell>
      </TableRow>
    );

    return () => (
      <div class="data-table-container">
        <div 
          ref={tableContainerRef}
          class="overflow-x-auto scrollbar-thin scrollbar-thumb-rounded scrollbar-track-gray-100 scrollbar-thumb-gray-400"
          style={{
            maxHeight: props.enableVirtualization ? `${props.virtualizationHeight}px` : 'auto',
            overflowY: props.enableVirtualization ? 'auto' : 'visible'
          }}
        >
          <Table class={cn(props.bordered && "border border-border")}>
            <TableHeader class="sticky top-0 z-20 bg-background">
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
                          willChange: fixed ? 'transform' : 'auto',
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
              {props.loading ? (
                <LoadingRow />
              ) : props.error ? (
                <ErrorRow />
              ) : rows.value?.length ? (
                rows.value.map((row) => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() ? "selected" : undefined}
                    class="transition-colors duration-150 row-group data-[state=selected]:bg-blue-200"
                    style={{
                      height: rowHeight + 'px'
                    }}
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
                            willChange: fixed ? 'transform' : 'auto',
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
