import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [{
      path: 'dashboard',
      name: 'Dashboard',
      component: () => import('@/views/dashboard/index'),
      meta: { title: 'Dashboard', icon: 'dashboard' }
    }]
  }

]
export const asyncRoutes = [
// 内容
  {
    path: '/content',
    component: Layout,
    redirect: '/content/article',
    name: 'Content',
    meta: { title: '内容管理', icon: 'el-icon-folder-opened' },
    children: [
      {
        path: 'article',
        name: 'Article',
        component: () => import('@/views/content/article/index'),
        meta: { title: '文章列表', icon: 'el-icon-tickets' }
      },
      {
        path: 'detail',
        name: 'Detail',
        hidden: true,
        component: () => import('@/views/content/article/detail/index'),
        meta: { title: '新增文章', icon: 'el-icon-tickets', activeMenu: '/content/article' }
      },
      {
        path: 'edit/:id',
        name: 'Edit',
        hidden: true,
        component: () => import('@/views/content/article/detail/index'),
        meta: { title: '编辑文章', icon: 'el-icon-tickets', activeMenu: '/content/article' }
      },
      {
        path: 'material',
        name: 'Material',
        component: () => import('@/views/content/material/index'),
        meta: { title: '素材列表', icon: 'el-icon-picture-outline' }
      }
    ]
  },
  // 商品
  {
    path: '/product',
    component: Layout,
    redirect: '/product/list',
    name: 'Product',
    meta: { title: '商品管理', icon: 'el-icon-folder-opened' },
    children: [
      {
        path: 'list',
        name: 'List',
        component: () => import('@/views/product/productList/index'),
        meta: { title: '商品列表', icon: 'el-icon-tickets' }
      },
      {
        path: 'addDetail',
        name: 'AddDetail',
        hidden: true,
        component: () => import('@/views/product/productList/productDetail'),
        meta: { title: '新增商品', icon: 'el-icon-tickets', activeMenu: '/product/list' }
      },
      {
        path: 'editDetail/:id',
        name: 'EditDetail',
        hidden: true,
        component: () => import('@/views/product/productList/productDetail'),
        meta: { title: '编辑商品', icon: 'el-icon-tickets', activeMenu: '/product/list' }
      },
      {
        path: 'category',
        name: 'Category',

        component: () => import('@/views/product/productCate/index'),
        meta: { title: '商品分类', icon: 'el-icon-tickets' }
      },
      {
        path: '/brand',
        name: 'Brand',

        component: () => import('@/views/product/productBrand/index'),
        meta: { title: '品牌管理', icon: 'el-icon-tickets' }
      }

    ]
  },
  // 订单
  {
    path: '/order',
    component: Layout,
    redirect: '/order/orders',
    name: 'Order',
    meta: { title: '订单管理', icon: 'el-icon-folder-opened' },
    children: [
      {
        path: 'orders',
        name: 'Orders',
        component: () => import('@/views/order/orders/index'),
        meta: { title: '订单列表', icon: 'el-icon-tickets' }
      },
      {
        path: 'orderDetail/:id',
        name: 'OrderDetail',
        hidden: true,
        component: () => import('@/views/order/orders/orderDetail'),
        meta: { title: '订单详情', icon: 'el-icon-tickets', activeMenu: '/order/orders' }
      },
      {
        path: 'orderback',
        name: 'Orderback',
        component: () => import('@/views/order/orderback/index'),
        meta: { title: '退单列表', icon: 'el-icon-tickets' }
      },
      {
        path: 'orderbackDetail/:id',
        name: 'OrderbackDetail',
        hidden: true,
        component: () => import('@/views/order/orderback/orderBackDetail'),
        meta: { title: '退单信息', icon: 'el-icon-tickets', activeMenu: '/order/orderback' }
      },
      {
        path: 'address',
        name: 'Address',
        component: () => import('@/views/order/address/index'),
        meta: { title: '地址管理', icon: 'el-icon-tickets' }
      }

    ]
  },
  // 用户
  {
    path: '/user',
    component: Layout,
    redirect: '/user/users',
    name: 'User',
    meta: { title: '注册用户管理', icon: 'el-icon-folder-opened' },
    children: [
      {
        path: 'users',
        name: 'Users',
        component: () => import('@/views/user/users/index'),
        meta: { title: '用户管理', icon: 'el-icon-tickets' }
      }
    ]
  },
  // 权限
  {
    path: '/auth',
    component: Layout,
    redirect: '/auth/roles',
    name: 'Auth',
    meta: { title: '权限管理', icon: 'el-icon-folder-opened' },
    children: [
      {
        path: 'account',
        name: 'Account',
        component: () => import('@/views/auth/account/index'),
        meta: { title: '账号管理', icon: 'el-icon-tickets' }
      },
      {
        path: 'roles',
        name: 'Roles',

        component: () => import('@/views/auth/roles/index'),
        meta: { title: '角色管理', icon: 'el-icon-tickets', activeMenu: '/content/article' }
      },
      {
        path: 'resource',
        name: 'Resource',

        component: () => import('@/views/auth/resource/index'),
        meta: { title: '资源管理', icon: 'el-icon-tickets' }
      }

    ]
  }
]
const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes.concat(asyncRoutes)
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
