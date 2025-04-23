import { createRouter, createWebHistory } from 'vue-router';
import Home from '@/views/Home.vue';
import Signin from '@/views/User/Signin.vue';
import Signout from '@/views/User/Signout.vue';
import Signup from '@/views/User/Signup.vue';

// parametrage des routes
const routes = [
    { path: '/', name: 'Home', component: Home, meta: { title: 'Accueil - MatchRoom', showHeaderFooter: true } },
    { path : '/signin', name: 'Signin', component: Signin, meta: { title: 'Connexion - MatchRoom', showHeaderFooter: false } },
    { path : '/signout', name: 'Signout', component: Signout, meta: { title: 'Déconnexion - MatchRoom', showHeaderFooter: false } },
    { path : '/signup', name: 'Signup', component: Signup, meta: { title: 'Inscription - MatchRoom', showHeaderFooter: false } },


    { path: '/:pathMatch(.*)*', name: 'NotFound', component: () => import('@/views/Notfound.vue'), meta: { title: '404 - Page non trouvée', showHeaderFooter: false } },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;