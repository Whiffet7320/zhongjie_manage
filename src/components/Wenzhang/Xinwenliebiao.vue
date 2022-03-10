<template>
  <div class="index">
    <div class="nav1">
      <div class="tit1">新闻列表</div>
    </div>
    <div class="nav2">
      <div class="tit1">
        <el-button @click="addWenzhang" size="small" type="primary" icon="el-icon-plus">添加新闻</el-button>
      </div>
      <div class="myTable">
        <vxe-table :data="tableData">
          <vxe-table-column field="id" title="ID"></vxe-table-column>
          <vxe-table-column field="title" title="标题"></vxe-table-column>
          <vxe-table-column field="img" title="图片">
            <template slot-scope="scope">
              <el-image
                :preview-src-list="[scope.row.img]"
                :src="scope.row.img"
                fit="fill"
                style="width: 40px; height: 40px"
              >
                <div slot="error" class="image-slot">
                  <i class="el-icon-picture-outline"></i>
                </div>
              </el-image>
            </template>
          </vxe-table-column>
          <!-- <vxe-table-column field="myStatus" title="状态(是否通过)">
            <template slot-scope="scope">
              <el-switch @change="changeKG(scope.row)" v-model="scope.row.myStatus"></el-switch>
            </template>
          </vxe-table-column> -->
          <vxe-table-column field="create_at" title="发布时间"></vxe-table-column>
          <vxe-table-column title="操作状态" width="160">
            <template slot-scope="scope">
              <div class="flex">
                <el-button size="small" @click="tabEdit(scope.row)" type="text">查看详情</el-button>
                <el-button size="small" @click="tabDel(scope.row)" type="text">删除</el-button>
              </div>
            </template>
          </vxe-table-column>
        </vxe-table>
        <el-pagination
          class="fenye"
          @size-change="this.handleSizeChange"
          @current-change="this.handleCurrentChange"
          :current-page="this.wenzhangPage"
          :page-size="10"
          :page-sizes="[10, 15, 20, 30]"
          layout="total,sizes, prev, pager, next, jumper"
          :total="this.total"
        ></el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  computed: {
    ...mapState(["wenzhangPage", "wenzhangPageSize"])
  },
  watch: {
    wenzhangPage: function(page) {
      this.$store.commit("wenzhangPage", page);
      this.getData();
    },
    wenzhangPageSize: function(pageSize) {
      this.$store.commit("wenzhangPageSize", pageSize);
      this.getData();
    }
  },
  data() {
    return {
      editor: null,
      tableData: [],
      total: 0,
      lhDialogVisible: false,
      lhForm: {
        title: "",
        content: "",
        pic: ""
      },
      imgFile: null,
      isAdd: true,
      formInline: {
        rad1: ""
      },
      radioArr: []
    };
  },
  created() {
    this.$store.commit('wenzhangPage',1)
    this.getData();
  },
  methods: {
    async getData() {
      const res = await this.$api.news({
        limit: this.wenzhangPageSize,
        page: this.wenzhangPage,
      });
      this.tableData = res.data.data;
      this.total = res.data.total;
      this.tableData.forEach(ele => {
        ele.myStatus = ele.status == "0" ? true : false;
        ele.myTag = ele.tag == "advice" ? "咨询" : "新闻";
      });
    },
    // 开关（上架/下架）
    async changeKG(row) {
      console.log(row);
      const res = await this.$api.update_status({
        status: row.myStatus == true ? "0" : "1",
        id: row.id,
        type: "article"
      });
      if (res.code == 200) {
        this.$message({
          message: res.msg,
          type: "success"
        });
        this.getData();
      }
    },
    changeRad() {
      console.log(this.formInline.rad1);
      this.getData();
    },
    // 编辑
    tabEdit(row) {
      this.id = row.id;
      this.lhForm.title = row.title;
      this.lhForm.content = row.content;
      this.isAdd = false;
      // this.lhDialogVisible = true;
      this.$store.commit("xinwenObj", row);
      this.$router.push({ name: "TianjiaXinwen" });
    },
    // 删除
    async tabDel(row) {
      const res = await this.$api.delNews(row.id);
      if (res.code == 200) {
        this.$message({
          message: res.msg,
          type: "success"
        });
        this.getData();
        this.lhDialogVisible = false;
      } else {
        this.$message.error(res.msg);
      }
    },
    addWenzhang() {
      this.lhForm = {
        title: "",
        content: ""
      };
      this.isAdd = true;
      // this.lhDialogVisible = true;
      this.$store.commit("xinwenObj", null);
      this.$router.push({ name: "TianjiaXinwen" });
    },
    lhHandleClose() {
      this.lhDialogVisible = false;
    },
    // 分页
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.$store.commit("wenzhangPageSize", val);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.$store.commit("wenzhangPage", val);
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
  padding-top: 20px;
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