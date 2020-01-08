<template>
  <div class="subject-container">
    <el-card class="header-card">
      <el-form :inline="true" :model="subjectForm" ref="subjectForm" class="demo-form-inline">
        <el-form-item label="学科编号" prop="rid">
          <el-input v-model="subjectForm.rid" class="short-input"></el-input>
        </el-form-item>
        <el-form-item label="学科名称" prop="name">
          <el-input v-model="subjectForm.name" class="long-input"></el-input>
        </el-form-item>
        <el-form-item label="创建者" prop="username">
          <el-input v-model="subjectForm.username" class="short-input"></el-input>
        </el-form-item>
        <el-form-item label="状态" prop="status">
          <el-select v-model="subjectForm.status" placeholder="请选择状态" class="long-input">
            <el-option label="禁用" :value="0"></el-option>
            <el-option label="启用" :value="1"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="searchData">搜索</el-button>
          <el-button @click="clearData">清除</el-button>
          <el-button
            type="primary"
            icon="el-icon-plus"
            @click="$refs.subjectDialog.addDialogFormVisible=true"
          >新增学科</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <el-card class="main-card">
      <el-table :data="subjectTable" style="width: 100%">
        <el-table-column type="index" label="序号"></el-table-column>
        <el-table-column prop="rid" label="学科编号"></el-table-column>
        <el-table-column prop="name" label="学科名称"></el-table-column>
        <el-table-column prop="short_name" label="简称"></el-table-column>
        <el-table-column prop="username" label="创建者"></el-table-column>
        <el-table-column prop="create_time" label="创建日期"></el-table-column>
        <el-table-column prop="status" label="状态">
          <template slot-scope="scope">
            <span v-if="scope.row.status === 1">启用</span>
            <span v-else class="red">禁用</span>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="text" @click="editSubject(scope.row)">编辑</el-button>
            <el-button type="text" @click="changeStatus(scope.row)">{{ scope.row.status===0?"启用":"禁用" }}</el-button>
            <el-button type="text" @click="removeSubject(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        class="my-pagination"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="page"
        :page-sizes="[5, 6, 7, 8]"
        :page-size="limit"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
        background
      ></el-pagination>
    </el-card>
    <!-- 新增学科框 -->
    <subjectDialog ref="subjectDialog"></subjectDialog>
    <subjectEditDialog ref="subjectEditDialog"></subjectEditDialog>
  </div>
</template>

<script>
//导入学科新增框
import subjectDialog from "./components/subjectDialog.vue";
import subjectEditDialog from "./components/subjectEditDialog.vue";
//导入api
import { subjectList,subjectStatus,subjectRemove } from "@/api/subject.js";
export default {
  name: "subject",
  components: {
    subjectDialog,
    subjectEditDialog
  },
  data() {
    return {
      subjectForm: {
        rid: "",
        name: "",
        username: "",
        status: ""
      },
      subjectTable: [],
      page: 1,
      limit: 5,
      total: 0
    };
  },
  methods: {
    //获取学科列表
    getList() {
      subjectList({
        page: this.page,
        limit: this.limit,
        ...this.subjectForm
      }).then(res => {
        window.console.log(res);
        if (res.code === 200) {
          this.subjectTable = res.data.items;
          this.total=res.data.pagination.total;
        }
      });
    },
    //修改状态
    changeStatus(item){
      subjectStatus({
        id:item.id
      }).then(res=>{
        if(res.code===200){
          this.$message.success("修改成功");
          this.getList();
        }
      })
    },
    //删除学科
    removeSubject(item){
      this.$confirm('确定要删除该行数据吗?', '友情提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        //点击了确定
        subjectRemove({
          id:item.id
        }).then(res=>{
          if(res.code===200){
            this.$message.success("删除成功");
            this.getList();
          }
        })
      }).catch(() => {});
    },
    //查询功能
    searchData(){
      this.getList()
    },
    //清除功能
    clearData(){
      this.$refs.subjectForm.resetFields();
    },
    //编辑
    editSubject(item){
      this.$refs.subjectEditDialog.editDialogFormVisible=true;
      this.$refs.subjectEditDialog.editForm=JSON.parse(JSON.stringify(item));
    },
    // 页容量改变
    handleSizeChange(limit) {
      this.limit=limit;
      this.page=1;
      this.getList();
    },
    //当前页改变
    handleCurrentChange(page) {
      this.page=page;
      this.getList()
    }
  },
  created() {
    this.getList();
  }
};
</script>

<style lang="less">
.subject-container {
  .short-input {
    width: 100px;
  }
  .long-input {
    width: 150px;
  }
  .main-card {
    margin-top: 30px;
    text-align: center;
    .my-pagination {
      margin-top: 30px;
    }
    span.red{
      color:red;
    }
  }
}
</style>