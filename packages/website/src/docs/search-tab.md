## SearchTab 搜索框
开发者：（谢森林）<br/>
用于页面的数据查询，以及表单提交，只需传递匹配的数据，在操作之后会通过事件拿到所操作的值。

### 基础用法
简单使用
:::demo 要使用它，只需要在`search-tab`元素中使用`v-model`绑定变量即可，列表数据通过`list`属性传递。
```html
<template>
  <div class="demo-search-tab-box">
    <span class="demo-search-tab-title">区域：</span>
    <fst-search-tab v-model="searchValue" :list="data"></fst-search-tab>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        searchValue: null,
        data: [
          {id: 1, name: '湖南'},
          {id: 2, name: '湖北'},
          {id: 3, name: '山东'},
          {id: 4, name: '深圳'},
          {id: 5, name: '上海'},
          {id: 6, name: '北京'}
        ]
      };
    }
  };
</script>
```
:::

:::tip
 在一般搜索页面存在多个条件查询。如果每一个就是`fst-search-tab`，那么代码会显得有点臃肿，所有在这基础上再封装一层`fst-search-tab-group`,支持多条件查询。
:::

### SearchTabGroup用法
当需要多个`search-tab`时，可以使用`search-tab-group`多行显示 
:::demo 使用`search-tab-group`多行显示
```html
<template>
  <fst-search-tab-group :searchOption="searchOption" @change="changeHandle"></fst-search-tab-group>
</template>
<script>
  export default {
    data() {
      return {
        searchOption: {
          type: {
            autoAddAll: true,
            data: [
              { name: '课件', id: 3 },
              { name: '教案', id: 8 },
              { name: '试卷', id: 7 },
              { name: '学案', id: 4 },
              { name: '资源包', id: 11 },
              { name: '素材', id: 6 },
              { name: '视频', id: 12 }
            ],
            name: '资源类型'
          },
          resourceFormat: {
            data: [
              {
                name: '文档',
                id: 1
              },
              {
                name: '视频',
                id: 2
              },
              {
                name: '音频',
                id: 3
              },
              {
                name: '图片',
                id: 4
              }
            ],
            name: '资源格式'
          },
          shareType: {
            name: '资源来源',
            require: true,
            defaultValue: 1,
            data: [
              {
                name: '私有',
                id: 0
              },
              {
                name: '校本',
                id: 1
              },
              {
                name: '云端',
                id: 2
              }
            ]
          }
        }
      };
    },
    methods: {
      changeHandle(val) {
        console.log(val)
      }
    }
  };
</script>
```
:::


### 展示已选中的名字
展示已选择的名字

:::demo 可使用`unfoldOption`属性进行配置
```html
<template>
  <fst-search-tab-group :searchOption="searchOption" :unfoldOption="unfoldOption" @change="changeHandle"></fst-search-tab-group>
</template>
<script>
  export default {
    data() {
      return {
        unfoldOption: { name: '您已选择', unfold: true },
        searchOption: {
          type: {
            autoAddAll: true,
            data: [
              { name: '课件', id: 3 },
              { name: '教案', id: 8 },
              { name: '试卷', id: 7 },
              { name: '学案', id: 4 },
              { name: '资源包', id: 11 },
              { name: '素材', id: 6 },
              { name: '视频', id: 12 }
            ],
            name: '资源类型'
          },
          resourceFormat: {
            data: [
              {
                name: '文档',
                id: 1
              },
              {
                name: '视频',
                id: 2
              },
              {
                name: '音频',
                id: 3
              },
              {
                name: '图片',
                id: 4
              }
            ],
            name: '资源格式'
          },
          shareType: {
            name: '资源来源',
            data: [
              {
                name: '私有',
                id: 0
              },
              {
                name: '校本',
                id: 1
              },
              {
                name: '云端',
                id: 2
              }
            ]
          }
        }
      };
    },
    methods: {
      changeHandle(val) {
        console.log(val)
      }
    }
  };
</script>
```
:::


### 请求接口且联动
当第一排改变，下面几排也跟着相应的改变

:::demo 添加url地址和linkage属性
```html
<template>
  <fst-search-tab-group :searchOption="searchOption" :request="request" @change="changeHandle"></fst-search-tab-group>
</template>
<script>
  export default {
    data() {
      return {
        request: this.$axios,
        searchOption: {
          stageId: {
            require: true,
            name: '学段',
            url: 'https://test.cunwedu.com.cn/teachingresource/v1/resource-common/getPeriod',
            linkage: true
          },
          subjectId: {
            require: true,
            name: '学科',
            url: 'https://test.cunwedu.com.cn/teachingresource/v1/resource-common/getSubjects',
            linkage: true
          },
          versionId: {
            require: true,
            name: '版本',
            linkage: true,
            url: 'https://test.cunwedu.com.cn/teachingresource/v1/resource-common/getVersions'
          },
          bookId: {
            require: true,
            name: '册别',
            url: 'https://test.cunwedu.com.cn/teachingresource/v1/resource-common/getTextBooks'
          }
        },
      };
    },
    methods: {
      changeHandle(val) {
        console.log(val)
      }
    }
  };
</script>
```
:::

:::tip
 注意：如果是接口请求数据，那么必须传一个`request`属性，对应的就是本项目的axios
:::

### searchOption 内的 Attributes

| 参数    | 说明                                  | 类型   | 可选值                                      | 默认值 |
| ------- | ------------------------------------- | ------ | ------------------------------------------- | ------ |
| name    | 标签名字                               | string | 必填                                        | —      |
| data    | 展示的默认数据非接口数据                | arroy   |  —                                         | —      |
| url     | 请求的接口地址与data属性互斥            | string  | —                                          | —      |
| require | 必选标记                               | blooen  | false/true                                 | false  |
| autoAddAll | 是否需要添加全部选项                 | blooen | false/true                                  | false  |
| defaultValue | 默认值                            | number  | —                                         | —     |
| prop    | 自定义数据格式                          | object  | —                          | {id:'id', name:'name'} |


### unfoldOption 内的 Attributes

| 参数    | 说明                                  | 类型   | 可选值                                      | 默认值 |
| ------- | ------------------------------------- | ------ | ------------------------------------------- | ------ |
| name    | 标题名字                               | string | 必填                                        | —      |
| unfold  | 是否需要展开                           | blooen   |  false/true                               | false  |


### Events

| 事件名称           | 说明             | 回调参数                                     |
| -------------- | -------------- | ---------------------------------------- |
| change     | 当search-tab点击时出发   | 回调一个object数据，分对应着每一个search-tab选择的值 |