import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@mineo/ui";
import { defineComponent, PropType, ref, computed, watch } from "vue";
import type { DisplayOrder } from "./types";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-vue-next";
import { ProNumberInput } from "../number-input";

/** 计算页码数组，带有省略号逻辑 */
function getPageNumbers(
  currentPage: number,
  pageCount: number,
): (number | "ellipsis")[] {
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
      default: () => ["size-picker", "pages", "quick-jumper"],
    },
  },
  emits: ["update:page", "update:pageSize"],
  setup(props, { emit }) {
    const pageCount = computed(() =>
      Math.max(1, Math.ceil(props.total / props.pageSize)),
    );
    const jumpPage = ref(props.page);
    const localPage = ref(props.page);
    const displayOrder = props.displayOrder as DisplayOrder[];

    watch(() => props.page, (newPage) => {
      localPage.value = newPage;
    });

    const pageNumbers = computed(() =>
      getPageNumbers(localPage.value, pageCount.value),
    );

    const handlePageChange = (newPage: number) => {
      if (
        newPage >= 1 &&
        newPage <= pageCount.value &&
        newPage !== localPage.value
      ) {
        localPage.value = newPage;
        emit("update:page", newPage);
      }
    };

    const handleJump = () => {
      const targetPage = Math.max(1, Math.min(pageCount.value, jumpPage.value));
      localPage.value = targetPage;
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
              page={localPage.value}
              total={props.total}
              itemsPerPage={props.pageSize}
              class="flex items-center gap-1"
            >
              <PaginationContent class="flex items-center gap-1">
                <PaginationPrevious
                  disabled={localPage.value <= 1}
                  class={
                    localPage.value <= 1 ? "pointer-events-none opacity-50" : ""
                  }
                  onClick={(e: MouseEvent) => {
                    e.preventDefault();
                    handlePageChange(localPage.value - 1);
                  }}
                >
                  <ChevronLeftIcon class="h-4 w-4" />
                </PaginationPrevious>
                {pageNumbers.value.map((p, index) =>
                  p === "ellipsis" ? (
                    <PaginationEllipsis key={`ellipsis-${index}`} />
                  ) : (
                    <PaginationItem
                      key={p}
                      class={
                        localPage.value === p
                          ? "pointer-events-none"
                          : "cursor-pointer"
                      }
                      isActive={localPage.value === p}
                      value={p}
                      onClick={() => handlePageChange(p)}
                    >
                      {p}
                    </PaginationItem>
                  ),
                )}
                <PaginationNext
                  disabled={localPage.value >= pageCount.value}
                  class={
                    localPage.value >= pageCount.value
                      ? "pointer-events-none opacity-50"
                      : ""
                  }
                  onClick={(e: MouseEvent) => {
                    e.preventDefault();
                    handlePageChange(localPage.value + 1);
                  }}
                >
                  <ChevronRightIcon class="h-4 w-4" />
                </PaginationNext>
              </PaginationContent>
            </Pagination>
          );

        case "size-picker":
          return (
            <Select
              modelValue={props.pageSize}
              onUpdate:modelValue={handleSizeChange}
            >
              <SelectTrigger>
                <SelectValue placeholder="每页" />
              </SelectTrigger>
              <SelectContent>
                {props.pageSizes.map((s) => (
                  <SelectItem value={s}>{s} / 页</SelectItem>
                ))}
              </SelectContent>
            </Select>
            
          );

        case "quick-jumper":
          return (
            <div class="flex items-center gap-2">
              <span class="text-sm text-muted-foreground">跳至</span>
              <ProNumberInput
                showControls={false}
                min={1}
                max={pageCount.value}
                v-model={jumpPage.value}
                class="h-8 w-16 text-center"
                onKeydown={(e: KeyboardEvent) => {
                  if (e.key === "Enter") handleJump();
                }}
              />
              <span class="text-sm text-muted-foreground">页</span>
            </div>
          );

        default:
          return null;
      }
    };

    return () => (
      <div class="flex-1 flex items-center justify-between gap-4">
        <span class="text-sm text-muted-foreground">共 {props.total} 条</span>
        <div class="flex items-center gap-4">
          {displayOrder.map((name) => (
            <div key={name}>{renderComponent(name)}</div>
          ))}
        </div>
      </div>
    );
  },
});
