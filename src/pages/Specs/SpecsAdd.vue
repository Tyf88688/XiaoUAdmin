<template>
  <div>
    <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/specs'}">规格管理</el-breadcrumb-item>
      <el-breadcrumb-item>{{ title }}</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 表单 -->
    <el-form
      :model="ruleForm"
      :rules="rules"
      ref="ruleForm"
      label-width="100px"
      class="demo-ruleForm"
    >
      <el-form-item label="规格名称" prop="specsname">
        <el-input v-model="ruleForm.specsname"></el-input>
      </el-form-item>

      <el-form-item v-for="(item, index) in ruleForm.attrs" :label="'规格属性' + index" :key="index">
        <el-input v-model="item.value"></el-input>
        <el-button @click="addDomain" v-if="index == 0">新增属性</el-button>
        <el-button @click.prevent="removeDomain(item)" v-if="index != 0">删除</el-button>
      </el-form-item>

      <el-form-item label="状态" prop="status">
        <el-switch v-model="ruleForm.status"></el-switch>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">{{buttonTitle}}</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      id: "",
      title: "", // 面包屑最后的文字
      buttonTitle: "", // 最后按钮的文字
      menuList: [],
      ruleForm: {
        specsname: "",
        attrs: [
          {
            value: "",
          },
        ],
        status: true,
      },
      rules: {
        // 每个表单元素的验证规则
        specsname: [
          { required: true, message: "请输入规格名称", trigger: "blur" },
        ],
      },
    };
  },
  mounted() {
    console.log(this);
    this.id = this.$route.query.id;
    if (this.id) {
      // 说明是点击的编辑
      this.title = "规格编辑";
      this.buttonTitle = "修改";
      this.$http.get("/specsinfo", { id: this.id }).then((res) => {
        // console.log(res.data.list[0].attrs)
        let { status } = res.data.list[0];
        this.ruleForm = {
          ...res.data.list[0],
          status: status == 1 ? true : false,
        };
        let arr = [];
        res.data.list[0].attrs.forEach((item) => {
          arr.push({ value: item });
        });
        this.ruleForm.attrs = arr;

        //  this.ruleForm.attrs= res.data.list[0].attrs.forEach(item=>{
        //     return  this.ruleForm.attrs.push({
        //            value: item
        //     })
        //  })
      });
    } else {
      // 说明是点击的添加
      this.title = "规格添加";
      this.buttonTitle = "添加";
    }

    // this.$http.get("/menulist").then(res => {
    //     console.log(res)
    //     this.menuList = res.data.list
    // })
  },
  methods: {
    removeDomain(item) {
      var index = this.ruleForm.attrs.indexOf(item);
      if (index !== -1) {
        this.ruleForm.attrs.splice(index, 1);
      }
    },
    addDomain() {
      this.ruleForm.attrs.push({
        value: "",
      });
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // 验证通过，调用添加的接口
          this.ruleForm.status = this.ruleForm.status ? 1 : 2;
          if (this.id) {
            this.$http
              .post("/specsedit", { ...this.ruleForm, id: this.id })
              .then((res) => {
                console.log(res);
                if (res.data.code == 200) {
                  this.$router.back();
                }
              });
          } else {
            this.ruleForm.attrs = this.ruleForm.attrs
              .map((item) => {
                return item.value;
              })
              .join(",");
            this.$http.post("/specsadd", this.ruleForm).then((res) => {
              console.log(res);
              if (res.data.code == 200) {
                this.$router.back();
              }
            });
          }
        } else {
          // 验证没通过
          console.log("error submit!!");
          return false;
        }
      });
    },
  },
};
</script>

<style lang="stylus" scoped></style>