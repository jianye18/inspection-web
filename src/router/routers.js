import Main from '@/view/main'
// import parentView from '@/components/parent-view'

/**
 * iview-admin中meta除了原生参数外可配置的参数:
 * meta: {
 *  hideInMenu: (false) 设为true后在左侧菜单不会显示该页面选项
 *  notCache: (false) 设为true后页面不会缓存
 *  access: (null) 可访问该页面的权限数组，当前路由设置的权限会影响子路由
 *  icon: (-) 该页面在左侧菜单、面包屑和标签导航处显示的图标，如果是自定义图标，需要在图标名称前加下划线'_'
 * }
 */

export default [
  {
    path: '/login',
    name: 'login',
    meta: {
      title: 'Login - 登录',
      hideInMenu: true
    },
    component: resolve => import('@/view/login/login.vue')
    //component:resolve => require(['@/view/login/login.vue'],resolve)
  },
  {
    path: '/view_file',
    name: 'view_file',
    meta: {
      title: '预览页',
      hideInMenu: true
    },
    component: resolve => import('@/view/inspection/view_file.vue')
  },
  {
    path: '/web',
    name: 'inspection',
    meta: {
      title: '展示页',
      hideInMenu: false,
      notCache: true
    },
    component: () => import('@/view/inspection/home.vue'),
    //component:resolve => require(['@/view/inspection/home.vue'],resolve),
    children: [
      {
        path: '/main',
        name: 'main',
        meta: {
          title: '首页内容',
          hideInMenu: true
        },
        component: () => import('@/view/inspection/home-content.vue')
        //component:resolve => require(['@/view/inspection/home-content.vue'],resolve)
      },
      {
        path: '/',
        name: 'view',
        meta: {
          title: '数据展示页',
          hideInMenu: true
        },
        component: () => import('@/view/inspection/inspection.vue'),
        //component:resolve => require(['@/view/inspection/inspection.vue'],resolve),
        children: [
          {
            path: '/spotCheck',
            name: 'spotCheck',
            meta: {
              notCache: true
            },
            component: () => import('@/view/inspection/spot-check-list-data.vue')
            //component:resolve => require(['@/view/inspection/spot-check-list-data.vue'],resolve)
          },
          {
            path: '/spotCheckDetail',
            name: 'spotCheckDetail',
            meta: {
              notCache: true
            },
            component: () => import('@/view/inspection/spot-check-detail-data.vue')
            //component:resolve => require(['@/view/inspection/spot-check-detail-data.vue'],resolve)
          },
          {
            path: '/criterion',
            name: 'criterion',
            meta: {
              notCache: true
            },
            component: () => import('@/view/inspection/criterion-list-data.vue')
            //component:resolve => require(['@/view/inspection/criterion-list-data.vue'],resolve)
          },
          {
            path: '/criterionDetail',
            name: 'criterionDetail',
            meta: {
              notCache: true
            },
            component: () => import('@/view/inspection/criterion-detail-data.vue')
            //component:resolve => require(['@/view/inspection/criterion-detail-data.vue'],resolve)
          },
          {
            path: '/law',
            name: 'law',
            meta: {
              notCache: true
            },
            component: () => import('@/view/inspection/law-list-data.vue')
            //component:resolve => require(['@/view/inspection/law-list-data.vue'],resolve)
          },
          {
            path: '/lawDetail',
            name: 'lawDetail',
            meta: {
              notCache: true
            },
            component: () => import('@/view/inspection/law-detail-data.vue')
            //component:resolve => require(['@/view/inspection/law-detail-data.vue'],resolve)
          },
          {
            path: '/lawView',
            name: 'lawView',
            meta: {
              notCache: true
            },
            component: () => import('@/view/inspection/law-view-data.vue')
            //component:resolve => require(['@/view/inspection/law-view-data.vue'],resolve)
          },
          {
            path: '/flightCheck',
            name: 'flightCheck',
            meta: {
              notCache: true
            },
            component: () => import('@/view/inspection/flight-check-list-data.vue')
            //component:resolve => require(['@/view/inspection/flight-check-list-data.vue'],resolve)
          },
          {
            path: '/flightCheckDetail',
            name: 'flightCheckDetail',
            meta: {
              notCache: true
            },
            component: () => import('@/view/inspection/flight-check-detail-data.vue')
            //component:resolve => require(['@/view/inspection/flight-check-detail-data.vue'],resolve)
          },
          {
            path: '/article',
            name: 'article',
            meta: {
              notCache: true
            },
            component: () => import('@/view/inspection/article-list-data.vue')
            //component:resolve => require(['@/view/inspection/article-list-data.vue'],resolve)
          },
          {
            path: '/articleDetail',
            name: 'articleDetail',
            meta: {
              notCache: true
            },
            component: () => import('@/view/inspection/article-detail-data.vue')
            //component:resolve => require(['@/view/inspection/article-detail-data.vue'],resolve)
          }
        ]
      }
    ]
  },
  {
    path: '/401',
    name: 'error_401',
    meta: {
      hideInMenu: true
    },
    component: () => import('@/view/error-page/401.vue')
  },
  {
    path: '/500',
    name: 'error_500',
    meta: {
      hideInMenu: true
    },
    component: () => import('@/view/error-page/500.vue')
  },
  {
    path: '*',
    name: 'error_404',
    meta: {
      hideInMenu: true
    },
    component: () => import('@/view/error-page/404.vue')
  }
]
