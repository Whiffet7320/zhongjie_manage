<template>
  <div class="index">
    <div class="nav1">
      <div class="tit1">轮播图列表</div>
    </div>
    <div class="nav2">
      <div class="myForm">
        <el-form :inline="true" :model="formInline" class="demo-form-inline">
          <el-row>
            <el-col :span="20">
              <el-form-item label="类型：">
                <el-radio-group @change="changeRad" v-model="formInline.rad1" size="small">
                  <el-radio-button v-for="(item,i) in radioArr" :key="i" :label="i">{{item}}</el-radio-button>
                </el-radio-group>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
      <div class="tit1">
        <el-button @click="AddLunbotu" size="small" type="primary" icon="el-icon-plus">添加轮播图</el-button>
      </div>
      <div class="myTable">
        <vxe-table :data="tableData">
          <vxe-table-column field="id" title="ID"></vxe-table-column>
          <vxe-table-column field="name" title="轮播图名称"></vxe-table-column>
          <vxe-table-column field="image" title="轮播图">
            <template slot-scope="scope">
              <el-image :src="scope.row.image" fit="fill" style="width: 40px; height: 40px">
                <div slot="error" class="image-slot">
                  <i class="el-icon-picture-outline"></i>
                </div>
              </el-image>
            </template>
          </vxe-table-column>
          <vxe-table-column field="jump" title="跳转链接"></vxe-table-column>
          <vxe-table-column field="tag" title="标签名"></vxe-table-column>
          <vxe-table-column field="created_at" title="添加时间"></vxe-table-column>
          <vxe-table-column title="操作状态" width="180">
            <template slot-scope="scope">
              <div class="flex">
                <el-button size="small" @click="tabEdit(scope.row)" type="text">编辑</el-button>
                <el-button size="small" @click="tabDel(scope.row)" type="text">删除</el-button>
              </div>
            </template>
          </vxe-table-column>
        </vxe-table>
        <el-pagination
          class="fenye"
          @size-change="this.handleSizeChange"
          @current-change="this.handleCurrentChange"
          :current-page="this.lunbotuliebiaoPage"
          :page-size="10"
          :page-sizes="[10, 15, 20, 30]"
          layout="total,sizes, prev, pager, next, jumper"
          :total="this.total"
        ></el-pagination>
      </div>
    </div>
    <!-- 编辑轮播图 -->
    <el-dialog title="编辑轮播图" :visible.sync="dialogVisible" width="700px" :before-close="handleClose">
      <div class="nav2">
        <div class="myForm">
          <el-form :model="ruleForm" ref="ruleForm" label-width="100px" class="demo-ruleForm">
            <el-row>
              <el-col :span="18">
                <el-form-item label="设置轮播图：">
                  <div @click="companyList" class="myImg">
                    <el-image :src="ruleForm.image" fit="fill" style="width: 200px; height: 200px">
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
              <el-col :span="18">
                <el-form-item label="轮播图类型：">
                  <el-select size="small" v-model="ruleForm.position" placeholder="请选择">
                    <el-option v-for="(item,i) in radioArr" :key="i" :label="item" :value="i"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="18">
                <el-form-item label="轮播图名称：">
                  <el-input size="small" v-model="ruleForm.name"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="18">
                <el-form-item label="跳转类型：">
                  <el-select size="small" v-model="ruleForm.jump_type" placeholder="请选择">
                    <el-option v-for="(item,i) in radioArr2" :key="i" :label="item" :value="i"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="18">
                <el-form-item label="跳转地址：">
                  <el-input size="small" v-model="ruleForm.jump"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="18">
                <el-form-item label="标签名：">
                  <el-input size="small" v-model="ruleForm.tag"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-form-item>
              <el-button
                icon="el-icon-s-promotion"
                size="small"
                type="primary"
                @click="submitForm"
              >提交</el-button>
            </el-form-item>
          </el-form>
        </div>
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
    ...mapState(["lunbotuliebiaoPage", "lunbotuliebiaoPageSize"])
  },
  watch: {
    lunbotuliebiaoPage: function(page) {
      this.$store.commit("lunbotuliebiaoPage", page);
      this.getData();
    },
    lunbotuliebiaoPageSize: function(pageSize) {
      this.$store.commit("lunbotuliebiaoPageSize", pageSize);
      this.getData();
    }
  },
  data() {
    return {
      isAdd: false,
      radioArr: [],
      radioArr2:[],
      formInline: {
        rad1: ""
      },
      tableData: [],
      total: 0,
      dialogVisible: false,
      imgFile: "",
      ruleForm: {
        image: "",
        name: "",
        jump: "",
        jump_type: "",
        position: "",
        tag:'',
      },
      id: ""
    };
  },
  created() {
    this.getData();
  },
  methods: {
    async getData() {
      const res = await this.$api.banners({
        limit: this.lunbotuliebiaoPageSize,
        page: this.lunbotuliebiaoPage,
        position: this.formInline.rad1
      });
      console.log(res.data);
      this.tableData = res.data.data;
      this.total = res.data.total;
      const res2 = await this.$api.bannersPositions();
      console.log(res2.data);
      this.radioArr = res2.data;
      const res3 = await this.$api.bannersJumpTypes();
      console.log(res3.data);
      this.radioArr2 = res3.data;
    },
    AddLunbotu() {
      for (const key in this.ruleForm) {
        this.$set(this.ruleForm, key, "");
        this.isAdd = true;
      }
      this.dialogVisible = true;
    },
    changeRad() {
      console.log(this.formInline.rad1);
      this.getData();
    },
    // 编辑
    tabEdit(row) {
      console.log(row);
      this.isAdd = false;
      this.id = row.id;
      this.ruleForm.jump_type = row.jump_type;
      this.ruleForm.image = row.image;
      this.ruleForm.jump = row.jump;
      this.ruleForm.name = row.name;
      this.ruleForm.position = row.position;
      this.ruleForm.tag = row.tag;
      this.dialogVisible = true;
    },
    // 删除
    async tabDel(row) {
      const res = await this.$api.deleteBanners(row.id);
      if (res.code == 200) {
        this.$message({
          message: "删除成功",
          type: "success"
        });
        this.getData();
      }
    },
    // 提交
    async submitForm() {
      if (this.isAdd) {
        // 添加
        const res = await this.$api.addBanners({
          jump: this.ruleForm.jump,
          name: this.ruleForm.name,
          image: this.ruleForm.image,
          position: this.ruleForm.position,
          jump_type:this.ruleForm.jump_type,
          tag:this.ruleForm.tag,
        });
        console.log(res);
        if (res.code == 200) {
          this.$message({
            message: "添加成功",
            type: "success"
          });
          this.getData();
          this.dialogVisible = false;
        }
      } else {
        // 编辑
        const res = await this.$api.upDateBanners(
          {
            jump: this.ruleForm.jump,
            name: this.ruleForm.name,
            image: this.ruleForm.image,
            position: this.ruleForm.position,
            jump_type:this.ruleForm.jump_type,
            tag:this.ruleForm.tag,
          },
          this.id
        );
        console.log(res);
        if (res.code == 200) {
          this.$message({
            message: "修改成功",
            type: "success"
          });
          this.getData();
          this.dialogVisible = false;
        }
      }
    },
    // 上传图片
    companyList() {
      this.$refs.fileInputList.click();
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
          this.$set(this.ruleForm, "image", oss_imgurl);
          console.log(oss_imgurl);
        });
      }
    },
    // 删除图片
    delImg() {
      this.$set(this.lhForm, "pic", "");
    },
    companyLogo(event) {
      var file = event.target.files[0];
      this.imgFile = file;
      this.uploading(true);
      this.$refs.fileInputList.value = "";
    },
    handleClose() {
      this.dialogVisible = false;
    },
    // 分页
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.$store.commit("lunbotuliebiaoPageSize", val);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.$store.commit("lunbotuliebiaoPage", val);
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
  .myForm {
    /deep/ .el-form-item__label {
      font-size: 12px;
    }
    /deep/ .el-form-item {
      margin-right: 30px;
      margin-bottom: 0;
    }
    /deep/ .el-select {
        width: 100%;
      }
    .search {
      /deep/ .el-select {
        width: 100px;
      }
    }
  }
  .tit1 {
    margin-top: 10px;
  }
  .myTable {
    margin-top: 10px;
    .xiala {
      padding: 10px 20px;
      .item {
        font-size: 12px;
      }
    }
    .flex {
      display: flex;
      align-items: center;
    }
    .fenye {
      margin-top: 10px;
    }
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
    /deep/ .image-slot {
      width: 38px;
      height: 38px;
      border: 1px solid #ddd;
      line-height: 38px;
      text-align: center;
      border-radius: 4px;
    }
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
    }
  }
  .myImg {
    position: relative;
    width: 200px;
    height: 200px;
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
      width: 198px;
      height: 198px;
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