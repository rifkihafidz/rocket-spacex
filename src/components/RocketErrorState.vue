<template>
  <v-sheet class="d-flex flex-column align-center pa-6 rounded-lg elevation-2">
    <p class="mb-4 text-white">
      ⚠️ {{ message || "Failed to get rocket data." }}
    </p>
    <v-btn
      color="white"
      variant="outlined"
      @click="emit('retry')"
    >
      Try again
    </v-btn>
  </v-sheet>
</template>

<script setup lang="ts">
defineProps<{
  message?: string;
}>();
const emit = defineEmits<{
  (e: "retry"): void;
}>();
</script>
