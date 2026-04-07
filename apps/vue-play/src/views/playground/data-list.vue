<template>
    <div class="flex-1 flex flex-col">
        <DataList
            :data="data"
            :schema="schema"
            :actions="actions"
            :batch-actions="batchActions"
            :batch-actions-enabled="true"
            :pagination="pagination"
            :loading="loading"
            :error="error"
            :grid-columns="4"
            :grid-gap="16"
            @update:page="handlePageChange"
            @update:pageSize="handlePageSizeChange"
            @select-change="handleSelectChange"
            @filter-change="handleFilterChange"
            @sort-change="handleSortChange"
            @item-edit="handleItemEdit"
        />
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import type { DataListSchema, DataListAction } from '@mineo/pro-ui';
import { DataList, ProCard } from '@mineo/pro-ui';

const data = ref([
  { id: 1, name: 'Item 1', description: 'Description 1', status: 'active' },
  { id: 2, name: 'Item 2', description: 'Description 2', status: 'inactive' },
  { id: 3, name: 'Item 3', description: 'Description 3', status: 'active' },
  { id: 4, name: 'Item 4', description: 'Description 4', status: 'inactive' },
  { id: 5, name: 'Item 5', description: 'Description 5', status: 'active' },
  { id: 6, name: 'Item 6', description: 'Description 6', status: 'inactive' },
  { id: 7, name: 'Item 7', description: 'Description 7', status: 'active' },
  { id: 8, name: 'Item 8', description: 'Description 8', status: 'inactive' },
  { id: 9, name: 'Item 9', description: 'Description 9', status: 'active' },
  { id: 10, name: 'Item 10', description: 'Description 10', status: 'inactive' },
  { id: 11, name: 'Item 11', description: 'Description 11', status: 'active' },
  { id: 12, name: 'Item 12', description: 'Description 12', status: 'inactive' },
  { id: 13, name: 'Item 13', description: 'Description 13', status: 'active' },
  { id: 14, name: 'Item 14', description: 'Description 14', status: 'inactive' },
  { id: 15, name: 'Item 15', description: 'Description 15', status: 'active' },
  { id: 16, name: 'Item 16', description: 'Description 16', status: 'inactive' },
  { id: 17, name: 'Item 17', description: 'Description 17', status: 'active' },
  { id: 18, name: 'Item 18', description: 'Description 18', status: 'inactive' },
  { id: 19, name: 'Item 19', description: 'Description 19', status: 'active' },
  { id: 20, name: 'Item 20', description: 'Description 20', status: 'inactive' },
  // 更多数据...
]);

const schema: DataListSchema[] = [
  { field: 'name', label: 'Name', type: 'text', editable: true },
  { field: 'description', label: 'Description', type: 'text' },
  { field: 'status', label: 'Status', type: 'select' },
];

const actions: DataListAction[] = [
  { key: 'edit', label: 'Edit', onClick: (item) => console.log('Edit', item) },
  { key: 'delete', label: 'Delete', variant: 'danger', onClick: (item) => console.log('Delete', item) },
];

const batchActions: DataListAction[] = [
  { key: 'batch-delete', label: 'Batch Delete', variant: 'danger', onClick: (items) => console.log('Batch Delete', items) },
];

const pagination = ref({ current: 1, pageSize: 10, total: 100 });
const loading = ref(false);
const error = ref<string | undefined>(undefined);

const handlePageChange = (page: number) => {
  console.log('Page changed:', page);
};

const handlePageSizeChange = (pageSize: number) => {
  console.log('Page size changed:', pageSize);
};

const handleSelectChange = (items: any[]) => {
  console.log('Selected items:', items);
};

const handleFilterChange = (filters: any[]) => {
  console.log('Filters changed:', filters);
};

const handleSortChange = (sort: any) => {
  console.log('Sort changed:', sort);
};

const handleItemEdit = (item: any, field: string, value: any) => {
  console.log('Item edited:', item, field, value);
};
</script>