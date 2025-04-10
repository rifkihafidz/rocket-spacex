<template>
  <v-container
    fluid
    class="d-flex align-center justify-center flex-column py-10"
  >
    <h1 class="mb-3 text-h4 font-weight-bold">
      🚀 Rocket List
    </h1>

    <v-progress-circular
      v-if="isGetListLoading"
      class="mt-6"
      color="primary"
      size="48"
      indeterminate
    />

    <div
      v-else-if="isGetListSuccess"
      class="d-flex flex-column align-center w-100"
    >
      <v-btn
        variant="outlined"
        class="text-capitalize"
        :loading="isCreateLoading"
        @click="rocketStore.createRocket"
      >
        Create Rocket
      </v-btn>

      <RocketSearchBar
        :key="rocketStore.key"
        v-model="rocketStore.keywordSearch"
        :disabled="
          rocketStore.filteredDataRocket.length < 1 &&
            rocketStore.keywordSearch === ''
        "
        @input="rocketStore.filterRocketByName()"
      />

      <RocketItemList
        v-if="rocketStore.filteredDataRocket.length > 0"
        :rockets="rocketStore.filteredDataRocket.map((rocket) => ({
          id: rocket.id,
          name: rocket.name,
          image: rocket.flickr_images[0],
          description: rocket.description,
        }))"
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

  <CustomSnackbar
    v-model="rocketStore.snackbarShown"
    :message="rocketStore.snackbarMessage"
    :color="rocketStore.snackbarColor"
  />
</template>

<script setup lang="ts">
import { onMounted, computed } from "vue";
import { useRocketStore } from "@/stores/rocket_store";
import { RequestStatus } from "@/utils/const";

import CustomSnackbar from "@/components/CustomSnackbar.vue";
import RocketEmptyState from "@/components/RocketEmptyState.vue";
import RocketErrorState from "@/components/RocketErrorState.vue";
import RocketItemList from "@/components/RocketItemList.vue";
import RocketSearchBar from "@/components/RocketSearchBar.vue";

const rocketStore = useRocketStore();

const isCreateLoading = computed(() =>
  [RequestStatus.Loading].includes(
    rocketStore.statusCreateRocket
  )
);

const isGetListLoading = computed(() =>
  [RequestStatus.Initial, RequestStatus.Loading].includes(
    rocketStore.statusGetListDataRocket
  )
);

const isGetListSuccess = computed(
  () => rocketStore.statusGetListDataRocket === RequestStatus.Success
);

onMounted(() => {
  rocketStore.getDataRocket();
});
</script>
