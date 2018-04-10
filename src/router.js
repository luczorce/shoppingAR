import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Game from './views/Game.vue'
import About from './views/About.vue'
import Locations from './views/Locations.vue'
import Walkthrough from './views/Walkthrough.vue'

Vue.use(Router);

let router;
let routes = [
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
    name: 'locations',
    component: Locations
  },
  {
    path: '/walkthrough',
    name: 'walkthrough',
    component: Walkthrough
  }
];

router = new Router({
  routes: routes
});

export default router;
