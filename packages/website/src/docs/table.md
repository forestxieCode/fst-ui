## SearchTab Table
开发者：（谢森林）<br/>
将表格常用的功能进行了整合封装，能高效完成常规业务开发

### 基础用法
简单使用
:::demo 只显示表头与数据
```html
<template>
  <div style="height: 100px;">
    <fst-table :columns="columns" :data="data" :pagination="false"/>
  </div>
</template>

<script>
export default {
  data() {
    return {
      columns: Object.freeze([
        {
          label: '姓名',
          prop: 'name'
        },
        {
          label: '性别',
          prop: 'sex',
          // 格式化表格,与element-ui 的表格属性相同
          formatter(row, column, cellValue) {
            return cellValue === 1 ? '男' : '女'
          }
        },
        {
          label: '年龄',
          prop: 'age'
        }
      ]),
      data: [
        {
          name: '森林',
          sex: 1,
          age: 18
        }
      ],
      // 是否显示多选框
      selectable: true,
      // 是否显示序号列
      sequence: true
    }
  }
}
</script>
```
:::


### 使用分页
使用分页
:::demo 显示分页组件，配置参数
```html
<template>
  <fst-table
    v-loading="loading"
    :columns="columns"
    :data="data"
    :current-page.sync="currentPage"
    :page-size.sync="pageSize"
    :total="total"
    height="auto"
    @page-change="$_handlePageChange"
  />
</template>
<script>
export default {
  data() {
    return {
      columns: Object.freeze([
        {
          label: '姓名',
          prop: 'name'
        },
        {
          label: '性别',
          prop: 'sex',
          // 格式化表格,与element-ui 的表格属性相同
          formatter(row, column, cellValue) {
            return cellValue === 1 ? '男' : '女'
          }
        },
        {
          label: '年龄',
          prop: 'age'
        }
      ]),
      data: [],
      // 当前页码
      currentPage: 1,
      // 每页条数
      pageSize: 10,
      // 总条数
      total: 0,
      loading: false
    }
  },
  created() {
    this.loadData()
  },
  methods: {
    // 加载表格数据
    loadData() {
      this.loading = true
      setTimeout(() => {
        this.total = 40
        const { currentPage, pageSize } = this
        this.data = new Array(pageSize).fill({}).map((item, index) => {
          return {
            name: `森林${currentPage + (index + 1) * 10}`,
            sex: Math.random() > 0.5 ? 1 : 0,
            age: Math.floor(Math.random() * 100)
          }
        })
        this.loading = false
      }, 1000)
    },
    $_handlePageChange() {
      // 因为上面设置属性指定了.sync,所以这两个属性会自动变化
      console.log(this.pageSize, this.currentPage)
      this.loadData()
    }
  }
}
</script>
```
:::

