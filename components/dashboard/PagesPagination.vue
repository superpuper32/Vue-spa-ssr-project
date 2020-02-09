<template>
  <nav aria-label="Page navigation">
    <ul class="pagination">
      <li class="page-item" :class="{ disabled: page === 1 }">
        <a href="#" class="page-link" aria-label="Previous" @click.prevent="prevPage">
          <span aria-hidden="true">&laquo;</span>
        </a>
      </li>

      <li v-for="item in maxPages" :key="item" class="page-item" :class="{ active: page === item }">
        <a class="page-link" href="#" @click.prevent="selectPage(item)">{{ item }}</a>
      </li>

      <li class="page-item" :class="{ disabled: page === maxPages }">
        <a class="page-link" href="#" aria-label="Next" @click.prevent="nextPage">
          <span aria-hidden="true">&raquo;</span>
        </a>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  name: 'PagePagination',
  model: {
    prop: 'page'
  },
  props: {
    page: {
      type: Number,
      required: true
    },
    perPage: {
      type: Number,
      required: true
    },
    total: {
      type: Number,
      required: true
    }
  },
  computed: {
    maxPages() {
      return Math.ceil(this.total / this.perPage)
    }
  },
  methods: {
    selectPage(page) {
      this.$emit('input', page)
    },

    prevPage() {
      const page = this.page - 1
      if (page > 0) {
        this.selectPage(page)
      }
    },

    nextPage() {
      const page = this.page + 1
      if (page <= this.maxPages) {
        this.selectPage(page)
      }
    }
  }
}
</script>
