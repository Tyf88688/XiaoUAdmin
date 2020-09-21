import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: "/",
      redirect: "/menu"
    },
    {
      path: "/home",
      component: () => import("@/pages/Home/Home")
    },
    {
      path: "/menu",
      component: () => import("@/pages/Menu/Menu")
    },
    {
      path: "/menu/menuadd",
      component: () => import("@/pages/Menu/MenuAdd")
    },
    {
      path: "/menu/edit",
      component: () => import("@/pages/Menu/MenuAdd")
    },

    {
      path: "/role",
      component: () => import("@/pages/Role/Role")
    },

    {
      path: "/role/roleadd",
      component: () => import("@/pages/Role/RoleAdd")
    },

    {
      path: "/role/edit",
      component: () => import("@/pages/Role/RoleAdd")
    },


    {
      path: "/user",
      component: () => import("@/pages/User/User")
    },

    {
      path: "/user/useradd",
      component: () => import("@/pages/User/UserAdd")
    },

    {
      path: "/user/edit",
      component: () => import("@/pages/User/UserAdd")
    },

    {
      path: "/login",
      component: () => import("@/pages/Login/Login")
    },

    {
      path: "/category",
      component: () => import("@/pages/Category/Category")
    },

    {
      path: "/category/categoryadd",
      component: () => import("@/pages/Category/CategoryAdd")
    },

    {
      path: "/category/edit",
      component: () => import("@/pages/Category/CategoryAdd")
    },

    {
      path: "/specs",
      component: () => import("@/pages/Specs/Specs")
    },
    {
      path: "/specs/add",
      component: () => import("@/pages/Specs/SpecsAdd")
    },
    {
      path: "/specs/edit",
      component: () => import("@/pages/Specs/SpecsAdd")
    },

    {
      path: "/goods",
      component: () => import("@/pages/Goods/Goods")
    },
    {
      path: "/goods/add",
      component: () => import("@/pages/Goods/GoodsAdd")
    },
    {
      path: "/goods/edit",
      component: () => import("@/pages/Goods/GoodsAdd")
    },


  ]
})
