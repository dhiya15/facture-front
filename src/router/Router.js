import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

const router = new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/dashboard",
      redirect: "/dashboard/classic-dashboard",
      component: () => import("@/layouts/full-layout/FullLayout"),
      children: [
        {
          name: "الرئيسية",
          path: "/home",
          component: () => import("@/views/home/Home"),
        },
        {
          name: "الزبائن",
          path: "/clients",
          component: () => import("@/views/clients/Clients"),
        },
        {
          name: "معلومات",
          path: "/information",
          component: () => import("@/views/information/Information"),
        },
        {
          name: "فاتورة",
          path: "/factures",
          component: () => import("@/views/factures/NewFacture"),
        },
      ],
      beforeEnter: async (to, from, next) => {
        const  token  = localStorage.getItem('_utoken');
        if (token == null) {
          return next("/");
        }
        return next();
      },
    },
    {
      //path: "/authentication",
      path: "/",
      component: () => import("@/views/authentication/BoxedLogin"),
      beforeEnter: async (to, from, next) => {
        const  token  = localStorage.getItem('_utoken');
        if (token != null) {
          return next("/home");
        }
        return next();
      },
    },
    {
      path: "*",
      component: () => import("@/views/authentication/Error"),
    },
  ],
});

import NProgress from "nprogress";

router.beforeResolve((to, from, next) => {
  // If this isn't an initial page load.
  if (to.name) {
    // Start the route progress bar.
    NProgress.start(800);
  }
  next();
});

router.afterEach(() => {
  // Complete the animation of the route progress bar.
  NProgress.done();
});

// router.beforeEach((to, from, next) =>
// {
//   const  token  = localStorage.getItem('_utoken');
//
//
//     if (token === null) {
//       next({
//         path: '/',
//       })
//     }
//
//
//
// });

export default router;
