<template>
  <div class="question-container">
    <!-- 头部 -->
    <el-card class="header-card">
      <el-form :inline="true" ref="userForm" :model="formInline" class="demo-form-inline">
        <el-form-item label="学科" prop="role_id">
          <el-select class="normal-input" v-model="formInline.subject" placeholder="请选择学科">
            <el-option v-for="item in subjectList" :key="item.id" :label="item.short_name" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="阶段" prop="role_id">
          <el-select class="normal-input" v-model="formInline.role_id" placeholder="请选择阶段">
            <el-option label="初级" :value="1"></el-option>
            <el-option label="中级" :value="2"></el-option>
            <el-option label="高级" :value="3"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="企业" prop="role_id">
          <el-select class="normal-input" v-model="formInline.enterprise" placeholder="请选择企业">
            <el-option  v-for="item in enterpriseList" :key="item.id" :label="item.short_name" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="题型" prop="role_id">
          <el-select class="normal-input" v-model="formInline.role_id" placeholder="请选择题型">
            <el-option label="单选" :value="1"></el-option>
            <el-option label="多选" :value="2"></el-option>
            <el-option label="简答" :value="3"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="难度" prop="role_id">
          <el-select class="normal-input" v-model="formInline.role_id" placeholder="请选择难度">
            <el-option label="低" :value="1"></el-option>
            <el-option label="中" :value="2"></el-option>
            <el-option label="高" :value="3"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="作者" prop="username">
          <el-input class="normal-input" v-model="formInline.username"></el-input>
        </el-form-item>
        <el-form-item label="状态" prop="role_id">
          <el-select class="normal-input" v-model="formInline.role_id" placeholder="请选择状态">
            <el-option label="禁用" :value="0"></el-option>
            <el-option label="启用" :value="1"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="日期" prop="email">
          <el-input class="normal-input" v-model="formInline.email" placeholder="选择日期"></el-input>
        </el-form-item>
        <el-form-item label="标题" prop="email">
          <el-input class="long-input" v-model="formInline.email"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary">搜索</el-button>
          <el-button>清除</el-button>
          <el-button type="primary" icon="el-icon-plus" @click="$refs.addDialog.dialogFormVisible=true">新增试题</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <!-- 身体 -->
    <el-card class="main-card">
      <!-- 表格 -->
      <el-table :data="tableData" style="width: 100%">
        <el-table-column type="index" label="序号" width="180"></el-table-column>
        <el-table-column prop="username" label="题目" width="180"></el-table-column>
        <el-table-column prop="phone" label="学科.阶段"></el-table-column>
        <el-table-column prop="email" label="题型"></el-table-column>
        <el-table-column prop="email" label="企业"></el-table-column>
        <el-table-column prop="role_id" label="创建者">
          <template slot-scope="scope">
            <span v-if="scope.row.role_id===1">🦁 超级管理员</span>
            <span v-else-if="scope.row.role_id===2">🐯 管理员</span>
            <span v-else-if="scope.row.role_id===3">🐧 老师</span>
            <span v-else>🐸 学生</span>
          </template>
        </el-table-column>
        <el-table-column prop="status" label="状态">
          <template slot-scope="scope">
            <span class="red" v-if="scope.row.status===0">禁用</span>
            <span v-else>启用</span>
          </template>
        </el-table-column>
        <el-table-column prop="remark" label="访问量"></el-table-column>
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
    <!-- 新增框 -->
    <addDialog ref="addDialog"></addDialog>
  </div>
</template>

<script>
//导入学科企业信息的接口
import {subjectList} from '@/api/subject.js'
import {enterpriseList} from '@/api/enterprise.js'

import addDialog from "./components/addDialog.vue";
export default {
  name: "question",
  components: { addDialog },
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
      total: 0,
      //学科列表的数据
      subjectList:[],
      enterpriseList:[],
    };
  },
  methods: {
    // 改变页容量
    handleSizeChange(newSize) {
      window.console.log(newSize);
      // this.size = newSize;
      // this.page = 1;
      // this.getList();
    },
    //改变当前页码
    handleCurrentChange(newPage) {
      window.console.log(newPage);
      // this.page = newPage;
      // this.getList();
    }
  },
  created() {
    subjectList().then(res=>{
      this.subjectList =  res.data.items;
    });
    enterpriseList().then(res=>{
      this.enterpriseList =  res.data.items;
    })
  },
};
</script>

<style lang="less">
.question-container {
  .long-input {
    width: 388px;
  }
  .normal-input {
    width: 150px;
  }
  .el-form--inline {
    width: 950px;
    .el-form-item {
      margin-right: 30px;
    }
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