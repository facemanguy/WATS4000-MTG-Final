import Vue from 'vue'
import Router from 'vue-router'
import CardFinder from '@/views/CardFinder'

Vue.use(Router)

export default new Router({
  routes: [
    {
        path: '/',
        name: 'CardFinder',
        component: CardFinder
      }
    ]
  })