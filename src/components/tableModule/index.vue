<template>
  <el-table
    ref="singleTable"
    :data="WorkOrderDate"
    highlight-current-row
    @current-change="handleCurrentChange"
    style="width: 100%"
    :header-cell-style="{ background: '#f3f6fb' }"
    empty-text="暂时没有数据了"
  >
    <el-table-column type="index" width="100" label="序号"> </el-table-column>
    <el-table-column property="taskCode" label="工单编号" width="200">
    </el-table-column>
    <el-table-column property="innerCode" label="设备编号" width="200">
    </el-table-column>
    <el-table-column property="taskType.typeName" label="工单类型">
    </el-table-column>
    <el-table-column property="createType" label="工单方式"> </el-table-column>
    <el-table-column
      property="taskStatusTypeEntity.statusName"
      label="工单状态"
    >
    </el-table-column>
    <el-table-column property="userName" label="运营人员"> </el-table-column>
    <el-table-column property="createTime" label="创建日期"> </el-table-column>
    <el-table-column label="操作">
      <slot></slot>
      <!-- <template slot-scope="scope">
        <el-button @click="handleClick(scope.row)" type="text" size="small"
          >查看详情</el-button
        >
        <el-button type="text" size="small">编辑</el-button>
      </template> -->
    </el-table-column>
  </el-table>
</template>

<script>
export default {
  props: {
    WorkOrderDate: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      currentRow: null,
    }
  },

  methods: {
    setCurrent(row) {
      this.$refs.singleTable.setCurrentRow(row)
    },
    handleCurrentChange(val) {
      this.currentRow = val
    },
  },
}
</script>

<style scoped lang="scss">
::v-deep.el-table--enable-row-transition .el-table__body td {
  border: 0;
}
::v-deep.el-table::before {
  height: 0 !important;
}
::v-deep.el-table th.is-leaf {
  border: 0 !important;
}
::v-deep .el-table__row .el-table_1_column_9 .cell {
  color: #5f84ff;
  cursor: pointer;
}
</style>
