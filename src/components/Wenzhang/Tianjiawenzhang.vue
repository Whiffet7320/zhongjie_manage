<template>
  <div class="index">
    <div class="nav1">
      <!-- <el-button @click="toBack" class="btn" size="small" icon="el-icon-arrow-left">返回</el-button> -->
      <div class="tit1">文章管理</div>
    </div>
    <div class="nav2">
      <div class="tit1">
        <!-- 商品信息 -->
        <template v-if="activeName == '1'">
          <div class="myForm">
            <el-form :model="lhForm" ref="lhForm" label-width="100px" class="demo-ruleForm">
              <el-row>
                <el-col :span="20">
                  <el-form-item label="类型：">
                    <el-radio-group v-model="formInline.rad1" size="small" @change="changRad1">
                      <el-radio-button label="notice">通知</el-radio-button>
                      <el-radio-button label="help">帮助中心</el-radio-button>
                      <el-radio-button label="about">关于我们</el-radio-button>
                      <el-radio-button label="mch">拉商户获现金</el-radio-button>
                      <el-radio-button label="agent">拉经纪人获现金</el-radio-button>
                    </el-radio-group>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="12">
                  <el-form-item label="标题(中)：">
                    <el-input size="small" v-model="lhForm.title" placeholder="请输入内容"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="12">
                  <el-form-item label="标题(英)：">
                    <el-input size="small" v-model="lhForm.english_title" placeholder="请输入内容"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row v-show="formInline.rad1 == 'notice'">
                <el-col :span="12">
                  <el-form-item label="详情(中)：">
                    <el-input size="small" v-model="lhForm.content" placeholder="请输入内容"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row v-show="formInline.rad1 == 'notice'">
                <el-col :span="12">
                  <el-form-item label="详情(英)：">
                    <el-input size="small" v-model="lhForm.english_content" placeholder="请输入内容"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row v-show="formInline.rad1 != 'notice'">
                <el-col :span="20">
                  <div class="myEditor">
                    <div class="txt">详情(中)：</div>
                    <div id="editor"></div>
                  </div>
                </el-col>
              </el-row>
              <el-row v-show="formInline.rad1 != 'notice'">
                <el-col :span="20">
                  <div class="myEditor">
                    <div class="txt">详情(英)：</div>
                    <div id="editor2"></div>
                  </div>
                </el-col>
              </el-row>

              <el-form-item>
                <el-button size="small" type="primary" @click="onSubmitFormcyy">保存</el-button>
                <!-- <el-button @click="resetForm('ruleForm')">重置</el-button> -->
              </el-form-item>
            </el-form>
          </div>
        </template>
      </div>
    </div>
    <input
      type="file"
      name="companyLogo"
      id="file0"
      class="displayN"
      multiple="multiple"
      @change="companyLogo($event)"
      ref="fileInputList"
    />
  </div>
</template>

