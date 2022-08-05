<template>
  <div class="appBtn">
    <el-button type="primary" class="newBtn">
      <i class="el-icon-circle-plus-outline"></i>
      新建</el-button
    >
    <el-button type="primary" plain class="importBtn" v-if="isImportBtn"
      >导入数据</el-button
    >
  </div>
</template>

<script>
export default {
  props: {
    isImportBtn: {
      type: Boolean,
      required: true,
    },
  },
  data() {
    return {}
  },

  created() {},

  methods: {},
}
</script>

<style scoped lang="scss">
.appBtn {
  margin-bottom: 20px;
  background-color: #fff;
  .el-button {
    padding: 0;
    width: 80px;
    height: 36px;
    border: 0;
  }
  .newBtn {
    background: linear-gradient(135deg, #ff9743, #ff5e20) !important;

    &:hover {
      background: linear-gradient(135deg, #ff7d43, #db3602) !important;
    }
  }
  .importBtn {
    color: #655b56 !important;
    background-color: #fbf4f0 !important;
    &:hover {
      background-color: #f3e7e1 !important;
    }
  }
}
</style>
