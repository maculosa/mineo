import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@mineo/ui";
import { defineComponent } from "vue";

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
  },
  emits: ["update:page"],
  setup(props, { emit }) {
    return () => (
      <Pagination total={props.total}>
        <PaginationContent>
          <PaginationPrevious />
          <PaginationItem active={props.page === 1}>
            <PaginationLink href="#" is-active={props.page === 1}>
              1
            </PaginationLink>
          </PaginationItem>
        </PaginationContent>
        <PaginationNext />
      </Pagination>
    );
  },
});