<script>
import E from "wangeditor";
import { mapState } from "vuex";
export default {
  computed: {
    ...mapState(["wenzhangObj"])
  },
  data() {
    return {
      id: "",
      formInline: {
        rad1: "notice"
      },
      radioArr: [],
      radioArr2: [],
      editId: "",
      activeName: "1",
      editor: null,
      editor2: null,
      tableData: [],
      total: 0,
      lhDialogVisible: false,
      lhForm: {
        title: "",
        english_title: "",
        content: "",
        english_content: ""
      },
      imgFile: null,
      isAdd: true
    };
  },
  created() {
    this.getData();
  },
  methods: {
    changRad1(e) {
      console.log(e);
      this.getData();
    },
    async getData() {
      const res = await this.$api.article({
        tag: this.formInline.rad1
      });
      console.log(res.data);
      this.id = res.data.id;
      this.lhForm.title = res.data.title;
      this.lhForm.english_title = res.data.english_title;
      this.lhForm.content = res.data.content;
      this.lhForm.english_content = res.data.english_content;
      setTimeout(() => {
        this.editor2.txt.html(this.lhForm.english_content);
      }, 200);
      setTimeout(() => {
        this.editor.txt.html(this.lhForm.content);
      }, 200);
    },
    // 上传图片
    companyList() {
      this.$refs.fileInputList.click();
    },
    companyLogo(event) {
      var file = event.target.files[0];
      this.imgFile = file;
      this.uploading(true);
      this.$refs.fileInputList.value = "";
    },
    //将文件转为blob类型
    readFileAsBuffer(file) {
      const reader = new FileReader();
      return new Promise(resolve => {
        reader.readAsDataURL(file);
        reader.onload = function() {
          const base64File = reader.result.replace(
            /^data:\w+\/\w+;base64,/,
            ""
          );
          resolve(new window.OSS.Buffer(base64File, "base64"));
        };
      });
    },
    async uploading(flag) {
      // console.log(document.getElementById("file0").value);
      if (flag) {
        var file_re = await this.readFileAsBuffer(this.imgFile);
        const res = await this.$api.uploadToken();
        let myData = res.data;
        console.log(myData);
        let client = new window.OSS.Wrapper({
          region: myData.region, //oss地址
          accessKeyId: myData.accessKeyId, //ak
          accessKeySecret: myData.accessKeySecret, //secret
          stsToken: myData.stsToken,
          bucket: myData.bucket //oss名字
        });
        var imgtype = this.imgFile.type.substr(6, 4);
        var store = `${new Date().getTime()}.${imgtype}`;
        client.put(store, file_re).then(() => {
          //这个结果就是url
          console.log(store);
          // var oss_imgurl = client.signatureUrl(store);
          var oss_imgurl = `https://${myData.bucket}.${myData.url}/${store}`;
          this.$set(this.lhForm, "pic", oss_imgurl);
          console.log(oss_imgurl);
        });
      }
    },
    // 删除图片
    delImg() {
      this.$set(this.lhForm, "pic", "");
    },
    // 保存
    async onSubmitFormcyy() {
      if (this.formInline.rad1 != "notice") {
        this.lhForm.content = document.getElementsByClassName(
          "w-e-text"
        )[0].innerHTML;
        this.lhForm.english_content = document.getElementsByClassName(
          "w-e-text"
        )[1].innerHTML;
      }
      const res = await this.$api.updateArticle(
        {
          tag: this.formInline.rad1,
          title: this.lhForm.title,
          english_title: this.lhForm.english_title,
          content: this.lhForm.content,
          english_content: this.lhForm.english_content
        },
        this.id
      );
      if (res.code == 200) {
        this.$message({
          message: "修改成功",
          type: "success"
        });
      } else {
        this.$message.error(res.msg);
        this.getData();
      }
    },
    async onSubmitForm() {
      this.lhForm.content = document.getElementsByClassName(
        "w-e-text"
      )[0].innerHTML;
      console.log(this.lhForm);
      if (!this.wenzhangObj) {
        // 添加
        const res = await this.$api.addArticles({
          name: this.lhForm.title,
          img: this.lhForm.pic,
          content: this.lhForm.content,
          type: this.lhForm.type
        });
        console.log(res);
        if (res.code == 200) {
          this.$message({
            message: "添加成功",
            type: "success"
          });
          setTimeout(() => {
            this.$router.push({ name: "Wenzhangliebiao" });
          }, 500);
        } else {
          this.$message.error(res.msg);
          this.getData();
        }
      } else {
        // 编辑
        const res = await this.$api.upLoadArticle(
          {
            title: this.lhForm.title,
            img: this.lhForm.pic,
            content: this.lhForm.content,
            tag: this.lhForm.type
          },
          this.editId
        );
        console.log(res);
        if (res.code == 200) {
          this.$message({
            message: "修改成功",
            type: "success"
          });
          setTimeout(() => {
            this.$router.push({ name: "Wenzhangliebiao" });
          }, 500);
        } else {
          this.$message.error(res.msg);
          this.getData();
        }
      }
      console.log(this.ruleForm);
    },
    // 添加sku小类
    addskuxiao(item1) {
      console.log(item1);
      if (item1.inpVal == "") {
        this.$message({
          message: "内容不能为空",
          type: "warning"
        });
      } else {
        item1.arr.push(item1.inpVal);
        item1.inpVal = "";
      }
    },
    // 添加sku大类
    addskuda() {
      if (this.addSkuDa.gg == "" || this.addSkuDa.ggz == "") {
        this.$message({
          message: "内容不能为空",
          type: "warning"
        });
      } else {
        this.sku.push({
          tit: this.addSkuDa.gg,
          arr: [this.addSkuDa.ggz],
          inpVal: ""
        });
        this.addSkuDa.gg = "";
        this.addSkuDa.ggz = "";
        this.isAdd = false;
      }
    },
    // 删除sku大类
    removeskuda(index) {
      this.sku.splice(index, 1);
    },
    // 删除sku小类
    removeskuxiao(index, i) {
      this.sku[index].arr.splice(i, 1);
    },
    // 删除sku表格中一项
    delTabSku(rowIndex) {
      console.log(rowIndex);
      this.skuTableData.splice(rowIndex, 1);
    },
    // 返佣批量设置
    fanyongPLSZ() {
      this.skuTableData.forEach((ele, i) => {
        this.$set(this.skuTableData[i], "brokerage", this.plszForm.brokerage);
        this.$set(
          this.skuTableData[i],
          "brokerage_two",
          this.plszForm.brokerage_two
        );
        this.$set(this.skuTableData[i], "vip_price", this.plszForm.vip_price);
      });
    },

    submitForm(formName, i) {
      // this.$refs[formName].validate((valid) => {
      //   if (valid) {
      //     alert("submit!");
      //   } else {
      //     console.log("error submit!!");
      //     return false;
      //   }
      // });
      console.log(formName, this.ruleForm, this.skuTableData);
      this.activeName = i;
    },
    async qtszOnSubmit() {
      this.content = document.getElementsByClassName("w-e-text")[0].innerHTML;
      this.skuTableData.forEach(ele => {
        ele.detail = {};
        delete ele._XID;
        for (const key in ele) {
          var pattern = new RegExp("[\u4E00-\u9FA5]+");
          if (pattern.test(key)) {
            ele.detail[key] = ele[key];
            delete ele[key];
          }
        }
      });
      this.sku.forEach(ele => {
        ele.value = ele.tit;
        ele.detail = [...ele.arr];
        delete ele.inpVal;
        delete ele.tit;
        delete ele.arr;
      });
      console.log(this.ruleForm, this.qtszForm, this.skuTableData, this.sku);
      if (this.wenzhangObj) {
        // 编辑
        const res = await this.$api.productSave({
          ...this.ruleForm,
          category_id: this.ruleForm.category_id[1].toString(),
          ...this.qtszForm,
          is_show: this.qtszForm.is_show == "上架" ? "1" : "0",
          attrs: this.skuTableData,
          items: this.sku,
          description: this.content,
          is_postage: "0",
          is_hot: "0",
          is_best: "0",
          is_new: "0",
          spec_type: "1",
          activity: "0,3",
          id: this.wenzhangObj.id
        });
        console.log(res);
        if (res.code == 200) {
          this.$message({
            message: res.msg,
            type: "success"
          });
          setTimeout(() => {
            this.$router.push({ name: "Shangpinguanli" });
          }, 500);
        } else {
          this.$message.error(res.msg);
          this.getData();
        }
      } else {
        const res = await this.$api.productSave({
          ...this.ruleForm,
          category_id: this.ruleForm.category_id[1].toString(),
          ...this.qtszForm,
          is_show: this.qtszForm.is_show == "上架" ? "1" : "0",
          attrs: this.skuTableData,
          items: this.sku,
          description: this.content,
          is_postage: "0",
          is_hot: "0",
          is_best: "0",
          is_new: "0",
          spec_type: "1",
          activity: "0,3"
        });
        console.log(res);
        if (res.code == 200) {
          this.$message({
            message: res.msg,
            type: "success"
          });
          setTimeout(() => {
            this.$router.push({ name: "Wenzhangliebiao" });
          }, 500);
        } else {
          this.$message.error(res.msg);
          this.getData();
        }
      }
    },
    toBack() {
      this.$router.push({ name: "Wenzhangliebiao" });
    }
  },
  mounted() {
    const that = this;
    this.editor = new E("#editor");
    this.editor.config.menus = [
      "head",
      "bold",
      "fontSize",
      "fontName",
      "italic",
      "underline",
      "strikeThrough",
      "indent",
      "lineHeight",
      "foreColor",
      "backColor",
      "list",
      "justify",
      "emoticon",
      "image",
      "table",
      "undo",
      "redo",
      'video'
    ];
    this.editor.config.uploadImgServer = "/upload-img";
    this.editor.config.customUploadImg = async function(
      resultFiles,
      insertImgFn
    ) {
      // resultFiles 是 input 中选中的文件列表
      // insertImgFn 是获取图片 url 后，插入到编辑器的方法
      that.imgFile = new FormData();
      that.imgFile.append("image", resultFiles[0]);
      const res = await that.$api.productUpload(that.imgFile);
      insertImgFn(`${that.$url}/${res}`);
    };
    this.editor.create();
    setTimeout(() => {
      this.editor.txt.html(this.lhForm.content);
    }, 200);
    //
    this.editor2 = new E("#editor2");
    this.editor2.config.menus = [
      "head",
      "bold",
      "fontSize",
      "fontName",
      "italic",
      "underline",
      "strikeThrough",
      "indent",
      "lineHeight",
      "foreColor",
      "backColor",
      "list",
      "justify",
      "emoticon",
      "image",
      "table",
      "undo",
      "redo",
      'video'
    ];
    this.editor2.config.uploadImgServer = "/upload-img";
    // this.editor2.config.uploadImgShowBase64 = true; // 使用 base64 保存图片
    this.editor2.config.customUploadImg = async function(
      resultFiles,
      insertImgFn
    ) {
      // resultFiles 是 input 中选中的文件列表
      // insertImgFn 是获取图片 url 后，插入到编辑器的方法
      that.imgFile = new FormData();
      that.imgFile.append("image", resultFiles[0]);
      const res = await that.$api.productUpload(that.imgFile);
      insertImgFn(`${that.$url}/${res}`);
    };
    this.editor2.create();
    setTimeout(() => {
      this.editor2.txt.html(this.lhForm.english_content);
    }, 200);
  }
};
</script>

