<template>
  <div>
    <h2>Список пользователей</h2>

    <div v-if="!users.length" class="alert alert-warning">
      Загрузка...
    </div>
    <user-list v-else :users="users">
      <template v-slot:table-header>
        <th>#</th>
        <th>Имя</th>
        <th>Фамилия</th>
        <th>Активен</th>
        <th>Баланс</th>
        <th>Email</th>
        <th>Телефон</th>
        <th>Зарегистрирован</th>
      </template>
      <template v-slot:table-row="{ item }">
        <td>
          <RouterLink :to="`/edit/${item.id}`">{{ item.id }}</RouterLink>
        </td>
        <td>{{ item.firstName }}</td>
        <td>{{ item.lastName }}</td>
        <td>{{ item.phone }}</td>
      </template>
    </user-list>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'UsersPage',
  components: {
    UserList: () => import('@/components/UserList.vue')
  },
  data: () => ({
    // Список пользователей
    users: []
  }),
  mounted() {
    this.loadData()
  },
  methods: {
    loadData() {
      axios
        .get('http://localhost:3004/users')
        .then(response => (this.users = response.data))
        .catch(error => console.error(error))
    }
  }
}
</script>
