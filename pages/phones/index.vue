<template>
  <div>
    <h2>Список телефонов пользователей</h2>

    <UserList :url="url">
      <template v-slot:table-header>
        <th>#</th>
        <th>Имя</th>
        <th>Фамилия</th>
        <th>Телефон</th>
      </template>
      <template v-slot:table-row="props">
        <td>
          <RouterLink :to="`/users/edit?id=${props.id}`">{{
            props.id
          }}</RouterLink>
        </td>
        <td>{{ props.firstName }}</td>
        <td>{{ props.lastName }}</td>
        <td>{{ props.phone }}</td>
      </template>
    </UserList>
  </div>
</template>

<script>
export default {
  name: 'UsersPhones',
  components: {
    UserList: () => import('@/components/UserList.vue')
  },
  data: () => ({
    url: 'http://localhost:3004/users'
  })
}
</script>
