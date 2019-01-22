import Vue from 'vue';
import Router from 'vue-router';
import HomePage from '@/views/Home.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomePage
    },
    {
      path: '/game',
      name: 'game',
      component: () =>
        import(/* webpackChunkName: "group-game" */ '@/views/Game.vue')
    }
  ]
});
