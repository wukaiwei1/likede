<template>
  <div class="app-container">
    <!-- 头部 -->
    <headSearch
      :dropDown="true"
      orderLabel="工单编号"
      stateLabel="工单状态"
      :dropDownList="dropDownList"
      :formInline="formInline"
      @click="submit"
    ></headSearch>
    <!-- 内容部分 -->
    <div class="contentMain">
      <!-- 按钮部分 -->
      <newImportButton :isImportBtn="true"></newImportButton>
      <!-- 表单部分 -->
      <tableModule
        :WorkOrderDate="
          WorkOrderDate.currentPageRecords
            ? WorkOrderDate.currentPageRecords
            : []
        "
      >
        <el-button @click="handleClick" type="text" size="small"
          >查看详情</el-button
        >
      </tableModule>
      <!-- 底部部分 -->
      <div class="bottom">
        <div class="info">
          共{{ WorkOrderDate.totalCount }}条记录 第
          {{ WorkOrderDate.pageIndex }}/{{ WorkOrderDate.totalPage }} 页
        </div>
        <div class="change">
          <el-button @click="previousPage" :disabled="isdisable"
            >上一页</el-button
          >
          <el-button @click="getNextPage" :disabled="nextDisable"
            >下一页</el-button
          >
        </div>
      </div>
    </div>
    <!-- 详情对话框 -->
    <My-dialog :dialogVisible.sync="dialogVisible"></My-dialog>
  </div>
</template>

<script>
import headSearch from '@/components/headSearch'
import newImportButton from '@/components/newImportBtn'
import tableModule from '@/components/tableModule'
import { taskSearch } from '@/api'
import MyDialog from './components/dialog.vue'
export default {
  data() {
    return {
      formInline: {
        userCode: '',
        region: '',
      },
      // 下拉数据
      dropDownList: ['待办', '进行', '取消', '完成'],
      // 表单数据
      WorkOrderDate: [],
      taskSearchData: {
        // 当前页码
        pageIndex: 1,
        // 设备编号
        innerCode: '',
        // 工单所属人ID
        userId: '',
        // 工单编号
        taskCode: '',
        // 工单状态 1:代办,2:进行,3:取消,4:完成
        status: '',
        // 是否是维修工单
        isRepair: false,
      },
      // 按钮禁用
      nextDisable: false,
      // 控制对话框显隐
      dialogVisible: false,
    }
  },

  created() {
    // 获取工单数据
    this.taskSearch(this.taskSearchData)
  },

  methods: {
    // 获取工单数据
    async taskSearch(taskData) {
      try {
        const { data } = await taskSearch(taskData)
        data?.currentPageRecords?.forEach((item) => {
          item.createType = item.createType === 0 ? '自动' : '手动'
          item.createTime = item.createTime
            .replace('T', ' ')
            .replace('-', '.')
            .replace('-', '.')
        })
        this.WorkOrderDate = data
        console.log(data)
      } catch (error) {
        console.log(error)
      }
    },
    // 点击获取工单详情
    handleClick(e) {
      //  显示对话框
      this.dialogVisible = true
    },
    // 下一页
    getNextPage() {
      //总页数-当前页
      let numIndex =
        parseInt(this.WorkOrderDate.totalPage) -
        parseInt(this.WorkOrderDate.pageIndex)
      // 当数据长度不足10时,禁用点击按钮
      if (numIndex === 1) {
        this.nextDisable = true
      }
      this.taskSearchData.pageIndex++
      // 获取工单数据
      this.taskSearch(this.taskSearchData)
    },
    // 上一页
    previousPage(e) {
      this.taskSearchData.pageIndex--
      // 获取工单数据
      this.taskSearch(this.taskSearchData)
    },
    // 点击搜索
    submit(data) {
      // 编号
      this.taskSearchData.taskCode = data.userCode
      // 工单状态 1:代办,2:进行,3:取消,4:完成
      // 处理数据
      switch (data.region) {
        case '待办':
          this.taskSearchData.status = 1
          break
        case '进行':
          this.taskSearchData.status = 2
          break
        case '取消':
          this.taskSearchData.status = 3
          break
        case '完成':
          this.taskSearchData.status = 4
          break
        default:
          this.taskSearchData.status = ''
          break
      }
      console.log(data.region)
      // 获取工单数据
      this.taskSearch(this.taskSearchData)
    },
  },
  components: {
    headSearch,
    newImportButton,
    tableModule,
    MyDialog,
  },
  computed: {
    isdisable() {
      return this.WorkOrderDate?.pageIndex <= 1 ? true : false
    },
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
// 按钮禁用
</style>
