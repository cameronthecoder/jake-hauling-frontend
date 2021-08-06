<template>
  <h1 class="text-2xl font-body mb-4">Buttons</h1>
  <div class="flex gap-4">
    <ui-button @click="test()"  color="primary" size="big">Big Button</ui-button>
    <ui-button color="secondary" size="big">Big Secondary Button</ui-button>
    <ui-button color="primary" size="small">Small Button</ui-button>
    <ui-button color="primary" size="tiny">Tiny Button</ui-button>
  </div>
</template>

<script>
import uiButton from "../../components/ui/uiButton.vue"

export default {
  components: { uiButton },
  setup() {
      const test = () => {
          console.log('big button clicked');
      }

      return {
          test
      }
  }
}
</script>

<style>

</style>