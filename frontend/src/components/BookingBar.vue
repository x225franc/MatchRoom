<template>
    <div class="bg-neutral-800 text-white py-4 px-6 md:px-12 shadow-md w-4/5 mx-auto rounded-xl">
      <form @submit.prevent="goToSwipe" class="flex flex-col md:flex-row gap-4 md:items-center justify-between w-full max-w-7xl mx-auto">
        <BookingInput label="City" type="text" v-model="form.city" />
        <BookingInput label="Check In" type="date" v-model="form.checkIn" />
        <BookingInput label="Check Out" type="date" v-model="form.checkOut" />
        <BookingSelect label="Adults" :options="adultsOptions" v-model="form.adults" />
        <BookingSelect label="Children" :options="childrenOptions" v-model="form.children" />
        <button type="submit" class="bg-gradient-to-b from-[#BAA089] to-[#E8CEB7] hover:bg-yellow-500 transition text-black font-semibold px-6 py-2 rounded -mr-3">
          MATCH
        </button>
      </form>
    </div>
  </template>
  
  <script>
  import BookingInput from './BookingInput.vue';
  import BookingSelect from './BookingSelect.vue';
  
  export default {
    name: 'BookingBar',
    components: {
      BookingInput,
      BookingSelect
    },
    data() {
      return {
        form: {
          city: '',
          checkIn: '',
          checkOut: '',
          rooms: '1',
          adults: '2',
          children: '0'
        },
        roomsOptions: ['1', '2', '3', '4', '5+'],
        adultsOptions: ['1', '2', '3', '4', '5+'],
        childrenOptions: ['0', '1', '2', '3', '4+']
      };
    },
    methods: {
      goToSwipe() {
        this.$router.push({
          name: 'Swipe',
          params: { city: this.form.city },
          query: {
            from: this.form.checkIn,
            to: this.form.checkOut,
            adults: this.form.adults,
            children: this.form.children
          }
        });
      }
    }
  };
  </script>
  