### 顶部按钮与行操作按钮
使用顶部按钮与行操作按钮
:::demo 顶部按钮与行操作按钮
```html
<template>
  <div style="height: 300px;">
    <fst-table
      v-loading="loading"
      :columns="columns"
      :data="data"
      :current-page.sync="currentPage"
      :page-size.sync="pageSize"
      :total="total"
      :buttons="buttons"
      @page-change="$_handlePageChange"
    />
  </div>
</template>
<script>
export default {
  data() {
    return {
      columns: Object.freeze([
        {
          // 可以指定列的宽度，与element-ui原生用法一致
          width: 220,
          label: '姓名',
          prop: 'name'
        },
        {
          label: '性别',
          prop: 'sex',
          // 格式化表格,与element-ui 的表格属性相同
          formatter(row, column, cellValue) {
            return cellValue === 1 ? '男' : '女'
          }
        },
        {
          label: '年龄',
          prop: 'age'
        },
        {
          label: '公众号',
          prop: 'officialAccount'
        },
        // 行编辑按钮，在表格末尾出现，自动锁定右侧
        {
          width: 180,
          label: '操作',
          actions: [
            {
              id: 'follow',
              text: '添加好友',
              click: this.$_handleFollowAuthor
            },
            {
              id: 'edit',
              text: '编辑',
              // 可以通过before控制按钮是否显示，比如下面年龄四十岁的才会显示编辑按钮
              before(row) {
                return row.age < 40
              },
              click: this.$_handleEdit
            },
            {
              id: 'delete',
              text: '删除',
              icon: 'el-icon-delete',
              disabled(row) {
                return row.sex === 0
              },
              // 为了拿到this,这里需要用箭头函数
              click: () => {
                this.$alert('女生被禁止删除了')
              }
            }
          ]
        }
      ]),
      data: [],
      // 当前页码
      currentPage: 1,
      // 每页条数
      pageSize: 10,
      // 总条数
      total: 0,
      loading: false,
      buttons: Object.freeze([
        {
          // id 必须有而且是在当前按钮数组里面是唯一的
          id: 'add',
          text: '新增',
          type: 'primary',
          icon: 'el-icon-circle-plus',
          click: this.$_handleAdd
        },
        {
          id: 'delete',
          text: '删除',
          // rows 是表格选中的行，如果没有选中行，则禁用删除按钮, disabled可以是一个boolean值或者函数
          disabled: rows => !rows.length,
          click: this.$_handleRemove
        },
        {
          id: 'auth',
          text: '这个按钮根据权限显示',
          // 可以通过返回 true/false来控制按钮是否显示
          before: (/** rows */) => {
            return true
          }
        },
        {
          id: 'dropdown',
          text: '下拉按钮',
          children: [
            {
              id: 'moveUp',
              text: '上移',
              icon: 'el-icon-arrow-up',
              click: () => {
                console.log('上移')
              }
            },
            {
              id: 'moveDown',
              text: '下移',
              icon: 'el-icon-arrow-down',
              disabled: rows => !rows.length,
              click: () => {
                console.log('下移')
              }
            }
          ]
        }
      ])
    }
  },
  created() {
    this.loadData()
  },
  methods: {
    // 加载表格数据
    loadData() {
      this.loading = true
      setTimeout(() => {
        this.total = 40
        const { currentPage, pageSize } = this
        this.data = new Array(pageSize).fill({}).map((item, index) => {
          return {
            id: currentPage + (index + 1) * 10,
            name: `森林${currentPage + (index + 1) * 10}`,
            sex: Math.random() > 0.5 ? 1 : 0,
            age: Math.floor(Math.random() * 100),
            officialAccount: '前端Sir'
          }
        })
        this.loading = false
      }, 1000)
    },
    $_handlePageChange() {
      // 因为上面设置属性指定了.sync,所以这两个属性会自动变化
      console.log(this.pageSize, this.currentPage)
      this.loadData()
    },
    // 新增
    $_handleAdd() {
      this.$alert('点击了新增按钮')
    },
    // 顶部按钮会自动将表格所选的行传出来
    $_handleRemove(rows) {
      const ids = rows.map(({ id }) => id)
      this.$alert(`要删除的行id为${ids.join(',')}`)
    },
    // 关注作者公众号
    $_handleFollowAuthor() {
      const image = require('../assets/images/qrcode.png')
      const h = this.$createElement
      this.$msgbox({
        title: '扫码添加',
        message: h('img', {
          attrs: {
            src: image
          },
          style: {
            width: '400px'
          }
        })
      })
    },
    /**
     * row 这一行的数据
     */
    $_handleEdit(row, column) {
      console.log(row, column)
      this.$alert(`点击了姓名为【${row.name}】的行上的按钮`)
    }
  }
}
</script>
```
:::

### 按钮插槽
按钮使用插槽
:::demo 按钮使用插槽
```html
<template>
  <div style="height: 300px;">
    <fst-table
      v-loading="loading"
      :columns="columns"
      :data="data"
      :current-page.sync="currentPage"
      :page-size.sync="pageSize"
      :total="total"
      :buttons="buttons"
      @page-change="$_handlePageChange"
    >
      <template #button="{id}">
        <template v-if="id === 'slot'">
          <el-button type="primary" size="small">
            自定义顶部按钮
          </el-button>
        </template>
      </template>

      <template #action="{id}">
        <template v-if="id === 'slot'">
          <el-button type="text" size="small">
            自定义操作按钮
          </el-button>
        </template>
      </template>
    </fst-table>
  </div>
</template>
<script>
export default {
  data() {
    return {
      columns: Object.freeze([
        {
          // 可以指定列的宽度，与element-ui原生用法一致
          width: 220,
          label: '姓名',
          prop: 'name'
        },
        {
          label: '性别',
          prop: 'sex',
          // 格式化表格,与element-ui 的表格属性相同
          formatter(row, column, cellValue) {
            return cellValue === 1 ? '男' : '女'
          }
        },
        {
          label: '年龄',
          prop: 'age'
        },
        {
          label: '好友',
          prop: 'officialAccount'
        },
        // 行编辑按钮，在表格末尾出现，自动锁定右侧
        {
          width: 220,
          label: '操作',
          actions: [
            {
              id: 'follow',
              text: '添加好友',
              click: this.$_handleFollowAuthor
            },
            {
              id: 'slot',
              useSlot: true
            }
          ]
        }
      ]),
      data: [],
      // 当前页码
      currentPage: 1,
      // 每页条数
      pageSize: 10,
      // 总条数
      total: 0,
      loading: false,
      buttons: Object.freeze([
        {
          // id 必须有而且是在当前按钮数组里面是唯一的
          id: 'add',
          text: '新增',
          type: 'primary',
          icon: 'el-icon-circle-plus',
          click: this.$_handleAdd
        },
        {
          id: 'slot',
          useSlot: true
        }
      ])
    }
  },
  created() {
    this.loadData()
  },
  methods: {
    // 加载表格数据
    loadData() {
      this.loading = true
      setTimeout(() => {
        this.total = 40
        const { currentPage, pageSize } = this
        this.data = new Array(pageSize).fill({}).map((item, index) => {
          return {
            id: currentPage + (index + 1) * 10,
            name: `森林${currentPage + (index + 1) * 10}`,
            sex: Math.random() > 0.5 ? 1 : 0,
            age: Math.floor(Math.random() * 100),
            officialAccount: '前端Sir'
          }
        })
        this.loading = false
      }, 1000)
    },
    $_handlePageChange() {
      // 因为上面设置属性指定了.sync,所以这两个属性会自动变化
      console.log(this.pageSize, this.currentPage)
      this.loadData()
    },
    // 新增
    $_handleAdd() {
      this.$alert('点击了新增按钮')
    }
  }
}
</script>
```
:::

