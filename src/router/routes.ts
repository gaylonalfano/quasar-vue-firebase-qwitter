import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', name: 'Home', component: () => import('pages/Home.vue') },
      {
        path: '/about',
        name: 'About',
        component: () => import('pages/About.vue'),
      },
    ],
  },
  {
    path: '/signup',
    name: 'Signup',
    component: () => import('pages/Signup.vue'),
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('pages/Login.vue'),
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/Error404.vue'),
  },
];

export default routes;
