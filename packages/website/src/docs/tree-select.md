## tree-select
开发者：（dawdler）<br/>
类似 Select 的选择控件，可选择的数据结构是一个树形结构时，可以使用 TreeSelect，例如公司层级、学科系统、分类目录等等。

### 单选
初始`fst-tree-select`组件
:::demo 会根据values的类型区分单选或者多选，selectParams 为el-select 参数， treeParams为 el-tree 参数
```html
<template>
  <fst-tree-select  v-model="values" :selectParams="selectParams" :treeParams="treeParams"></fst-tree-select>
</template>

<script>
  export default { 
    data() {
      return {
        values: '',
        selectParams: {
          clearable: true,
          placeholder: '请选择'
        },
        treeParams: {
          clickParent: true,
          data: [{
            label: `节点：1`,
            id: 1,
            children: [
              {
                label: `节点：2`,
                id: 2,
              }
            ]
          }],
          props: {
            children: 'children',
            label: 'label',
            value: 'id'
        },
      }
    }
  }
}
</script>
```
:::
### 多选
`treeParams`参数
:::demo 会根据values的类型区分单选或者多选，selectParams 为el-select 参数， treeParams为 el-tree 参数
```html
<template>
  <fst-tree-select  v-model="values" :selectParams="selectParams" :treeParams="treeParams"></fst-tree-select>
</template>

<script>
  export default { 
    data() {
      return {
        values: [],
        selectParams: {
          clearable: true,
          placeholder: '请选择'
        },
        treeParams: {
          data: [{
            label: `节点：1`,
            id: 1,
            children: [
              {
                label: `节点：2`,
                id: 2,
              }
            ]
          }],
          props: {
            children: 'children',
            label: 'label',
            value: 'id'
        },
      }
    }
  }
}
</script>
```
:::

### 手动更新tree节点数据，自定义渲染
更新、渲染
:::demo 调用组件`treeDataUpdateFun`可更新tree数据，`renderContent`可自定义树节点绘制
```html
<template>
  <fst-tree-select  v-model="values" :selectParams="selectParams" :treeParams="treeParams" ref="treeSelect"></fst-tree-select>
</template>

<script>
  export default { 
    data() {
      return {
        values: [],
        selectParams: {
          clearable: true,
          placeholder: '请选择'
        },
        treeParams: {
          clickParent: false,
          data: [],
          leafOnly: true,
          renderContent: this._renderFun,
          props: {
            children: 'children',
            label: 'name',
            rootId: '0',
            disabled: 'disabled',
            parentId: 'parentId',
            value: 'id'
          },
       }
     }
   },
   mounted() {
      let data = [];
      const { label, children, parentId, value, rootId } = this.treeParams.props;
      for (let i = 0; i < 5; i++) {
          let rootNode = {
              [label]: `节点：${i}`,
              [parentId]: rootId,
              [value]: i,
              [children]: []
          };
          for (let a = 0; a < 5; a++) {
              let subId = `${rootNode[value]}_${a}`;
              let subNode = {
                  [label]: `子节点：${subId}`,
                  [parentId]: rootNode[value],
                  [value]: subId,
                  [children]: []
              };
              for (let b = 0; b < 5; b++) {
                  let endId = `${subId}_${b}`;
                  let endNode = {
                      [label]: `末级节点：${endId}`,
                      [parentId]: subNode[value],
                      [value]: endId,
                      [children]: []
                  };
                  subNode[children].push(endNode);
              }
              rootNode[children].push(subNode);
          }
          data.push(rootNode);
      }
      this.$nextTick(() => {
          this.$refs.treeSelect.treeDataUpdateFun(data);
      });
  },
  methods: {
    _renderFun(h, { node, data, store }) {
      const { props, clickParent } = this.treeParams;
      return (
          <span class={['custom-tree-node', !clickParent && data[props.children] && data[props.children].length ? 'disabled' : null]}>
              <span>{node.label}</span>
          </span>
      );
    }
  }
}
</script>
```
:::

