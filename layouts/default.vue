<template>
  <div class="bg-light">
    <nav class="navbar navbar-expand-md navbar-dark fixed-top bg-dark">
      <Nuxt-link class="navbar-brand" to="/">
        {{ $store.state.navbarTitle }} {{ $store.getters.titleCount }}
      </Nuxt-link>

      <button
        class="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarCollapse"
        aria-controls="navbarCollapse"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>

      <div id="navbarCollapse" class="collapse navbar-collapse">
        <ul class="navbar-nav mr-auto">
          <Nuxt-link tag="li" class="nav-item" to="/">
            <a href="#" class="nav-link">
              Home
            </a>
          </Nuxt-link>

          <Nuxt-link tag="li" class="nav-item" to="/users">
            <a href="#" class="nav-link">
              Users
            </a>
          </Nuxt-link>

          <Nuxt-link tag="li" class="nav-item" to="/phones">
            <a href="#" class="nav-link">
              Users Phones
            </a>
          </Nuxt-link>

          <Nuxt-link tag="li" class="nav-item" to="/create">
            <a href="#" class="nav-link">
              Create
            </a>
          </Nuxt-link>
        </ul>
      </div>
    </nav>

    <main id="app" role="main" class="container">
      <nuxt />
    </main>
  </div>
</template>

<script>
export default {
  name: 'App',
  computed: {
    title() {
      return this.$store.state.navbarTitle + ' ' + this.$store.getters.titleCount
    }
  }
}
</script>

<style>
#app {
  padding: 80px 0;
}

body {
  background-color: #f8f9fa;
}
</style>
