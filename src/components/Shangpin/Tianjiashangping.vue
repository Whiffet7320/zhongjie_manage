<template>
  <div class="index">
    <div class="nav1">
      <el-button @click="toBack" class="btn" size="small" icon="el-icon-arrow-left">返回</el-button>
      <div class="tit1">商品管理</div>
    </div>
    <div class="nav2">
      <div class="tit1">
        <el-tabs v-model="activeName">
          <el-tab-pane label="商品信息" name="1"></el-tab-pane>
          <!-- <el-tab-pane label="商品详情" name="2"></el-tab-pane> -->
          <!-- <el-tab-pane label="其他设置" name="3"></el-tab-pane> -->
        </el-tabs>
        <!-- 商品信息 -->
        <template v-if="activeName == '1'">
          <div class="myForm">
            <el-form
              :model="ruleForm"
              :rules="rules"
              ref="ruleForm"
              label-width="120px"
              class="demo-ruleForm"
            >
              <el-row>
                <el-col :span="12">
                  <el-form-item label="商品名称：" prop="name">
                    <el-input size="small" v-model="ruleForm.name"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="12">
                  <el-form-item label="商品二级标题：" prop="sub_title">
                    <el-input size="small" v-model="ruleForm.sub_title"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="12">
                  <el-form-item label="商品分类：" prop="category_id">
                    <el-cascader
                      v-model="ruleForm.category_id"
                      size="small"
                      :options="options"
                      clearable
                    ></el-cascader>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="12">
                  <el-form-item label="商品价格：" prop="price">
                    <el-input size="small" v-model="ruleForm.price"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <!-- <el-row>
                <el-col :span="12">
                  <el-form-item label="商品关键字：">
                    <el-input
                      size="small"
                      v-model="ruleForm.keyword"
                    ></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="12">
                  <el-form-item label="单位：" prop="unit_name">
                    <el-input
                      size="small"
                      v-model="ruleForm.unit_name"
                    ></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="12">
                  <el-form-item size="small" label="商品简介：">
                    <el-input
                      type="textarea"
                      v-model="ruleForm.product_info"
                    ></el-input>
                  </el-form-item>
                </el-col>
              </el-row>-->
              <el-row>
                <el-col :span="12">
                  <el-form-item label="商品详情图：" prop="detail_img">
                    <div @click="companyList('xqt')" class="myImg">
                      <el-image
                        :src="ruleForm.detail_img"
                        fit="fill"
                        style="width: 70px; height: 70px"
                      >
                        <div slot="error" class="image-slot">
                          <i class="el-icon-picture-outline"></i>
                        </div>
                      </el-image>
                      <div @click.stop="delImg('xqt')" class="closeBtn">
                        <el-button circle>×</el-button>
                      </div>
                    </div>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="12">
                  <el-form-item label="商品主图：" prop="main_img">
                    <div @click="companyList('zt')" class="myImg">
                      <el-image
                        :src="ruleForm.main_img"
                        fit="fill"
                        style="width: 70px; height: 70px"
                      >
                        <div slot="error" class="image-slot">
                          <i class="el-icon-picture-outline"></i>
                        </div>
                      </el-image>
                      <div @click.stop="delImg('zt')" class="closeBtn">
                        <el-button circle>×</el-button>
                      </div>
                    </div>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="12">
                  <el-form-item label="商品浏览图：" prop="prev_images">
                    <div
                      @click="companyList('llt', i)"
                      class="myImg"
                      v-for="(item, i) in ruleForm.prev_images"
                      :key="i"
                    >
                      <el-image :src="item" fit="fill" style="width: 70px; height: 70px">
                        <div slot="error" class="image-slot">
                          <i class="el-icon-picture-outline"></i>
                        </div>
                      </el-image>
                      <div @click.stop="delImg('llt', i)" class="closeBtn">
                        <el-button circle>×</el-button>
                      </div>
                    </div>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="12">
                  <el-form-item label="商品状态：" prop="status">
                    <el-radio-group v-model="ruleForm.status">
                      <el-radio label="1">上架</el-radio>
                      <el-radio label="0">下架</el-radio>
                    </el-radio-group>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="12">
                  <el-form-item label="商品类型：" prop="type">
                    <el-radio-group v-model="ruleForm.type">
                      <el-radio label="0">定价</el-radio>
                      <el-radio label="1">报价</el-radio>
                      <el-radio label="2">商场商品</el-radio>
                    </el-radio-group>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="12">
                  <el-form-item label="排序：" prop="sort">
                    <el-input size="small" v-model="ruleForm.sort"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <!-- <el-row>
                <el-col :span="12">
                  <el-form-item label="选择规格：">
                    <div class="sku" v-for="(item1, index) in sku" :key="index">
                      <div class="tit1">
                        <div class="txt1-1">{{ item1.tit }}</div>
                        <i
                          @click="removeskuda(index)"
                          class="el-icon-error"
                        ></i>
                      </div>
                      <div
                        class="tit2"
                        v-for="(item2, i) in item1.arr"
                        :key="i"
                      >
                        <div class="blue"></div>
                        <div class="txt1">{{ item2 }}</div>
                        <div @click="removeskuxiao(index, i)" class="txt2">
                          ×
                        </div>
                      </div>
                      <div class="addGg">
                        <el-input
                          size="small"
                          placeholder="请输入属性名称"
                          v-model="item1.inpVal"
                        >
                          <el-button
                            slot="append"
                            @click="addskuxiao(item1)"
                            style="cursor: pointer"
                          >
                            添加
                          </el-button>
                        </el-input>
                      </div>
                    </div>
                    <div class="footer" v-if="!isAdd">
                      <el-button
                        @click="isAdd = true"
                        size="small"
                        type="primary"
                      >
                        <span style="font-size: 12px">+</span>
                        添加新规格</el-button
                      >
                      <el-button
                        @click="changeTable"
                        size="small"
                        type="success"
                        >立即生成</el-button
                      >
                    </div>
                    <div class="footer footer2" v-if="isAdd">
                      <div class="tit1">
                        <div class="txt1">规格：</div>
                        <el-input size="small" v-model="addSkuDa.gg"></el-input>
                      </div>
                      <div class="tit1">
                        <div class="txt1 txt2">规格值：</div>
                        <el-input
                          size="small"
                          v-model="addSkuDa.ggz"
                        ></el-input>
                      </div>
                      <div class="btns">
                        <el-button @click="addskuda" size="small" type="primary"
                          >确定</el-button
                        >
                        <el-button @click="isAdd = false" size="small"
                          >取消</el-button
                        >
                      </div>
                    </div>
                    <div v-if="skuTableData.length > 0" class="mySkuTable">
                      <vxe-table border align="center" :data="skuTableData">
                        <vxe-table-column
                          v-for="item in sku"
                          :key="item.tit"
                          :field="item.tit"
                          :title="item.tit"
                          width="70"
                          show-overflow="title"
                        ></vxe-table-column>
                        <vxe-table-column field="pic" width="62" title="图片">
                          <template #default="{ row, rowIndex }">
                            <div @click="companyList('sku', rowIndex)">
                              <el-image
                                fit="fill"
                                style="
                                  width: 40px;
                                  height: 40px;
                                  display: block;
                                  cursor: pointer;
                                  border: 1px solid #ddd;
                                "
                                :src="row.pic"
                              >
                                <div slot="error" class="image-slot">
                                  <i class="el-icon-picture-outline"></i>
                                </div>
                              </el-image>
                            </div>
                          </template>
                        </vxe-table-column>
                        <vxe-table-column
                          field="price"
                          width="130"
                          title="售价"
                        >
                          <template #default="{ row }">
                            <el-input
                              type="number"
                              v-model="row.price"
                            ></el-input>
                          </template>
                        </vxe-table-column>
                        <vxe-table-column
                          field="cost"
                          width="130"
                          title="成本价"
                        >
                          <template #default="{ row }">
                            <el-input
                              type="number"
                              v-model="row.cost"
                            ></el-input>
                          </template>
                        </vxe-table-column>
                        <vxe-table-column
                          field="ot_price"
                          width="130"
                          title="原价"
                        >
                          <template #default="{ row }">
                            <el-input
                              type="number"
                              v-model="row.ot_price"
                            ></el-input>
                          </template>
                        </vxe-table-column>
                        <vxe-table-column
                          field="stock"
                          width="130"
                          title="库存"
                        >
                          <template #default="{ row }">
                            <el-input
                              type="number"
                              v-model="row.stock"
                            ></el-input>
                          </template>
                        </vxe-table-column>
                        <vxe-table-column
                          field="weight"
                          width="130"
                          title="重量(KG)"
                        >
                          <template #default="{ row }">
                            <el-input
                              type="number"
                              v-model="row.weight"
                            ></el-input>
                          </template>
                        </vxe-table-column>
                        <vxe-table-column
                          field="volume"
                          width="130"
                          title="体积(m³)"
                        >
                          <template #default="{ row }">
                            <el-input
                              type="number"
                              v-model="row.volume"
                            ></el-input>
                          </template>
                        </vxe-table-column>
                        <vxe-table-column
                          field="volume"
                          width="100"
                          title="操作"
                        >
                          <template #default="{ rowIndex }">
                            <el-button
                              @click="delTabSku(rowIndex)"
                              size="small"
                              type="text"
                              >删除</el-button
                            >
                          </template>
                        </vxe-table-column>
                      </vxe-table>
                    </div>
                  </el-form-item>
                </el-col>
              </el-row>-->
              <!-- <el-row>
                <el-col :span="12">
                  <el-form-item label="运费：" prop="postage">
                    <el-input
                      size="small"
                      v-model="ruleForm.postage"
                    ></el-input>
                  </el-form-item>
                </el-col>
              </el-row>-->
              <el-form-item>
                <!-- <el-button
                  size="small"
                  type="primary"
                  @click="submitForm('ruleForm', '2')"
                  >下一步</el-button
                >-->
                <el-button size="small" type="primary" @click="onSubmitForm('ruleForm')">保存</el-button>
                <!-- <el-button @click="resetForm('ruleForm')">重置</el-button> -->
              </el-form-item>
            </el-form>
          </div>
        </template>
        <!-- 商品详情 -->
        <div v-show="activeName == '2'">
          <el-row>
            <el-col :span="22">
              <div class="myEditor">
                <div class="txt">商品详情：</div>
                <div id="editor"></div>
              </div>
            </el-col>
          </el-row>
          <div class="btnflex">
            <el-button size="small" @click="submitForm('ruleForm', '1')">上一步</el-button>
            <el-button size="small" type="primary" @click="submitForm('ruleForm', '3')">下一步</el-button>
          </div>
        </div>
        <!-- 其他设置 -->
        <div v-show="activeName == '3'">
          <div class="myForm">
            <el-form ref="form" :model="qtszForm" label-width="100px">
              <el-row :gutter="100">
                <el-col :span="8">
                  <el-form-item label="虚拟销量：">
                    <el-input size="small" v-model="qtszForm.ficti"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="额外赠送积分：">
                    <el-input size="small" v-model="qtszForm.give_integral"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="排序：">
                    <el-input size="small" v-model="qtszForm.sort"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="14">
                  <el-form-item label="单独设置：">
                    <el-checkbox-group v-model="qtszForm.ddsz">
                      <el-checkbox label="佣金设置"></el-checkbox>
                      <el-checkbox label="付费会员价"></el-checkbox>
                    </el-checkbox-group>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="24">
                  <el-form-item v-if="ddsz" label="批量设置：">
                    <el-row :gutter="14">
                      <el-col :span="6">
                        <el-form-item v-if="yjsz" label="一级返佣(元)：">
                          <el-input size="small" v-model="plszForm.brokerage"></el-input>
                        </el-form-item>
                      </el-col>
                      <el-col :span="6">
                        <el-form-item v-if="yjsz" label="二级返佣(元)：">
                          <el-input size="small" v-model="plszForm.brokerage_two"></el-input>
                        </el-form-item>
                      </el-col>
                      <el-col :span="6">
                        <el-form-item v-if="hyjsz" label="会员价(元)：">
                          <el-input size="small" v-model="plszForm.vip_price"></el-input>
                        </el-form-item>
                      </el-col>
                      <el-col :span="3">
                        <el-button @click="fanyongPLSZ" size="small" type="primary">批量设置</el-button>
                      </el-col>
                    </el-row>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row v-if="ddsz">
                <el-col :span="14">
                  <el-form-item label="商品属性：">
                    <!-- sku表格 -->
                    <div class="mySkuTable">
                      <vxe-table border align="center" :data="skuTableData">
                        <vxe-table-column
                          v-for="item in sku"
                          :key="item.tit"
                          :field="item.tit"
                          :title="item.tit"
                          width="150"
                          show-overflow="title"
                        ></vxe-table-column>
                        <vxe-table-column field="pic" width="62" title="图片">
                          <template #default="{ row }">
                            <el-image
                              fit="fill"
                              style="
                                width: 40px;
                                height: 40px;
                                display: block;
                                cursor: pointer;
                                border: 1px solid #ddd;
                              "
                              :src="row.pic"
                            >
                              <div slot="error" class="image-slot">
                                <i class="el-icon-picture-outline"></i>
                              </div>
                            </el-image>
                          </template>
                        </vxe-table-column>
                        <vxe-table-column field="price" width="160" title="售价"></vxe-table-column>
                        <vxe-table-column v-if="yjsz" width="160" title="一级返佣(元)">
                          <template #default="{ row }">
                            <el-input type="number" v-model="row.brokerage"></el-input>
                          </template>
                        </vxe-table-column>
                        <vxe-table-column v-if="yjsz" width="160" title="二级返佣(元)">
                          <template #default="{ row }">
                            <el-input type="number" v-model="row.brokerage_two"></el-input>
                          </template>
                        </vxe-table-column>

                        <vxe-table-column v-if="hyjsz" width="160" title="会员价(元)">
                          <template #default="{ row }">
                            <el-input type="number" v-model="row.vip_price"></el-input>
                          </template>
                        </vxe-table-column>
                      </vxe-table>
                    </div>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row :gutter="100">
                <el-col :span="7">
                  <el-form-item label="商品状态：">
                    <el-radio-group v-model="qtszForm.is_show">
                      <el-radio label="上架"></el-radio>
                      <el-radio label="下架"></el-radio>
                    </el-radio-group>
                  </el-form-item>
                </el-col>
                <el-col :span="7">
                  <el-form-item label="热卖单品：">
                    <el-radio-group v-model="qtszForm.is_show">
                      <el-radio label="开启"></el-radio>
                      <el-radio label="关闭"></el-radio>
                    </el-radio-group>
                  </el-form-item>
                </el-col>
                <el-col :span="7">
                  <el-form-item label="促销单品：">
                    <el-radio-group v-model="qtszForm.is_show">
                      <el-radio label="开启"></el-radio>
                      <el-radio label="关闭"></el-radio>
                    </el-radio-group>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row :gutter="100">
                <el-col :span="7">
                  <el-form-item label="精品推荐：">
                    <el-radio-group v-model="qtszForm.resource">
                      <el-radio label="开启"></el-radio>
                      <el-radio label="关闭"></el-radio>
                    </el-radio-group>
                  </el-form-item>
                </el-col>
                <el-col :span="7">
                  <el-form-item label="首发新品：">
                    <el-radio-group v-model="qtszForm.resource">
                      <el-radio label="开启"></el-radio>
                      <el-radio label="关闭"></el-radio>
                    </el-radio-group>
                  </el-form-item>
                </el-col>
                <el-col :span="7">
                  <el-form-item label="优品推荐：">
                    <el-radio-group v-model="qtszForm.resource">
                      <el-radio label="开启"></el-radio>
                      <el-radio label="关闭"></el-radio>
                    </el-radio-group>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-form>
          </div>
          <div class="btnflex">
            <el-button size="small" @click="submitForm('ruleForm', '2')">上一步</el-button>
            <el-button size="small" type="primary" @click="qtszOnSubmit">保存</el-button>
          </div>
        </div>
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
    ...mapState(["shopObj"])
  },
  watch: {
    "qtszForm.ddsz": function() {
      if (this.qtszForm.ddsz.indexOf("佣金设置") > -1) {
        this.ddsz = true;
        this.yjsz = true;
        this.ruleForm.is_sub = "1";
      } else {
        this.yjsz = false;
        this.ruleForm.is_sub = "";
      }
      if (this.qtszForm.ddsz.indexOf("付费会员价") > -1) {
        this.ddsz = true;
        this.hyjsz = true;
        this.ruleForm.is_vip = "1";
      } else {
        this.hyjsz = false;
        this.ruleForm.is_vip = "";
      }
      if (this.qtszForm.ddsz.length == 0) {
        this.ddsz = false;
      }
    }
  },
  data() {
    return {
      content: "",
      ddsz: false,
      yjsz: false,
      hyjsz: false,
      options: [],
      imgFile: null,
      imgFileArr: [],
      activeName: "1",
      imgArrNum: 0,
      updateId:'',
      ruleForm: {
        name: "",
        sub_title: "",
        category_id: "",
        price: "",
        detail_img: "",
        main_img: "",
        prev_images: [""],
        status: "",
        type: "",
        sort:'',
      },
      rules: {
        sort: [{ required: true, message: "请输入排序", trigger: "blur" }],
        name: [{ required: true, message: "请输入商品名称", trigger: "blur" }],
        sub_title: [
          { required: true, message: "请输入商品二级标题", trigger: "blur" }
        ],
        status: [
          { required: true, message: "请选择商品状态", trigger: "change" }
        ],
        type: [
          { required: true, message: "请选择商品类型", trigger: "change" }
        ],
        category_id: [
          { required: true, message: "请选择商品分类", trigger: "change" }
        ],
        unit_name: [{ required: true, message: "请输入单位", trigger: "blur" }],
        detail_img: [
          { required: true, message: "请上传商品详情图", trigger: "change" }
        ],
        main_img: [
          { required: true, message: "请上传商品主图", trigger: "change" }
        ],
        prev_images: [
          { required: true, message: "请上传商品浏览图", trigger: "change" }
        ],
        postage: [{ required: true, message: "请输入邮费", trigger: "blur" }]
      },
      addInp: "",
      // 是否添加规格（渲染按钮还是输入框）
      isAdd: false,
      // sku生成表格
      skuTableData: [],
      // 要根据这生成sku的列表
      sku: [
        // { tit: "颜色", arr: ["白色"], inpVal: "" },
        // { tit: "大小", arr: ["S", "M", "L"], inpVal: "" },
      ],
      // 添加sku大类
      addSkuDa: {
        gg: "",
        ggz: ""
      },
      editor: null,
      // 其他设置
      qtszForm: {
        ficti: "",
        give_integral: "",
        sort: "",
        ddsz: [],
        is_show: "上架"
      },
      // 批量设置
      plszForm: {
        brokerage: "",
        brokerage_two: "",
        vip_price: ""
      }
    };
  },
  created() {
    this.getData();
  },
  methods: {
    async getData() {
      const res = await this.$api.categories();
      console.log(res);
      res.data.forEach(ele => {
        ele.value = ele.id;
        ele.label = ele.name;
        if (ele.children) {
          ele.children.forEach(item => {
            item.value = item.id;
            item.label = item.name;
          });
        }
      });
      this.options = res.data;
      console.log(this.shopObj);
      if (this.shopObj) {
        // 编辑
        this.ruleForm = {...this.shopObj};
        this.ruleForm.status = this.shopObj.status.toString();
        this.ruleForm.type = this.shopObj.type.toString();
        this.updateId = this.shopObj.id;
        this.ruleForm.prev_images.push(null)
        delete this.ruleForm.created_at;
        delete this.ruleForm.is_showKG;
        delete this.ruleForm.updated_at;
        delete this.ruleForm._XID;
        delete this.ruleForm.id;
      }
      console.log(this.ruleForm)
    },
    // 保存
    async onSubmitForm(formName) {
      // this.$refs[formName].validate(valid => {
      //   if (valid) {
      //     alert("submit!");
      //     console.log()
      //   } else {
      //     console.log("error submit!!");
      //     return false;
      //   }
      // });
      if (!this.shopObj) {
        // 添加
        const res = await this.$api.addItems({
          ...this.ruleForm,
          category_id:this.ruleForm.category_id [0],
        });
        console.log(res);
        if (res.code == 200) {
          this.$message({
            message: '添加成功',
            type: "success"
          });
          setTimeout(() => {
            this.$router.push({ name: "Shangpinguanli" });
          }, 500);
        } else {
          this.$message.error(res.msg);
          this.getData();
        }
      }else{
        // 编辑
        const res = await this.$api.upDateItems({
          ...this.ruleForm,
          category_id: typeof this.ruleForm.category_id == 'object' ? this.ruleForm.category_id[0] : this.ruleForm.category_id,
        },this.updateId);
        console.log(res);
        if (res.code == 200) {
          this.$message({
            message: '修改成功',
            type: "success"
          });
          setTimeout(() => {
            this.$router.push({ name: "Shangpinguanli" });
          }, 500);
        } else {
          this.$message.error(res.msg);
          this.getData();
        }
      }
      console.log(this.ruleForm, formName);
    },
    // 生成表格
    changeTable() {
      const that = this;
      var arr = [];
      for (let index = 0; index < that.sku.length; index++) {
        if (that.sku.length == 1) {
          that.sku[index].arr.forEach(ele => {
            var tit1 = that.sku[index].tit;
            arr.push({
              [tit1]: ele
            });
          });
        } else if (that.sku.length == 2) {
          that.sku[index].arr.forEach(ele => {
            var tit1 = that.sku[index].tit;
            that.sku[index + 1].arr.forEach(ele2 => {
              var tit2 = that.sku[index + 1].tit;
              arr.push({
                [tit1]: ele,
                [tit2]: ele2
              });
            });
          });
        } else if (that.sku.length == 3) {
          that.sku[index].arr.forEach(ele => {
            var tit1 = that.sku[index].tit;
            that.sku[index + 1].arr.forEach(ele2 => {
              var tit2 = that.sku[index + 1].tit;
              that.sku[index + 2].arr.forEach(ele3 => {
                var tit3 = that.sku[index + 2].tit;
                arr.push({
                  [tit1]: ele,
                  [tit2]: ele2,
                  [tit3]: ele3
                });
              });
            });
          });
        } else if (that.sku.length == 4) {
          that.sku[index].arr.forEach(ele => {
            var tit1 = that.sku[index].tit;
            that.sku[index + 1].arr.forEach(ele2 => {
              var tit2 = that.sku[index + 1].tit;
              that.sku[index + 2].arr.forEach(ele3 => {
                var tit3 = that.sku[index + 2].tit;
                that.sku[index + 3].arr.forEach(ele4 => {
                  var tit4 = that.sku[index + 3].tit;
                  arr.push({
                    [tit1]: ele,
                    [tit2]: ele2,
                    [tit3]: ele3,
                    [tit4]: ele4
                  });
                });
              });
            });
          });
        } else if (that.sku.length == 5) {
          that.sku[index].arr.forEach(ele => {
            var tit1 = that.sku[index].tit;
            that.sku[index + 1].arr.forEach(ele2 => {
              var tit2 = that.sku[index + 1].tit;
              that.sku[index + 2].arr.forEach(ele3 => {
                var tit3 = that.sku[index + 2].tit;
                that.sku[index + 3].arr.forEach(ele4 => {
                  var tit4 = that.sku[index + 3].tit;
                  that.sku[index + 4].arr.forEach(ele5 => {
                    var tit5 = that.sku[index + 4].tit;
                    arr.push({
                      [tit1]: ele,
                      [tit2]: ele2,
                      [tit3]: ele3,
                      [tit4]: ele4,
                      [tit5]: ele5
                    });
                  });
                });
              });
            });
          });
        }
        break;
      }
      console.log(arr);
      this.skuTableData = arr;
    },
    // 删除图片
    delImg(val, i = 0) {
      console.log(i);
      if (val == "xqt") {
        this.$set(this.ruleForm, "image", "");
      } else if (val == "zt") {
        this.$set(this.ruleForm, "recommend_image", "");
      } else if (val == "llt") {
        this.$set(this.ruleForm.prev_images, i, "");
      }
      ``;
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
    // 上传图片
    companyList(val, i = 0) {
      this.imgIndex = i;
      this.imgStatus = val;
      this.$refs.fileInputList.click();
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
        console.log(myData)
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
          console.log(store)
          // var oss_imgurl = client.signatureUrl(store);
          var oss_imgurl = `http://${myData.bucket}.${myData.url}/${store}`
          if (this.imgStatus == "xqt") {
            this.$set(this.ruleForm, "detail_img", oss_imgurl);
          } else if (this.imgStatus == "zt") {
            this.ruleForm.main_img = oss_imgurl;
          } else if (this.imgStatus == "llt") {
            this.$set(this.ruleForm.prev_images, this.imgIndex, oss_imgurl);
            if (
              !this.ruleForm.prev_images[this.imgIndex + 1] &&
              this.ruleForm.prev_images.length != 6
            ) {
              this.$set(this.ruleForm.prev_images, this.imgIndex + 1, "");
              this.imgArrNum = this.ruleForm.prev_images.length - 1;
            } else {
              this.imgArrNum = 6;
            }
          }
          console.log(oss_imgurl);
        });
      }
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
      if (this.shopObj) {
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
          id: this.shopObj.id
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
            this.$router.push({ name: "Shangpinguanli" });
          }, 500);
        } else {
          this.$message.error(res.msg);
          this.getData();
        }
      }
    },
    toBack() {
      this.$router.push({ name: "Shangpinguanli" });
    }
  },
  async mounted() {
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
      "redo"
    ];
    this.editor.config.uploadImgServer = "/upload-img";
    this.editor.config.uploadImgShowBase64 = true; // 使用 base64 保存图片
    this.editor.config.customUploadImg = async function(
      resultFiles,
      insertImgFn
    ) {
      // resultFiles 是 input 中选中的文件列表
      // insertImgFn 是获取图片 url 后，插入到编辑器的方法
      console.log(resultFiles);
      var reader = new FileReader();
      reader.readAsDataURL(resultFiles[0]); //通过文件流将文件转换成Base64字符串
      reader.onloadend = function() {
        //将转换结果赋值给img标签
        // preview.src = reader.result;
        //输出结果
        console.log(reader.result);
        insertImgFn(reader.result);
      };
      //   file_re = await that.readFileAsBuffer(resultFiles[0]);
    };
    this.editor.create();
    // this.getData();
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
    .myImg {
      position: relative;
      width: 70px;
      height: 70px;
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
        width: 68px;
        height: 68px;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        .el-icon-picture-outline {
          font-size: 20px;
        }
      }
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

// 商品详情
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
.btnflex {
  margin-top: 20px;
  margin-left: 101px;
}
.displayN {
  display: none;
}
</style>