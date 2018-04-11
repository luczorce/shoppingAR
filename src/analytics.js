import Vue from 'vue'
import VueAnalytics from 'vue-analytics'
import router from './router.js'

Vue.use(VueAnalytics, {
  id: 'UA-117330261-1',
  router,
  debug: {
    sendHitTask: process.env.NODE_ENV === 'production'
  }
});
