<template>
  <div>
    <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/role'}">角色管理</el-breadcrumb-item>
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
      <el-form-item label="角色名称" prop="rolename">
        <el-input v-model="ruleForm.rolename"></el-input>
      </el-form-item>

      <el-form-item label="角色权限" prop="menus">
        <el-tree
          :data="data"
          show-checkbox
          node-key="id"
          :default-expanded-keys="[1]"
          :default-checked-keys="checkedAsrr"
          ref="mytree"
          :props="defaultProps"
          check-strictly
        ></el-tree>
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
        // 对象里面存储了上面所有表单元素的值，而且这个对象也是我们最终调用接口发走的对象参数
        rolename: "", // 角色名称
        menus: [],//权限
        status: true,//状态
      },
      rules: {
        // 每个表单元素的验证规则
        rolename: [{ required: true, message: "请输入角色名称", trigger: "blur" }, ],
      },
      data: [],
      checkedArr: [], //默认选中
      defaultProps: {
        children: "children",
        label: "title",
      },
    };
  },
  mounted() {
    this.id = this.$route.query.id;
    if (this.id) {
      this.title = "角色编辑";
      this.buttonTitle = "修改";
      this.$http.get("/roleinfo", { id: this.id }).then((res) => {
        
        let { status } = res.data.list
            this.ruleForm = { ...res.data.list, status: status == 1 ? true : false }
            this.checkedArr = res.data.list.menus.split(",")//把数组[1,2,3] 切割成["1","2","3"]
           
      })
    } else {
      this.title = "菜单添加";
      this.buttonTitle = "添加";
    }


     //`SELECT * FROM ${tableName} WHERE pid = ${pid}`
    this.$http.get("/menulist", { istree: true }).then((res) => {
      this.data = res.data.list;
     
    });


  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          //验证通过，调用添加的接口
          this.ruleForm.menus = this.$refs.mytree.getCheckedKeys();
          this.ruleForm.status = this.ruleForm.status ? 1 : 2;
          console.log(this.ruleForm.menus);
          if (this.id) {
            this.$http.post("/roleedit", { ...this.ruleForm, id: this.id }).then(res => {        
                if (res.data.code == 200) {
                    this.$router.back()
                }
            })
          } else {
            this.$http.post("/roleadd", this.ruleForm).then((res) => {
              if (res.data.code == 200) {
                  this.$router.back();
              }
            });
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