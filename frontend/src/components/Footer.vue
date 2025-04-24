<template>
  <footer class="bg-[#BAA089] dark:bg-[#1C1C1C] text-white transition-colors duration-300">
    <!-- Upper section with main content -->
    <div class="container mx-auto px-6 pt-12 pb-8">
      <div class="flex flex-wrap md:gap-0 gap-12">
        <!-- Brand section -->
        <div class="w-full md:w-1/3 lg:w-1/4">
          <h2 class="text-2xl font-bold mb-6">Matchroom</h2>
          <p class="text-white/80 pr-4 max-w-xs">
            Trouvez votre colocation idéale en quelques clics.
          </p>
        </div>

        <!-- Navigation section -->
        <div class="w-full md:w-1/3 lg:w-1/4">
          <h3 class="text-lg font-semibold mb-4">Liens rapides</h3>
          <ul class="space-y-3">
            <li><a href="#" class="text-white/80 hover:text-white transition-colors">Accueil</a></li>
            <li><a href="#" class="text-white/80 hover:text-white transition-colors">À propos</a></li>
            <li><a href="#" class="text-white/80 hover:text-white transition-colors">FAQ</a></li>
            <li><a href="#" class="text-white/80 hover:text-white transition-colors">Contact</a></li>
          </ul>
        </div>

        <!-- Contact section -->
        <div class="w-full md:w-1/3 lg:w-1/4">
          <h3 class="text-lg font-semibold mb-4">Contact</h3>
          <div class="flex items-center mb-3">
            <a href="mailto:contact@matchroom.io" class="text-white/80 hover:text-white transition-colors">
              contact@matchroom.io
            </a>
          </div>
          
          <!-- Social Media -->
          <h3 class="text-lg font-semibold mb-3 mt-6">Suivez-nous</h3>
          <div class="flex space-x-5">
            <a href="#" aria-label="Instagram" class="text-white/80 hover:text-white transition-colors">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <!-- Existing SVG path for Instagram -->
              </svg>
            </a>
            <a href="#" aria-label="Facebook" class="text-white/80 hover:text-white transition-colors">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <!-- Existing SVG path for Facebook -->
              </svg>
            </a>
            <a href="#" aria-label="LinkedIn" class="text-white/80 hover:text-white transition-colors">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <!-- Existing SVG path for LinkedIn -->
              </svg>
            </a>
          </div>
        </div>

        <!-- Newsletter section -->
        <div class="w-full md:w-2/3 lg:w-1/4 md:mt-8 lg:mt-0">
          <h3 class="text-lg font-semibold mb-4">Newsletter</h3>
          <p class="text-white/80 mb-4">Recevez nos dernières actualités et offres</p>
          <div class="relative">
            <input
              type="email"
              placeholder="Votre email"
              class="w-full bg-white/10 border border-white/20 rounded-lg py-3 px-4 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/30"
            />
            <button
              class="mt-3 bg-white text-[#BAA089] dark:bg-white dark:text-[#1C1C1C] px-5 py-2.5 rounded-lg font-medium hover:bg-white/90 transition-colors w-full"
            >
              S'abonner
            </button>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Bottom section with copyright -->
    <div class="border-t border-white/20">
      <div class="container mx-auto px-6 py-6">
        <div class="flex flex-col md:flex-row justify-between items-center">
          <p class="text-white/60 mb-4 md:mb-0">©2025 - Matchroom SAS. Tous droits réservés.</p>
          <div class="flex space-x-6">
            <a href="#" class="text-white/60 hover:text-white transition-colors text-sm">
              Conditions d'utilisation
            </a>
            <a href="#" class="text-white/60 hover:text-white transition-colors text-sm">
              Politique de confidentialité
            </a>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup></script>
