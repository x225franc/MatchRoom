import { createRouter, createWebHistory } from 'vue-router';
import Home from '@/views/Home.vue';
import Choice from '@/views/Choice.vue';
import Dashboard from '@/views/Dashboard.vue';

// parametrage des routes
const routes = [
    { path: '/', name: 'Home', component: Home, meta: { title: 'Accueil - MatchRoom', showHeaderFooter: true } },
    { path: '/dashboard', name: 'Dashboard', component: Dashboard, meta: { title: 'Dashboard', showHeaderFooter: false } },
    { path: '/:pathMatch(.*)*', name: 'NotFound', component: () => import('@/views/Notfound.vue'), meta: { title: '404 - Page non trouvée', showHeaderFooter: false } },
    { path: '/choice', name: 'Choice', component: Choice, meta: { title: 'Choice', showHeaderFooter: true } }
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;