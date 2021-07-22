import SearchTab from '../SearchTab.vue'
import { mount } from '@vue/test-utils'

describe('SearchTab.vue', () => {
  it('list data will should render', () => {
    const wrapper = mount(SearchTab, {
      propsData: {
        list: [
          { name: '张三', id: 1 },
          { name: '王明', id: 2 }
        ]
      }
    })
    expect(wrapper.find('.cw-search-tab div').text()).toEqual('张三')
  })
})
