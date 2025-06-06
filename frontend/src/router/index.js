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
import PaymentSuccess from '@/views/PaymentSuccess.vue';
import PaymentCancel from '@/views/PaymentCancel.vue';
import Notfound from '@/views/Notfound.vue';
import Reservations2 from '@/views/Reservations2.vue';

// parametrage des routes
const routes = [
    { path: '/', name: 'Home', component: Home, meta: { title: 'Accueil - MatchRoom', showHeaderFooter: true } },
    { path : '/signin', name: 'Signin', component: Signin, meta: { title: 'Connexion - MatchRoom', showHeaderFooter: false } },
    { path : '/signup', name: 'Signup', component: Signup, meta: { title: 'Inscription - MatchRoom', showHeaderFooter: false } },
    { path : '/swipe/:city', name: 'Swipe', component: Swipe, props: true, meta: { title: 'MatchRoom - :city', showHeaderFooter: true } },
    { path : '/params/:city', name: 'Params', component: Params, props: true, meta: { title: 'MatchRoom - Parameters', showHeaderFooter: true } },
    { path : '/reservations', name: 'Reservations', component: Reservations, meta: { title: 'MatchRoom - Reservations', showHeaderFooter: true } },
    { path : '/reservations2', name: 'Reservations2', component: Reservations2, meta: { title: 'MatchRoom - Reservations', showHeaderFooter: true } },

    { path: '/payment-success', name: 'PaymentSuccess', component: PaymentSuccess, meta: { title: 'Payment Successful - MatchRoom', showHeaderFooter: true } },
    { path: '/payment-cancel', name: 'PaymentCancel', component: PaymentCancel, meta: { title: 'Payment Cancelled - MatchRoom', showHeaderFooter: true } },
    { path : '/profile', name: 'Profile', component: Profile, meta: { title: 'MatchRoom - Profile', showHeaderFooter: true } },

    { path: '/dashboard', name: 'Dashboard', component: Dashboard, meta: { title: 'Dashboard', showHeaderFooter: false } },
    { path: '/:pathMatch(.*)*', name: 'NotFound', component: Notfound, meta: { title: '404 - Page non trouvée', showHeaderFooter: false } },
    { path: '/choice', name: 'Choice', component: Choice, meta: { title: 'Choice', showHeaderFooter: true } }
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('authToken');
  const isAuthenticated = !!token;

  const protectedRoutes = ['Choice', 'Swipe', 'Params', 'Reservations', 'Reservations2', 'Profile', 'Dashboard'];

  if (protectedRoutes.includes(to.name) && !isAuthenticated) {
    next({ name: 'Signin' }); 
  } else {
    next();
  }
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