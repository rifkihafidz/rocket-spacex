<template>
  <v-text-field
    v-model="model"
    class="my-6"
    prepend-inner-icon="mdi-magnify"
    density="comfortable"
    :disabled="disabled"
    :maxlength="100"
    :placeholder="disabled ? 'Create Rocket First' : 'Search Rocket Name'"
    single-line
    variant="outlined"
    hide-details
    width="280px"
  />
</template>

<script setup lang="ts">
import { computed } from "vue";

const props = defineProps<{
  modelValue: string;
  disabled: boolean;
}>();

const emit = defineEmits(["update:modelValue", "input"]);

const model = computed({
  get: () => props.modelValue,
  set: (val: string) => {
    emit("update:modelValue", val);
    emit("input");
  },
});
</script>
