<template>
  <el-dialog title="提示" :visible="dialogVisible" @close="onClose" width="30%">
    <span>这是一段信息</span>
    <span slot="footer" class="dialog-footer">
      <el-button>取 消</el-button>
      <el-button type="primary">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
export default {
  props: {
    dialogVisible: {
      type: Boolean,
      required: true,
    },
  },
  data() {
    return {}
  },

  created() {},

  methods: {
    onClose() {
      this.$emit('update:dialogVisible', false)
    },
  },
}
</script>

<style scoped lang="less"></style>
