<template>
  <v-container
    fluid
    class="fill-height d-flex align-center justify-center"
  >
    <p>
      {{ rocketStore.statusGetDetailRocket }}
    </p>
  </v-container>
</template>

<script lang="ts" setup>
import { useRocketStore } from "@/stores/rocket_store";
import { onMounted } from "vue";
import { useRoute } from "vue-router";

const rocketStore = useRocketStore();
const route = useRoute();

onMounted(async () => {
  const id = route.params.id as string;
  if (id) {
    await rocketStore.getDetailRocket(id);
  }
});
</script>
