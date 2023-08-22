import store from '@/store'

export default {
  bind(el, bindings, vnode, oldVNode) {},
  inserted(el, bindings, vnode, oldVNode) {
    const { arg } = bindings
    if (!arg) {
      el.parentNode && el.parentNode.removeChild(el)
      // throw new Error('使用这个指令必须传递arg参数')
    }
    const btnPermissionList = store.state.user.btnPermissionList
    if (btnPermissionList.length > 0) {
      const isPermissionExist = btnPermissionList.some(pemi => {
        const reg = new RegExp('.+\.' + arg, 'g')
        return reg.test(pemi)
      })
      if (!isPermissionExist) {
        el.parentNode && el.parentNode.removeChild(el)
      }
    }
  },
  update(el, bindings, vnode, oldVNode) {},
  componentUpdated(el, bindings, vnode, oldVNode) {},
  unbind(el, bindings, vnode, oldVNode) {}
}