### 表格行编辑
表格行编辑
:::demo 表格行编辑
```html
<template>
  <div style="height: 150px;">
    <fst-table
      ref="table"
      :columns="columns"
      :data="data"
      :pagination="false"
      :selectable="selectable"
      :sequence="sequence"
    />
  </div>
</template>
<script>
export default {
  data() {
    return {
      columns: Object.freeze([
        {
          label: '姓名',
          prop: 'name',
          editable: true,
          field: {
            componentType: 'input',
            rules: [
              {
                required: true,
                message: '请输入姓名'
              }
            ]
          }
        },
        {
          label: '性别',
          prop: 'sex',
          // 格式化表格,与element-ui 的表格属性相同
          formatter(row, column, cellValue) {
            return cellValue === '1' ? '男' : '女'
          },
          editable: true,
          field: {
            componentType: 'select',
            options: [
              {
                label: '男',
                value: '1'
              },
              {
                label: '女',
                value: '0'
              }
            ]
          }
        },
        {
          label: '年龄',
          prop: 'age',
          editable: true,
          field: {
            componentType: 'number'
          }
        },
        {
          label: '操作',
          actions: [
            {
              id: 'edit',
              text: '编辑',
              before: row => {
                return !this.editIds.includes(row.id)
              },
              click: this.$_handleEdit
            },
            {
              id: 'save',
              text: '保存',
              before: row => {
                return this.editIds.includes(row.id)
              },
              click: this.$_handleSave
            }
          ]
        }
      ]),
      data: [
        {
          // 行编辑必须指定rowKey字段，默认是id,如果修改为其他字段，需要给表格指定row-key="字段名"
          id: '0',
          name: '森林',
          sex: '1',
          age: 18
        },
        {
          // 行编辑必须指定rowKey字段，默认是id,如果修改为其他字段，需要给表格指定row-key="字段名"
          id: '1',
          name: '森林1',
          sex: '0',
          age: 18
        }
      ],
      // 是否显示多选框
      selectable: true,
      // 是否显示序号列
      sequence: true,
      editIds: []
    }
  },
  methods: {
    $_handleEdit(row) {
      // 通过调用 startEditRow 可以开启行编辑
      this.$refs.table.startEditRow(row.id)
      // 记录开启了行编辑的id
      this.editIds.push(row.id)
    },
    $_handleSave(row) {
      this.$refs.table.endEditRow(row.id, (valid, result, oldRow) => {
        if (valid) {
          const index = this.editIds.findIndex(item => item === row.id)
          this.editIds.splice(index, 1)
        } else {
          // 如果校验失败，则返回校验的第一个输入框的异常信息
          console.log(result)
          this.$message.error(result.message)
        }
      })
    }
  }
}
</script>
```
:::


### Table Attributes
| 参数 | 说明 | 类型 | 默认值 |
-|-|-|-
| columns | 表格列,详见字段属性说明 | `Array<Object>` | `[]`
| buttons| 表格上方的按钮，详见按钮字符说明| `Array<Object>` | `[]`
| pagination | 是否启用分页  | `Boolean` | `false`
| pageSize | 分页后每页条数 | `Number` | `10`
| total | 分页后数据总条数  | `Number` | `0`
| currentPage | 分页后当前页码 | `Number` | `0`
| selectable | 表格是否显示复选框 | `Boolean` | `true`
| sequence | 表格前是否显示序号列 | `Boolean` | `false`
| height | 表格高度,只有在特定情况下使用 | `Number | String | auto`

