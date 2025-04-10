<template>
  <v-row
    class="py-2"
    style="max-height: 75vh; overflow-y: auto"
  >
    <v-col
      v-for="item in rockets"
      :key="item.id"
      cols="12"
      sm="6"
      md="4"
    >
      <v-card
        :to="`/detail/${item.id}`"
      >
        <v-img
          :src="item.image"
          height="200px"
          cover
        />

        <v-card-title class="text-capitalize">
          {{ item.name }}
        </v-card-title>

        <v-card-text class="text-justify">
          {{ item.description }}
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>

<script setup lang="ts">
defineProps<{
  rockets: Array<{
    id: string;
    name: string;
    image: string;
    description: string;
  }>;
}>();
</script>
