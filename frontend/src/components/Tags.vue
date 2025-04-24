<template>
  <div class="tags">
    <span v-for="(tag, index) in hotelTags" :key="index" class="tag">
      {{ tag }}
    </span>
  </div>
</template>

<script>
export default {
  name: "Tags",
  data() {
    return {
      hotelTags: [
        "Wi-Fi gratuit",
        "Petit-déjeuner inclus",
        "Piscine",
        "Spa",
        "Parking gratuit",
        "Animaux acceptés",
        "Vue sur la mer",
        "Climatisation",
        "Service en chambre",
        "Salle de sport",
        "Restaurant",
        "Bar",
        "Accessible aux personnes à mobilité réduite",
        "Navette aéroport",
        "Non-fumeur",
        "Centre d’affaires",
        "Blanchisserie",
        "Réception 24h/24",
        "Proche des transports en commun",
        "Chambres familiales",
      ],
    };
  },
};
</script>

<style scoped>
.tags {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.tag {
  background-color: #f0f0f0;
  padding: 5px 10px;
  border-radius: 5px;
  font-size: 14px;
}
</style>
