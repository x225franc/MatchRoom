<template>
    <div class="flex flex-col text-sm w-full">
      <label class="mb-1 text-gray-300">{{ label }}</label>
      <select
        :value="modelValue"
        @change="$emit('update:modelValue', $event.target.value)"
        class="bg-neutral-800 text-white px-3 py-2 rounded border border-neutral-700 focus:outline-none"
      >
        <option v-for="opt in options" :key="opt" :value="opt">{{ opt }}</option>
      </select>
    </div>
  </template>
  
  <script>
  export default {
    name: 'BookingSelect',
    props: ['label', 'options', 'modelValue'],
    emits: ['update:modelValue']
  };
  </script>
  