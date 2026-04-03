<script setup lang="tsx">
import { DataTable, DataTableAction, ProCard, type DataTableColumn } from '@mineo/pro-ui';
import { Badge } from '@mineo/ui';
import { Edit, Plus, Minus, Undo } from 'lucide-vue-next';
import { ref } from 'vue';
// import { SnowflakeIdWorker } from '@/lib/tools';

interface Phone {
    /** 订单ID */
    id: number;
    /**
     * 订单号
     * @description 订单号，用于唯一标识一个订单
     * 规则： 日期+用户ID+订单排序号
     */
    orderNo: string;
    /**
     * 用户ID，采用 uuid 格式
     * @description 用户ID，用于唯一标识一个用户
     */
    userId: string;
    /**
     * 商品ID，采用 uuid 格式
     * @description 商品ID，用于唯一标识一个商品
     */
    productId: string;
    /** 商品名称 */
    productName: string;
    /** 商品图片 */
    productImage: string;
    /** 商品描述 */
    productDesc: string;
    /** 品牌 */
    brand: string;
    /** 价格 */
    price: number;
    /** 型号 */
    model: string;
    /** 颜色 */
    color: string;
    /** 数量 */
    quantity: number;
    /** 规格 */
    spec: string;
    /** 状态 */
    status: 'pending' | 'shipped' | 'delivered' | 'canceled';
    /** 总金额 */
    total: number;
    /** 下单时间 */
    orderTime: string;
    /** 创建时间 */
    createdAt: string;
    [key: string]: any;
}

const columns = ref<DataTableColumn<Phone>[]>([
    { type: 'selection', fixed: 'left' },
    { type: 'index', fixed: 'left' },
    { title: '订单号', dataIndex: 'orderNo', width: 280 },
    { title: '用户ID', dataIndex: 'userId', width: 100 },
    { title: '商品ID', dataIndex: 'productId', width: 100 },
    { title: '商品名称', dataIndex: 'productName', width: 150 },
    { title: '商品图片', dataIndex: 'productImage', width: 100,
        render: (value: string) => <img src={value} alt="商品图片" style="width: 100px; height: 40px;" />,
    },
    { title: '商品描述', dataIndex: 'productDesc', width: 300 },
    { title: '品牌', dataIndex: 'brand', width: 100 },
    { title: '型号', dataIndex: 'model', width: 100 },
    { title: '颜色', dataIndex: 'color', render: (value: string) => <Badge>{value}</Badge> },
    { title: '规格', dataIndex: 'spec', copyable: true, width: 300 },
    { title: '状态', dataIndex: 'status', width: 100 },
    { title: '数量', dataIndex: 'quantity', width: 100, align: 'center' },
    { title: '价格', dataIndex: 'price', width: 100, currency: { symbol: '¥', decimal: 2, thousand: ',' } },
    { title: '总金额', dataIndex: 'total', currency: { symbol: '¥', decimal: 2, thousand: ',' } },
    { title: '下单时间', dataIndex: 'orderTime', width: 200 },
    { title: '创建时间', dataIndex: 'createdAt', width: 200 },
    { title: '操作', dataIndex: 'action',
        fixed: 'right',
        align: 'center',
        render: (_: any, row: Phone, dataIndex?: keyof Phone) => {
            const actions = [
                { label: '添加到购物车', key: 'add', variant: 'outline', icon: <Plus />, onClick: () => {
                    console.log("add to cart: ", row, dataIndex);
                } },
                { label: '编辑', key: 'edit', variant: 'outline', icon: <Edit /> },
                { label: '撤销', key: 'undo', variant: 'outline', disabled: true, icon: <Undo /> },
                { label: '删除', key: 'remove', variant: 'destructive', separator: true, icon: <Minus /> },
            ]
            return <DataTableAction group items={actions} splitNum={2} iconOnly={true} />
        },
    },
])

// function fakeGenerateOrder() {
//     const worker = new SnowflakeIdWorker(1, 1);
//     for (let i = 0; i < 5; i++) {
//         const id = worker.nextId();
//         console.log(`BigInt: ${id}, 字符串: ${id.toString()}`);
//         dataSource.value.push({
//             id: id,
//             orderNo: id.toString(),
//             userId: '1',
//             productId: '1',
//             productName: 'iPhone 17',
//             productImage: 'https://picsum.photos/200/300',
//             productDesc: 'Apple iPhone 17 128GB 5G',
//             brand: 'Apple',
//             price: 5899,
//             model: 'iPhone 17',
//             color: 'Black',
//             quantity: 3,
//             status: 'pending',
//             spec: '16GB 5.4" 6K 120Hz 5G 128GB',
//             total: 17697,
//             status: 'pending',
//             orderTime: '2026-03-30 15:52:32',
//             createdAt: '2026-03-30 15:52:32',
//         })

//     }

// }



const dataSource = ref<Phone[]>([
    {
        id: 1,
        orderNo: '2026033001234567890123456789012',
        userId: '1',
        productId: '1',
        productName: 'iPhone 17',
        productImage: 'https://picsum.photos/200/300',
        productDesc: 'Apple iPhone 17 128GB 5G',
        brand: 'Apple',
        price: 5899,
        model: 'iPhone 17',
        color: 'Black',
        quantity: 3,
        status: 'pending',
        spec: '16GB 5.4" 6K 120Hz 5G 128GB',
        total: 17697,
        orderTime: '2026-03-30 15:52:32',
        createdAt: '2026-03-30 15:52:32',
    },
    {
        id: 2,
        orderNo: '2345678902345678902345678902345678902',
        userId: '2',
        productId: '2',
        productName: 'iPhone 17 Pro Max',
        productImage: 'https://picsum.photos/200/300',
        productDesc: 'Apple iPhone 17 Pro Max 512GB 5G',
        brand: 'Apple',
        price: 10899,
        model: 'iPhone 17 Pro Max',
        color: 'White',
        quantity: 10,
        status: 'shipped',
        spec: '16GB 5.8" 6K 120Hz 5G 512GB',
        total: 108990,
        orderTime: '2026-03-30 15:52:32',
        createdAt: '2026-03-30 15:52:32',
    },
    {
        id: 3,
        orderNo: '345678903456789034567890345678903',
        userId: '3',
        productId: '3',
        productName: 'iPhone 17 Pro Max',
        productImage: 'https://picsum.photos/200/300',
        productDesc: 'Apple iPhone 17 Pro Max 512GB 5G',
        brand: 'Apple',
        price: 12899,
        model: 'iPhone 17 Pro Max',
        color: 'White',
        quantity: 10,
        status: 'delivered',
        spec: '16GB 5.8" 6K 120Hz 5G 512GB',
        total: 128990,
        orderTime: '2026-03-30 15:52:32',
        createdAt: '2026-03-30 15:52:32',
    },
])

const pagination = ref({
    current: 1,
    pageSize: 10,
    total: 960,
})

const handleChangePage = (page: number) => {
    console.log("page: ", page);
    
    pagination.value.current = page;
}

const handleChangePageSize = (pageSize: number) => {
    console.log("pageSize: ", pageSize);
    pagination.value.pageSize = pageSize;
}



</script>

<template>
    <ProCard class="mx-4" title="Phone List">
        <DataTable bordered :columns="columns" :data="dataSource" :pagination="pagination"
            @update:page="handleChangePage"
            @update:pageSize="handleChangePageSize"
        />
    </ProCard>
</template>
