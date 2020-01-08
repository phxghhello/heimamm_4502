<template>
  <div class="subject-container">
    <el-card class="header-card">
      <el-form :inline="true" :model="subjectForm" class="demo-form-inline">
        <el-form-item label="学科编号">
          <el-input v-model="subjectForm.user" class="short-input"></el-input>
        </el-form-item>
        <el-form-item label="学科名称">
          <el-input v-model="subjectForm.user" class="long-input"></el-input>
        </el-form-item>
        <el-form-item label="创建者">
          <el-input v-model="subjectForm.user" class="short-input"></el-input>
        </el-form-item>
        <el-form-item label="状态">
          <el-select v-model="subjectForm.region" placeholder="请选择状态" class="long-input">
            <el-option label="禁用" value="0"></el-option>
            <el-option label="启用" value="1"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary">搜索</el-button>
          <el-button>清除</el-button>
          <el-button type="primary" icon="el-icon-plus">新增学科</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <el-card class="main-card">
      <el-table :data="subjectTable" style="width: 100%">
        <el-table-column type="index" prop="date" label="序号"></el-table-column>
        <el-table-column prop="name" label="学科编号"></el-table-column>
        <el-table-column prop="address" label="学科名称"></el-table-column>
        <el-table-column prop="address" label="简称"></el-table-column>
        <el-table-column prop="address" label="创建者"></el-table-column>
        <el-table-column prop="address" label="创建日期"></el-table-column>
        <el-table-column prop="address" label="状态"></el-table-column>
        <el-table-column prop="address" label="操作"></el-table-column>
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
  </div>
</template>

<script>
export default {
  data() {
    return {
      subjectForm: {},
      subjectTable: [],
      page:1,
      limit:5,
      total:0,
    };
  },
  methods: {
    handleSizeChange(limit){
      window.console.log("页容量"+limit)
    },
    handleCurrentChange(page){
      window.console.log("当前页面"+page)
    }
  },
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
    .my-pagination{
      margin-top: 30px;
    }
  }
}
</style>