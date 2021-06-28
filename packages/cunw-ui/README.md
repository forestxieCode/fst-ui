<p align="center">
    <a>
        <img width="200" src="./assets/logo.jpg">
    </a>
</p>

<h1>
cunw-ui
    <h3>A lightweight Vue.js UI toolkit</h3>
</h1>

# Install

Run the command below in your terminal to install YzProUI first
```
npm install cunw-ui --save
```

# Usage

## Global Use
Import in your entry script file and register it
```javascript
import YzProUI from 'cunw-ui'
import "cunw-ui/lib/styles/cunw-ui.css"

Vue.use(YzProUI)
```

### Example

```html
<l-button>click</l-button>
```

## On-demand Loading

Firstly, you should install `babel-plugin-component` in your project.
```
npm install babel-plugin-component
```

Configure your `.babelrc` file like this

```json
{
    "plugins": [
        ["component", {
            "libraryName": "cunw-ui",
            "libDir": "lib",
            "styleLibrary": {
                "name": "styles",
                "base": false, // no base.css file
                "path": "[module].css"
            }
        }]
    ]
}
```

The you can import component on demand, and you don't need to care about importing styles, the babel plugin will do it automaticly.

```javascript
import Vue from 'vue'
import { YzFlow } from 'cunw-ui'

Vue.component('yz-flow', YzFlow)
```
