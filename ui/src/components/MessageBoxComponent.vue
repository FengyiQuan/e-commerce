<template>
  <div v-if="props.messages">
    <div
      class="alert alert-warning alert-dismissible fade show"
      v-for="message in props.messages"
      role="alert"
    >
      {{ message }}
      <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    </div>
  </div>
</template>
<script setup lang="ts">
import { watch } from 'vue';

interface Props {
  messages: string[];
  // type: string;
}
const props = withDefaults(defineProps<Props>(), {
  messages: () => [],
  // type: '',
});
// watch(props, () => console.log(props));
</script>
