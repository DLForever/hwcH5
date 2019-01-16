import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import Home from '@/components/Home'
import Store_ins from '@/components/Store_ins'
import Put_Away from '@/components/Put_Away'
import ProductDetails from '@/components/ProductDetails'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
      meta: {
      	keepAlive: false
      }
    },
    {
      path: '/Login',
      name: 'Login',
      component: Login,
      meta: {
      	keepAlive: true
      }
    },
    {
      path: '/Store_ins',
      name: 'Store_ins',
      component: Store_ins,
      meta: {
      	keepAlive: false
      }
    },
    {
      path: '/Put_Away',
      name: 'Put_Away',
      component: Put_Away,
      meta: {
      	keepAlive: false
      }
    },
    {
      path: '/ProductDetails',
      name: 'ProductDetails',
      component: ProductDetails,
      meta: {
      	keepAlive: false
      }
    },
  ]
})
