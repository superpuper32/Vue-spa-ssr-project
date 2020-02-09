<template>
  <div class="home">
    <input v-model="title" type="text" class="form-control" />

    <hr />

    <HelloWorld msg="Welcome to Your Vue.js App" />
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'Home',
  components: {
    HelloWorld
  },
  computed: {
    title: {
      get() {
        return this.$store.state.navbarTitle
      },
      set(value) {
        this.$store.commit('changeTitle', value)
      }
    }
  }
}
</script>
