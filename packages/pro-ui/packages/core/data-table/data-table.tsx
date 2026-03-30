import type { DataTableColumn, DataTableProps } from "./types";
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
} from "@mineo/ui";
import { cn } from "@mineo/utils";

export function transformColumn<TData, TValue = any>(
  columns: DataTableColumn<TData, TValue>[],
): ColumnDef<TData>[] {
  const columnDefs: ColumnDef<TData>[] = [];

  columns.forEach((column: DataTableColumn<TData, TValue>) => {
    columnDefs.push({
      accessorKey: column.dataIndex,
      header: () => {
        const headerClass = cn("text-left font-medium");
        return <div class={headerClass}>{column.title}</div>;
      },
      cell: ({ row }) => {
        return (
          <div class={cn("text-left font-medium", column.className)}>
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
      type: Array as PropType<DataTableColumn<TData, TValue>[]>,
      default: () => [],
    },
    data: {
      type: Array as PropType<TData[]>,
      default: () => [],
    },
  },
  setup(props) {
    const { columns, data } = props as DataTableProps<TData, TValue>;
    const sorting = ref([]);
    const columnFilters = ref([]);
    const columnVisibility = ref({});
    const rowSelection = ref({});

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
      },
      enableRowSelection: true,
      onSortingChange: (updater) => {
        sorting.value = updater;
      },
      onColumnFiltersChange: (updater) => {
        columnFilters.value = updater;
      },
      onColumnVisibilityChange: (updater) => {
        columnVisibility.value = updater;
      },
      onRowSelectionChange: (updater) => {
        rowSelection.value = updater;
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
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
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
    );
  },
});
