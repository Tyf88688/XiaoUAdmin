<template>
  <div>
    <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/user'}">管理员管理</el-breadcrumb-item>
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
      <el-form-item label="角色编号" prop="roleid">
        <el-select v-model="ruleForm.roleid" placeholder="请选择角色">
          <el-option
            :label="item.rolename"
            :value="item.id"
            v-for="(item) in menuList"
            :key="item.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="用户名" prop="username">
        <el-input v-model="ruleForm.username"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="ruleForm.password"></el-input>
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
        roleid: "",
        username: "",
        password: "",
        status: true,
      },
      rules: {
        // 每个表单元素的验证规则
        roleid: [
          { required: true, message: "请输入角色名称", trigger: "blur" },
        ],
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
        ],
      },
    };
  },
  mounted() {
    this.id = this.$route.query.id;
    if (this.id) {
      this.title = "管理员编辑";
      this.buttonTitle = "修改";
      this.$http.get("/userinfo", { uid: this.id }).then((res) => {
        console.log(res);
        let { status } = res.data.list;
        this.ruleForm = {...res.data.list,status: status == 1 ? true : false,password: "",};
      })
    } else {
      this.title = "管理员添加";
      this.buttonTitle = "添加";
    }

    //`SELECT * FROM ${tableName} WHERE pid = ${pid}`
    this.$http.get("/rolelist",{ size: 10, page: 1}).then((res) => {
      this.menuList = res.data.list;
    });
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          //验证通过，调用添加的接口
          this.ruleForm.status = this.ruleForm.status ? 1 : 2;
          if (this.id) {
            this.$http
              .post("/useredit", { ...this.ruleForm, uid: this.id })
              .then((res) => {
                if (res.data.code == 200) {
                  this.$router.back();
                }
              });
          } else {
            this.$http.post("/useradd", this.ruleForm).then((res) => {
              if (res.data.code == 200) {
                this.$router.back();
              }
            })
          }
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
  },
};
</script>

<style lang="stylus" scoped></style>