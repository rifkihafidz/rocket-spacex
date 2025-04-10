<template>
  <p class="text-center text-subtitle-1">
    <template v-if="keyword.length > 0">
      Rocket with name "<strong>{{ keyword }}</strong>" not found!
    </template>
    <template v-else>
      No rocket data available. Please create one first!
    </template>
  </p>
</template>

<script setup lang="ts">
defineProps<{
  keyword: string;
}>();
</script>
