<template>
  <div class="container py-5">
    <div class="row">
      <div class="col-md-8">
        <form>
          <div class="row">
            <ValidationProvider
              v-slot="{ errors, invalid }"
              name="Имя"
              rules="required"
              tag="div"
              class="col-md-6 mb-3"
            >
              <label>Имя</label>
              <input
                v-model="localUser.firstName"
                type="text"
                class="form-control"
                :class="{ 'is-invalid': invalid }"
              />
              <span v-if="errors.length" class="help-block text-danger">{{
                errors[0]
              }}</span>
            </ValidationProvider>

            <ValidationProvider
              v-slot="{ errors, invalid }"
              name="Фамилия"
              rules="required"
              tag="div"
              class="col-md-6 mb-3"
            >
              <label>Фамилия</label>
              <input
                v-model="localUser.lastName"
                type="text"
                class="form-control"
                :class="{ 'is-invalid': invalid }"
              />
              <span v-if="errors.length" class="help-block text-danger">{{
                errors[0]
              }}</span>
            </ValidationProvider>
          </div>

          <div class="row">
            <ValidationProvider
              v-slot="{ errors, invalid }"
              rules="required|email"
              name="email"
              tag="div"
              class="col-md-6"
            >
              <label>Email</label>
              <input
                v-model="localUser.email"
                type="email"
                class="form-control"
                :class="{ 'is-invalid': invalid }"
              />
              <span v-if="errors.length" class="help-block text-danger">{{
                errors[0]
              }}</span>
            </ValidationProvider>

            <div class="col-md-6">
              <label>Телефон</label>
              <input
                v-model="localUser.phone"
                type="text"
                class="form-control"
              />
            </div>
          </div>

          <div class="form-group">
            <label>Аватар</label>
            <client-only>
              <AvatarUpload v-model="localUser.picture" />
            </client-only>
          </div>

          <div class="row mb-3">
            <div class="col-md-6">
              <label>Возраст</label>
              <input
                v-model="localUser.age"
                type="number"
                class="form-control"
              />
            </div>

            <div class="col-md-6">
              <label>Зарегистрирован</label>
              <client-only>
                <Datepicker v-model="localUser.registered" />
              </client-only>
            </div>
          </div>

          <div class="row mb-3">
            <div class="col-md-6">
              <label>Уровень доступа</label>
              <select v-model="localUser.accessLevel" class="form-control">
                <option v-for="item in accessList" :key="item">{{
                  item
                }}</option>
              </select>
            </div>

            <div class="col-md-6">
              <label>Активный</label>
              <div class="checkbox-inline">
                <input v-model="localUser.isActive" type="checkbox" /> Да
              </div>
            </div>
          </div>

          <div class="row mb-3">
            <div class="col-md-6">
              <label>Компания</label>
              <input
                v-model="localUser.company"
                type="text"
                class="form-control"
              />
            </div>

            <div class="col-md-6">
              <label>Баланс</label>
              <input
                v-model="localUser.balance"
                type="text"
                class="form-control"
              />
            </div>
          </div>

          <div class="form-group">
            <label>Адрес</label>
            <input
              v-model="localUser.address"
              type="text"
              class="form-control"
            />
          </div>

          <div class="mb-3">
            <label>Биография</label>
            <client-only>
              <RichEditor v-model="localUser.about" />
            </client-only>
          </div>

          <slot name="buttons" />
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'UserForm',
  components: {
    Datepicker: () => import('@/components/Datepicker.vue'),
    AvatarUpload: () => import('@/components/AvatarUpload.vue'),
    RichEditor: () => import('@/components/RichEditor.vue')
  },
  model: {
    prop: 'user',
    event: 'ultrasave'
  },
  props: {
    user: {
      type: Object,
      required: true
    }
  },
  data: () => ({
    localUser: null,
    accessList: ['guest', 'user', 'admin']
  }),
  watch: {
    localUser: {
      deep: true,
      handler: 'updateUser'
    }
  },
  created() {
    this.localUser = Object.assign({}, this.user)
  },
  methods: {
    updateUser() {
      this.$emit('ultrasave', this.localUser)
    }
  }
}
</script>
