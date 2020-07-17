import Vue from 'vue'
import App from './App.vue'
import router from './router'
import style from './style.styl'

import { ValidationObserver, ValidationProvider, extend, localize } from 'vee-validate';
import en from 'vee-validate/dist/locale/en.json';
import * as rules from 'vee-validate/dist/rules';
Vue.component('ValidationObserver', ValidationObserver);
Vue.component('ValidationProvider', ValidationProvider);
// install rules and localization
Object.keys(rules).forEach(rule => {
    extend(rule, rules[rule]);
});

localize('en', en);

Vue.config.productionTip = false

new Vue({
  router,
  style,
  render: h => h(App)
}).$mount('#app')
