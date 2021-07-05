## Introduction

A Vue.js 2.0 UI Toolkit for Web.

## Install

```shell
npm install @cunw/cunw -S
```

## Quick Start

```js
import { createApp } from 'vue'
import App from './App.vue'
// import style
import '@cunw/cunw/lib/cunw.css'
import cunwUi from '@cunw/cunw'

// global import
Vue.use(cunwUi)

// or according to the need to import
import {
  cwSkeleton,
  // ...
} from 'cunwUi'

Vue.compent('cwSkeleton', cwSkeleton)
```

