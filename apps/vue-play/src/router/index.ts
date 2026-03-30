import type { App } from "vue";
import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
        path: '/',
        redirect: '/playground'
    },
    {
        path: '/playground',
        component: () => import('@/views/playground/data-table.vue')
    },
  ],
})

export function setupRouter(app: App) {
    app.use(router)
}
