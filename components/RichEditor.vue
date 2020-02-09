<template>
  <div>
    <VueEditor v-model="content" />
  </div>
</template>

<script>
import { VueEditor } from 'vue2-editor'

export default {
  name: 'RichEditor',
  components: {
    VueEditor
  },
  props: {
    value: {
      type: String,
      required: true
    }
  },
  data: () => ({
    content: ''
  }),
  watch: {
    content() {
      this.$emit('input', this.content)
    }
  },
  created() {
    this.content = this.value
  }
}
</script>
