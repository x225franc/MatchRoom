<template>
<div class="relative text-white font-serif dark:bg-black">
  <div
    class="relative bg-cover bg-center bg-no-repeat min-h-[80vh] flex items-center justify-center px-4 dark:bg-black dark:bg-opacity-80"
    style="background-image: url('/rome.webp')"
  >
    <div class="bg-black bg-opacity-60 w-full h-full absolute top-0 left-0 z-0 dark:bg-black dark:bg-opacity-80"></div>
    <div class="z-10 text-center">
      <p class="text-[#E8CEB7] text-sm tracking-widest mb-2 dark:text-[#CBBBA0]">
        La Nouvelle Façon de Réserver Votre Hôtel Idéal
      </p>
      <h1 class="text-4xl md:text-4xl font-bold leading-tight mb-4 dark:text-white">
        MatchRoom - Réservez Votre Hôtel Idéal
      </h1>
      <button
        class="bg-gradient-to-b from-[#BAA089] to-[#E8CEB7] text-black px-6 py-2 rounded-full font-semibold hover:bg-yellow-400 transition dark:from-[#8B7B66] dark:to-[#CBBBA0] dark:text-black"
        @click="goToChoice"
      >
        DÉCOUVRIR PLUS →
      </button>
    </div>
  </div>
</div>
  <div class="landing-page">
    <section class="py-16 bg-white dark:bg-black">
      <div class="container mx-auto px-4">
        <h2 class="text-3xl md:text-4xl font-bold text-center mb-12 dark:text-white">
          Notre Solution : L'Intelligence du Matching
        </h2>

        <div
          class="flex flex-col md:flex-row items-center md:items-stretch md:space-x-12"
        >
          <!-- Vidéo -->
          <div class="w-full md:w-1/2 flex justify-center">
            <div
              class="h-48 sm:h-64 md:h-64 lg:h-80 rounded-lg overflow-hidden"
            >
              <video class="h-full object-cover" autoplay muted loop>
                <source src="/algo.mp4" type="video/mp4" />
                Votre navigateur ne supporte pas la vidéo HTML5.
              </video>
            </div>
          </div>

          <!-- Texte -->
          <div class="w-full md:w-1/2 flex flex-col justify-center md:pl-0">
            <ul class="space-y-4">
              <li class="flex items-start">
                <div class="bg-primary-light rounded-full p-2 mr-4">
                  <svg
                    class="h-6 w-6 text-primary"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                    />
                  </svg>
                </div>
                <div>
                  <h3 class="font-semibold text-lg dark:text-white">
  Algorithme de matching unique
</h3>
<p class="text-tertiary dark:text-gray-400">
  Qui associe clients et hôtels selon des critères précis
