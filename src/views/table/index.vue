<template>
  <div class="app-container">
    <!-- 头部 -->
    <headSearch
      :dropDown="true"
      orderLabel="工单编号"
      stateLabel="工单状态"
      :dropDownList="dropDownList"
    ></headSearch>
    123
  </div>
</template>

<script>
import headSearch from '@/components/headSearch/index.vue'
export default {
  data() {
    return {
      formInline: {
        user: '',
        region: '',
      },
      // 下拉数据
      dropDownList: ['待办', '进行', '取消', '完成'],
    }
  },

  created() {},

  methods: {},
  components: {
    headSearch,
  },
}
</script>

<style scoped lang="scss"></style>
