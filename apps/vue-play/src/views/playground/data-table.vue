<script setup lang="tsx">
import { DataTable, DataTableAction, ProCard } from '@mineo/pro-ui';
import { Badge, Button, Typography } from '@mineo/ui';
import { Edit, Plus, Minus, Undo } from 'lucide-vue-next';
import { ref } from 'vue';

interface Phone {
    id: number;
    brand: string;
    price: number;
    model: string;
    color: string;
    quantity: number;
    spec: string;
    total: number;
    createdAt: string;
}

const columns = ref<DataTableColumn<Phone>[]>([
    // { type: 'selection' },
    { title: '品牌', dataIndex: 'brand', width: 100 },
    { title: '型号', dataIndex: 'model', width: 100 },
    { title: '颜色', dataIndex: 'color', width: 100, render: (value, row) => <Badge>{value}</Badge> },
    { title: '规格', dataIndex: 'spec', copyable: true },
    { title: '数量', dataIndex: 'quantity' },
    { title: '价格', dataIndex: 'price', width: 100, currency: { symbol: '¥', decimal: 2, thousand: ',' } },
    { title: '总金额', dataIndex: 'total', currency: { symbol: '¥', decimal: 2, thousand: ',' } },
    { title: '创建时间', dataIndex: 'createdAt', width: 200 },
    { title: '操作', dataIndex: 'action',
        fixed: 'right',
        render: (value, row) => {
            const actions = [
                { label: '添加到购物车', key: 'add', icon: <Plus /> },
                { label: '编辑', key: 'edit', icon: <Edit /> },
                { label: '撤销', key: 'undo', disabled: true, icon: <Undo /> },
                { label: '删除', key: 'remove', variant: 'destructive', separator: true, icon: <Minus /> },
            ]
            return <DataTableAction items={actions} splitNum={2} iconOnly={true} />
        },
    },
])

const dataSource = ref<Phone[]>([
    {
        id: 1,
        brand: 'Apple',
        price: 5899,
        model: 'iPhone 17',
        color: 'Black',
        quantity: 3,
        spec: '16GB 5.4" 6K 120Hz 5G 128GB',
        total: 17697,
        createdAt: '2026-03-30 15:52:32',
        action: 'Add to Cart',
    },
    {
        id: 2,
        brand: 'Apple',
        price: 10899,
        model: 'iPhone 17 Pro Max',
        color: 'White',
        quantity: 10,
        spec: '16GB 5.8" 6K 120Hz 5G 512GB',
        total: 108990,
        createdAt: '2026-03-30 15:52:32',
        action: 'Add to Cart',
    }

])

</script>

<template>
    <ProCard class="w-200" title="Phone List">
        <DataTable :columns="columns" :data="dataSource" />
    </ProCard>
</template>