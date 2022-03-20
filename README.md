<p align="center">
  <img src="https://github.com/forestxieCode/fst-ui/blob/main/packages/website/src/assets/images/logo.svg">
</p>

<p align="center">
  <a>
    <img src="https://travis-ci.org/ElemeFE/element.svg?branch=master">
  </a>
</p>

> A Vue.js 2.0 UI Toolkit for Web.

fst-ui will stay with Vue 2.x 

## Links
-  [文档地址](https://forestxiecode.github.io/fst-ui/)

## Install
```shell
npm install fst-ui -S
```

## Quick Start
``` javascript
import Vue from 'vue'
import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';
import Fst from 'fst-ui'
import 'fst-ui/lib/theme-chalk/index.css';

Vue.use(Element)
Vue.use(Fst)

// or
import { 
  CwSearchTab, 
  CwSearchTabGroup 
} from 'fst-ui';

Vue.component(CwSearchTab.name, CwSearchTab)
Vue.component(CwSearchTabGroup.name, CwSearchTabGroup)
```
For more information, please refer to [Quick Start](http://114.116.142.157:8989/#/component/quickstart) in our documentation.

## Browser Support
Modern browsers and Internet Explorer 10+

