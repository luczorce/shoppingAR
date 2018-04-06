import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Game from './views/Game.vue'
import About from './views/About.vue'
import Locations from './views/Locations.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/detecting',
      name: 'detecting',
      component: Game
    },
    {
      path: '/about',
      name: 'about',
      component: About
    },
    {
      path: '/locations',
      name: 'Locations',
      component: Locations
    }
  ]
})