<style lang="scss" scoped>
.index {
}
.nav1 {
  margin: 0 -18px;
  background-color: #fff;
  padding: 20px 32px 0 40px;
  display: flex;
  .btn {
    transform: translateY(-4px);
    height: 30px;
    margin-right: 10px;
  }
  .tit1 {
    color: #17233d;
    font-weight: 500;
    font-size: 20px;
    padding-bottom: 20px;
  }
  .tit2 {
    margin-top: 10px;
    /deep/ .el-tabs--top .el-tabs__item.is-top:nth-child(2) {
      padding-left: 20px;
    }
    /deep/ .el-tabs__header {
      margin: 0 0 1px;
    }
  }
}
.nav2 {
  margin: 18px 0;
  background: #fff;
  border-radius: 6px;
  padding: 24px;
  .tit1 {
    margin-top: 10px;
  }
  .myForm {
    margin-top: 10px;
    /deep/ .el-cascader {
      width: 100%;
    }
    /deep/ .el-form-item__label {
      font-size: 12px;
    }
    /deep/ .el-checkbox__label {
      font-size: 12px;
    }
    /deep/ .el-radio__label {
      font-size: 12px;
    }
    /deep/ .el-row {
      margin-right: 0px !important;
    }
    /deep/ .el-radio {
      margin-right: 10px;
    }
    .flex-gg {
      /deep/ .el-select {
        width: 50%;
      }
    }
    .sku {
      .tit1 {
        display: flex;
        align-items: center;
        .txt1-1 {
          margin-right: 4px;
          color: #515a6e;
          font-size: 12px;
        }
        .el-icon-error {
          cursor: pointer;
        }
      }
      .tit2 {
        border: 1px solid #dcdfe6;
        display: inline-block;
        height: 30px;
        border-radius: 4px;
        padding: 0 8px;
        margin-right: 8px;
        .blue {
          transform: translateY(-5px);
          display: inline-block;
          background: #2d8cf0;
          width: 12px;
          height: 12px;
          border-radius: 50%;
        }
        .txt1 {
          transform: translateY(-6px);
          margin-left: 4px;
          display: inline-block;
          font-size: 12px;
          color: #515a6e;
        }
        .txt2 {
          cursor: pointer;
          transform: translateY(-5px);
          margin-left: 6px;
          display: inline-block;
          font-size: 16px;
          color: #999999;
        }
      }
      .addGg {
        transform: translateY(-2px);
        display: inline-block;
        width: 200px !important;
        /deep/ .el-input-group__append {
          border: 0;
          background: #409eff;
          color: #ffffff;
          font-size: 12px;
        }
      }
    }
    .footer {
      display: flex;
      align-items: center;
      width: 900px;
      .tit1 {
        margin-right: 20px;
        display: flex;
        .txt1 {
          width: 40px;
          font-size: 12px;
          color: #606266;
        }
        /deep/ .el-input {
          width: 160px;
        }
        .txt2.txt1 {
          width: 52px;
        }
      }
      .btns {
        transform: translateY(4px);
        width: 180px;
        display: inline-block;
      }
    }
    .footer2.footer {
      // transform: translate(-41px, -12px);
      transform: translate(0px, -10px);
    }
    .mySkuTable {
      margin-top: 16px;
      min-width: 800px;
      width: 60vw;
      /deep/ .vxe-table--render-default .vxe-body--column {
        line-height: 40px;
      }
      /deep/ .el-input__inner {
        padding: 0 0 0 10px;
      }
    }
  }
}
/deep/ .el-input-group__append {
  cursor: pointer;
}

.btnflex {
  margin-top: 20px;
  margin-left: 101px;
}
.displayN {
  display: none;
}
.lhmyForm {
  /deep/ .el-form-item__label {
    font-size: 12px;
  }
  /deep/ .el-form-item {
    margin-right: 30px;
    margin-bottom: 20px;
  }
  .search {
    margin-top: 3px;
    /deep/ .el-select {
      width: 100px;
    }
  }
}
.myImg {
  position: relative;
  width: 60px;
  height: 60px;
  display: inline-block;
  margin-right: 12px;
  .closeBtn {
    position: absolute;
    top: -6px;
    right: -4px;
    width: 20px;
    height: 20px;
    .el-button {
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
  /deep/ .image-slot {
    border: 1px solid #ddd;
    border-radius: 4px;
    background-color: #fafafa;
    width: 58px;
    height: 58px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    .el-icon-picture-outline {
      font-size: 20px;
    }
  }
}
// 详情
.myEditor {
  display: flex;
  .txt {
    color: #606266;
    width: 90px;
    font-size: 12px;
    margin-right: 12px;
    margin-top: 2px;
    text-align: right;
  }
  #editor {
    transform: translateY(-6px);
  }
}
</style>