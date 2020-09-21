<template>
  <div>
    <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/category'}">商品分类管理</el-breadcrumb-item>
      <el-breadcrumb-item>{{title}}</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 表单 -->
    <el-form
      :model="ruleForm"
      :rules="rules"
      ref="ruleForm"
      label-width="100px"
      class="demo-ruleForm"
    >
       <el-form-item label="上级分类" prop="pid">
        <el-select v-model="ruleForm.pid" placeholder="请选择分类">
          <el-option label="顶级分类" :value="0"></el-option>
          <el-option :label="item.catename" :value="item.id" v-for="(item) in catelist" :key="item.id"></el-option>
        </el-select>
      </el-form-item>

     <el-form-item label="分类名称" prop="catename">
        <el-input v-model="ruleForm.catename"></el-input>
      </el-form-item>


      <el-form-item label="图片" prop="img"  v-show="ruleForm.pid !=0">
         <el-upload
             action=""
              list-type="picture-card"
              :auto-upload="false"
              :file-list="arr"
              :on-change="change"
              >
           <i class="el-icon-plus"></i>
           </el-upload>
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
      catelist: [],
      flag:true,
      arr:[],
      ruleForm: {
        pid:"",
        catename:"",
        img:"",
        status: true, //状态   1正常2禁用
      },
      rules: {
        catename: [{ required: true, message: "请输入商品名称", trigger: "blur" }],
        pid: [{ required: true, message: "请选择上级分类", trigger: "change" }],
      },
    };
  },
  mounted() {
    console.log(this);
    this.id = this.$route.query.id;
    if (this.id) {
      this.title = "商品编辑";
      this.buttonTitle = "修改";
      this.$http.get("/cateinfo", {id:this.id}).then((res) => {
   
      let {status} = res.data.list;
      this.ruleForm = {...res.data.list,status: status == 1 ? true : false};
      this.arr.push({
          url:"http://localhost:3000"+res.data.list.img
      })
      });
    } else {
      this.title = "商品分类添加";
      this.buttonTitle = "添加";
      
     
    }

    this.$http.get("/catelist", { pid: 0}).then((res) => {
      this.catelist = res.data.list;
    });
  },
  methods: {
    change(file,fileList){
        this.ruleForm.img=file.raw
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          //验证通过，调用添加的接口
          this.ruleForm.status = this.ruleForm.status ? 1 : 2;
          let form=new FormData()
          for(var key in this.ruleForm){
              form.append(key, this.ruleForm[key])
          }
          if (this.id) {
            form.append("id",this.id)
            this.$http.post("/cateedit", form).then((res) => {
                    console.log(res);
                if (res.data.code == 200) {
                  this.$router.back();
                }
              });
          } else {
            this.$http.post("/cateadd", form).then((res) => {
              console.log(res);
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