<template>
  <div class="index">
    <div class="nav1">
      <el-button @click="toBack" class="btn" size="small" icon="el-icon-arrow-left">返回</el-button>
      <div class="tit1">分类/城市管理信息</div>
    </div>
    <div class="nav2">
      <div class="tit1">
        <el-tabs v-model="activeName">
          <el-tab-pane label="管理信息" name="1"></el-tab-pane>
          <!-- <el-tab-pane label="商品详情" name="2"></el-tab-pane> -->
          <!-- <el-tab-pane label="其他设置" name="3"></el-tab-pane> -->
        </el-tabs>
        <!-- 商品信息 -->
        <template v-if="activeName == '1'">
          <div class="myForm">
            <el-form :model="lhForm" ref="lhForm" label-width="100px" class="demo-ruleForm">
              <el-row>
                <el-col :span="12">
                  <el-form-item label="简介(中)：">
                    <el-input size="small" type="textarea" :rows="4" v-model="lhForm.cc_desc"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="12">
                  <el-form-item label="简介(英)：">
                    <el-input
                      size="small"
                      type="textarea"
                      :rows="4"
                      v-model="lhForm.english_cc_desc"
                    ></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="12">
                  <el-form-item label="图片：">
                    <div @click="companyList" class="myImg">
                      <el-image :src="lhForm.img" fit="fill" style="width: 60px; height: 60px">
                        <div slot="error" class="image-slot">
                          <i class="el-icon-picture-outline"></i>
                        </div>
                      </el-image>
                      <div @click.stop="delImg" class="closeBtn">
                        <el-button circle>×</el-button>
                      </div>
                    </div>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="12">
                  <el-form-item label="关键词：">
                    <el-input size="small" v-model="lhForm.search_key"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="12">
                  <el-form-item label="分类：">
                    <el-select size="small" v-model="lhForm.category_id" placeholder="请选择">
                      <el-option
                        v-for="item in option1"
                        :key="item.id"
                        :label="`${item.category_name}(${item.category_english_name})`"
                        :value="item.id"
                      ></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="12">
                  <el-form-item label="城市：">
                    <el-select size="small" v-model="lhForm.country_id" placeholder="请选择">
                      <el-option
                        v-for="item in option2"
                        :key="item.id"
                        :label="`${item.country_name}(${item.country_english_name})`"
                        :value="item.id"
                      ></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
              </el-row>

              <quill-editor
                ref="myQuillEditor"
                v-model="content"
                :options="editorOption"
                @change="onEditorChange($event)"
              />
              <form action method="post" enctype="multipart/form-data" id="uploadFormMulti">
                <input
                  style="display: none"
                  :id="uniqueId"
                  type="file"
                  name="file"
                  multiple
                  accept="image/jpg, image/jpeg, image/png, image/gif"
                  @change="onEditorChange($event)"
                  @blur="onEditorBlur($event)"
                  @focus="onEditorFocus($event)"
                  @ready="onEditorReady($event)"
                />
              </form>
              <!-- <el-row>
                <el-col :span="20">
                  <div class="myEditor">
                    <div class="txt">费用介绍(中)：</div>
                    <div id="editor"></div>
                  </div>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="20">
                  <div class="myEditor">
                    <div class="txt">费用介绍(英)：</div>
                    <div id="editor4"></div>
                  </div>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="20">
                  <div class="myEditor">
                    <div class="txt">店铺介绍(中)：</div>
                    <div id="editor2"></div>
                  </div>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="20">
                  <div class="myEditor">
                    <div class="txt">店铺介绍(英)：</div>
                    <div id="editor5"></div>
                  </div>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="20">
                  <div class="myEditor">
                    <div class="txt">行业介绍(中)：</div>
                    <div id="editor3"></div>
                  </div>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="20">
                  <div class="myEditor">
                    <div class="txt">行业介绍(英)：</div>
                    <div id="editor6"></div>
                  </div>
                </el-col>
              </el-row>-->
              <el-form-item>
                <el-button size="small" type="primary" @click="onSubmitForm">保存</el-button>
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
// import E from "wangeditor";
import { mapState } from "vuex";
const toolbarOptions = [
  ["bold", "italic", "underline", "strike"], // 加粗 斜体 下划线 删除线 -----['bold', 'italic', 'underline', 'strike']
  ["blockquote", "code-block"], // 引用  代码块-----['blockquote', 'code-block']
  [{ header: 1 }, { header: 2 }], // 1、2 级标题-----[{ header: 1 }, { header: 2 }]
  [{ list: "ordered" }, { list: "bullet" }], // 有序、无序列表-----[{ list: 'ordered' }, { list: 'bullet' }]
  [{ script: "sub" }, { script: "super" }], // 上标/下标-----[{ script: 'sub' }, { script: 'super' }]
  [{ indent: "-1" }, { indent: "+1" }], // 缩进-----[{ indent: '-1' }, { indent: '+1' }]
  [{ direction: "rtl" }], // 文本方向-----[{'direction': 'rtl'}]
  [{ size: ["small", false, "large", "huge"] }], // 字体大小-----[{ size: ['small', false, 'large', 'huge'] }]
  [{ header: [1, 2, 3, 4, 5, 6, false] }], // 标题-----[{ header: [1, 2, 3, 4, 5, 6, false] }]
  [{ color: [] }, { background: [] }], // 字体颜色、字体背景颜色-----[{ color: [] }, { background: [] }]
  [{ font: [] }], // 字体种类-----[{ font: [] }]
  [{ align: [] }], // 对齐方式-----[{ align: [] }]
  ["clean"], // 清除文本格式-----['clean']
  ["image", "video",'link'] // 链接、图片、视频-----['link', 'image', 'video']
];
export default {
  mounted() {},
  computed: {
    ...mapState(["wenzhangObj"])
  },
  data() {
    return {
      uniqueId: "uniqueId",
      // 富文本编辑器默认内容
      content: "<h2>I am Example</h2>",
      //富文本编辑器配置
      editorOption: {
        //  富文本编辑器配置
        modules: {
          //工具栏定义的
          toolbar: toolbarOptions
        },
        //主题
        theme: "snow",
        placeholder: "请输入正文"
      },
      //
      myImg: "",
      option1: [],
      option2: [],
      radioArr: [],
      radioArr2: [],
      editId: "",
      activeName: "1",
      editor: null,
      tableData: [],
      total: 0,
      lhDialogVisible: false,
      lhForm: {
        search_key: "",
        cc_desc: "",
        english_cc_desc: "",
        category_id: "",
        country_id: "",
        content: "",
        content2: "",
        content3: "",
        content4: "",
        content5: "",
        content6: "",
        img: ""
      },
      imgFile: "",
      isAdd: true
    };
  },
  created() {
    this.getData();
  },
  methods: {
    async getData() {
      console.log(this.wenzhangObj);
      if (this.wenzhangObj) {
        // 编辑
        this.myImg = this.wenzhangObj.img;
        this.editId = this.wenzhangObj.id;
        this.lhForm.category_id = this.wenzhangObj.category_id;
        // this.lhForm.pic = this.wenzhangObj.img;
        this.lhForm.country_id = this.wenzhangObj.country_id;
        this.lhForm.content = this.wenzhangObj.fee_desc;
        this.lhForm.content4 = this.wenzhangObj.fee_english_desc;
        this.lhForm.content2 = this.wenzhangObj.shop_desc;
        this.lhForm.content5 = this.wenzhangObj.shop_english_desc;
        this.lhForm.content3 = this.wenzhangObj.hangye_desc;
        this.lhForm.content6 = this.wenzhangObj.hangye_english_desc;
        this.lhForm.cc_desc = this.wenzhangObj.cc_desc;
        this.lhForm.english_cc_desc = this.wenzhangObj.english_cc_desc;
        this.lhForm.img = this.wenzhangObj.myIcon_url;
        this.lhForm.search_key = this.wenzhangObj.search_key;
      }
      const res = await this.$api.category({
        page: 1,
        limit: 10000
      });
      this.option1 = res.data.data;
      const res2 = await this.$api.country({
        page: 1,
        limit: 10000
      });
      this.option2 = res2.data.data;
      console.log(this.lhForm);
    },
    
    onEditorBlur(quill) {
      console.log('editor blur!', quill)
    },
    onEditorFocus(quill) {
      console.log('editor focus!', quill)
    },
    onEditorReady(quill) {
      console.log('editor ready!', quill)
    },
    onEditorChange({ quill, html, text }) {
     this.content = html
      console.log('editor change!', quill, html, text)
      //this.$emit('change', html)
    },
    uploadImg: async function() {
      var _this = this;
      //构造formData对象
      var formData = new FormData();
      formData.append("file", document.getElementById(_this.uniqueId).files[0]);

      try {
        //调用上传文件接口
        this.$http.productapi.uploadImgReq(formData).then(res => {
          //返回上传文件的地址
          let url = res;
          if (url != null && url.length > 0) {
            let Range = _this.editor.getSelection();
            url = url.indexOf("http") != -1 ? url : "http:" + url;
            //上传文件成功之后在富文本中回显(显示)
            _this.editor.insertEmbed(
              Range != null ? Range.index : 0,
              "image",
              url
            );
          } else {
            _this.$message.warning("图片上传失败");
          }
          //成功之后,将文件的文本框的value置空
          document.getElementById(_this.uniqueId).value = "";
        });
      } catch ({ message: msg }) {
        document.getElementById(_this.uniqueId).value = "";
        _this.$message.warning(msg);
      }
    },
    // 上传图片
    companyList() {
      this.$refs.fileInputList.click();
    },
    async companyLogo(event) {
      const that = this;
      var file = event.target.files[0];
      var fileSize = file.size; //文件大小
      var filetType = file.type; //文件类型
      //创建文件读取对象
      // console.log(file);
      if (fileSize <= 10240 * 1024) {
        if (
          filetType == "image/png" ||
          filetType == "image/jpeg" ||
          filetType == "image/gif"
        ) {
          this.imgFile = new FormData();
          this.imgFile.append("image", file);
          sessionStorage.setItem("img", 123);
          const res = await that.$api.productUpload(this.imgFile);
          this.myImg = res;
          this.$set(this.lhForm, "img", `${this.$url}/${res}`);
          that.$refs.fileInputList.value = "";
        } else {
          this.$message.error("图片格式不正确");
        }
      } else {
        this.$message.error("图片大小不正确");
      }
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
    // 删除图片
    delImg() {
      this.$set(this.lhForm, "img", "");
    },
    // 保存
    async onSubmitForm() {
      this.lhForm.content = document.getElementsByClassName(
        "w-e-text"
      )[0].innerHTML;
      this.lhForm.content4 = document.getElementsByClassName(
        "w-e-text"
      )[1].innerHTML;
      this.lhForm.content2 = document.getElementsByClassName(
        "w-e-text"
      )[2].innerHTML;
      this.lhForm.content5 = document.getElementsByClassName(
        "w-e-text"
      )[3].innerHTML;
      this.lhForm.content3 = document.getElementsByClassName(
        "w-e-text"
      )[4].innerHTML;
      this.lhForm.content6 = document.getElementsByClassName(
        "w-e-text"
      )[5].innerHTML;
      console.log(this.lhForm);
      if (this.wenzhangObj) {
        // 编辑
        const res = await this.$api.upDateCcrelation(
          {
            category_id: this.lhForm.category_id,
            country_id: this.lhForm.country_id,
            img: this.myImg,
            fee_desc: this.lhForm.content,
            shop_desc: this.lhForm.content2,
            hangye_desc: this.lhForm.content3,
            fee_english_desc: this.lhForm.content4,
            shop_english_desc: this.lhForm.content5,
            hangye_english_desc: this.lhForm.content6,
            search_key: this.lhForm.search_key,
            cc_desc: this.lhForm.cc_desc,
            english_cc_desc: this.lhForm.english_cc_desc
          },
          this.wenzhangObj.id
        );
        console.log(res);
        if (res.code == 200) {
          this.$message({
            message: res.msg,
            type: "success"
          });
          setTimeout(() => {
            this.$router.push({ name: "Xinxiguanli" });
          }, 500);
        } else {
          this.$message.error(res.msg);
          this.getData();
        }
      } else {
        const res = await this.$api.addCcrelation({
          category_id: this.lhForm.category_id,
          country_id: this.lhForm.country_id,
          search_key: this.lhForm.search_key,
          img: this.myImg,
          fee_desc: this.lhForm.content,
          shop_desc: this.lhForm.content2,
          hangye_desc: this.lhForm.content3,
          fee_english_desc: this.lhForm.content4,
          shop_english_desc: this.lhForm.content5,
          hangye_english_desc: this.lhForm.content6,
          cc_desc: this.lhForm.cc_desc,
          english_cc_desc: this.lhForm.english_cc_desc
        });
        console.log(res);
        if (res.code == 200) {
          this.$message({
            message: res.msg,
            type: "success"
          });
          setTimeout(() => {
            this.$router.push({ name: "Xinxiguanli" });
          }, 500);
        } else {
          this.$message.error(res.msg);
          this.getData();
        }
      }
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
          category_id: this.lhForm.category_id,
          country_id: this.lhForm.country_id,
          img: this.myImg,
          fee_desc: this.lhForm.content,
          shop_desc: this.lhForm.content2,
          hangye_desc: this.lhForm.content3,
          id: this.wenzhangObj.id
        });
        console.log(res);
        if (res.code == 200) {
          this.$message({
            message: res.msg,
            type: "success"
          });
          setTimeout(() => {
            this.$router.push({ name: "Xinxiguanli" });
          }, 500);
        } else {
          this.$message.error(res.msg);
          this.getData();
        }
      } else {
        const res = await this.$api.addCcrelation({
          category_id: this.lhForm.category_id,
          country_id: this.lhForm.country_id,
          img: this.myImg,
          fee_desc: this.lhForm.content,
          shop_desc: this.lhForm.content2,
          hangye_desc: this.lhForm.content3
        });
        console.log(res);
        if (res.code == 200) {
          this.$message({
            message: res.msg,
            type: "success"
          });
          setTimeout(() => {
            this.$router.push({ name: "Xinxiguanli" });
          }, 500);
        } else {
          this.$message.error(res.msg);
          this.getData();
        }
      }
    },
    toBack() {
      this.$router.push({ name: "Xinxiguanli" });
    }
  }
  // mounted() {
  //   const that = this;
  //   this.editor = new E("#editor");
  //   this.editor.config.menus = [
  //     "head",
  //     "bold",
  //     "fontSize",
  //     "fontName",
  //     "italic",
  //     "underline",
  //     "strikeThrough",
  //     "indent",
  //     "lineHeight",
  //     "foreColor",
  //     "backColor",
  //     "list",
  //     "justify",
  //     "emoticon",
  //     "image",
  //     "table",
  //     "undo",
  //     "redo"
  //   ];
  //   this.editor.config.uploadImgServer = "/upload-img";
  //   // this.editor.config.uploadImgShowBase64 = true; // 使用 base64 保存图片
  //   this.editor.config.customUploadImg = async function(
  //     resultFiles,
  //     insertImgFn
  //   ) {
  //     // resultFiles 是 input 中选中的文件列表
  //     // insertImgFn 是获取图片 url 后，插入到编辑器的方法
  //     that.imgFile = new FormData();
  //     that.imgFile.append("image", resultFiles[0]);
  //     const res = await that.$api.productUpload(that.imgFile);
  //     insertImgFn(`${that.$url}/${res}`);
  //   };
  //   this.editor.create();
  //   this.editor.txt.html(this.lhForm.content);
  //   //
  //   this.editor2 = new E("#editor2");
  //   this.editor2.config.menus = [
  //     "head",
  //     "bold",
  //     "fontSize",
  //     "fontName",
  //     "italic",
  //     "underline",
  //     "strikeThrough",
  //     "indent",
  //     "lineHeight",
  //     "foreColor",
  //     "backColor",
  //     "list",
  //     "justify",
  //     "emoticon",
  //     "image",
  //     "table",
  //     "undo",
  //     "redo",
  //     "video"
  //   ];
  //   this.editor2.config.uploadImgServer = "/upload-img";
  //   // this.editor2.config.uploadImgShowBase64 = true; // 使用 base64 保存图片
  //   this.editor2.config.customUploadImg = async function(
  //     resultFiles,
  //     insertImgFn
  //   ) {
  //     // resultFiles 是 input 中选中的文件列表
  //     // insertImgFn 是获取图片 url 后，插入到编辑器的方法
  //     that.imgFile = new FormData();
  //     that.imgFile.append("image", resultFiles[0]);
  //     const res = await that.$api.productUpload(that.imgFile);
  //     insertImgFn(`${that.$url}/${res}`);
  //   };
  //   this.editor2.create();
  //   this.editor2.txt.html(this.lhForm.content2);
  //   //
  //   this.editor3 = new E("#editor3");
  //   this.editor3.config.menus = [
  //     "head",
  //     "bold",
  //     "fontSize",
  //     "fontName",
  //     "italic",
  //     "underline",
  //     "strikeThrough",
  //     "indent",
  //     "lineHeight",
  //     "foreColor",
  //     "backColor",
  //     "list",
  //     "justify",
  //     "emoticon",
  //     "image",
  //     "table",
  //     "undo",
  //     "redo",
  //     "video"
  //   ];
  //   this.editor3.config.uploadImgServer = "/upload-img";
  //   // this.editor3.config.uploadImgShowBase64 = true; // 使用 base64 保存图片
  //   this.editor3.config.customUploadImg = async function(
  //     resultFiles,
  //     insertImgFn
  //   ) {
  //     // resultFiles 是 input 中选中的文件列表
  //     // insertImgFn 是获取图片 url 后，插入到编辑器的方法
  //     that.imgFile = new FormData();
  //     that.imgFile.append("image", resultFiles[0]);
  //     const res = await that.$api.productUpload(that.imgFile);
  //     insertImgFn(`${that.$url}/${res}`);
  //   };
  //   this.editor3.create();
  //   this.editor3.txt.html(this.lhForm.content3);

  //   //
  //   this.editor4 = new E("#editor4");
  //   this.editor4.config.menus = [
  //     "head",
  //     "bold",
  //     "fontSize",
  //     "fontName",
  //     "italic",
  //     "underline",
  //     "strikeThrough",
  //     "indent",
  //     "lineHeight",
  //     "foreColor",
  //     "backColor",
  //     "list",
  //     "justify",
  //     "emoticon",
  //     "image",
  //     "table",
  //     "undo",
  //     "redo",
  //     "video"
  //   ];
  //   this.editor4.config.uploadImgServer = "/upload-img";
  //   // this.editor4.config.uploadImgShowBase64 = true; // 使用 base64 保存图片
  //   this.editor4.config.customUploadImg = async function(
  //     resultFiles,
  //     insertImgFn
  //   ) {
  //     // resultFiles 是 input 中选中的文件列表
  //     // insertImgFn 是获取图片 url 后，插入到编辑器的方法
  //     that.imgFile = new FormData();
  //     that.imgFile.append("image", resultFiles[0]);
  //     const res = await that.$api.productUpload(that.imgFile);
  //     insertImgFn(`${that.$url}/${res}`);
  //   };
  //   this.editor4.create();
  //   this.editor4.txt.html(this.lhForm.content4);
  //   //
  //   this.editor5 = new E("#editor5");
  //   this.editor5.config.menus = [
  //     "head",
  //     "bold",
  //     "fontSize",
  //     "fontName",
  //     "italic",
  //     "underline",
  //     "strikeThrough",
  //     "indent",
  //     "lineHeight",
  //     "foreColor",
  //     "backColor",
  //     "list",
  //     "justify",
  //     "emoticon",
  //     "image",
  //     "table",
  //     "undo",
  //     "redo",
  //     "video"
  //   ];
  //   this.editor5.config.uploadImgServer = "/upload-img";
  //   // this.editor5.config.uploadImgShowBase64 = true; // 使用 base64 保存图片
  //   this.editor5.config.customUploadImg = async function(
  //     resultFiles,
  //     insertImgFn
  //   ) {
  //     // resultFiles 是 input 中选中的文件列表
  //     // insertImgFn 是获取图片 url 后，插入到编辑器的方法
  //     that.imgFile = new FormData();
  //     that.imgFile.append("image", resultFiles[0]);
  //     const res = await that.$api.productUpload(that.imgFile);
  //     insertImgFn(`${that.$url}/${res}`);
  //   };
  //   this.editor5.create();
  //   this.editor5.txt.html(this.lhForm.content5);
  //   //
  //   this.editor6 = new E("#editor6");
  //   this.editor6.config.menus = [
  //     "head",
  //     "bold",
  //     "fontSize",
  //     "fontName",
  //     "italic",
  //     "underline",
  //     "strikeThrough",
  //     "indent",
  //     "lineHeight",
  //     "foreColor",
  //     "backColor",
  //     "list",
  //     "justify",
  //     "emoticon",
  //     "image",
  //     "table",
  //     "undo",
  //     "redo",
  //     "video"
  //   ];
  //   this.editor6.config.uploadImgServer = "/upload-img";
  //   // this.editor6.config.uploadImgShowBase64 = true; // 使用 base64 保存图片
  //   this.editor6.config.customUploadImg = async function(
  //     resultFiles,
  //     insertImgFn
  //   ) {
  //     // resultFiles 是 input 中选中的文件列表
  //     // insertImgFn 是获取图片 url 后，插入到编辑器的方法
  //     that.imgFile = new FormData();
  //     that.imgFile.append("image", resultFiles[0]);
  //     const res = await that.$api.productUpload(that.imgFile);
  //     insertImgFn(`${that.$url}/${res}`);
  //   };
  //   this.editor6.create();
  //   this.editor6.txt.html(this.lhForm.content6);
  // }
};
</script>

