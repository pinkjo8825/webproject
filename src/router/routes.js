
const routes = [
  {
    path: '/',
    component: () => import('layouts/LandingLayout.vue'),
    children: [
      { path: '', component: () => import('pages/IndexPage.vue') },
      { path: '/about', component: () => import('pages/aboutPage.vue') },
      { path: '/price', component: () => import('pages/pricePage.vue') },
      { path: '/register', component: () => import('pages/registerPage.vue') },
      { path: '/user', component: () => import('pages/userPage.vue') },
      { path: '/admin', component: () => import('pages/adminPage.vue') }
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes
