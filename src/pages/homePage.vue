<template>
  <v-app>
    <v-main class="d-flex flex-column fill-height">
      <v-container
        fluid
        class="fill-height d-flex align-center justify-center"
      >
        Home Page {{ globalStore.display().xs }}
      </v-container>
    </v-main>
  </v-app>
</template>

<script lang="ts" setup>
import { useGlobalStore } from "@/stores/global_store";
import { onMounted } from "vue";

const globalStore = useGlobalStore();

onMounted(async () => {});
</script>
