<template>
  <v-container
    fluid
    class="py-10 px-4 d-flex justify-center"
  >
    <div
      class="w-100"
      style="max-width: 960px"
    >
      <v-btn
        prepend-icon="mdi-arrow-left"
        color="primary"
        variant="text"
        class="mb-4"
        @click="$router.push('/')"
      >
        Back
      </v-btn>

      <v-card
        v-if="rocketStore.statusGetDetailRocket === RequestStatus.Success"
        max-width="960"
        class="pa-6"
        elevation="4"
      >
        <v-row class="flex-wrap">
          <v-col
            cols="12"
            md="6"
          >
            <div v-if="rocketStore.detailRocket.flickr_images.length > 1">
              <v-carousel
                hide-delimiter-background
                height="250"
                class="rounded-lg"
              >
                <v-carousel-item
                  v-for="(img, index) in rocketStore.detailRocket.flickr_images"
                  :key="index"
                >
                  <v-img
                    :src="img"
                    height="250"
                    cover
                  />
                </v-carousel-item>
              </v-carousel>
            </div>

            <v-img
              v-else
              :src="rocketStore.detailRocket.flickr_images[0]"
              height="250"
              class="rounded-lg"
              cover
            />
          </v-col>

          <v-col
            cols="12"
            md="6"
          >
            <h2 class="text-h5 text-md-h4 font-weight-bold mb-2">
              {{ rocketStore.detailRocket.name }}
            </h2>
            <p class="text-body-2 text-md-body-1 text-justify mb-4">
              {{ rocketStore.detailRocket.description }}
            </p>
            <v-divider class="my-4" />
            <v-list density="compact">
              <v-list-item>
                <v-list-item-title class="font-weight-medium">
                  Cost Per Launch
                </v-list-item-title>
                <v-list-item-subtitle>
                  ${{
                    rocketStore.detailRocket.cost_per_launch.toLocaleString()
                  }}
                </v-list-item-subtitle>
              </v-list-item>

              <v-list-item>
                <v-list-item-title class="font-weight-medium">
                  Country
                </v-list-item-title>
                <v-list-item-subtitle>
                  {{ rocketStore.detailRocket.country }}
                </v-list-item-subtitle>
              </v-list-item>

              <v-list-item>
                <v-list-item-title class="font-weight-medium">
                  First Flight
                </v-list-item-title>
                <v-list-item-subtitle>
                  {{ reverseDateTime(rocketStore.detailRocket.first_flight) }}
                </v-list-item-subtitle>
              </v-list-item>
            </v-list>
          </v-col>
        </v-row>
      </v-card>

      <div
        v-else-if="rocketStore.statusGetDetailRocket === RequestStatus.Error"
        class="d-flex flex-column align-center justify-center"
        style="height: 400px"
      >
        <p class="text-error mb-5">
          Failed to load rocket details.
        </p>
        <v-btn
          color="white"
          variant="outlined"
          @click="rocketStore.getDetailRocket(id);"
        >
          Try again
        </v-btn>
      </div>

      <div
        v-else
        class="d-flex align-center justify-center"
        style="height: 400px"
      >
        <v-progress-circular
          indeterminate
          color="primary"
          size="48"
        />
      </div>
    </div>
  </v-container>
</template>

<script lang="ts" setup>
import { useRocketStore } from "@/stores/rocket_store";
import { onMounted } from "vue";
import { useRoute } from "vue-router";
import { RequestStatus } from "@/utils/const";
import { reverseDateTime } from "@/utils/static_functions";

const rocketStore = useRocketStore();
const route = useRoute();
const id = route.params.id as string;

onMounted(async () => {
  if (id) {
    await rocketStore.getDetailRocket(id);
  }
});
</script>
