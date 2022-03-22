## 快速上手

本节将介绍如何在项目中使用 Fst-ui。

### 引入 Fst-ui

你可以引入整个 Fst-ui，或是根据需要仅引入部分组件。我们先介绍如何引入完整的 Fst-ui。

#### 完整引入

在 main.js 中写入以下内容：

```javascript
import Vue from 'vue';
import ElementUi from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import FstUi from 'fst-ui';
import 'fst-ui/lib/theme-chalk/index.css';
import App from './App.vue';

Vue.use(ElementUi);
Vue.use(FstUi);

new Vue({
  el: '#app',
  render: h => h(App)
});
```

以上代码便完成了 Fst-ui 的引入。需要注意的是，Fst-ui 是基于ElementUi的，需要在之后引入该组件库。

#### 按需引入

借助 [babel-plugin-component](https://github.com/QingWei-Li/babel-plugin-component)，我们可以只引入需要的组件，以达到减小项目体积的目的。

首先，安装 babel-plugin-component：

```bash
npm install babel-plugin-component -D
```

然后，将 .babelrc 修改为：

```json
{
  "presets": [["es2015", { "modules": false }]],
  "plugins": [
    [
      "component",
      {
        "libraryName": "fst-ui",
        "styleLibraryName": "theme-chalk"
      }
    ]
  ]
}
```

接下来，如果你只希望引入部分组件，比如 Button 和 Select，那么需要在 main.js 中写入以下内容：

```javascript
import Vue from 'vue';
import { FstSearchTab, FstSearchTabGroup } from 'fst-ui';
import App from './App.vue';

Vue.component(FstSearchTab.name, FstSearchTab);
Vue.component(FstSearchTabGroup.name, FstSearchTabGroup);
/* 或写为
 * Vue.use(FstSearchTab)
 * Vue.use(FstSearchTabGroup)
 */

new Vue({
  el: '#app',
  render: h => h(App)
});
```

完整组件列表和引入方式（完整组件列表以 [components.json](https://github.com/ElemeFE/element/blob/master/components.json) 为准）

```javascript
import Vue from 'vue';
import {
 FstSearchTab,
 FstSearchTabGroup
} from 'fst-ui';

Vue.use(FstSearchTab);
Vue.use(FstSearchTabGroup);
```


### 开始使用

至此，一个基于 Vue 和 Fst-ui 的开发环境已经搭建完毕，现在就可以编写代码了。各个组件的使用方法请参阅它们各自的文档。


