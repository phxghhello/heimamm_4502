<template>
  <div class="enterprise-container">
    <!-- 头部 -->
    <el-card class="header-card">
      <el-form :inline="true" ref="enterpriseForm" :model="formInline" class="demo-form-inline">
        <el-form-item label="企业编号" prop="eid">
          <el-input class="short-input" v-model="formInline.eid"></el-input>
        </el-form-item>
        <el-form-item label="企业名称" prop="name">
          <el-input class="long-input" v-model="formInline.name"></el-input>
        </el-form-item>
        <el-form-item label="创建者" prop="username">
          <el-input class="short-input" v-model="formInline.username"></el-input>
        </el-form-item>
        <el-form-item label="状态" prop="status">
          <el-select class="long-input" v-model="formInline.status" placeholder="请选择状态">
            <el-option label="启用" value="1"></el-option>
            <el-option label="禁用" value="0"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="searchData">搜索</el-button>
          <el-button @click="clear">清除</el-button>
          <el-button
            type="primary"
            icon="el-icon-plus"
            @click="$refs.addDialog.dialogFormVisible=true"
          >新增企业</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <!-- 身体 -->
    <el-card class="main-card">
      <!-- 表格 -->
      <el-table :data="tableData" style="width: 100%">
        <el-table-column type="index" label="序号" width="180"></el-table-column>
        <el-table-column prop="eid" label="企业编号" width="180"></el-table-column>
        <el-table-column prop="name" label="企业名称"></el-table-column>
        <el-table-column prop="username" label="创建者"></el-table-column>
        <el-table-column prop="create_time" label="创建日期">
          <template slot-scope="scope">
            {{scope.row.create_time | formatTime}}
          </template>
        </el-table-column>
        <el-table-column prop="status" label="状态">
          <template slot-scope="scope">
            <span v-if="scope.row.status=='1'">启用</span>
            <span v-else class="red">禁用</span>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="text" @click="editEnterprise(scope.row)">编辑</el-button>
            <el-button
              type="text"
              @click="changeState(scope.row)"
            >{{scope.row.status=='1'?'禁用':'启用'}}</el-button>
            <el-button type="text" @click="removeEnterprise(scope.row)">删除</el-button>
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
//导入接口
import {
  enterpriseList,
  enterpriseRemove,
  enterpriseStatus
} from "@/api/enterprise.js";
//导入新增框
import addDialog from "./components/addDialog.vue";
import editDialog from "./components/editDialog.vue";

export default {
  name: "enterprise",
  components: {
    addDialog,
    editDialog
  },
  data() {
    return {
      formInline: {
        eid: "",
        name: "",
        username: "",
        status: ""
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
    //获取数据列表的方法
    getList() {
      enterpriseList({
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
    clear() {
      this.$refs.enterpriseForm.resetFields();
      this.getList();
    },
    //删除功能
    removeEnterprise(item) {
      this.$confirm("确定删除吗?", "友情提示", {
        confirmButtonText: "删除",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          enterpriseRemove({
            id: item.id
          }).then(res => {
            if (res.code === 200) {
              this.$message.success("删除成功");
              this.getList();
            }
          });
        })
        .catch(() => {});
    },
    //修改状态
    changeState(item) {
      enterpriseStatus({
        id: item.id
      }).then(res => {
        if (res.code === 200) {
          this.$message.success("状态更新成功");
          this.getList();
        }
      });
    },
    //编辑企业
    editEnterprise(item){
      this.$refs.editDialog.dialogFormVisible=true;
      this.$refs.editDialog.editForm = JSON.parse(JSON.stringify(item));
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
.enterprise-container {
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