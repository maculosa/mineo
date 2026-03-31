import type { DataTableColumn, DataTableProps, DataTablePagination } from "./types";
import type { PropType } from "vue";
import type { ColumnDef } from "@tanstack/vue-table";
import { defineComponent, ref } from "vue";
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
} from "@mineo/ui";
import { cn } from "@mineo/utils";

import { ProPagination } from '../pagination'

export function transformColumn<TData, TValue = any>(
  columns: DataTableColumn<TData, TValue>[],
): ColumnDef<TData>[] {
  const columnDefs: ColumnDef<TData>[] = [];

  columns.forEach((column: DataTableColumn<TData, TValue>) => {
    const { align, titleAlign, currency } = column;

    const isCurrency = currency && typeof currency === 'object';
    const currencyConfig = isCurrency ? currency : {
      symbol: '¥',
      decimal: 2,
      thousand: ',',
    };

    const headerAlign = () => {
      if (currency) {
        return 'text-right';
      } else if (titleAlign) {
        return `text-${titleAlign}`
      } else if (align) {
        return `text-${align}`
      }
      return 'text-left';
    };
    const cellAlign = () => {
      if (currency) {
        return 'text-right';
      } else if (align) {
        return `text-${align}`
      }
      return 'text-left';
    };

    columnDefs.push({
      accessorKey: column.dataIndex,
      header: () => {
        const headerClass = cn(headerAlign(), "font-medium");
        return <div class={headerClass}>{column.title}</div>;
      },
      cell: ({ row }) => {
        if (isCurrency) {
          const { symbol = '¥', decimal = 2, thousand = ',' } = currencyConfig;
          const value = Number(row.getValue(column.dataIndex as string));
          const formattedValue = value.toFixed(decimal).replace(/\B(?=(\d{3})+(?!\d))/g, thousand);
          const currencyAlign = column.align || 'text-right';
          return (
            <div class={cn(cellAlign(), column.className)}>
              {symbol}{formattedValue}
            </div>
          );
        }
        if (column.copyable) {
          return (
            <Typography copyable>
              {row.getValue(column.dataIndex as string)}
            </Typography>
          )
        }
        return (
          <div class={cn(cellAlign(), column.className)}>
            {column.render?.(row.getValue(column.dataIndex as string), row) ||
              row.getValue(column.dataIndex as string)}
          </div>
        );
      },
      meta: column,
    });
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
    }
  },
  setup(props) {
    const { columns, data, pagination } = props as DataTableProps<any, any>; 
    const sorting = ref([]);
    const columnFilters = ref([]);
    const columnVisibility = ref({});
    const rowSelection = ref({});
    const paginationState = ref({
      pageIndex: pagination.current - 1,
      pageSize: pagination.pageSize,
    });

    const table = useVueTable({
      get data() {
        return data;
      },
      columns: transformColumn(columns),
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
        get rowSelection() {
          return rowSelection.value;
        },
        get pagination() {
          return paginationState.value;
        },
      },
      enableRowSelection: true,
      onSortingChange: (updater) => {
        sorting.value = typeof updater === 'function' ? updater(sorting.value) : updater;
      },
      onColumnFiltersChange: (updater) => {
        columnFilters.value = typeof updater === 'function' ? updater(columnFilters.value) : updater;
      },
      onColumnVisibilityChange: (updater) => {
        columnVisibility.value = typeof updater === 'function' ? updater(columnVisibility.value) : updater;
      },
      onRowSelectionChange: (updater) => {
        rowSelection.value = typeof updater === 'function' ? updater(rowSelection.value) : updater;
      },
      onPaginationChange: (updater) => {
        const newPagination = typeof updater === 'function' ? updater(paginationState.value) : updater;
        paginationState.value = newPagination;
        pagination.current = newPagination.pageIndex + 1;
        pagination.pageSize = newPagination.pageSize;
      },
      getCoreRowModel: getCoreRowModel(),
      getPaginationRowModel: getPaginationRowModel(),
      getSortedRowModel: getSortedRowModel(),
      getFilteredRowModel: getFilteredRowModel(),
    });

    const EmptyRow = () => (
      <TableRow>
        <TableCell colspan={columns.length} class="h-24 text-center">
          No results.
        </TableCell>
      </TableRow>
    );

    return () => (
      <div>

      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id} class="relative">
              {headerGroup.headers.map((header) => (
                <TableHead key={header.id}>
                  {!header.isPlaceholder && (
                    <FlexRender
                      render={header.column.columnDef.header}
                      props={header.getContext()}
                    />
                  )}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() ? "selected" : undefined}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    <FlexRender
                      render={cell.column.columnDef.cell}
                      props={cell.getContext()}
                    />
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colspan={columns.length} class="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      <div class="flex justify-end mt-2">
        <ProPagination
          v-model:page={pagination.current}
          v-model:pageSize={pagination.pageSize}
          total={pagination.total}
        />
        </div>
      </div>
    );
  },
});
