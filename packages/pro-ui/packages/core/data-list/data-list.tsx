import {
  defineComponent,
  ref,
  computed,
  watch,
  onMounted,
  nextTick,
} from "vue";
import type {
  DataListProps,
  DataListEmits,
  DataListPagination,
  DataListFilter,
  DataListSort,
} from "./types";
import {
  filterData,
  sortData,
  paginateData,
  formatItem,
  generateSkeletonData,
  deepClone,
} from "./helper";
import { ProPagination } from "../pagination";
import {
  Button,
  ButtonGroup,
  Checkbox,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  Input,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Badge,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  Skeleton,
  ScrollArea,
} from "@mineo/ui";
import { cn } from "@mineo/utils";
import {
  MoreHorizontalIcon,
  RefreshCwIcon,
  FilterIcon,
  SortAscIcon,
  SortDescIcon,
  XIcon,
} from "lucide-vue-next";

export const DataList = defineComponent({
  name: "DataList",
  props: {
    data: {
      type: Array,
      default: () => [],
    },
    pagination: {
      type: Object as () => DataListPagination,
      default: () => ({
        current: 1,
        pageSize: 20,
        total: 0,
      }),
    },
    paginationEnabled: {
      type: Boolean,
      default: true,
    },
    fetchData: {
      type: Function,
      default: undefined,
    },
    loading: {
      type: Boolean,
      default: false,
    },
    error: {
      type: String,
      default: undefined,
    },
    onRetry: {
      type: Function,
      default: undefined,
    },
    actions: {
      type: Array,
      default: () => [],
    },
    batchActions: {
      type: Array,
      default: () => [],
    },
    batchActionsEnabled: {
      type: Boolean,
      default: false,
    },
    selectedItems: {
      type: Array,
      default: () => [],
    },
    onSelectChange: {
      type: Function,
      default: undefined,
    },
    filters: {
      type: Array as () => DataListFilter[],
      default: () => [],
    },
    onFilterChange: {
      type: Function,
      default: undefined,
    },
    sort: {
      type: Object as () => DataListSort | null,
      default: null,
    },
    onSortChange: {
      type: Function,
      default: undefined,
    },
    schema: {
      type: Array,
      default: () => [],
    },
    itemRenderer: {
      type: Function,
      default: undefined,
    },
    emptyRenderer: {
      type: Function,
      default: undefined,
    },
    loadingRenderer: {
      type: Function,
      default: undefined,
    },
    errorRenderer: {
      type: Function,
      default: undefined,
    },
    gridColumns: {
      type: Number,
      default: 1,
    },
    gridGap: {
      type: Number,
      default: 16,
    },
    itemClass: {
      type: String,
      default: undefined,
    },
    containerClass: {
      type: String,
      default: undefined,
    },
  },
  emits: [
    "update:page",
    "update:pageSize",
    "select-change",
    "filter-change",
    "sort-change",
    "item-edit",
  ] as unknown as DataListEmits,
  setup(props, { emit }) {
    // 响应式状态
    const localSelectedItems = ref([...(props.selectedItems || [])]);
    const localFilters = ref([...(props.filters || [])]);
    const localSort = ref(props.sort);
    const isLoading = ref(props.loading);
    const currentPage = ref(props.pagination?.current || 1);
    const pageSize = ref(props.pagination?.pageSize || 10);
    const total = ref(props.pagination?.total || 0);
    const editingItem = ref<any>(null);
    const editingField = ref<string>("");
    const editingValue = ref<any>("");

    // 计算属性
    const filteredAndSortedData = computed(() => {
      let processedData = [...props.data];

      // 过滤
      if (localFilters.value.length > 0) {
        processedData = filterData(processedData, localFilters.value);
      }

      // 排序
      if (localSort.value) {
        processedData = sortData(processedData, localSort.value);
      }

      return processedData;
    });

    const paginatedData = computed(() => {
      if (!props.paginationEnabled) {
        return filteredAndSortedData.value;
      }
      return paginateData(
        filteredAndSortedData.value,
        currentPage.value,
        pageSize.value,
      );
    });

    const gridStyle = computed(() => {
      return {
        display: "grid",
        gridTemplateColumns: `repeat(${props.gridColumns}, 1fr)`,
        gap: `${props.gridGap}px`,
      };
    });

    const skeletonData = computed(() => {
      return generateSkeletonData(pageSize.value, props.schema || []);
    });

    // 方法
    const handlePageChange = (page: number) => {
      currentPage.value = page;
      emit("update:page", page);
      if (props.fetchData) {
        fetchDataFromServer();
      }
    };

    const handlePageSizeChange = (size: number) => {
      pageSize.value = size;
      currentPage.value = 1;
      emit("update:pageSize", size);
      if (props.fetchData) {
        fetchDataFromServer();
      }
    };

    const handleSelectItem = (item: any) => {
      const index = localSelectedItems.value.findIndex((i) => i === item);
      if (index > -1) {
        localSelectedItems.value.splice(index, 1);
      } else {
        localSelectedItems.value.push(item);
      }
      emit("select-change", localSelectedItems.value);
      if (props.onSelectChange) {
        props.onSelectChange(localSelectedItems.value);
      }
    };

    const handleSelectAll = (selected: boolean) => {
      if (selected) {
        localSelectedItems.value = [...paginatedData.value];
      } else {
        localSelectedItems.value = [];
      }
      emit("select-change", localSelectedItems.value);
      if (props.onSelectChange) {
        props.onSelectChange(localSelectedItems.value);
      }
    };

    const handleFilterChange = (field: string, value: any) => {
      const existingFilterIndex = localFilters.value.findIndex(
        (f) => f.field === field,
      );
      if (existingFilterIndex > -1) {
        if (value === undefined || value === null || value === "") {
          localFilters.value.splice(existingFilterIndex, 1);
        } else {
          localFilters.value[existingFilterIndex].value = value;
        }
      } else if (value !== undefined && value !== null && value !== "") {
        localFilters.value.push({ field, value });
      }
      currentPage.value = 1;
      emit("filter-change", localFilters.value);
      if (props.onFilterChange) {
        props.onFilterChange(localFilters.value);
      }
      if (props.fetchData) {
        fetchDataFromServer();
      }
    };

    const handleSortChange = (field: string) => {
      if (localSort.value && localSort.value.field === field) {
        // 切换排序方向
        localSort.value = {
          field,
          direction: localSort.value.direction === "asc" ? "desc" : "asc",
        };
      } else {
        // 新的排序字段
        localSort.value = {
          field,
          direction: "asc",
        };
      }
      emit("sort-change", localSort.value);
      if (props.onSortChange) {
        props.onSortChange(localSort.value);
      }
      if (props.fetchData) {
        fetchDataFromServer();
      }
    };

    const handleItemEdit = (item: any, field: string) => {
      editingItem.value = item;
      editingField.value = field;
      editingValue.value = deepClone(item[field]);
    };

    const handleItemSave = (item: any, field: string) => {
      item[field] = editingValue.value;
      emit("item-edit", item, field, editingValue.value);
      editingItem.value = null;
      editingField.value = "";
      editingValue.value = "";
    };

    const handleItemCancel = () => {
      editingItem.value = null;
      editingField.value = "";
      editingValue.value = "";
    };

    const fetchDataFromServer = async () => {
      if (!props.fetchData) return;

      isLoading.value = true;
      try {
        const result = await props.fetchData({
          page: currentPage.value,
          pageSize: pageSize.value,
          filters: localFilters.value,
          sort: localSort.value,
        });
        total.value = result.total;
      } catch (error) {
        console.error("Failed to fetch data:", error);
      } finally {
        isLoading.value = false;
      }
    };

    const handleRetry = () => {
      if (props.onRetry) {
        props.onRetry();
      } else if (props.fetchData) {
        fetchDataFromServer();
      }
    };

    // 生命周期
    onMounted(() => {
      if (props.fetchData) {
        fetchDataFromServer();
      }
    });

    // 监听属性变化
    watch(
      () => props.loading,
      (newValue) => {
        isLoading.value = newValue;
      },
    );

    watch(
      () => props.pagination,
      (newValue) => {
        if (newValue) {
          currentPage.value = newValue.current || 1;
          pageSize.value = newValue.pageSize || 10;
          total.value = newValue.total || 0;
        }
      },
      { deep: true },
    );

    watch(
      () => props.selectedItems,
      (newValue) => {
        localSelectedItems.value = [...(newValue || [])];
      },
      { deep: true },
    );

    watch(
      () => props.filters,
      (newValue) => {
        localFilters.value = [...(newValue || [])];
      },
      { deep: true },
    );

    watch(
      () => props.sort,
      (newValue) => {
        localSort.value = newValue;
      },
    );

    // 渲染函数
    const renderItem = (item: any, index: number) => {
      if (props.itemRenderer) {
        return props.itemRenderer(item, index);
      }

      return (
        <Card class={cn("max-h-[260px]", props.itemClass)}>
          <CardHeader>
            <div class="flex justify-between items-start">
              <CardTitle class="text-lg font-medium">
                {item.name || item.title || `Item ${index + 1}`}
              </CardTitle>
              {props.batchActionsEnabled && (
                <Checkbox
                  modelValue={localSelectedItems.value.includes(item)}
                  onUpdate:modelValue={() => handleSelectItem(item)}
                  class="cursor-pointer"
                />
              )}
            </div>
            {item.description && (
              <CardDescription>{item.description}</CardDescription>
            )}
          </CardHeader>
          <CardContent class="space-y-2">
            {props.schema.map((fieldSchema) => {
              const {
                field,
                label,
                type = "text",
                editable = false,
                format,
              } = fieldSchema;
              const value = item[field];
              const formattedValue = format ? format(value, item) : value;

              if (editingItem.value === item && editingField.value === field) {
                // 编辑模式
                return (
                  <div key={field} class="flex items-center gap-2">
                    <span class="text-sm font-medium w-24">{label}:</span>
                    <div class="flex-1 flex gap-2">
                      <Input
                        modelValue={editingValue.value}
                        onUpdate:modelValue={(value) =>
                          (editingValue.value = value)
                        }
                        class="flex-1"
                      />
                      <Button
                        size="sm"
                        onClick={() => handleItemSave(item, field)}
                      >
                        保存
                      </Button>
                      <Button
                        size="sm"
                        variant="secondary"
                        onClick={handleItemCancel}
                      >
                        取消
                      </Button>
                    </div>
                  </div>
                );
              }

              // 显示模式
              return (
                <div key={field} class="flex items-center gap-2">
                  <span class="text-sm font-medium w-24">{label}:</span>
                  <span
                    class={cn(
                      "flex-1 text-sm",
                      editable && "cursor-pointer hover:text-blue-600",
                    )}
                    onClick={() => editable && handleItemEdit(item, field)}
                  >
                    {formattedValue}
                  </span>
                </div>
              );
            })}
          </CardContent>
          {props.actions.length > 0 && (
            <CardFooter class="flex justify-end gap-2">
              <DataListAction items={props.actions} item={item} />
            </CardFooter>
          )}
        </Card>
      );
    };

    const renderEmpty = () => {
      if (props.emptyRenderer) {
        return props.emptyRenderer();
      }

      return (
        <div class="col-span-full flex flex-col items-center justify-center py-12 text-center">
          <div class="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
            <XIcon class="w-8 h-8 text-gray-400" />
          </div>
          <h3 class="text-lg font-medium text-gray-900 mb-2">No data found</h3>
          <p class="text-gray-500 mb-4">There are no items to display.</p>
          {props.fetchData && (
            <Button onClick={fetchDataFromServer}>
              <RefreshCwIcon class="w-4 h-4 mr-2" />
              Refresh
            </Button>
          )}
        </div>
      );
    };

    const renderLoading = () => {
      if (props.loadingRenderer) {
        return props.loadingRenderer();
      }

      return (
        <div style={gridStyle.value} class={props.containerClass}>
          {skeletonData.value.map((item, index) => (
            <Card key={index} class={cn("h-full", props.itemClass)}>
              <CardHeader>
                <Skeleton class="h-6 w-3/4 mb-2" />
                <Skeleton class="h-4 w-1/2" />
              </CardHeader>
              <CardContent class="space-y-2">
                {props.schema.map((fieldSchema, fieldIndex) => (
                  <div key={fieldIndex} class="flex items-center gap-2">
                    <Skeleton class="h-4 w-24" />
                    <Skeleton class="h-4 flex-1" />
                  </div>
                ))}
              </CardContent>
              {props.actions.length > 0 && (
                <CardFooter>
                  <Skeleton class="h-8 w-24" />
                </CardFooter>
              )}
            </Card>
          ))}
        </div>
      );
    };

    const renderError = () => {
      if (props.errorRenderer) {
        return props.errorRenderer();
      }

      return (
        <div class="col-span-full flex flex-col items-center justify-center py-12 text-center">
          <div class="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mb-4">
            <XIcon class="w-8 h-8 text-red-500" />
          </div>
          <h3 class="text-lg font-medium text-gray-900 mb-2">Error</h3>
          <p class="text-gray-500 mb-4">
            {props.error || "An error occurred while loading data."}
          </p>
          <Button onClick={handleRetry}>Retry</Button>
        </div>
      );
    };

    const renderBatchActions = () => {
      if (!props.batchActionsEnabled || props.batchActions.length === 0) {
        return null;
      }

      return (
        <div class="flex items-center gap-2 mb-4">
          <div class="flex items-center gap-2">
            <Checkbox
              modelValue={
                localSelectedItems.value.length ===
                  paginatedData.value.length && paginatedData.value.length > 0
              }
              onUpdate:modelValue={handleSelectAll}
              class="cursor-pointer"
            />
            <span class="text-sm text-gray-600">
              Selected {localSelectedItems.value.length} of{" "}
              {paginatedData.value.length}
            </span>
          </div>
          <div class="flex gap-2">
            {props.batchActions.map((action) => (
              <Button
                key={action.key}
                variant={action.variant}
                disabled={
                  action.disabled || localSelectedItems.value.length === 0
                }
                onClick={() => action.onClick?.(localSelectedItems.value)}
              >
                {action.icon}
                {action.label}
              </Button>
            ))}
          </div>
        </div>
      );
    };

    const renderFilters = () => {
      if (!props.schema || props.schema.length === 0) {
        return null;
      }

      return (
        <div class="flex flex-wrap gap-4 mb-4">
          {props.schema.map((fieldSchema) => {
            const { field, label, type = "text" } = fieldSchema;
            const currentFilter = localFilters.value.find(
              (f) => f.field === field,
            );

            return (
              <div key={field} class="flex items-center gap-2">
                <label class="text-sm font-medium">{label}:</label>
                {type === "select" ? (
                  <Select
                    value={currentFilter?.value}
                    onValueChange={(value) => handleFilterChange(field, value)}
                  >
                    <SelectTrigger class="w-40">
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All</SelectItem>
                      {/* 这里可以根据 fieldSchema.editConfig.options 动态生成选项 */}
                    </SelectContent>
                  </Select>
                ) : (
                  <Input
                    type={type}
                    placeholder={`Filter ${label}`}
                    value={currentFilter?.value || ""}
                    onUpdate:modelValue={(value) =>
                      handleFilterChange(field, value)
                    }
                    class="w-40"
                  />
                )}
              </div>
            );
          })}
        </div>
      );
    };

    const renderSortControls = () => {
      if (!props.schema || props.schema.length === 0) {
        return null;
      }

      return (
        <div class="flex items-center gap-4 mb-4">
          <span class="text-sm font-medium">Sort by:</span>
          <div class="flex gap-2">
            {props.schema.map((fieldSchema) => {
              const { field, label } = fieldSchema;
              const isActive = localSort.value?.field === field;
              const direction = localSort.value?.direction;

              return (
                <Button
                  key={field}
                  variant={isActive ? "primary" : "secondary"}
                  size="sm"
                  onClick={() => handleSortChange(field)}
                  class="flex items-center gap-1"
                >
                  {label}
                  {isActive && direction === "asc" && (
                    <SortAscIcon class="w-4 h-4" />
                  )}
                  {isActive && direction === "desc" && (
                    <SortDescIcon class="w-4 h-4" />
                  )}
                </Button>
              );
            })}
          </div>
        </div>
      );
    };

    // 主渲染
    return () => (
      <div class="flex-1 flex flex-col">
        {/* 批量操作 */}
        {renderBatchActions()}

        {/* 过滤和排序控制 */}
        <div class="mb-4">
          {renderFilters()}
          {renderSortControls()}
        </div>

        {/* 数据列表 */}
        {isLoading.value || props.loading ? (
          renderLoading()
        ) : props.error ? (
          renderError()
        ) : paginatedData.value.length > 0 ? (
            <div style={gridStyle.value} class={cn(props.containerClass)}>
              {paginatedData.value.map((item, index) =>
                renderItem(item, index),
              )}
            </div>
        ) : (
          renderEmpty()
        )}

        {/* 分页 */}
        {props.paginationEnabled && !props.loading && !props.error && (
          <div class="mt-4 flex justify-end">
            <ProPagination
              v-model:page={currentPage.value}
              v-model:pageSize={pageSize.value}
              total={total.value}
              onUpdate:page={handlePageChange}
              onUpdate:pageSize={handlePageSizeChange}
            />
          </div>
        )}
      </div>
    );
  },
});

