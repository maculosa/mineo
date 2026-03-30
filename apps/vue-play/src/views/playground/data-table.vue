<script setup lang="tsx">
import { DataTable, DataTableAction } from '@mineo/pro-ui';
import { Button } from '@mineo/ui';
import { Typography } from '@mineo/ui';
import { Edit, Plus, Minus } from 'lucide-vue-next';
import { ref } from 'vue';

interface Phone {
    id: number;
    brand: string;
    price: number;
    model: string;
    color: string;
    quantity: number;
    spec: string;
    createdAt: string;
}

const columns = ref<DataTableColumn<Phone>[]>([
    { title: '品牌', dataIndex: 'brand', width: 100 },
    { title: '价格', dataIndex: 'price', width: 100 },
    { title: '型号', dataIndex: 'model', width: 100 },
    { title: '颜色', dataIndex: 'color', width: 100 },
    { title: '数量', dataIndex: 'quantity' },
    { title: '规格', dataIndex: 'spec' },
    { title: '创建时间', dataIndex: 'createdAt', width: 200 },
    { title: '操作', dataIndex: 'action',
        render: (value, row) => {
            const actions = [
                { label: '添加到购物车', key: 'add', icon: <Plus /> },
                { label: '编辑', key: 'edit', icon: <Edit /> },
                { label: '删除', key: 'remove', icon: <Minus /> },
            ]
            return <DataTableAction items={actions} splitNum={2} iconOnly={true} />
        },
     },
])

const dataSource = ref<Phone[]>([
    {
        id: 1,
        brand: 'Apple',
        price: 100,
        model: 'Pro',
        color: 'Black',
        quantity: 1,
        spec: '16GB 5.4" 6K 120Hz 5G 128GB',
        createdAt: '2026-03-30 15:52:32',
        action: 'Add to Cart',
    },
])

</script>

<template>
    <Typography strong>Hello DataTable</Typography>
    <DataTable :columns="columns" :data="dataSource" />
</template>