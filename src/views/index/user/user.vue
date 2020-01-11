<template>
  <div class="user-container">
    <!-- 头部 -->
    <el-card class="header-card">
      <el-form :inline="true" ref="userForm" :model="formInline" class="demo-form-inline">
        <el-form-item label="用户名称" prop="username">
          <el-input class="short-input" v-model="formInline.username"></el-input>
        </el-form-item>
        <el-form-item label="用户邮箱" prop="email">
          <el-input class="long-input" v-model="formInline.email"></el-input>
        </el-form-item>
        <el-form-item label="角色" prop="role_id">
          <el-select class="long-input" v-model="formInline.role_id" placeholder="请选择角色">
            <el-option label="管理员" :value="2"></el-option>
            <el-option label="老师" :value="3"></el-option>
            <el-option label="学生" :value="4"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="searchData">搜索</el-button>
          <el-button @click="clear">清除</el-button>
          <el-button
            type="primary"
            icon="el-icon-plus"
            @click="$refs.addDialog.dialogFormVisible=true"
          >新增用户</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <!-- 身体 -->
    <el-card class="main-card">
      <!-- 表格 -->
      <el-table border :data="tableData" style="width: 100%">
        <el-table-column type="index" label="序号"></el-table-column>
        <el-table-column prop="username" label="用户名" width="180"></el-table-column>
        <el-table-column prop="phone" label="电话"></el-table-column>
        <el-table-column prop="email" label="邮箱"></el-table-column>
        <el-table-column prop="role_id" label="角色">
          <template slot-scope="scope">
            <span v-if="scope.row.role_id===1">🦁 超级管理员</span>
            <span v-else-if="scope.row.role_id===2">🐯 管理员</span>
            <span v-else-if="scope.row.role_id===3">🐧 老师</span>
            <span v-else>🐸 学生</span>
          </template>
        </el-table-column>
        <el-table-column prop="remark" label="备注"></el-table-column>
        <el-table-column prop="status" label="状态">
          <template slot-scope="scope">
            <span class="red" v-if="scope.row.status===0">禁用</span>
            <span v-else>启用</span>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="text" @click="editUser(scope.row)">编辑</el-button>
            <el-button type="text" @click="changeStatus(scope.row)">{{scope.row.status=='1'?'禁用':'启用'}}</el-button>
            <el-button type="text" @click="removeUser(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页器 -->
      <el-pagination
        class="my-pagination"
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="page"
        :page-sizes="pageSizes"
        :page-size="size"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
    </el-card>
    <!-- 新增框 -->
    <addDialog ref="addDialog"></addDialog>
    <!-- 编辑框 -->
    <editDialog ref="editDialog"></editDialog>
  </div>
</template>

<script>
import { userList,userRemove,userStatus } from "@/api/user.js";
import addDialog from "./components/addDialog.vue";
import editDialog from "./components/editDialog.vue";
export default {
  name: "user",
  components: { addDialog,editDialog },
  data() {
    return {
      formInline: {
        username: "",
        email: "",
        role_id: ""
      },
      tableData: [],
      //分页器的数据
      page: 1,
      pageSizes: [3, 4, 5, 6],
      size: 3,
      total: 0
    };
  },
  methods: {
    //获取用户列表
    getList() {
      userList({
        page: this.page,
        limit: this.size,
        ...this.formInline
      }).then(res => {
        if (res.code === 200) {
          this.tableData = res.data.items;
          this.total = res.data.pagination.total;
        }
      });
    },
    //搜索功能
    searchData() {
      this.page = 1;
      this.getList();
    },
    //清除功能
    clear(){
      this.$refs.userForm.resetFields();
      this.getList();
    },
    //删除功能
    removeUser(item){
      this.$confirm('确认删除?', '友情提示', {
        confirmButtonText: '删除',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        userRemove({
          id:item.id
        }).then(res=>{
          if (res.code===200) {
            this.$message.success("删除成功");
            if (this.tableData.length===1) {
              this.page--;
              this.page= this.page==0?1:this.page;
            }
            this.getList();
          }
        })
      }).catch(() => {});
    },
    //修改状态
    changeStatus(item){
      userStatus({
        id:item.id
      }).then(res=>{
        if (res.code===200) {
          this.$message.success("修改状态成功");
          this.getList();
        }
      })
    },
    //编辑用户
    editUser(item){
      this.$refs.editDialog.dialogFormVisible=true;
      this.$refs.editDialog.editForm = JSON.parse(JSON.stringify(item))
    },
    // 改变页容量
    handleSizeChange(newSize) {
      this.size = newSize;
      this.page = 1;
      this.getList();
    },
    //改变当前页码
    handleCurrentChange(newPage) {
      this.page = newPage;
      this.getList();
    }
  },
  created() {
    this.getList();
  }
};
</script>

<style lang="less">
.user-container {
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
    span.red {
      color: red;
    }
  }
}
</style>