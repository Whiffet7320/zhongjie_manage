<template>
  <div class="index">
    <div class="nav1">
      <div class="tit1">固定位置商品列表</div>
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
        <el-button @click="AddLunbotu" size="small" type="primary" icon="el-icon-plus">添加固定位置商品</el-button>
      </div>
      <div class="myTable">
        <vxe-table :data="tableData">
          <vxe-table-column type="expand" width="30" :fixed="null">
            <template #content="{ row }">
              <template>
                <div class="xiala">
                  <el-row :gutter="20">
                    <el-col :span="6">
                      <div class="item">商品分类：{{row.item.category_id}}</div>
                    </el-col>
                    <el-col :span="6">
                      <div class="item">商品创建时间：{{row.item.created_at}}</div>
                    </el-col>
                    <!-- <el-col :span="6">
                      <div class="item">成本价：{{ row.price }}</div>
                    </el-col>-->
                  </el-row>
                  <div style="margin-top: 16px"></div>
                  <el-row :gutter="20">
                    <el-col :span="6">
                      <div class="item">销量：{{row.item.ficti}}</div>
                    </el-col>
                    <el-col :span="6">
                      <div class="item">库存：{{row.item.stock}}</div>
                    </el-col>
                  </el-row>
                </div>
              </template>
            </template>
          </vxe-table-column>
          <vxe-table-column field="id" title="关系ID"></vxe-table-column>
          <vxe-table-column field="item.id" title="商品ID"></vxe-table-column>
          <vxe-table-column field="item.main_img" title="商品主图">
            <template slot-scope="scope">
              <el-image :src="scope.row.item.main_img" fit="fill" style="width: 40px; height: 40px">
                <div slot="error" class="image-slot">
                  <i class="el-icon-picture-outline"></i>
                </div>
              </el-image>
            </template>
          </vxe-table-column>
          <vxe-table-column field="item.detail_img" title="商品详情图">
            <template slot-scope="scope">
              <el-image
                :src="scope.row.item.detail_img"
                fit="fill"
                style="width: 40px; height: 40px"
              >
                <div slot="error" class="image-slot">
                  <i class="el-icon-picture-outline"></i>
                </div>
              </el-image>
            </template>
          </vxe-table-column>
          <vxe-table-column width="200" field="item.prev_images" title="商品主图">
            <template slot-scope="scope">
              <el-image
                v-for="(ele,i) in scope.row.item.prev_images"
                :key="i"
                :src="ele"
                fit="fill"
                style="width: 40px; height: 40px"
              >
                <div slot="error" class="image-slot">
                  <i class="el-icon-picture-outline"></i>
                </div>
              </el-image>
            </template>
          </vxe-table-column>
          <vxe-table-column field="item.name" title="商品名称"></vxe-table-column>
          <vxe-table-column field="item.sub_title" title="副标题"></vxe-table-column>
          <vxe-table-column field="item.price" title="商品售价"></vxe-table-column>
          <!-- <vxe-table-column field="item.ficti" title="销量"></vxe-table-column>
          <vxe-table-column field="item.stock" title="库存"></vxe-table-column>-->
          <!-- <vxe-table-column field="item.myStatus" title="状态(是否上架)">
            <template slot-scope="scope">
              <el-switch @change="changeKG(scope.row)" v-model="scope.row.myStatus"></el-switch>
            </template>
          </vxe-table-column>-->
          <vxe-table-column title="操作状态" width="140">
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
          :current-page="this.gudingweizhishangpingliebiaoPage"
          :page-size="10"
          :page-sizes="[10, 15, 20, 30]"
          layout="total,sizes, prev, pager, next, jumper"
          :total="this.total"
        ></el-pagination>
      </div>
    </div>
    <!-- 编辑/新增固定位置商品 -->
    <el-dialog
      title="编辑/新增固定位置商品"
      :visible.sync="dialogVisible"
      width="500px"
      :before-close="handleClose"
    >
      <div class="nav2">
        <div class="myForm">
          <el-form :model="ruleForm" ref="ruleForm" label-width="100px" class="demo-ruleForm">
            <el-row>
              <el-col :span="22">
                <el-form-item label="类型：">
                  <el-select size="small" v-model="ruleForm.position" placeholder="请选择">
                    <el-option v-for="(item,i) in radioArr" :key="i" :label="item" :value="i"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="22">
                <el-form-item label="商品：">
                  <el-select :disabled='!isAdd' size="small" v-model="ruleForm.item_id" filterable placeholder="请选择">
                    <el-option v-for="item in radioArr2" :key="item.id" :label="item.name" :value="item.id"></el-option>
                  </el-select>
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
    ...mapState([
      "gudingweizhishangpingliebiaoPage",
      "gudingweizhishangpingliebiaoPageSize"
    ])
  },
  watch: {
    gudingweizhishangpingliebiaoPage: function(page) {
      this.$store.commit("gudingweizhishangpingliebiaoPage", page);
      this.getData();
    },
    gudingweizhishangpingliebiaoPageSize: function(pageSize) {
      this.$store.commit("gudingweizhishangpingliebiaoPageSize", pageSize);
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
        position: "",
        item_id: "",
      },
      id: ""
    };
  },
  created() {
    this.getData();
  },
  methods: {
    async getData() {
      const res = await this.$api.fixedPositionItem({
        limit: this.gudingweizhishangpingliebiaoPageSize,
        page: this.gudingweizhishangpingliebiaoPage,
        position: this.formInline.rad1
      });
      console.log(res.data);
      this.tableData = res.data.data;
      this.total = res.data.total;
      const res2 = await this.$api.positions();
      console.log(res2.data);
      this.radioArr = res2.data;
      const res3 = await this.$api.itemAll();
      this.radioArr2 = res3.data;
    },
    huifu(row) {
      this.id = row.id;
      console.log(row);
      this.dialogVisible = true;
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
      this.ruleForm.position = row.fixed_position_id;
      this.ruleForm.item_id = row.item_id;
      this.dialogVisible = true;
    },
    // 删除
    async tabDel(row) {
      const res = await this.$api.deleteFixedPositionItem(row.id);
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
        // 新增
        const res = await this.$api.addFixedPositionItem({
          ...this.ruleForm
        });
        console.log(res.data);
        if (res.code == 200) {
          this.$message({
            message: "添加成功",
            type: "success"
          });
          this.getData();
          this.dialogVisible = false;
        }
      } else {
        const res = await this.$api.upDateFixedPosition(
          {
            ...this.ruleForm
          },
          this.id
        );
        console.log(res.data);
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
    delImg(val) {
      console.log(val);
      if (val == "bg") {
        this.$set(this.ruleForm, "bg_img", "");
      } else {
        this.$set(this.ruleForm, "icon", "");
      }
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
      this.$store.commit("gudingweizhishangpingliebiaoPageSize", val);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.$store.commit("gudingweizhishangpingliebiaoPage", val);
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
    width: 100px;
    height: 100px;
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
      width: 98px;
      height: 98px;
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