<template>
  <v-snackbar
    v-model="model"
    :color="color"
    multi-line
    :timeout="1250"
    @close="onClose"
  >
    {{ message }}
    <template #actions>
      <v-btn
        color="white"
        icon="mdi-close"
        variant="text"
        @click="onClose"
      >
        <v-icon>mdi-close</v-icon>
      </v-btn>
    </template>
  </v-snackbar>
</template>

<script setup lang="ts">
import { defineProps, defineEmits, computed } from "vue";


const props = defineProps<{
  color: string;
  message: string;
  modelValue: boolean;
}>();

const emit = defineEmits<{
  (e: "update:modelValue", value: boolean): void;
}>();

const model = computed({
  get: () => props.modelValue,
  set: (value: boolean) => emit("update:modelValue", value),
});

const onClose = () => {
  model.value = false;
};
</script>
