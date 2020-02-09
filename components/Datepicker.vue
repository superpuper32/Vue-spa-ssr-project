<template>
  <div class="datepicker">
    <input
      ref="datepicker"
      type="text"
      class="form-control"
      :value="value"
      :placeholder="placeholder"
    />
  </div>
</template>

<script>
import flatpickr from 'flatpickr'
import { Russian } from 'flatpickr/dist/l10n/ru.js'
import 'flatpickr/dist/flatpickr.css'

export default {
  name: 'Datepicker',
  props: {
    value: {
      type: String,
      required: true
    },
    placeholder: {
      type: String,
      default: 'Выберите дату'
    }
  },
  data: () => ({
    fp: null
  }),
  watch: {
    value: 'updateDatepicker'
  },
  mounted() {
    this.initDatepicker()
  },
  beforeDestroy() {
    this.destroy()
  },
  methods: {
    update(newDate) {
      this.$emit('input', newDate)
    },

    initDatepicker() {
      this.fp = flatpickr(this.$refs.datepicker, {
        locale: Russian,
        dateFormat: 'd.m.Y',
        onChange: (_, dateString) => this.update(dateString)
      })
    },

    updateDatepicker() {
      if (this.fp) {
        this.fp.setDate(this.value)
      }
    },

    destroy() {
      if (this.fp) {
        this.fp.destroy()
      }
    }
  }
}
</script>

<style>
.datepicker .form-control {
  background-color: #fff;
}
</style>
