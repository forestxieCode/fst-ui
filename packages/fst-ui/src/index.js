import { version } from '../package.json'
import CwSearchTab from './components/search-tab'
import CwSearchTabGroup from './components/search-tab-group'
const components = [CwSearchTab, CwSearchTabGroup]

const install = (Vue) => {
  components.forEach((component) => {
    Vue.use(component)
  })
  applyOptions(Vue)
}

function applyOptions() {
  // app.prototype.$message = Message;
}

const fstUi = {
  version,
  install
}

export { version, CwSearchTab, CwSearchTabGroup, install }

export default fstUi
