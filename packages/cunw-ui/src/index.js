import Skeleton from './packages/skeleton/index.js'
import locale from './locale'

const components = {
  CwSkeleton: Skeleton
}

const install = function (Vue, options = {}) {
  locale.use(options.locale)
  locale.i18n(options.i18n)
  Object.keys(components).forEach(key => {
    Vue.component(key, components[key])
  })

  // Vue.prototype.$message = Message;
}

export default install
