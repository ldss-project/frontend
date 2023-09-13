<!--
  MIT License

  Copyright (c) 2023 Jahrim Gabriele Cesario

  Permission is hereby granted, free of charge, to any person obtaining a copy
  of this software and associated documentation files (the "Software"), to deal
  in the Software without restriction, including without limitation the rights
  to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
  copies of the Software, and to permit persons to whom the Software is
  furnished to do so, subject to the following conditions:

  The above copyright notice and this permission notice shall be included in all
  copies or substantial portions of the Software.

  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
  IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
  FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
  AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
  LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
  OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
  SOFTWARE.
-->

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
