<template>
  <v-container
    fluid
    class="d-flex align-center justify-center flex-column py-10"
  >
    <h1 class="mb-3 text-h4 font-weight-bold">
      🚀 Rocket List
    </h1>

    <v-progress-circular
      v-if="isLoading"
      class="mt-6"
      color="primary"
      size="48"
      indeterminate
    />

    <div
      v-else-if="isSuccess"
      class="d-flex flex-column align-center w-100"
    >
      <v-btn
        variant="outlined"
        class="text-capitalize"
      >
        Create Rocket
      </v-btn>

      <RocketSearchBar
        v-model="rocketStore.keywordSearch"
        :disabled="
          rocketStore.filteredDataRocket.length < 1 &&
            rocketStore.keywordSearch === ''
        "
        @input="rocketStore.filterRocketByName()"
      />

      <RocketItemList
        v-if="rocketStore.filteredDataRocket.length > 0"
        :rockets="rocketStore.filteredDataRocket"
      />

      <RocketEmptyState
        v-else
        :keyword="rocketStore.keywordSearch"
      />
    </div>

    <RocketErrorState
      v-else
      message="Failed to get rocket data."
      @retry="rocketStore.getDataRocket"
    />
  </v-container>
</template>

<script setup lang="ts">
import { onMounted, computed } from "vue";
import { useRocketStore } from "@/stores/rocket_store";
import { RequestStatus } from "@/utils/const";

import RocketEmptyState from "@/components/RocketEmptyState.vue";
import RocketErrorState from "@/components/RocketErrorState.vue";
import RocketItemList from "@/components/RocketItemList.vue";
import RocketSearchBar from "@/components/RocketSearchBar.vue";

const rocketStore = useRocketStore();

const isLoading = computed(() =>
  [RequestStatus.Initial, RequestStatus.Loading].includes(
    rocketStore.statusGetListDataRocket
  )
);

const isSuccess = computed(
  () => rocketStore.statusGetListDataRocket === RequestStatus.Success
);

onMounted(() => {
  rocketStore.getDataRocket();
});
</script>
