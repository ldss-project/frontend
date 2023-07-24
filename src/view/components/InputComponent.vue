<script setup lang="ts">
import {capitalize} from "@/logic/string-extension";

const props = defineProps<{
  name: string,
  type: string,
  placeholder?: string,
  hiddenLabel?: boolean,
  invalid?: boolean,
  modelValue: any
}>()
defineEmits(['update:modelValue'])

const capitalizedName: string = capitalize(props.name)
</script>

<template>
  <div class="input">
    <label
      class="form-label"
      :class="{ 'visually-hidden': hiddenLabel === true }"
      :for="name"
      :aria-label="capitalizedName"
    >{{ capitalizedName }}</label>
    <input
      class="form-control"
      :class="{ 'is-invalid': invalid === true }"
      :type="type"
      :id="name"
      :placeholder="placeholder ?? capitalizedName"
      v-bind="$attrs"
      @input="$emit('update:modelValue', $event.target.value)"
    />
  </div>
</template>

<style lang="scss" scoped>
  .input {
    margin-bottom: $size-margin * 2;
    label, input { height: fit-content }
  }
</style>