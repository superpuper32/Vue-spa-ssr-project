<template>
  <div>
    <h2>Редактирование пользователя</h2>
    <div v-if="!user" class="alert alert-warning">
      <i class="fa fa-refresh fa-spin" />
      Loading...
    </div>

    <div v-else class="card">
      <div class="card-header">{{ user.id }} - {{ title }}</div>

      <div class="card-body bg-light">
        <UserForm v-model="user">
          <template v-slot:buttons>
            <button type="button" class="btn btn-primary" @click="save">
              Сохранить
            </button>

            <button type="button" class="btn btn-danger ml-2" @click="remove">
              Удалить
            </button>
          </template>
        </UserForm>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'EditUser',
  components: {
    UserForm: () => import('@/components/UserForm.vue')
  },
  data: () => ({
    user: null,
    restUrl: 'http://localhost:3004/users/'
  }),
  computed: {
    id() {
      return this.$route.query.id
    },
    url() {
      return `${this.restUrl}${this.id}`
    },
    title() {
      return !this.user.firstName || !this.user.lastName
        ? 'Пользователь'
        : [this.user.firstName, this.user.lastName, this.user.phone].join(' ')
    }
  },
  watch: {
    $route: 'loadUser'
  },
  asyncData(route) {
    return axios
      .get('http://localhost:3004/users/' + route.query.id)
      .then(response => {
        return {
          user: response.data
        }
      })
      .catch(error => console.error(error))
  },
  mounted() {
    this.loadUser()
  },
  methods: {
    loadUser() {
      axios
        .get(this.url)
        .then(response => (this.user = response.data))
        .catch(error => console.error(error))
    },

    backToUsers() {
      this.$router.push({ path: '/users' })
    },

    save() {
      axios
        .patch(this.url, this.user)
        .then(() => this.backToUsers())
        .catch(error => console.error(error))
    },

    remove() {
      const confirmRemove = confirm('Are you sure to remove this user?')
      if (!confirmRemove) return

      axios
        .delete(this.url)
        .then(() => this.backToUsers())
        .catch(error => console.error(error))
    }
  }
}
</script>
