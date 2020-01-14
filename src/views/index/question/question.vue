<template>
  <div class="question-container">
    <!-- 头部 -->
    <el-card class="header-card">
      <el-form :inline="true" ref="questionForm" :model="formInline" class="demo-form-inline">
        <el-form-item label="学科" prop="subject">
          <el-select class="normal-input" v-model="formInline.subject" placeholder="请选择学科">
            <el-option
              v-for="item in subjectList"
              :key="item.id"
              :label="item.short_name"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="阶段" prop="step">
          <el-select class="normal-input" v-model="formInline.step" placeholder="请选择阶段">
            <el-option label="初级" :value="1"></el-option>
            <el-option label="中级" :value="2"></el-option>
            <el-option label="高级" :value="3"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="企业" prop="enterprise">
          <el-select class="normal-input" v-model="formInline.enterprise" placeholder="请选择企业">
            <el-option
              v-for="item in enterpriseList"
              :key="item.id"
              :label="item.short_name"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="题型" prop="type">
          <el-select class="normal-input" v-model="formInline.type" placeholder="请选择题型">
            <el-option label="单选" :value="1"></el-option>
            <el-option label="多选" :value="2"></el-option>
            <el-option label="简答" :value="3"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="难度" prop="difficulty">
          <el-select class="normal-input" v-model="formInline.difficulty" placeholder="请选择难度">
            <el-option label="低" :value="1"></el-option>
            <el-option label="中" :value="2"></el-option>
            <el-option label="高" :value="3"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="作者" prop="username">
          <el-input class="normal-input" v-model="formInline.username"></el-input>
        </el-form-item>
        <el-form-item label="状态" prop="status">
          <el-select class="normal-input" v-model="formInline.status" placeholder="请选择状态">
            <el-option label="禁用" :value="0"></el-option>
            <el-option label="启用" :value="1"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="日期" prop="create_date">
          <el-date-picker v-model="formInline.create_date" type="date" placeholder="选择日期"></el-date-picker>
        </el-form-item>
        <el-form-item label="标题" prop="title">
          <el-input class="long-input" v-model="formInline.title"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="searchData">搜索</el-button>
          <el-button @click="clear">清除</el-button>
          <el-button
            type="primary"
            icon="el-icon-plus"
            @click="$refs.addDialog.dialogFormVisible=true"
          >新增试题</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <!-- 身体 -->
    <el-card class="main-card">
      <!-- 表格 -->
      <el-table :data="tableData" style="width: 100%">
        <el-table-column type="index" label="序号" width="180"></el-table-column>
        <el-table-column label="题目" width="180">
          <template slot-scope="scope">
            <span v-html="scope.row.title"></span>
          </template>
        </el-table-column>
        <el-table-column label="学科.阶段">
          <template
            slot-scope="scope"
          >{{scope.row.subject_name+'.'+{1:'初级',2:'中级',3:'高级'}[scope.row.step]}}</template>
        </el-table-column>
        <el-table-column label="题型">
          <template slot-scope="scope">{{{1:'单选',2:'多选',3:'简答'}[scope.row.type]}}</template>
        </el-table-column>
        <el-table-column prop="enterprise_name" label="企业"></el-table-column>
        <el-table-column prop="username" label="创建者"></el-table-column>
        <el-table-column prop="status" label="状态">
          <template slot-scope="scope">
            <span class="red" v-if="scope.row.status===0">禁用</span>
            <span v-else>启用</span>
          </template>
        </el-table-column>
        <el-table-column prop="reads" label="访问量"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="text" @click="editQuestion(scope.row)">编辑</el-button>
            <el-button
              type="text"
              @click="changeStatus(scope.row)"
            >{{scope.row.status=='1'?'禁用':'启用'}}</el-button>
            <el-button type="text" @click="removeData(scope.row)">删除</el-button>
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
    <editDialog ref="editDialog"></editDialog>
  </div>
</template>

