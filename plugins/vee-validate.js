import Vue from 'vue'
import {
  extend,
  localize,
  ValidationProvider,
  ValidationObserver
} from 'vee-validate'
import { required, email } from 'vee-validate/dist/rules'
import ru from 'vee-validate/dist/locale/ru.json'
import en from 'vee-validate/dist/locale/en.json'

Vue.component('ValidationProvider', ValidationProvider)
Vue.component('ValidationObserver', ValidationObserver)

extend('required', required)
extend('email', email)

localize({ en, ru })
localize('ru')
