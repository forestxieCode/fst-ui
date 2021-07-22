<template>
  <div class="cw-search-tab-group">
    <div v-if="unfoldOption.unfold" class="search-box-info">
      <div class="left">
        {{ unfoldOption.name }}：<span
          class="search-item"
          v-for="(refItme, indx) in allChildRef"
          :key="indx"
          >{{ refItme.name }} {{ indx === allChildRef.length - 1 ? '' : '>' }}
        </span>
      </div>
      <span class="unfold" @click="unfold = !unfold"
        >{{ unfold ? '收起' : '展开' }}
        <i :class="unfold ? 'close' : 'open'" class="el-icon-d-arrow-right"></i
      ></span>
    </div>
    <div
      v-loading="loading"
      element-loading-text="正在请求资源..."
      :class="`search-warp search-warp-${unfold ? 'unfold' : 'close'} `"
      ref="searchWarp"
    >
      <div
        v-for="(value, key, index) in copyNewListObj"
        :key="key"
        ref="searchContainer"
        :class="`search-container flex flex-between ${
          searchOption[key].unfold ? 'unfold' : ''
        }`"
      >
        <div class="flex">
          <span class="tit">
            <span v-if="searchOption[key].require" style="color: #e50013"
              >*</span
            >
            {{ searchOption[key].name }}：</span
          >
          <cw-search-tab
            :rowNum="index"
            :list="value"
            :prop="searchOption[key].prop || { name: 'name', id: 'id' }"
            ref="searchTab"
            class="searchTab"
            v-model="copySearchData[key]"
            @change="getSearchTabData"
          ></cw-search-tab>
        </div>
        <span
          style="display: none"
          class="more"
          @click="searchOption[key].unfold = !searchOption[key].unfold"
          >{{ searchOption[key].unfold ? '收起' : '更多' }}
          <i
            :class="searchOption[key].unfold ? 'close' : 'open'"
            class="el-icon-d-arrow-right"
          ></i
        ></span>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'CwSearchTabGroup',
  props: {
    // 配置选项
    searchOption: {
      type: Object,
      require: true,
      default: () => ({})
    },
    // axios
    request: {
      type: Object | Function,
      default: () => ({})
    },
    // 展开的配置
    unfoldOption: {
      type: Object,
      default: () => ({
        name: '中考专区',
        unfold: false
      })
    }
  },
  data() {
    return {
      loading: false,
      copyNewListObj: {},
      copySearchData: {},
      unfold: true,
      allChildRef: []
    }
  },
  watch: {
    'searchOption.data': {
      handler: function () {
        this.init()
      },
      deep: true
    },
    'searchOption.defaultValue': {
      handler: function () {
        this.init()
      },
      deep: true
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    // 计算宽度是否展示更多
    initSearchWidth() {
      const searchBoxWidth = this.$refs.searchWarp.offsetWidth
      this.$refs.searchContainer.forEach((item) => {
        const titleNode = item.children[0].children[0]
        const searchNode = item.children[0].children[1]
        const moreNode = item.children[1]
        const titleWidth = titleNode.offsetWidth
        const width = searchBoxWidth - titleWidth - 34 - 50
        const searChildNode = item.children[0].children[1].childNodes
        const searChildNodeSum = Array.from(searChildNode).reduce(
          (sum, child) => (sum += child.offsetWidth),
          0
        )
        if (searChildNodeSum >= width) {
          moreNode.style.display = 'block'
        } else {
          moreNode.style.display = 'none'
        }
        searchNode.style.width = width + 'px'
      })
    },
    initSearchDataHandle() {
      this.copySearchData = {}
      // 过滤所需要的值
      Object.keys(this.searchOption).forEach((key) => {
        this.$set(
          this.copySearchData,
          [key],
          this.searchOption[key].defaultValue || null
        )
      })
    },
    initSearchTabListData() {
      // 给每个属性添加一个是否展开属性 并深拷贝
      this.copyNewListObj = {}
      Object.keys(this.searchOption).forEach((key) => {
        this.copyNewListObj[key] = JSON.parse(
          JSON.stringify(this.searchOption[key].data || [])
        )
        this.$set(this.searchOption[key], 'unfold', false)
      })
      // 获取接口数据
      this.getSearchTabData()
    },
    init() {
      this.initSearchDataHandle()
      this.initSearchTabListData()
      this.$nextTick(() => {
        if (this.unfoldOption.unfold) {
          this.allChildRef = this.$refs.searchTab
        }
      })
    },
    // 动态的获取接口数据
    async getSearchTabData(index) {
      const arr = Object.keys(this.searchOption)
      const commentFun = (index, key, propKey) => {
        if (this.copyNewListObj[key].length) {
          this.$set(
            this.copySearchData,
            [key],
            this.copyNewListObj[key][0][propKey]
          )
          if (index === undefined && this.searchOption[key].defaultValue) {
            this.$set(
              this.copySearchData,
              [key],
              this.searchOption[key].defaultValue
            )
          }
        }
      }
      this.loading = true
      for (let i = index + 1 || 0; i < arr.length; i++) {
        // 上一级的key
        const preKey = i === 0 ? null : arr[i - 1]
        const key = arr[i]
        const item = this.searchOption[key]
        const propKey =
          (this.searchOption[key].prop && this.searchOption[key].prop.id) ||
          'id'
        const propName =
          (this.searchOption[key].prop && this.searchOption[key].prop.name) ||
          'name'
        const autoAddAll = this.searchOption[key].autoAddAll || false
        // 判断 是否需要联动
        if (index !== undefined) {
          if (!this.searchOption[preKey].linkage) break
          // 如何选择全部就终止联动
          // if (this.copyNewListObj[key][0][key] === null) break;
        }
        if (item.url) {
          const { data } = await this.request({
            url: item.url,
            methods: 'get',
            params: { [preKey]: this.copySearchData[preKey] }
          })
          this.copyNewListObj[key] = data.data || []
          // 自动添加全部选项
          if (autoAddAll)
            this.copyNewListObj[key].unshift({
              [propKey]: null,
              [propName]: '全部'
            })
          commentFun(index, key, propKey)
        } else {
          // 非接口 初始化自动添加全部选项
          if (index === undefined && !item.url) {
            if (autoAddAll)
              this.copyNewListObj[key].unshift({
                [propKey]: null,
                [propName]: '全部'
              })
          }
          commentFun(index, key, propKey)
        }
      }
      this.loading = false
      this.$emit('change', this.copySearchData)
      this.$nextTick(() => {
        this.initSearchWidth()
      })
    }
  }
}
</script>
