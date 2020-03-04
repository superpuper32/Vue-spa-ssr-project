<template>
  <div>
    <h2>Создание пользователя</h2>

    <div class="card">
      <div class="card-header">{{ title }}</div>
      <div class="card-body bg-light">
        <UserForm v-model="user">
          <template v-slot:buttons>
            <RouterLink
              tag="button"
              type="button"
              class="btn btn-info"
              to="/users"
              >назад</RouterLink
            >

            <button type="button" class="btn btn-primary ml-2" @click="create">
              Создать
            </button>
          </template>
        </UserForm>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

const defaultUser = {
  id: null,
  isActive: false,
  balance: '',
  picture: 'http://placehold.it/128x128',
  age: 0,
  accessLevel: '',
  firstName: '',
  lastName: '',
  company: '',
  email: '',
  phone: '',
  address: '',
  about: '',
  registered: ''
}

export default {
  name: 'CreateUser',
  components: {
    UserForm: () => import('@/components/UserForm.vue')
  },
  data: () => ({
    user: defaultUser,
    url: 'http://localhost:3004/users/'
  }),
  computed: {
    title() {
      return !this.user.firstName || !this.user.lastName
        ? 'Новый пользователь'
        : [this.user.firstName, this.user.lastName].join(' ')
    }
  },
  methods: {
    create() {
      axios.post(this.url, this.user).then(() => {
        this.$router.push({ path: '/users' })
      })
    }
  }
}
</script>
