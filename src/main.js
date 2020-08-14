import Vue from 'vue'
import App from './App'
import vuetify from '@/plugins/vuetify' // path to vuetify export
Vue.config.productionTip = false
// new Vue({
//   vuetify,
// }).$mount('#app')





/* eslint-disable no-new */
new Vue({
    vuetify,
  el: '#app',
  components: { App },
  template: '<App/>'
})
