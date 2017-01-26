import Vue from 'vue'
import VueRouter from 'vue-router'

import Header from './components/Header.vue'
import Test from './components/Test.vue'
import Feed from './components/Feed.vue'
import Lecture from './components/Lecture.vue'
import Result from './components/Result.vue'

Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  routes: [
    {
      path: "/",
      component: Feed
    },
    {
      path: "/lecture/:id",
      component: Lecture
    },
    {
      path: "/test/:id",
      component: Test
    },
    {
      path: "/results",
      component: Result
    }
  ]
})

export default router