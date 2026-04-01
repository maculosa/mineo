import { defineComponent } from "vue";
import { proTableProps } from "./types";

export const ProTable = defineComponent({
  name: "ProTable",
  props: {
    ...proTableProps
  }
})