### Table Event
*表格除了以下事件外，可以使用element ui 表格组件的其他所有事件*
| 事件名 | 说明 | 参数
-|-|-
| query | 有搜索字段后点击搜索按钮触发 | `formData`:输入的搜索条件
| page-change | 用户修改分页条数，页码等触发 | -
| selection-change | 用户修改复选框选中的行时触发 | `selection`: 选中的行数据
| current-change | 用户点击行时触发 | `current`: 点击的行数据
| sort-change | 在启用表头排序后排序状态发生变化触发 | -

### Table Function
| 方法名 | 说明 | 参数 | 返回值
-|-|-|-
| startEditRow | 开始行编辑 | `index`: 编辑的行索引 | -
| endEditRow | 结束行编辑 | `callback(valid, data, rows)`: 回调函数， valid: 行编辑验证是否成功 data: 验证成功行编辑数据，失败时为失败原因 rows: 编辑的这一行的原始数据| -
| isEditRow | 当前表格是否正在行编辑 | - | `result:Boolean`
| cancelEditRow | 取消行编辑 | - | -
| getSelectionRows | 获取复选框选中的行 | - | `rows:Array<row>` |
| getCurrentRow | 获取点击行选中的行 | - | `row:Object`
| setCurrentRow | 单行选中时设置选中的行 | `row:Object`| -
| getEditFieldValues | 获取正在编辑的行的数据 | - | `data:Object`
| setEditFieldValues | 设置正在编辑行的数据 | `data:Object` | -
| toggleRowSelection | 启用复选后切换行的选中状态 | `row: Object, select: Boolean` | -
| resetQueryFields | 重置搜索条件 | - | -
| doLayout | 重新布局表格,当表格父容器由隐藏状态变为显示时，可能表格布局会错乱 | - | -

### Slot
| 插槽 | 说明 | 参数 |
-|-|-
| column | 表格列插槽，可以自定义表格列渲染方式 | `{row,column,prop,cellValue,$index,field}`  `field`为行编辑字段信息
| header | 自定义表格表头显示方式 | `{label,prop,column, $index, field }`
| button | 自定义表头顶部按钮 | `{button, selectedRow}`  `selectedRow`为选中的表格行数据
| toolbar| 自定义顶部工具条, 工具条会放在左侧按钮与右侧搜索区域中间 | -

### Column Attributes
*列属性除以下属性外，elementui 列其他属性均可使用*

| 参数 | 说明 | 类型 | 默认值 |
-|-|-|-
| label | 列名 | `String` | -
| prop | 列属性 | `String` | -
| width | 表头宽度 | `Number` | -
| sortable | 是否排序列 | `Boolean` | `false`
| formatter | 单个元格式化 | `(row,column,cellValue):String`| -
| nests | 嵌套列  | `Array<Column>` | -
| events | 单元格事件，见elementui单元格事件 | `Object<Event>` | -
| actions | 操作列，详见操作列属性 | `Array<Object> ` | -
| editable | 是否可编辑行 | `Boolean` | `false`
| field | 行编辑字符，详见行编辑字段属性 | `Object` | -
| beforeEdit | 当前单元格开启编辑时调用，返回true则开启编辑 | `(row,column,cellValue,index):Boolean`
|useSlot | 是否在当前列使用插槽，插槽名称为 `column` | `Boolean` | `false`
| hidden | 是否隐藏当前列 | `Boolean|Function` | `false`

### Table HeadBtn  Attributes
*表头按钮除以下属性外，elementui 按钮其他属性均可使用*
| 参数 | 说明 | 类型 | 默认值 |
-|-|-|-
| id | 按钮唯一标识，必填 | `String|Number` | -
| text| 按钮显示文字 | `String` | -
| icon | 按钮显示图标 | `String` | -
| click | 点击按钮事件,传入选中的行数据 | `(rows):void` | -

#### row Button Attributes
| 参数 | 说明 | 类型 | 默认值 |
-|-|-|-
| id | 按钮唯一标识，必填 | `String|Number` | -
| text | 按钮冒泡显示的文字 | `String` | -
| icon | 按钮图标，必填 | `String` | -
| before | 按钮渲染前调用，返回false不渲染按钮 | `(row,column,index):Boolean` | -
| click | 点击按钮事件 | `(row,column,index):void` | -
