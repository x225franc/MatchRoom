<template>
    <div class="flex flex-col text-sm w-full">
      <label class="mb-1 text-gray-300">{{ label }}</label>
      <input
        :type="type"
        :value="modelValue"
        @input="$emit('update:modelValue', $event.target.value)"
        class="bg-neutral-800 text-white px-3 py-2 rounded border border-neutral-700 focus:outline-none"
      />
    </div>
  </template>
  
  <script>
  export default {
    name: 'BookingInput',
    props: ['label', 'type', 'modelValue'],
    emits: ['update:modelValue']
  };
  </script>
  