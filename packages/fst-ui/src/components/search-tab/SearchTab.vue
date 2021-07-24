<template>
  <div class="fst-search-tab">
    <div
      v-for="(d, k) of list"
      @click="change(d, k)"
      :key="k"
      :class="k === index ? 'fst-search-tab__active' : ''"
    >
      {{ d[prop.name] }}
    </div>
  </div>
</template>

<script>
export default {
  name: 'CwSearchTab',
  props: {
    // 展示在第几行
    rowNum: {
      type: [Number],
      default: 0
    },
    list: {
      type: Array,
      default() {
        return []
      }
    },
    prop: {
      type: Object,
      default: () => ({ name: 'name', id: 'id' })
    },
    value: {
      type: [String, Number],
      default: null
    }
  },
  watch: {
    list: {
      handler(val) {
        if (val.length) {
          this.init()
        }
      },
      deep: true
    }
  },
  model: {
    prop: 'value',
    event: 'model'
  },
  data() {
    return {
      index: 0,
      name: ''
    }
  },
  mounted() {
    if (this.list.length) {
      this.init()
    }
  },
  methods: {
    init() {
      const index = this.list.findIndex(
        (item) => item[this.prop.id] === this.value
      )
      index >= 0 ? (this.index = index) : (this.index = 0)
      this.name = this.list[this.index][this.prop.name]
    },
    change(v, k) {
      this.index = k
      this.name = v[this.prop.name]
      this.$emit('model', v[this.prop.id])
      this.$emit('change', this.rowNum, v)
    }
  }
}
</script>

