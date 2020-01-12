<template>
  <el-dialog
    class="question-addDialog"
    @opened="opened"
    fullscreen
    center
    title="新增试题"
    :visible.sync="dialogFormVisible"
  >
    <el-form :model="addForm" ref="addForm" :rules="rules">
      <!-- 学科 -->
      <el-form-item label="学科" prop="subject">
        <el-select v-model="addForm.subject" placeholder="请选择学科">
          <el-option
            v-for="item in $parent.subjectList"
            :key="item.id"
            :label="item.short_name"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <!-- 阶段 -->
      <el-form-item label="阶段" prop="step">
        <el-select v-model="addForm.step" placeholder="请选择阶段">
          <el-option label="初级" :value="1"></el-option>
          <el-option label="中级" :value="2"></el-option>
          <el-option label="高级" :value="3"></el-option>
        </el-select>
      </el-form-item>
      <!-- 企业 -->
      <el-form-item label="企业" prop="enterprise">
        <el-select v-model="addForm.enterprise" placeholder="请选择企业">
          <el-option
            v-for="item in  $parent.enterpriseList"
            :key="item.id"
            :label="item.short_name"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <!-- 城市 -->
      <el-form-item label="城市" prop="city">
        <el-cascader
          size="large"
          :options="options"
          v-model="addForm.city"
          :props="{ expandTrigger: 'hover' }"
        ></el-cascader>
      </el-form-item>
      <!-- 题型 -->
      <el-form-item label="题型" prop="type">
        <el-radio-group v-model="addForm.type">
          <el-radio label="1">单选</el-radio>
          <el-radio label="2">多选</el-radio>
          <el-radio label="3">简答</el-radio>
        </el-radio-group>
      </el-form-item>
      <!-- 难度 -->
      <el-form-item label="难度" prop="difficulty">
        <el-radio-group v-model="addForm.difficulty">
          <el-radio :label="1">简单</el-radio>
          <el-radio :label="2">一般</el-radio>
          <el-radio :label="3">困难</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-divider></el-divider>
      <!-- 试题标题 -->
      <el-form-item label="试题标题" prop="title"></el-form-item>
      <div class="title-toolbar"></div>
      <div class="title-text"></div>
      <!-- 单选 -->
      <el-form-item v-if="addForm.type == '1'" label="单选" prop="single_select_answer">
        <el-radio-group v-model="addForm.single_select_answer">
          <!-- 选项A -->
          <div class="option-box">
            <el-radio label="A">A</el-radio>
            <el-input v-model="addForm.select_options[0].text"></el-input>
            <!-- 上传组件 -->
            <el-upload
              class="avatar-uploader"
              :action="uploadUrl"
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
              :before-upload="beforeAvatarUpload"
            >
              <img v-if="imageAUrl" :src="imageAUrl" class="avatar" />
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </div>
          <!-- 选项B -->
          <div class="option-box">
            <el-radio label="B">B</el-radio>
            <el-input v-model="addForm.select_options[1].text"></el-input>
            <!-- 上传组件 -->
            <el-upload
              class="avatar-uploader"
              :action="uploadUrl"
              :show-file-list="false"
              :on-success="handleBvatarSuccess"
              :before-upload="beforeAvatarUpload"
            >
              <img v-if="imageBUrl" :src="imageBUrl" class="avatar" />
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </div>
          <!-- 选项C-->
          <div class="option-box">
            <el-radio label="C">C</el-radio>
            <el-input v-model="addForm.select_options[2].text"></el-input>
            <!-- 上传组件 -->
            <el-upload
              class="avatar-uploader"
              :action="uploadUrl"
              :show-file-list="false"
              :on-success="handleCvatarSuccess"
              :before-upload="beforeAvatarUpload"
            >
              <img v-if="imageCUrl" :src="imageCUrl" class="avatar" />
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </div>
          <!-- 选项D -->
          <div class="option-box">
            <el-radio label="D">D</el-radio>
            <el-input v-model="addForm.select_options[3].text"></el-input>
            <!-- 上传组件 -->
            <el-upload
              class="avatar-uploader"
              :action="uploadUrl"
              :show-file-list="false"
              :on-success="handleDvatarSuccess"
              :before-upload="beforeAvatarUpload"
            >
              <img v-if="imageDUrl" :src="imageDUrl" class="avatar" />
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </div>
        </el-radio-group>
      </el-form-item>
      <!-- 多选 -->
      <el-form-item v-else-if="addForm.type == '2'" label="多选" prop="multiple_select_answer">
        <el-checkbox-group v-model="addForm.multiple_select_answer">
          <!-- 选项A -->
          <div class="option-box">
            <el-checkbox label="A">A</el-checkbox>
            <el-input class="mutiple-input" v-model="addForm.select_options[0].text"></el-input>
            <!-- 上传组件 -->
            <el-upload
              class="avatar-uploader"
              :action="uploadUrl"
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
              :before-upload="beforeAvatarUpload"
            >
              <img v-if="imageAUrl" :src="imageAUrl" class="avatar" />
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </div>
          <!-- 选项B -->
          <div class="option-box">
            <el-checkbox label="B">B</el-checkbox>
            <el-input class="mutiple-input" v-model="addForm.select_options[1].text"></el-input>
            <!-- 上传组件 -->
            <el-upload
              class="avatar-uploader"
              :action="uploadUrl"
              :show-file-list="false"
              :on-success="handleBvatarSuccess"
              :before-upload="beforeAvatarUpload"
            >
              <img v-if="imageBUrl" :src="imageBUrl" class="avatar" />
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </div>
          <!-- 选项C-->
          <div class="option-box">
            <el-checkbox label="C">C</el-checkbox>
            <el-input class="mutiple-input" v-model="addForm.select_options[2].text"></el-input>
            <!-- 上传组件 -->
            <el-upload
              class="avatar-uploader"
              :action="uploadUrl"
              :show-file-list="false"
              :on-success="handleCvatarSuccess"
              :before-upload="beforeAvatarUpload"
            >
              <img v-if="imageCUrl" :src="imageCUrl" class="avatar" />
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </div>
          <!-- 选项D -->
          <div class="option-box">
            <el-checkbox label="D">D</el-checkbox>
            <el-input class="mutiple-input" v-model="addForm.select_options[3].text"></el-input>
            <!-- 上传组件 -->
            <el-upload
              class="avatar-uploader"
              :action="uploadUrl"
              :show-file-list="false"
              :on-success="handleDvatarSuccess"
              :before-upload="beforeAvatarUpload"
            >
              <img v-if="imageDUrl" :src="imageDUrl" class="avatar" />
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </div>
        </el-checkbox-group>
      </el-form-item>
      <!-- 简答题 -->
      <el-form-item v-else label="简答" prop="short_answer">
        <el-input type="textarea" v-model="addForm.short_answer"></el-input>
      </el-form-item>
      <el-divider></el-divider>
      <!-- 视频解析 -->
      <el-form-item label="试题解析">
        <el-upload
          class="upload-demo"
          :action="uploadUrl"
          :show-file-list="false"
          :on-success="handleVideoSuccess"
          :before-upload="beforeVideoUpload"
        >
          <el-button size="small" type="primary">点击上传</el-button>
          <div slot="tip" class="el-upload__tip">只能上传MP4文件，且不超过2MB</div>
          <video controls loop auto v-if="videoUrl" :src="videoUrl" class="video" />
        </el-upload>
      </el-form-item>
      <el-divider></el-divider>
      <!-- 答案解析 -->
      <el-form-item label="答案解析" prop="answer_analyze"></el-form-item>
      <div class="answer-toolbar"></div>
      <div class="answer-text"></div>
      <el-divider></el-divider>
      <el-form-item label="试题备注" prop="remark"></el-form-item>
      <el-input v-model="addForm.remark"></el-input>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogFormVisible = false">取 消</el-button>
      <el-button type="primary" @click="submitAdd">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