<style lang='scss' >
.editor {
  line-height: normal !important;
  height: 500px;
}
.ql-snow .ql-tooltip[data-mode="link"]::before {
  content: "请输入链接地址:";
}
.ql-snow .ql-tooltip.ql-editing a.ql-action::after {
  border-right: 0px;
  content: "保存";
  padding-right: 0px;
}

.ql-snow .ql-tooltip[data-mode="video"]::before {
  content: "请输入视频地址:";
}

.ql-snow .ql-picker.ql-size .ql-picker-label::before,
.ql-snow .ql-picker.ql-size .ql-picker-item::before {
  content: "14px";
}
.ql-snow .ql-picker.ql-size .ql-picker-label[data-value="small"]::before,
.ql-snow .ql-picker.ql-size .ql-picker-item[data-value="small"]::before {
  content: "10px";
}
.ql-snow .ql-picker.ql-size .ql-picker-label[data-value="large"]::before,
.ql-snow .ql-picker.ql-size .ql-picker-item[data-value="large"]::before {
  content: "18px";
}
.ql-snow .ql-picker.ql-size .ql-picker-label[data-value="huge"]::before,
.ql-snow .ql-picker.ql-size .ql-picker-item[data-value="huge"]::before {
  content: "32px";
}

.ql-snow .ql-picker.ql-header .ql-picker-label::before,
.ql-snow .ql-picker.ql-header .ql-picker-item::before {
  content: "文本";
}
.ql-snow .ql-picker.ql-header .ql-picker-label[data-value="1"]::before,
.ql-snow .ql-picker.ql-header .ql-picker-item[data-value="1"]::before {
  content: "标题1";
}
.ql-snow .ql-picker.ql-header .ql-picker-label[data-value="2"]::before,
.ql-snow .ql-picker.ql-header .ql-picker-item[data-value="2"]::before {
  content: "标题2";
}
.ql-snow .ql-picker.ql-header .ql-picker-label[data-value="3"]::before,
.ql-snow .ql-picker.ql-header .ql-picker-item[data-value="3"]::before {
  content: "标题3";
}
.ql-snow .ql-picker.ql-header .ql-picker-label[data-value="4"]::before,
.ql-snow .ql-picker.ql-header .ql-picker-item[data-value="4"]::before {
  content: "标题4";
}
.ql-snow .ql-picker.ql-header .ql-picker-label[data-value="5"]::before,
.ql-snow .ql-picker.ql-header .ql-picker-item[data-value="5"]::before {
  content: "标题5";
}
.ql-snow .ql-picker.ql-header .ql-picker-label[data-value="6"]::before,
.ql-snow .ql-picker.ql-header .ql-picker-item[data-value="6"]::before {
  content: "标题6";
}