// 操作按钮组件
const DataListAction = defineComponent({
  name: "DataListAction",
  props: {
    items: {
      type: Array,
      required: true,
    },
    item: {
      type: Object,
      required: true,
    },
  },
  setup(props) {
    const splitNum = 2;
    const displayItems = props.items.slice(0, splitNum);
    const dropdownItems = props.items.slice(splitNum);

    return () => (
      <div class="flex items-center gap-2">
        {displayItems.map((action) => (
          <Button
            key={action.key}
            variant={action.variant}
            size="sm"
            disabled={action.disabled}
            onClick={() => action.onClick?.(props.item)}
          >
            {action.icon}
            {action.label}
          </Button>
        ))}
        {dropdownItems.length > 0 && (
          <DropdownMenu>
            <DropdownMenuTrigger as-child>
              <Button size="sm" variant="outline">
                <MoreHorizontalIcon class="w-4 h-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              {dropdownItems.map((action) => (
                <>
                  {action.separator && (
                    <DropdownMenuSeparator key={`${action.key}-separator`} />
                  )}
                  <DropdownMenuItem
                    key={action.key}
                    disabled={action.disabled}
                    onClick={() => action.onClick?.(props.item)}
                  >
                    {action.icon}
                    {action.label}
                  </DropdownMenuItem>
                </>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>
    );
  },
});
