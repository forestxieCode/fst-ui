import { version } from '../package.json'
import FstSearchTab from './components/search-tab'
import FstSearchTabGroup from './components/search-tab-group'
import FstTable from './components/table'
const components = [FstSearchTab, FstSearchTabGroup, FstTable]

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

export { version, FstSearchTab, FstSearchTabGroup, FstTable, install }

export default fstUi
