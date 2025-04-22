import { createApp } from "vue";
import App from "./App.vue";
import router from './router';

// Import Tailwind CSS
import './assets/tailwind.css';

const app = createApp(App);

// Met à jour dynamiquement le titre de la page
router.beforeEach((to, from, next) => {
    document.title = to.meta.title || 'matchroom'; // Définit un titre par défaut si aucune meta n'est définie
    next();
});

app.use(router);
app.mount("#app");