import { createRouter, createWebHistory } from 'vue-router';
import Home from '@/views/Home.vue';
import Choice from '@/views/Choice.vue';
import Swipe from '@/views/Swipe.vue';
import Params from '@/views/Params.vue';
import Reservations from '@/views/Reservations.vue';
import Profile from '@/views/Profile.vue';
import Signin from '@/views/User/Signin.vue';
import Signup from '@/views/User/Signup.vue';
import Dashboard from '@/views/Dashboard.vue';

// parametrage des routes
const routes = [
    { path: '/', name: 'Home', component: Home, meta: { title: 'Accueil - MatchRoom', showHeaderFooter: true } },
    { path : '/signin', name: 'Signin', component: Signin, meta: { title: 'Connexion - MatchRoom', showHeaderFooter: false } },
    { path : '/signup', name: 'Signup', component: Signup, meta: { title: 'Inscription - MatchRoom', showHeaderFooter: false } },
    { path : '/swipe/:city', name: 'Swipe', component: Swipe, props: true, meta: { title: 'MatchRoom - :city', showHeaderFooter: true } },
    { path : '/params/:city', name: 'Params', component: Params, props: true, meta: { title: 'MatchRoom - Parameters', showHeaderFooter: true } },
    { path : '/reservations', name: 'Reservations', component: Reservations, meta: { title: 'MatchRoom - Reservations', showHeaderFooter: true } },
    { path : '/profile', name: 'Profile', component: Profile, meta: { title: 'MatchRoom - Profile', showHeaderFooter: true } },

    { path: '/dashboard', name: 'Dashboard', component: Dashboard, meta: { title: 'Dashboard', showHeaderFooter: false } },
    { path: '/:pathMatch(.*)*', name: 'NotFound', component: () => import('@/views/Notfound.vue'), meta: { title: '404 - Page non trouvée', showHeaderFooter: false } },
    { path: '/choice', name: 'Choice', component: Choice, meta: { title: 'Choice', showHeaderFooter: true } }
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

router.afterEach((to) => {
    const rawTitle = to.meta.title
    if (rawTitle) {
      const city = to.params.city ?? ''
      document.title = rawTitle.replace(':city', city)
    } else {
      document.title = 'MatchRoom'
    }
  })

export default router;