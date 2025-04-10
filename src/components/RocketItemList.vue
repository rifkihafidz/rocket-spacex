<template>
  <div
    class="d-flex flex-column"
    style="max-height: 70vh; overflow-y: auto"
  >
    <v-btn
      v-for="item in rockets"
      :key="item.id"
      variant="text"
      class="text-capitalize"
      :to="`/detail/${item.id}`"
    >
      {{ item.name }}
    </v-btn>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  rockets: Array<{ id: string; name: string }>;
}>();
</script>
