import { version } from '../package.json'
import FstSearchTab from './components/search-tab'
import FstSearchTabGroup from './components/search-tab-group'
import FstTable from './components/table'
import FstTreeSelect from './components/tree-select'
const components = [FstSearchTab, FstSearchTabGroup, FstTable, FstTreeSelect]

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

export {
  version,
  FstSearchTab,
  FstSearchTabGroup,
  FstTable,
  FstTreeSelect,
  install
}

export default fstUi
