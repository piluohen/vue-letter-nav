import VueLetterNav from './vue-letter-nav'

const install = Vue => {
  Vue.component(VueLetterNav.name, VueLetterNav)
}

if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
}

export {
  VueLetterNav
}

export default { install }
