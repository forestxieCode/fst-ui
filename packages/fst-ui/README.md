<p align="center">
  <a href="https://forestxiecode.github.io/fst-ui/#/">
    <img src="https://i.postimg.cc/Gh5pLZ3G/logo-03.png">
  </a>
</p>

<p align="center">
  <a>
    <img src="https://app.travis-ci.com/forestxieCode/fst-ui.svg?branch=main">
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
  FstSearchTab, 
  FstSearchTabGroup 
} from 'fst-ui';

Vue.component(FstSearchTab.name, FstSearchTab)
Vue.component(FstSearchTabGroup.name, FstSearchTabGroup)
```
For more information, please refer to [Quick Start](http://114.116.142.157:8989/#/component/quickstart) in our documentation.

## Browser Support
Modern browsers and Internet Explorer 10+

