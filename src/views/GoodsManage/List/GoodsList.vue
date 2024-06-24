
<template>
<div class="list">
  <!-- 搜索区域 -->
  <div class="header-search">
    <el-form :inline="true" :model="formInline" class="demo-form-inline">
  <el-form-item label="产品名称">
    <el-input v-model.trim="formInline.name" placeholder="产品名称"></el-input>
  </el-form-item>
  <el-form-item label="日期">
    <!-- <el-input v-model="formInline.value" placeholder="添加时间"></el-input> -->
    <el-date-picker style="width: 86%;"
      v-model="formInline.time"
      type="date"
      placeholder="选择日期">
    </el-date-picker>
  </el-form-item>
  <el-form-item>
    <el-button type="primary" @click="onSearch">查询</el-button>
    <el-button type="warning" @click="dialogFormVisible = true">添加</el-button>
    <el-dialog title="产品新增" :visible.sync="dialogFormVisible">
  <el-form :model="form">
    <el-form-item label="名称" :label-width="formLabelWidth">
      <el-input v-model="form.name" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="日期" :label-width="formLabelWidth">
      <el-input v-model="form.date" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="地址" :label-width="edformLabelWidth">
      <el-input v-model="form.address" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="描述" :label-width="formLabelWidth">
      <el-input v-model="form.desciption" autocomplete="off"></el-input>
    </el-form-item>
  </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click="dialogFormVisible = false">取 消</el-button>
    <el-button type="primary" @click="addNew(), dialogFormVisible = false">确 定</el-button>
  </div>
</el-dialog>
  </el-form-item>
</el-form>
  </div>
  <!-- 表格区域 -->
  <div class="list-table">
    <el-table
    :data="tableData"
    border
    style="width: 100%">
    <el-table-column
      type="selection"
      width="55">
    </el-table-column>
    <el-table-column
      prop="id"
      label="编号"
      width="60">
    </el-table-column>
    <el-table-column
      prop="date"
      label="日期"
      width="180">
    </el-table-column>
    <el-table-column
      prop="name"
      label="名称"
      width="180">
    </el-table-column>
    <el-table-column
      prop="address"
      label="地址">
    </el-table-column>
    <el-table-column
      show-overflow-tooltip
      prop="desciption"
      label="产品描述">
    </el-table-column>
    <el-table-column label="操作">
      <template slot-scope="scope">
        <el-button
          size="mini"
          @click="handleEdit(scope.$index, scope.row), dialogFormVisibleOnedite = true">编辑</el-button>
          <el-dialog class="goodsAdite" title="产品编辑" :visible.sync="dialogFormVisibleOnedite">
  <el-form :model="edform">
    <div class="box">
    <el-form-item class="Onlabel" label="名称" :label-width="edformLabelWidth">
      <el-input class="edLabel1" v-model="edform.name" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item class="Onlabel" label="日期" :label-width="edformLabelWidth">
      <el-input class="edLabel2"  v-model="edform.date" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item class="Onlabel" label="地址" :label-width="edformLabelWidth">
      <el-input class="edLabel3" v-model="edform.address" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item class="Onlabel" label="描述" :label-width="edformLabelWidth">
      <el-input class="edLabel4" v-model="edform.desciption" autocomplete="off"></el-input>
    </el-form-item>
  </div>
  </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click="dialogFormVisibleOnedite = false">取 消</el-button>
    <el-button type="primary" @click="editeGoods(), dialogFormVisibleOnedite = false">确 定</el-button>
  </div>
</el-dialog>
        <el-button
          size="mini"
          type="danger"
          @click="handleDelete(scope.$index, scope.row)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
  </div>
  <div class="pagination">
  <el-pagination
  @prev-click="pageRudece()"
  @next-click="pageAdd()"
  :current-page="currentpage"
  @current-change="pageChange"
  background
  layout="prev, pager, next,total"
  :page-size="10"
  :total="this.total">
</el-pagination>
</div>
</div>
</template>
<script>
import { getGoodsList, searchGoods, deleteOnId, addGoods, updateGoods, searchGoodsById } from '@/api/goods'
export default {
  data () {
    return {
      deleteId: null,
      currentpage: 1,
      page: 1,
      limit: 10,
      total: null,
      formInline: {
        name: '',
        time: ''
      },
      tableData: [],
      dialogFormVisible: false,
      dialogFormVisibleOnedite: false,
      form: {
        name: '',
        date: '',
        // delivery: false,
        // type: [],
        address: '',
        desciption: ''
      },
      edform: {
        name: '',
        date: '',
        address: '',
        desciption: ''

      },
      formLabelWidth: '120px',
      edformLabelWidth: '120px',
      editeId: null
    }
  },
  created () {
    this.getDetail()
  },
  methods: {
    // 添加新商品
    async addNew () {
      await addGoods(this.form)
      this.$message({
        message: '添加成功！',
        type: 'success'
      })
      this.getDetail()
    },
    // 点击页码 换页
    pageChange (current) {
      this.currentpage = current
      // console.log(current)
      this.getDetail()
      // console.log(this.page)
    },
    // 点击箭头左 上一页
    pageRudece () {
      if (this.currentpage === 1) {
        return
      }
      this.currentpage--
      this.getDetail()
    },
    // 点击箭头右 下一页
    pageAdd () {
      this.currentpage++
      this.getDetail()
    },
    // 渲染列表
    async getDetail () {
      const res = await getGoodsList(this.currentpage, this.limit)
      // console.log(res)
      this.tableData = res.data
      this.total = Number(res.headers['x-total-count'])
    },
    // 搜索按钮
    async onSearch () {
      const res = await searchGoods(this.formInline.name)
      console.log(res.data)
      this.tableData = []
      this.tableData = res.data
      console.log(res)
      // this.total = Number(res.data.)
      this.total = Number(res.headers['x-total-count'])
    },
    // 编辑
    async handleEdit (index, row) {
      // console.log(row.id)
      console.log(row.id)
      const res = await searchGoodsById(row.id)
      this.editeId = row.id
      this.edform.name = res.data.name
      this.edform.date = res.data.date
      this.edform.address = res.data.address
      this.edform.desciption = res.data.desciption
      // await updateGoods(row.id, this.edform)
    },
    async editeGoods () {
      await updateGoods(this.editeId, this.edform)
      this.$message({
        type: 'success',
        message: '修改成功!'
      })
      this.getDetail()
    },
    // 删除
    handleDelete (index, row) {
      // console.log(row.id)
      this.$confirm('确定删除该数据吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        await deleteOnId(Number(row.id))
        this.getDetail()
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    }
  }
}
</script>
<style lang="less" scoped>
.list {
  padding: 10px;
  // transition: all .3;
}
.header-search {
  background-color: #fff;
  border-radius: 10px;
  padding: 10px;
}
.el-form-item {
  margin-bottom: 0;
}
/deep/ .el-input__inner{
  width: 220px;
}
.list-table {
  padding-top: 20px;
}
.pagination {
  padding-left: 600px;
  padding-top: 30px;
}
/deep/  .el-form-item__content{
  margin-left: 20px !important;
}
/deep/ .el-form-item .el-form-item{
  margin-bottom: 10px;
}
/deep/ .el-dialog {
  width: 30% !important;
}
.box {
  position: relative;
}
.edLabel1,.edLabel2,.edLabel3,.edLabel4{
  position: absolute;
}
.Onlabel {
  margin-bottom: 30px !important;
}
</style>
