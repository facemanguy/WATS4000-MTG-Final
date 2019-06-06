import Vue from 'vue'
import Router from 'vue-router'
import CardFinder from '@/views/CardFinder'
import BoosterSim from '@/views/BoosterSim'

Vue.use(Router)

export default new Router({
  routes: [
    {
        path: '/',
        name: 'CardFinder',
        component: CardFinder
      },
      {
        path: '/boosterSim',
        name: 'BoosterSim',
        component: BoosterSim
      }
    ]
  })