.ql-snow .ql-picker.ql-font .ql-picker-label::before,
.ql-snow .ql-picker.ql-font .ql-picker-item::before {
  content: "标准字体";
}
.ql-snow .ql-picker.ql-font .ql-picker-label[data-value="serif"]::before,
.ql-snow .ql-picker.ql-font .ql-picker-item[data-value="serif"]::before {
  content: "衬线字体";
}
.ql-snow .ql-picker.ql-font .ql-picker-label[data-value="monospace"]::before,
.ql-snow .ql-picker.ql-font .ql-picker-item[data-value="monospace"]::before {
  content: "等宽字体";
}
</style>
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
    width: 80%;
    transform: translateY(-6px);
  }
  #editor2 {
    width: 80%;
    transform: translateY(-6px);
  }
  #editor3 {
    width: 80%;
    transform: translateY(-6px);
  }
  #editor4 {
    width: 80%;
    transform: translateY(-6px);
  }
  #editor5 {
    width: 80%;
    transform: translateY(-6px);
  }
  #editor6 {
    width: 80%;
    transform: translateY(-6px);
  }
}
//
//
//
.Tinymce_box {
  display: flex;
}
.editor-content {
  margin-left: 30px;
  flex-grow: 1;
  border: 2px dashed #f1f1f1;
  padding: 0 20px;
}
h3 {
  color: #808080;
}
</style>