</p>
                </div>
              </li>

              <li class="flex items-start">
                <div class="bg-primary-light rounded-full p-2 mr-4">
                  <svg
                    class="h-6 w-6 text-primary"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
                    />
                  </svg>
                </div>
                <div>
                  <h3 class="font-semibold text-lg dark:text-white">
                    Valorisation de l'unicité
                  </h3>
                  <p class="text-tertiary dark:text-gray-400">
                    Une plateforme qui met en avant les spécificités de chaque
                    établissement
                  </p>
                </div>
              </li>

              <li class="flex items-start">
                <div class="bg-primary-light rounded-full p-2 mr-4">
                  <svg
                    class="h-6 w-6 text-primary"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                </div>
                <div>
                  <h3 class="font-semibold text-lg dark:text-white">
                    Expérience personnalisée
                  </h3>
                  <p class="text-tertiary dark:text-gray-400">
                    Adaptée aux besoins spécifiques de chaque voyageur
                  </p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>

    <section class="py-16 bg-white dark:bg-black">
      <div class="container mx-auto px-4">
        <h2 class="text-3xl md:text-4xl font-bold text-center mb-12 dark:text-white">
    Les Avantages de MatchRoom
  </h2>

        <div class="grid md:grid-cols-2 gap-8">
          <div class="bg-primary-light dark:bg-gray-800 p-8 rounded-lg">
  <h3 class="text-2xl font-semibold mb-6 text-primary dark:text-[#E8CEB7]">
    Pour les Voyageurs
  </h3>
            <ul class="space-y-4">
              <li class="flex items-start">
                <svg
                  class="h-6 w-6 text-primary mr-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <div class="dark:text-neutral-200">
                  <span class="font-medium dark:text-white">
                    Gain de temps considérable</span> -
                  Fini les heures de recherche, notre IA fait le travail pour
                  vous
                </div>
              </li>
              <li class="flex items-start">
                <svg
                  class="h-6 w-6 text-primary mr-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <div class="dark:text-neutral-200">
                  <span class="font-medium dark:text-white">
                    >Recommandations personnalisées</span
                  >
                  - Des suggestions qui correspondent réellement à vos attentes
                </div>
              </li>
              <li class="flex items-start">
                <svg
                  class="h-6 w-6 text-primary mr-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <div class="dark:text-neutral-200">
                  <span class="font-medium dark:text-white">
                    Découvertes uniques</span> - Accédez
                  à des établissements qui vous auraient échappé sur les
                  plateformes traditionnelles
                </div>
              </li>
              <li class="flex items-start">
                <svg
                  class="h-6 w-6 text-primary mr-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <div class="dark:text-neutral-200">
                  <span class="font-medium dark:text-white">
                    Satisfaction garantie</span> - Une
                  correspondance optimale entre vos besoins et l'offre hôtelière
                </div>
              </li>
            </ul>
          </div>

          <div class="bg-secondary-light dark:bg-gray-800 p-8 rounded-lg">
  <h3 class="text-2xl font-semibold mb-6 text-secondary dark:text-[#CBBBA0]">
    Pour les Hôteliers
  </h3>
            <ul class="space-y-4">
              <li class="flex items-start">
                <svg
                  class="h-6 w-6 text-secondary mr-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <div class="dark:text-neutral-200">
                  <span class="font-medium dark:text-white">
                    Marketing ciblé et efficace</span> -
                  Touchez directement les clients qui valorisent votre offre
                </div>
              </li>
              <li class="flex items-start">
                <svg
                  class="h-6 w-6 text-secondary mr-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <div class="dark:text-neutral-200">
                  <span class="font-medium dark:text-white">
                    Différenciation stratégique</span> -
                  Mettez en avant vos points forts uniques
                </div>
              </li>
              <li class="flex items-start">
                <svg
                  class="h-6 w-6 text-secondary mr-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <div class="dark:text-neutral-200">
                  <span class="font-medium dark:text-white">
                    Clientèle plus satisfaite</span> -
                  Accueillez des voyageurs dont les attentes correspondent à
                  votre réalité
                </div>
              </li>
              <li class="flex items-start">
                <svg
                  class="h-6 w-6 text-secondary mr-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <div class="dark:text-neutral-200">
                  <span class="font-medium dark:text-white">
                    Meilleur taux d'occupation</span> -
                  Optimisez votre remplissage avec des clients adaptés
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>

    <section class="py-16 bg-tertiary-2 dark:bg-black">
      <div class="container mx-auto px-4">
        <h2 class="text-3xl md:text-4xl font-bold text-center mb-12">
          Ils Ont Trouvé Leur Match Parfait
        </h2>

        <div class="grid md:grid-cols-2 gap-8">
          <div class="bg-white dark:bg-gray-900 p-8 rounded-lg shadow-md">
            <div class="flex items-center mb-4">
              <div
                class="h-12 w-12 rounded-full bg-tertiary mr-4 flex items-center justify-center"
              >
                <span class="text-tertiary-2 font-bold text-lg">SM</span>
              </div>

              <div>
                <h4 class="font-semibold dark:text-white">Sophie M.</h4>
<p class="text-tertiary text-sm dark:text-gray-400">Consultante</p>

              </div>
            </div>
            <p class="text-tertiary italic dark:text-gray-400">
              "Grâce à Matcher, j'ai découvert un hôtel-boutique qui
              correspondait exactement à mes attentes pour mon voyage d'affaires
              à Lyon. Une expérience sur mesure que je n'aurais jamais trouvée
              sur les plateformes traditionnelles."
            </p>
          </div>

          <div class="bg-white dark:bg-gray-900 p-8 rounded-lg shadow-md">
            <div class="flex items-center mb-4">
              <div
                class="h-12 w-12 rounded-full bg-tertiary mr-4 flex items-center justify-center"
              >
                <span class="text-tertiary-2 font-bold text-lg">JD</span>
              </div>

              <div>
                <h4 class="font-semibold dark:text-white">Jean D.</h4>
                <p class="text-tertiary text-sm dark:text-gray-400">
                  Propriétaire de l'Hôtel Le Charme
                </p>
              </div>
            </div>
            <p class="text-tertiary italic dark:text-gray-400">
              "En tant que petit hôtel indépendant, nous avions du mal à nous
              démarquer. Matcher nous a permis d'attirer une clientèle qui
              apprécie réellement notre philosophie et nos services. Notre taux
              de satisfaction client a explosé!"
            </p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { useRouter } from "vue-router";
const router = useRouter();

function goToChoice() {
  router.push("/choice");
}

export default {
  name: "HomePage",
  created() {},
  methods: {
    goToChoice() {
      this.$router.push("/choice");
    },
  },
};
</script>

<style scoped>
.landing-page {
  overflow-x: hidden;
}
</style>
