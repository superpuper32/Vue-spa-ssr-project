<template>
  <div class="card">
    <div class="card-header">
      <nav class="navbar justify-content-between">
        <p class="navbar-brand">Количество пользователей - {{ totalRows }}</p>

        <form class="form-inline">
          <button class="btn btn-primary my-2 my-sm-0" type="button" @click="loadUsers">
            <i :class="['fa fa-fw fa-refresh', loading ? 'fa-spin' : '']" />
            Обновить
          </button>
        </form>
      </nav>
    </div>

    <div class="card-body">
      <div class="row">
        <div class="col-md-4 mb-3">
          <RowsSelector v-model.number="rowsPerPage" />
          <label for="country">Выбрано элементов на страницу - {{ rowsPerPage }}</label>
        </div>
      </div>

      <table class="table table-hover table-striped">
        <thead>
          <tr>
            <slot name="table-header" />
          </tr>
        </thead>

        <tbody>
          <tr v-for="user in filteredRows" :key="user.id">
            <slot name="table-row" v-bind="user" />
          </tr>
        </tbody>
      </table>
    </div>

    <div class="card-footer">
      <div class="form-group">
        <PagesPagination v-model.number="selectedPage" :per-page="rowsPerPage" :total="totalRows" />
        <p>Выбрана страница - {{ selectedPage }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'UsersList',
  components: {
    RowsSelector: () => import('@/components/dashboard/RowsSelector.vue'),
    PagesPagination: () => import('@/components/dashboard/PagesPagination.vue')
  },
  props: {
    url: {
      type: String,
      required: true
    }
  },
  data: () => ({
    users: [],
    rowsPerPage: 5,
    selectedPage: 1,
    loading: false
  }),
  computed: {
    totalRows() {
      return this.users.length
    },

    filteredRows() {
      return this.users.filter((item, index) => {
        const startIndex = (this.selectedPage - 1) * this.rowsPerPage
        const endIndex = startIndex + this.rowsPerPage

        return startIndex <= index && index < endIndex
      })
    }
  },
  watch: {
    rowsPerPage() {
      this.selectedPage = 1
    }
  },
  mounted() {
    this.loadUsers()
  },
  methods: {
    loadUsers() {
      const token = '1234567890'
      this.loading = true

      const config = {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
      axios
        .get(this.url, config)
        .then(response => {
          this.users = response.data
          this.loading = false
        })
        .catch(error => console.error(error))
    }
  }
}
</script>
