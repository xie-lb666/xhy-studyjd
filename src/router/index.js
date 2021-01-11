import {
  createRouter,
  createWebHistory
} from 'vue-router'
import Login from '../views/login/Login.vue'
import Register from '../views/register/Register.vue'
import ShopTrolley from '../views/trolley/ShopTrolley.vue'



const routes = [{
    path: '/',
    name: 'Home',
    component: () => import(/* webpackChunkName:'home'  */'../views/home/Home'),

  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    beforeEnter: (to, from, next) => {
      const {
        isLogin
      } = localStorage;
      isLogin ? next({
        name: 'Home'
      }) : next();
    }
  }, {
    path: '/register',
    name: 'Register',
    component: Register,
  },
  {
    path: '/ShopTrolley',
    name: 'ShopTrolley',
    component: ShopTrolley,
  },
  {
    path: '/shop/:id',
    name: 'Shop',
    component: () => import(/* webpackChunkName:'shop'  */'../views/shop/Shop'),
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  console.log("触发路由跳转");
  const {
    isLogin
  } = localStorage;
  const {
    name
  } = to;
  console.log("触发路由跳转", isLogin);
  (isLogin || name === 'Login' || name === 'Register') ? next(): next({
    name: 'Login'
  });
})

export default router