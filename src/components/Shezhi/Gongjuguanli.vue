<template>
  <div class="index">
    <div class="nav1">
      <div class="tit1">工具管理</div>
    </div>
    <div class="nav2">
      <!-- <div class="myForm">
        <el-form :inline="true" :model="searchForm" class="demo-form-inline">
          <el-form-item label="商品分类：">
            <el-select
              size="small"
              v-model="searchForm.pid"
              placeholder="商品分类"
            >
              <el-option label="顶级分类" value="0"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item size="small" label="状态：">
            <el-select v-model="searchForm.status" placeholder="状态">
              <el-option label="区域一" value="shanghai"></el-option>
              <el-option label="区域二" value="beijing"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item size="small" label="分类名称：">
            <el-input
              v-model="searchForm.keyword"
              placeholder="请输入"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button size="small" type="primary" @click="searchOnSubmit"
              >查询</el-button
            >
          </el-form-item>
        </el-form>
      </div>-->
      <div class="tit1">
        <el-button @click="AddFenlei" size="small" type="primary" icon="el-icon-plus">工具上传</el-button>
      </div>
      <div class="myTable">
        <vxe-table align="center" :data="tableData">
          <vxe-table-column field="id" title="ID"></vxe-table-column>
          <vxe-table-column field="tool_name" title="工具名(中)"></vxe-table-column>
          <vxe-table-column field="tool_english_name" title="工具名(英)"></vxe-table-column>
          <vxe-table-column field="avatar" title="图片">
            <template slot-scope="scope">
              <el-image
                :src="scope.row.myimg"
                :preview-src-list="[scope.row.myimg]"
                fit="fill"
                style="width: 40px; height: 40px"
              >
                <div slot="error" class="image-slot">
                  <i class="el-icon-picture-outline"></i>
                </div>
              </el-image>
            </template>
          </vxe-table-column>
          <vxe-table-column field="categoryinfo.category_name" title="分类(中)"></vxe-table-column>
          <vxe-table-column field="categoryinfo.category_english_name" title="分类(英)"></vxe-table-column>
          <vxe-table-column field="countryinfo.country_name" title="地区(中)"></vxe-table-column>
          <vxe-table-column field="countryinfo.country_english_name" title="地区(英)"></vxe-table-column>
          <vxe-table-column field="file_size" title="图片大小"></vxe-table-column>
          <vxe-table-column field="file_type" title="图片类型"></vxe-table-column>
          <vxe-table-column field="mytool_url" title="下载地址"></vxe-table-column>
          <!-- <vxe-table-column field="is_show" title="状态(是否显示)">
            <template slot-scope="scope">
              <el-switch
                @change="changeKG(scope.row)"
                v-model="scope.row.is_showKG"
              >
              </el-switch>
            </template>
          </vxe-table-column>-->
          <vxe-table-column title="操作" width="180">
            <template slot-scope="scope">
              <div class="flex">
                <el-button size="small" type="text" @click="tabEdit(scope.row)">编辑</el-button>
                <el-button size="small" type="text" @click="tabDel(scope.row)">删除</el-button>
              </div>
            </template>
          </vxe-table-column>
        </vxe-table>
        <el-pagination
          class="fenye"
          style="margin-top:16px"
          @size-change="this.handleSizeChange"
          @current-change="this.handleCurrentChange"
          :current-page="this.jishiShougouPage"
          :page-size="10"
          :page-sizes="[10, 15, 20, 30]"
          layout="total,sizes, prev, pager, next, jumper"
          :total="this.total"
        ></el-pagination>
      </div>
    </div>
    <!-- 上传/修改工具 -->
    <el-dialog
      title="上传/修改工具"
      :visible.sync="addDialogVisible"
      width="700px"
      :before-close="addHandleClose"
    >
      <div class="myAddForm">
        <el-form
          :model="addForm"
          :rules="rules"
          ref="addForm"
          label-width="100px"
          class="demo-addForm"
        >
          <el-row>
            <el-col :span="20">
              <el-form-item label="分类">
                <el-select size="small" v-model="addForm.category_id" placeholder="请选择">
                  <el-option
                    v-for="item in fenleiOption"
                    :key="item.id"
                    :label="`${item.category_name}(${item.category_english_name})`"
                    :value="item.id"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="20">
              <el-form-item label="城市">
                <el-select size="small" v-model="addForm.country_id" placeholder="请选择">
                  <el-option
                    v-for="item in chengshiOption"
                    :key="item.id"
                    :label="`${item.country_name}(${item.country_english_name})`"
                    :value="item.id"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="20">
              <el-form-item label="工具名(中)">
                <el-input size="small" placeholder="请输入" v-model="addForm.tool_name"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="20">
              <el-form-item label="工具名(英)">
                <el-input size="small" placeholder="请输入" v-model="addForm.tool_english_name"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="20">
              <el-form-item label="工具下载地址">
                <el-button size="small" v-if="isAdd" v-loading.fullscreen.lock="fullscreenLoading" @click="$refs.fileInputList1.click();">选择文件</el-button>
                <el-button size="small" v-else v-loading.fullscreen.lock="fullscreenLoading" @click="$refs.fileInputList1.click();">更换文件</el-button>
                <input
                  class="displayN"
                  name="companyfile"
                  size="small"
                  type="file"
                  @change="companyfile($event)"
                  multiple="multiple"
                  ref="fileInputList1"
                />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="20">
              <el-form-item label="分类图标">
                <div @click="companyList" class="myImg">
                  <el-image :src="addForm.img" fit="fill" style="width: 60px; height: 60px">
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
            <el-col :span="20">
              <el-form-item>
                <el-button size="small" type="primary" @click="AddOnSubmit">提交</el-button>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
    </el-dialog>
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
import { mapState } from "vuex";
export default {
  computed: {
    ...mapState(["jishiShougouPage", "jishiShougouPageSize"])
  },
  data() {
    return {
      fullscreenLoading:false,
      myImg: "",
      searchForm: {
        pid: "",
        status: "",
        keyword: ""
      },
      tableData: [],
      total: 0,
      addDialogVisible: false,
      addForm: {
        country_id: "",
        category_id: "",
        tool_name: "",
        tool_english_name: "",
        tool_url: "",
        file_type: "",
        file_size: "",
        img: ""
      },
      rules: {
        cate_name: [
          { required: true, message: "请输入分类名称", trigger: "blur" }
        ],
        is_show: [{ required: true, message: "请选择状态", trigger: "change" }]
      },
      imgStatus: "",
      imgFile: "",
      id: "",
      File: null,
      isAdd: false,
      fenleiOption: [],
      chengshiOption: []
    };
  },
  watch: {
    jishiShougouPage: function(page) {
      this.$store.commit("jishiShougouPage", page);
      this.getData();
    },
    jishiShougouPageSize: function(pageSize) {
      this.$store.commit("jishiShougouPageSize", pageSize);
      this.getData();
    }
  },
  created() {
    this.$store.commit("jishiShougouPage", 1);
    this.getData();
    this.getFenlei();
    this.getChengshi();
  },
  methods: {
    async getFenlei() {
      const res = await this.$api.category({
        page: 1,
        limit: 100000
      });
      console.log(res);
      this.fenleiOption = res.data.data;
    },
    async getChengshi() {
      const res = await this.$api.country({
        page: 1,
        limit: 100000
      });
      console.log(res);
      this.chengshiOption = res.data.data;
    },
    async getData() {
      const res = await this.$api.tool({
        page: this.jishiShougouPage,
        limit: this.jishiShougouPageSize
      });
      console.log(res);
      this.tableData = res.data.data;
      this.total = res.data.total;
      this.tableData.forEach(ele => {
        if (ele.img.indexOf("http") == -1) {
          ele.myimg = `${this.$url}/${ele.img}`;
        } else {
          ele.myimg = ele.img;
        }
        if (ele.tool_url.indexOf("http") == -1) {
          ele.mytool_url = `${this.$url}/${ele.tool_url}`;
        } else {
          ele.mytool_url = ele.tool_url;
        }
      });
    },
    async companyfile(event) {
      this.fullscreenLoading = true;
      const that = this;
      console.log(event.target);
      var file = event.target.files[0];
      this.File = new FormData();
      this.File.append("file", file);
      const res = await that.$api.tool_upload(this.File);
      console.log(res.data);
      if (res.code == 200) {
        this.$message({
          message: '上传成功',
          type: "success"
        });
        this.fullscreenLoading = false;
        this.$set(this.addForm, "tool_url", res.data.path);
        this.$set(this.addForm, "file_type", res.data.filetype);
        this.$set(this.addForm, "file_size", res.data.filesize);
      }else{
        this.fullscreenLoading = false;
        this.$message({
          message: res.message,
          type: "success"
        });
      }
      //   that.$refs.fileInputList1.value = "";
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
          this.$set(this.addForm, "img", `${this.$url}/${res}`);
          that.$refs.fileInputList.value = "";
        } else {
          this.$message.error("图片格式不正确");
        }
      } else {
        this.$message.error("图片大小不正确");
      }
    },
    // 开关（显示/隐藏）
    async changeKG(row) {
      console.log(row);
      const res = await this.$api.categorySave({
        ...row,
        is_show: row.is_showKG == true ? "1" : "0"
      });
      if (res.code == 200) {
        this.$message({
          message: res.message,
          type: "success"
        });
        this.addDialogVisible = false;
        this.getData();
      }
    },
    searchOnSubmit() {
      console.log(this.searchForm);
    },
    AddFenlei() {
      for (const key in this.addForm) {
        this.$set(this.addForm, key, "");
      }
      this.isAdd = true;
      this.addDialogVisible = true;
    },
    addHandleClose() {
      this.addDialogVisible = false;
    },
    tabEdit(row) {
      console.log(row);
      this.isAdd = false;
      this.id = row.id;
      this.addForm.tool_name = row.tool_name;
      this.addForm.tool_english_name = row.tool_english_name;
      this.addForm.img = row.myimg;
      this.addForm.category_id = row.category_id;
      this.addForm.country_id = row.country_id;
      //   this.$set(this.$refs.fileInputList1,'value',row.mytool_url)
      // this.$refs.fileInputList1.value = row.tool_url;
      this.addForm.tool_url = row.tool_url;
      this.addForm.file_size = row.file_size;
      this.addForm.file_type = row.file_type;
      this.addDialogVisible = true;
    },
    async tabDel(row) {
      console.log(row);
      const res = await this.$api.delTool(row.id);
      if (res.code == 200) {
        this.$message({
          message: res.message,
          type: "success"
        });
        setTimeout(() => {
          this.getData();
        }, 500);
      } else {
        this.$message.error(res.message);
      }
    },
    async AddOnSubmit() {
      console.log(this.addForm);
      if (this.isAdd) {
        //   添加
        const res = await this.$api.addTool({
          ...this.addForm
        });
        if (res.code == 200) {
          this.$message({
            message: res.message,
            type: "success"
          });
          this.addDialogVisible = false;
          this.getData();
        }
      } else {
        const res = await this.$api.upDateTool(
          {
            ...this.addForm
          },
          this.id
        );
        if (res.code == 200) {
          this.$message({
            message: res.message,
            type: "success"
          });
          this.addDialogVisible = false;
          this.getData();
        }
      }
    },
    // 删除图片
    delImg() {
      this.$set(this.addForm, "img", "");
    },
    // 分页
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.$store.commit("jishiShougouPageSize", val);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.$store.commit("jishiShougouPage", val);
    }
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
  .tit1 {
    color: #17233d;
    font-weight: 500;
    font-size: 20px;
    padding-bottom: 20px;
  }
}
.nav2 {
  margin: 18px 0;
  background: #fff;
  border-radius: 6px;
  padding: 24px;
  .myForm {
    /deep/ .el-form-item__label {
      font-size: 12px;
    }
    /deep/ .el-form-item {
      margin-right: 30px;
      margin-bottom: 0;
      vertical-align: middle;
    }
  }
  .tit1 {
    margin-top: 10px;
  }
  .myTable {
    margin-top: 10px;
    /deep/ .vxe-table--render-default .vxe-body--column {
      line-height: 14px;
      vertical-align: middle;
    }
    /deep/ .vxe-cell--label {
      font-size: 12px;
    }
    /deep/ .vxe-cell--title {
      font-size: 12px;
    }
    .flex {
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
}
.myAddForm {
  /deep/ .el-select {
    width: 100%;
  }
  /deep/ .el-form-item__label {
    font-size: 12px;
    width: 130px !important;
  }
  /deep/ .el-form-item__content {
    margin-left: 130px !important;
  }
  /deep/ .el-radio__label {
    font-size: 12px;
  }
  /deep/ .el-button {
    width: 100%;
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
}
.displayN {
  display: none;
}
</style>