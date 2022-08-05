<template>
  <div class="app-container">
    <!-- 头部 -->
    <headSearch
      :dropDown="true"
      orderLabel="工单编号"
      stateLabel="工单状态"
      :dropDownList="dropDownList"
    ></headSearch>
    <!-- 内容部分 -->
    <div class="contentMain">
      <!-- 按钮部分 -->
      <newImportButton :isImportBtn="true"></newImportButton>
      <!-- 表单部分 -->
      <tableModule
        :WorkOrderDate="WorkOrderDate ? WorkOrderDate : []"
      ></tableModule>
      <!-- 底部部分 -->
      <div class="bottom">
        <div class="info">共942条记录 第 1/95 页</div>
        <div class="change">
          <el-button>上一页</el-button>
          <el-button>下一页</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import headSearch from '@/components/headSearch'
import newImportButton from '@/components/newImportBtn'
import tableModule from '@/components/tableModule'
import { taskSearch } from '@/api'
export default {
  data() {
    return {
      formInline: {
        user: '',
        region: '',
      },
      // 下拉数据
      dropDownList: ['待办', '进行', '取消', '完成'],
      // 表单数据
      WorkOrderDate: [],
    }
  },

  created() {
    // 获取工单数据
    this.taskSearch()
  },

  methods: {
    // 获取工单数据
    async taskSearch() {
      try {
        const { data } = await taskSearch({ isRepair: false })
        data?.currentPageRecords?.forEach((item) => {
          item.createType = item.createType === 0 ? '自动' : '手动'
          item.operation = '查看详情'
          item.createTime = item.createTime.replace('T', ' ')
        })
        this.WorkOrderDate = data.currentPageRecords
        console.log(this.WorkOrderDate[0].createTime)
      } catch (error) {
        console.log(error)
      }
    },
  },
  components: {
    headSearch,
    newImportButton,
    tableModule,
  },
}
</script>

<style scoped lang="scss">
// 主体内容部分
.contentMain {
  padding: 20px 15px 19px 17px;
  background-color: #fff;
  // 底部功能
  .bottom {
    padding: 20px 40px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .info {
      color: #dbdfe5;
    }
    .change {
      ::v-deep .el-button:nth-child(1) {
        margin-right: 40px;
      }
    }
  }
}
</style>