### 支持tree搜索
搜索
:::demo 配置`filterable:true`
```html
<template>
  <fst-tree-select  v-model="values" :selectParams="selectParams" :treeParams="treeParams" ref="treeSelect"></fst-tree-select>
</template>

<script>
  export default { 
    data() {
      return {
        values: [],
        selectParams: {
          clearable: true,
          placeholder: '请选择'
        },
        treeParams: {
          clickParent: true,
          filterable: true,
          // 只想要子节点，不需要父节点
          leafOnly: true,
          includeHalfChecked: false,
          'check-strictly': false,
          'default-expand-all': true,
          'expand-on-click-node': false,
          'render-content': this._renderFun,
          props: {
            children: 'children',
            label: 'name',
            rootId: '0',
            disabled: 'disabled',
            parentId: 'parentId',
            value: 'id'
          },
       }
     }
   },
   mounted() {
      let data = [];
      const { label, children, parentId, value, rootId } = this.treeParams.props;
      for (let i = 0; i < 5; i++) {
          let rootNode = {
              [label]: `节点：${i}`,
              [parentId]: rootId,
              [value]: i,
              [children]: []
          };
          for (let a = 0; a < 5; a++) {
              let subId = `${rootNode[value]}_${a}`;
              let subNode = {
                  [label]: `子节点：${subId}`,
                  [parentId]: rootNode[value],
                  [value]: subId,
                  [children]: []
              };
              for (let b = 0; b < 5; b++) {
                  let endId = `${subId}_${b}`;
                  let endNode = {
                      [label]: `末级节点：${endId}`,
                      [parentId]: subNode[value],
                      [value]: endId,
                      [children]: []
                  };
                  subNode[children].push(endNode);
              }
              rootNode[children].push(subNode);
          }
          data.push(rootNode);
      }
      this.$nextTick(() => {
          this.$refs.treeSelect.treeDataUpdateFun(data);
      });
  },
  methods: {
    _renderFun(h, { node, data, store }) {
      const { props, clickParent } = this.treeParams;
      return (
          <span class={['custom-tree-node', !clickParent && data[props.children] && data[props.children].length ? 'disabled' : null]}>
              <span>{node.label}</span>
          </span>
      );
    }
  }
}
</script>
```
:::


### Props
|Name|Description|Type|Required|Default|
|---|---|---|---|---|
|value|v-model,存储的是treeParams.data里面的id|`String` / `Array` / `Number`|`false`|`''`|
|styles|el-select样式|`Object`|`false`|{}|
|selectClass|下拉框 挂类|`String`|`false`|-|
|popoverClass|popover 挂类|`String`|`false`|-|
|disabled|是否禁用文本框|`Boolean`|`false`|false|
|placement|弹出框位置|`String`|`false`|bottom|
|treeRenderFun|树渲染方法，具体参考el-tree Function(h, { node, data, store }) {}|`Function`|`false`|-|
|filterNodeMethod|搜索过滤方法，具体参考el-tree Function(h, { value, data, node }) {}|`Function`|`false`|-|
|selectParams|文本框参数，几乎支持el-select所有的API<br> 取消参数：<br> 设定下拉框的弹出框隐藏：<br> `:popper-append-to-body="false"` <br> 搜索从弹出框里面执行： <br> `filterable="false"`|`Object`|`false`|Object默认参数：<br><br> 是否可以清空选项：<br> `clearable: true,`<br><br> 是否禁用：<br> `disabled: false,`<br><br> 搜索框placeholder文字：<br> `placeholder: '请选择',`<br><br>|
|treeParams|下拉树参数，几乎支持el-tree所有的API<br> 取消参数:<br> `:show-checkbox="selectParams.multiple"`<br> 使用下拉框参数multiple判断是否对树进行多选<br> 取消对el-tree的人为传参show-checkbox<br> `:node-key="propsValue"`     自动获取treeParams.props.value<br> `:draggable="false"`         屏蔽拖动|`Object`|`false`|Object默认参数：<br><br> 在有子级的情况下是否点击父级关闭弹出框,false 只能点击子级关闭弹出框：<br><br> `clickParent: false`<br><br> 是否显示搜索框：<br><br> `filterable: false`<br><br> 是否只是叶子节点：<br><br> `leafOnly: false`<br><br> 是否包含半选节点：<br><br> `includeHalfChecked: false`<br><br> 下拉树的数据：<br><br> `data:[]`<br><br> 下拉树的props：<br><br> `props: {`<br> `children: 'children',`<br> `label: 'name',`<br> `value: 'flowId',`<br> `disabled: 'disabled'`<br> `}`|
|children|-|—|`false`|-|
|label|-|—|`false`|-|
|code|-|—|`false`|-|
|value|-|—|`false`|-|
|disabled|-|—|`false`|-|



### Events
|Event Name|Description|Parameters|
|---|---|---|
|searchFun|对外抛出搜索方法，自行判断是走后台查询，还是前端过滤<br> 前端过滤：this.$refs.treeSelect.$refs.tree.filter(value);<br> 后台查询：this.$refs.treeSelect.treeDataUpdateFun(data);|-|
|node-click|点击节点，对外抛出   `data, node, vm`<br> `data:` 当前点击的节点数据<br> `node:` 当前点击的node<br> `vm:` 当前组件的vm|-|
|check|点击复选框，对外抛出   `data, node, vm`<br> `data:` 当前点击的节点数据<br> `node:` 当前点击的node<br> `vm:` 当前组件的vm|-|
|removeTag|-|-|
|input|下拉框清空，对外抛出``this.$emit('input', multiple ? [] : '');`|-|
|select-clear|下拉框清空，对外抛出``this.$emit('select-clear');`|-|



### Methods
|Method|Description|Parameters|
|---|---|---|
|treeDataUpdateFun|树列表更新数据|Array|
|filterFun|本地过滤方法|String|