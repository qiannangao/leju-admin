import { login, logout, getInfo } from '@/api/user'
import { getToken, setToken, removeToken } from '@/utils/auth'
import { resetRouter } from '@/router'
import { getInitMenus } from '@/api/auth/auth'
import Layout from '@/layout'
import router from '@/router'
const getDefaultState = () => {
  return {
    token: getToken(),
    name: '',
    avatar: '',
    // 当前用户可以访问的菜单
    permissionList: [],
    // 当前用户，当前页面的按钮权限
    // ['productList.list','productList.add','productList.edit','productList.remove']
    btnPermissionList: []
  }
}

const state = getDefaultState()

const mutations = {
  RESET_STATE: (state) => {
    Object.assign(state, getDefaultState())
  },
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  },
  SET_PERMISSIMO_LIST: (state, permissionList) => {
    state.permissionList = permissionList
  },
  SET_BTN_PERMISSIMO_LIST: (state, btnPermissionList) => {
    state.btnPermissionList = btnPermissionList
  }
}

const actions = {
  getMenuList({ commit }) {
    // 1规整
    function buildList(routes, list, itemRoute) {
      for (let i = 0; i < list.length; i++) {
        const item = list[i]
        if (item.type === 1) {
          // 菜单权限
          const route = {
            path: item.path,
            name: item.name
          }
          if (item.redirect) {
            route.redirect = item.redirect
          }
          if (item.meta) {
            route.meta = JSON.parse(item.meta)
          }
          if (item.alwaysShow) {
            route.alwaysShow = true
          }
          if (item.hidden) {
            route.hidden = true
          }
          if (item.pid === '0') {
            // 顶级菜单
            route.component = Layout
          } else {
            // 子菜單
            const path = item.component.replace(/.+\/views/, '')
            // 立即执行函数+闭包
            route.component = (path => {
              return function(resolve) {
                // 这个特殊的 `require` 语法将会告诉 webpack
                // 自动将你的构建代码切割成多个包，这些包
                // 会通过 Ajax 请求加载
                require([`@/views${path}`], resolve)
              }
            })(path)
          }
          if (item.children && item.children.length) {
            // 假设不提前声明children，第一层存在children，递归调用函数，创建出另外一个children的路由，但没有地方挂载，因为第一层需要children属性
            route.children = []
            buildList(route.children, item.children, route)
          }
          routes.push(route)
        } else {
          // type===2
          // 按钮权限
          console.log('meta1', item.meta != null)
          if (itemRoute.meta && itemRoute.meta.btnPermissionList) {
            console.log('meta11')
            itemRoute.meta.btnPermissionList = []
            item.meta.btnPermissionList.push(item.permissionValue)
          }
        }
      }
      console.log(routes)
    }
    return new Promise((resolve, reject) => {
      getInitMenus().then(res => {
        if (res.success) {
          // const permissionList = res.data.permissionList
          const newList = []
          newList.push(res.data.permissionList[3])
          const permissionList = newList
          console.log(newList, permissionList)
          const routes = []
          // 规整数据
          buildList(routes, permissionList)
          // 把规整后的数据放入vuex
          commit('SET_PERMISSIMO_LIST', routes)
          // 重置
          resetRouter()
          // 添加到路由对象中
          router.addRoutes(routes)
          resolve()
        } else {
          reject(res)
        }
      })
    })
  },
  // user login
  login({ commit }, userInfo) {
    const { username, password } = userInfo
    return new Promise((resolve, reject) => {
      login({ username: username.trim(), password: password }).then(response => {
        const { data } = response
        commit('SET_TOKEN', data.token)
        setToken(data.token)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // get user info
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      getInfo(state.token).then(response => {
        const { data } = response

        if (!data) {
          return reject('Verification failed, please Login again.')
        }

        const { name, avatar } = data

        commit('SET_NAME', name)
        commit('SET_AVATAR', avatar)
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // user logout
  logout({ commit, state }) {
    return new Promise((resolve, reject) => {
      logout(state.token).then(() => {
        removeToken() // must remove  token  first
        resetRouter()
        commit('RESET_STATE')
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      removeToken() // must remove  token  first
      commit('RESET_STATE')
      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

