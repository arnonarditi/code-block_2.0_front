import { createRouter, createWebHashHistory } from 'vue-router'
import lobbyPage from './views/lobby-page.vue'
import codeBlock from './views/code-block.vue'
const routes = [
    {
        path: '/',
        name: 'lobby-page',
        component: lobbyPage,
    },
    {
        path: '/code/:id',
        name: 'code-block',
        component: codeBlock,
    },


]

export const router = createRouter({
    routes,
    history: createWebHashHistory()
})