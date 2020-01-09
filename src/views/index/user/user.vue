<template>
  <div class="user-container">
    <!-- 头部 -->
    <el-card class="header-card">
      <el-form :inline="true" ref="userForm" :model="formInline" class="demo-form-inline">
        <el-form-item label="用户名称" prop="eid">
          <el-input class="short-input" v-model="formInline.eid"></el-input>
        </el-form-item>
        <el-form-item label="用户邮箱" prop="name">
          <el-input class="long-input" v-model="formInline.name"></el-input>
        </el-form-item>
        <el-form-item label="角色" prop="status">
          <el-select class="long-input" v-model="formInline.status" placeholder="请选择角色">
            <el-option label="超级管理员" :value="1"></el-option>
            <el-option label="管理员" :value="2"></el-option>
            <el-option label="老师" :value="3"></el-option>
            <el-option label="学生" :value="4"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary">搜索</el-button>
          <el-button>清除</el-button>
          <el-button type="primary" icon="el-icon-plus">新增用户</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <!-- 身体 -->
    <el-card class="main-card">
      <!-- 表格 -->
      <el-table :data="tableData" style="width: 100%">
        <el-table-column type="index" label="序号" width="180"></el-table-column>
        <el-table-column prop="eid" label="用户名" width="180"></el-table-column>
        <el-table-column prop="name" label="电话"></el-table-column>
        <el-table-column prop="username" label="邮箱"></el-table-column>
        <el-table-column prop="create_time" label="角色"></el-table-column>
        <el-table-column prop="status" label="备注"></el-table-column>
        <el-table-column prop="status" label="状态"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="text">编辑</el-button>
            <el-button type="text">{{scope.row.status=='1'?'禁用':'启用'}}</el-button>
            <el-button type="text">删除</el-button>
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
  </div>
</template>

<script>
export default {
  name: "user",
  data() {
    return {
      formInline: {},
      tableData: [],
      //分页器的数据
      page: 1,
      pageSizes: [3, 4, 5, 6],
      size: 3,
      total: 0
    };
  },
  methods: {
    // 改变页容量
    handleSizeChange(newSize) {
      this.size = newSize;
      this.page = 1;
    },
    //改变当前页码
    handleCurrentChange(newPage) {
      this.page = newPage;
    }
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