<script>
    import Header from "./components/Header.vue";
    import Footer from "./components/Footer.vue";
    import { useRoute } from "vue-router";

    export default {
        components: {
            Header,
            Footer,
        },
        setup() {
            const route = useRoute(); // Accède à la route active
            return { route };
        },
    };
</script>

<template>
    <div>
        <!-- Affiche le Header uniquement si showHeaderFooter est true -->
        <Header v-if="route.meta.showHeaderFooter" />
        <router-view />
        <!-- Affiche le Footer uniquement si showHeaderFooter est true -->
        <Footer v-if="route.meta.showHeaderFooter" />
    </div>
</template>

<style scoped></style>