//导入富文本
import Wangeditor from "wangeditor";
//导入省市区级联
import { regionData } from "element-china-area-data";
//导入新增接口
import { questionAdd } from "@/api/question.js";
export default {
  name: "question-addDialog",
  data() {
    return {
      addForm: {
        subject: "",
        step: "",
        enterprise: "",
        type: "1",
        difficulty: "",
        title: "",
        single_select_answer: "",
        multiple_select_answer:"",
        answer_analyze: "",
        short_answer: "",
        city: [],
        remark: "",
        video: "",
        // 选项
        select_options: [
          {
            label: "A",
            text: "狗不理",
            image: "upload/20191129/fd5f03a07d95e3948860240564b180e4.jpeg"
          },
          {
            label: "B",
            text: "猫不理",
            image: "upload/20191129/e93e7bb72accda7f3159cdabc4203991.jpeg"
          },
          {
            label: "C",
            text: "麻花",
            image: "upload/20191129/b7caf98be9d0aa6764b0112ba0dfa19e.jpeg"
          },
          {
            label: "D",
            text: "炸酱面",
            image: "upload/20191129/4067f19ab53a5e8388ad3459e23110f0.jpeg"
          }
        ]
      },
      rules: {
        subject: [
          { required: true, message: "学科不能为空", trigger: "change" }
        ],
        step: [{ required: true, message: "阶段不能为空", trigger: "blur" }],
        enterprise: [
          { required: true, message: "企业不能为空", trigger: "blur" }
        ],
        city: [{ required: true, message: "城市不能为空", trigger: "blur" }],
        type: [{ required: true, message: "题型不能为空", trigger: "blur" }],
        difficulty: [
          { required: true, message: "难度不能为空", trigger: "blur" }
        ],
        title: [{ required: true, message: "标题不能为空", trigger: "blur" }],
        single_select_answer: [
          { required: true, message: "单选答案不能为空", trigger: "blur" }
        ],
        multiple_select_answer: [
          { required: true, message: "单选答案不能为空", trigger: "blur" }
        ],
        short_answer: [
          { required: true, message: "单选答案不能为空", trigger: "blur" }
        ],
        answer_analyze: [
          { required: true, message: "答案解析不能为空", trigger: "blur" }
        ],
        remark: [{ required: true, message: "备注不能为空", trigger: "blur" }]
      },
      dialogFormVisible: false,
      formLabelWidth: "120px",
      //省市区级联
      options: regionData,
      //富文本编辑器
      // 试题标题
      titleEditor: undefined,
      //答案解析
      answerEditor: undefined,
      //上传图片的预览地址
      imageAUrl: "",
      imageBUrl: "",
      imageCUrl: "",
      imageDUrl: "",
      uploadUrl: process.env.VUE_APP_BASEURL + "/question/upload",
      videoUrl: ""
    };
  },
  methods: {
    submitAdd() {
      this.$refs.addForm.validate(valid => {
        if (valid) {
          questionAdd(this.addForm).then(res => {
            if (res.code == 200) {
              this.$message.success("试题新增成功");
              //清空表单
              this.$refs.addForm.resetFields();
              // 清空富文本编辑器
              this.titleEditor.txt.clear();
              this.answerEditor.txt.clear();
              this.dialogFormVisible = false;
              // 清空预览的地址
              if (this.imageAUrl != "") {
                this.imageAUrl = "";
              }
              if (this.imageBUrl != "") {
                this.imageBUrl = "";
              }
              if (this.imageCUrl != "") {
                this.imageCUrl = "";
              }
              if (this.imageDUrl != "") {
                this.imageDUrl = "";
              }
              if (this.videoUrl != "") {
                this.videoUrl = "";
              }
              //清空选项中的text
              this.addForm.select_options.forEach(v => {
                window.console.log(v.text);
                if (v.text != "") {
                  v.text = "";
                }
              });
            }
          });
        } else {
          this.$message.warning("填写的信息格式不正确,请检查");
          return false;
        }
      });
    },
    // 富文本编辑器
    opened() {
      // 通过判断让富文本的创建只执行一次
      if (this.titleEditor == undefined) {
        this.titleEditor = new Wangeditor(".title-toolbar", ".title-text");
        this.titleEditor.customConfig.onchange = html => {
          // html 即变化之后的内容
          this.addForm.title = html;
        };
        this.titleEditor.create();
      }
      if (this.answerEditor == undefined) {
        this.answerEditor = new Wangeditor(".answer-toolbar", ".answer-text");
        this.answerEditor.customConfig.onchange = html => {
          // html 即变化之后的内容
          this.addForm.answer_analyze = html;
        };
        this.answerEditor.create();
      }
    },
    // 图片上传 A
    handleAvatarSuccess(res, file) {
      this.imageAUrl = URL.createObjectURL(file.raw);
      this.addForm.select_options[0].image = res.data.url;
    },
    handleBvatarSuccess(res, file) {
      this.imageBUrl = URL.createObjectURL(file.raw);
      this.addForm.select_options[1].image = res.data.url;
    },
    handleCvatarSuccess(res, file) {
      this.imageCUrl = URL.createObjectURL(file.raw);
      this.addForm.select_options[2].image = res.data.url;
    },
    handleDvatarSuccess(res, file) {
      this.imageDUrl = URL.createObjectURL(file.raw);
      this.addForm.select_options[3].image = res.data.url;
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg" || file.type === "image/png";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG或者PNG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },
    //视频
    handleVideoSuccess(res, file) {
      this.videoUrl = URL.createObjectURL(file.raw);
      window.console.log(res);
      this.addForm.video = res.data.url;
    },
    beforeVideoUpload(file) {
      const isJPG = file.type === "video/mp4";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传视频只能是 MP4 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传视频大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    }
  }
};
</script>

<style lang="less">
.question-addDialog {
  .el-form {
    width: 832px;
    margin: 0 auto;
  }
  .title-toolbar,
  .answer-toolbar {
    border: 1px solid rgb(233, 233, 233);
    border-bottom: none;
  }
  .title-text,
  .answer-text {
    border: 1px solid rgb(233, 233, 233);
    height: 100px;
  }
  .w-e-text::-webkit-scrollbar {
    display: none;
  }
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409eff;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
  .option-box {
    margin-top: 58px;
    display: flex;
    align-items: center;
    .el-input {
      width: 476px;
      margin-right: 20px;
    }
  }
  .video {
    width: 320px;
  }
  .mutiple-input{
    margin:0 15px;
  }
  
}
</style>