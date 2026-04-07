import type { App } from "vue";
import { createRouter, createWebHistory } from "vue-router";
import DefaultLayout from '@/layouts/default.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
        path: '/',
        redirect: '/playground'
    },
    {
        path: '/labs/flex-scroll-area',
        component: () => import('@/views/labs/flex-scroll-area.vue')
        // component: DefaultLayout,
        // redirect: '/labs/flex-scroll-area',
        // children: [
            // {
                // path: 'flex-scroll-area',
            // },
        // ]
    },
    {
        path: '/playground',
        component: DefaultLayout,
        redirect: '/playground/data-table',
        children: [
            {
                path: 'data-table',
                component: () => import('@/views/playground/data-table.vue')
            },
            {
                path: 'data-list',
                component: () => import('@/views/playground/data-list.vue')
            },
        ]
    },
  ],
})

export function setupRouter(app: App) {
    app.use(router)
}
