<template>
  <div id="app">
       
    <el-container>
      <el-aside width="200px">
          <!-- 侧边栏，拆成组件 -->
          <Navbar />
      </el-aside>
      <el-container>
        <el-header>Header</el-header>
        <el-main>
             <router-view />
        </el-main>
      </el-container>
    </el-container>
     
  </div>
</template>

<script>
import Navbar from './components/Navbar'
export default {
  name: "App",
  components:{
    Navbar
  }
};
</script>



<style>
*{margin: 0; padding: 0;}
html,body,#app,.el-container{width: 100%; height: 100%;}
.el-header{
    background-color: #B3C0D1;
    color: #333;
    text-align: center;
    line-height: 60px;
  }
  
  .el-aside {
    background-color: #D3DCE6;
    color: #333;
    text-align: center;
    height: 100%;
  }
  
  .el-main {
    background-color: #E9EEF3;
    color: #333;
    height: 100%;
  }
 .el-menu-item, .el-submenu {
    width: 200px;
}
.el-button--primary {
    margin: 10px 0;
}
  
</style>
