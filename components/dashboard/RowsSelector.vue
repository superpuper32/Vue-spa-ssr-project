<template>
  <select class="custom-select d-block" :value="value" @input="selected($event.target.value)">
    <option v-for="item in list" :key="item" :value="item">
      {{ item }}
    </option>
  </select>
</template>

<script>
export default {
  name: 'RowsSelector',
  props: {
    value: {
      type: Number,
      required: true
    },
    list: {
      type: Array,
      default: () => [2, 5, 10, 20]
    }
  },
  methods: {
    selected(value) {
      this.$emit('input', value)
    }
  }
}
</script>
