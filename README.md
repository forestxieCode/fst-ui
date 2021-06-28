## Introduction

A Vue.js 2.0 UI Toolkit for Web.

## Install

```shell
npm install @cunw/cunw-ui -S
```

## Quick Start

```js
import { createApp } from 'vue'
import App from './App.vue'
// import style
import '@cunw/cunw-ui/lib/cunw-ui.css'
import cunwUi from '@cunw/cunw-ui'

// global import
Vue.use(cunwUi)

// or according to the need to import
import {
  cwSkeleton,
  // ...
} from 'cunwUi'

Vue.compent('cwSkeleton', cwSkeleton)
```

