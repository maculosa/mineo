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
        path: '/playground',
        component: DefaultLayout,
        redirect: '/playground/data-table',
        children: [
            {
                path: 'data-table',
                component: () => import('@/views/playground/data-table.vue')
            }
        ]
    },
  ],
})

export function setupRouter(app: App) {
    app.use(router)
}
