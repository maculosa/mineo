import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuItem,
  DropdownMenuContent,
  Button,
  Input,
} from "@mineo/ui";
import { defineComponent, PropType, ref, computed } from "vue";
import type { DisplayOrder } from "./types";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-vue-next";

/** 计算页码数组，带有省略号逻辑 */
function getPageNumbers(currentPage: number, pageCount: number): (number | "ellipsis")[] {
  if (pageCount <= 7) {
    return Array.from({ length: pageCount }, (_, i) => i + 1);
  }

  const pages: (number | "ellipsis")[] = [];

  if (currentPage <= 4) {
    for (let i = 1; i <= 5; i++) pages.push(i);
    pages.push("ellipsis");
    pages.push(pageCount);
  } else if (currentPage >= pageCount - 3) {
    pages.push(1);
    pages.push("ellipsis");
    for (let i = pageCount - 4; i <= pageCount; i++) pages.push(i);
  } else {
    pages.push(1);
    pages.push("ellipsis");
    for (let i = currentPage - 1; i <= currentPage + 1; i++) pages.push(i);
    pages.push("ellipsis");
    pages.push(pageCount);
  }

  return pages;
}

export const ProPagination = defineComponent({
  name: "ProPagination",
  props: {
    page: {
      type: Number,
      default: 1,
    },
    pageSize: {
      type: Number,
      default: 10,
    },
    total: {
      type: Number,
      default: 0,
    },
    pageSizes: {
      type: Array as PropType<number[]>,
      default: () => [10, 20, 50, 100],
    },
    displayOrder: {
      type: Array as PropType<DisplayOrder[]>,
      default: () => ["pages", "size-picker", "quick-jumper"],
    },
  },
  emits: ["update:page", "update:pageSize"],
  setup(props, { emit }) {
    const pageCount = computed(() => Math.max(1, Math.ceil(props.total / props.pageSize)));
    const jumpPage = ref(props.page);
    const displayOrder = props.displayOrder as DisplayOrder[];

    const pageNumbers = computed(() => getPageNumbers(props.page, pageCount.value));

    const handlePageChange = (newPage: number) => {
      if (newPage >= 1 && newPage <= pageCount.value && newPage !== props.page) {
        emit("update:page", newPage);
      }
    };

    const handleJump = () => {
      const targetPage = Math.max(1, Math.min(pageCount.value, jumpPage.value));
      emit("update:page", targetPage);
      jumpPage.value = targetPage;
    };

    const handleSizeChange = (size: number) => {
      emit("update:pageSize", size);
      if (props.page > Math.ceil(props.total / size)) {
        emit("update:page", 1);
      }
    };

    const renderComponent = (name: DisplayOrder[number]) => {
      switch (name) {
        case "pages":
          return (
            <Pagination
              v-model:page={props.page}
              itemsPerPage={props.pageSize}
              class="flex items-center gap-1"
            >
              <PaginationContent class="flex items-center gap-1">
                <PaginationPrevious
                  class={props.page <= 1 ? "pointer-events-none opacity-50" : ""}
                  onClick={(e: MouseEvent) => { e.preventDefault(); handlePageChange(props.page - 1); }}
                >
                  <ChevronLeftIcon class="h-4 w-4" />
                </PaginationPrevious>
                {pageNumbers.value.map((p, index) =>
                  p === "ellipsis" ? (
                    <PaginationEllipsis key={`ellipsis-${index}`} />
                  ) : (
                    <PaginationItem
                      key={p}
                      class={props.page === p ? "pointer-events-none" : "cursor-pointer"}
                      isActive={props.page === p}
                      value={p}
                      onClick={() => handlePageChange(p)}
                    >
                      {p}
                    </PaginationItem>
                  )
                )}
                <PaginationNext
                  class={props.page >= pageCount.value ? "pointer-events-none opacity-50" : ""}
                  onClick={(e: MouseEvent) => { e.preventDefault(); handlePageChange(props.page + 1); }}
                >
                  <ChevronRightIcon class="h-4 w-4" />
                </PaginationNext>
              </PaginationContent>
            </Pagination>
          );

        case "size-picker":
          return (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" class="h-8">
                  {props.pageSize} / 页
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {props.pageSizes.map((s) => (
                  <DropdownMenuItem
                    key={s}
                    class={props.pageSize === s ? "bg-accent" : ""}
                    onClick={() => handleSizeChange(s)}
                  >
                    {s} / 页
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          );

        case "quick-jumper":
          return (
            <div class="flex items-center gap-2">
              <span class="text-sm text-muted-foreground">跳至</span>
              <Input
                type="number"
                min={1}
                max={pageCount.value}
                v-model={jumpPage.value}
                class="h-8 w-16 text-center"
                onKeydown={(e: KeyboardEvent) => { if (e.key === "Enter") handleJump(); }}
              />
              <span class="text-sm text-muted-foreground">页</span>
            </div>
          );

        default:
          return null;
      }
    };

    return () => (
      <div class="flex flex-col sm:flex-row items-center justify-between gap-4">
        <span class="text-sm text-muted-foreground">
          共 {props.total} 条
        </span>
        <div class="flex items-center gap-4">
          {displayOrder.map((name) => (
            <div key={name}>{renderComponent(name)}</div>
          ))}
        </div>
      </div>
    );
  },
});
