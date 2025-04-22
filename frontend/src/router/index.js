import { createRouter, createWebHistory } from 'vue-router';
import Home from '@/views/Home.vue';

// parametrage des routes
const routes = [
    { path: '/', name: 'Home', component: Home, meta: { title: 'Accueil - MatchRoom', showHeaderFooter: true } },
    { path: '/:pathMatch(.*)*', name: 'NotFound', component: () => import('@/views/Notfound.vue'), meta: { title: '404 - Page non trouvée', showHeaderFooter: false } },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;