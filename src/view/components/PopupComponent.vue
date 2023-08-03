<script setup lang="ts">
import Dialog from 'primevue/dialog';

defineProps<{
  header: string | undefined,
  position?: "center" | "top" | "bottom" | "left" | "right" | "topleft" | "topright" | "bottomleft" | "bottomright",
  draggable?: boolean
}>()
</script>

<template>
  <div class="popup">
    <Dialog
      class=""
      :header="header"
      :visible="true"
      :modal="true"
      :closable="false"
      :draggable="draggable ?? false"
      :position="position"
      append-to=".popup"
    >
      <slot name="content" />
      <template #footer>
        <slot name="footer" />
      </template>
    </Dialog>
  </div>
</template>

<style lang="scss" scoped>
  .popup {
    :deep(.p-dialog-mask) {
      margin-left: $size-nav-bar;

      .p-dialog {
        margin: $size-margin ($size-nav-bar + $size-margin) $size-margin $size-margin;
      }

      .p-dialog-header, .p-dialog-content, .p-dialog-footer {
        @extend .flex-row, .flex-center-content;
        .button { margin: 0; }
      }
    }
  }

  .popup-no-footer {
    :deep(.p-dialog-mask) {
      .p-dialog-content { border-radius: 0 0 6px 6px !important; }
      .p-dialog-footer { display: none !important; }
    }
  }
</style>