<script>
//导入学科企业信息的接口
import { subjectList } from "@/api/subject.js";
import { enterpriseList } from "@/api/enterprise.js";
import {
  questionList,
  questionStatus,
  questionRemove
} from "@/api/question.js";

import addDialog from "./components/addDialog.vue";
import editDialog from "./components/editDialog.vue";
export default {
  name: "question",
  components: { addDialog, editDialog },
  data() {
    return {
      formInline: {
        title: "",
        subject: "",
        enterprise: "",
        type: "",
        step: "",
        username: "",
        status: "",
        difficulty: "",
        create_date: ""
      },
      tableData: [],
      //分页器的数据
      page: 1,
      pageSizes: [3, 4, 5, 6],
      size: 3,
      total: 0,
      //学科列表的数据
      subjectList: [],
      enterpriseList: []
    };
  },
  methods: {
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
    },
    //获取数据列表
    getList() {
      questionList({
        page: this.page,
        limit: this.size,
        ...this.formInline
      }).then(res => {
        window.console.log(res);
        if (res.code == 200) {
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
      this.$refs.questionForm.resetFields();
      this.getList();
    },
    //修改状态
    changeStatus(item) {
      questionStatus({
        id: item.id
      }).then(res => {
        if (res.code === 200) {
          this.$message.success("修改状态成功");
          this.getList();
        }
      });
    },
    //删除功能
    removeData(item) {
      this.$confirm("确定删除吗?", "友情提示", {
        confirmButtonText: "删除",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          questionRemove({
            id: item.id
          }).then(res => {
            if (res.code == 200) {
              this.$message.success("删除成功");
              if (this.tableData.length === 1) {
                this.page--;
                this.page = this.page == 0 ? 1 : this.page;
              }
              this.getList();
            }
          });
        })
        .catch(() => {});
    },
    //编辑功能
    editQuestion(item) {
      this.$refs.editDialog.dialogFormVisible = true;
      let editForm = JSON.parse(JSON.stringify(item));
      editForm.city = editForm.city.split(",");
      editForm.multiple_select_answer = editForm.multiple_select_answer.split(
        ","
      );
      editForm.multiple_select_answer.sort();
      this.$refs.editDialog.editForm = editForm;
      // 新的选项数组
      const options = [];
      // 循环 把 A B C D 的顺序 调整为 正确的
      editForm.select_options.forEach(v => {
        if (v.label == "A") {
          options[0] = v;
        } else if (v.label == "B") {
          options[1] = v;
        } else if (v.label == "C") {
          options[2] = v;
        } else {
          options[3] = v;
        }
      });
      editForm.select_options = options;
      if (editForm.select_options[0].image != "") {
        this.$refs.editDialog.imageAUrl =
          process.env.VUE_APP_BASEURL + "/" + editForm.select_options[0].image;
      }
      if (editForm.select_options[1].image != "") {
        this.$refs.editDialog.imageBUrl =
          process.env.VUE_APP_BASEURL + "/" + editForm.select_options[1].image;
      }
      if (editForm.select_options[2].image != "") {
        this.$refs.editDialog.imageCUrl =
          process.env.VUE_APP_BASEURL + "/" + editForm.select_options[2].image;
      }
      if (editForm.select_options[3].image != "") {
        this.$refs.editDialog.imageDUrl =
          process.env.VUE_APP_BASEURL + "/" + editForm.select_options[3].image;
      }
      if (editForm.video != "") {
        this.$refs.editDialog.videoUrl =
          process.env.VUE_APP_BASEURL + "/" + editForm.video;
      }
    }
  },
  created() {
    subjectList().then(res => {
      this.subjectList = res.data.items;
    });
    enterpriseList().then(res => {
      this.enterpriseList = res.data.items;
    });
    //获取数据列表
    this.getList();
  }
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
  .el-date-editor.el-input,
  .el-date-editor.el-input__inner {
    width: 150px;
  }
}
</style>