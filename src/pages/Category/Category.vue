<template>
  <div>
    <!--  -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品分类管理</el-breadcrumb-item>
    </el-breadcrumb>
    <!--  -->
    <el-button type="primary" @click="goAdd">添加</el-button>
    <!--  -->
    <el-table
      :data="tableData"
      style="width: 100%;margin-bottom: 20px;"
      row-key="id"
      border
      default-expand-all
      :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
    >
      <el-table-column prop="id" label="分类编号" width="180"></el-table-column>
      <el-table-column prop="catename" label="商品分类名称"></el-table-column>
      <!-- 要改 -->
      <el-table-column label="图片" width="300">
        <template slot-scope="scope">
          <img :src="'http://localhost:3000' + scope.row.img" alt width="200" />
        </template>
      </el-table-column>
      <el-table-column label="状态">
        <template slot-scope="scope">
          <el-tag>{{scope.row.status | statusFormat}}</el-tag>
        </template>
      </el-table-column>

      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-popconfirm title="你确定要删除吗" @onConfirm="del(scope.row.id)">
            <el-button slot="reference" size="mini" type="danger">删除</el-button>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tableData: [],
    };
  },
  mounted() {
    this.getList();
  },

  methods: {
    getList() {
      this.$http.get("/catelist", { istree: true }).then((res) => {
        this.tableData = res.data.list;
      });
    },
    handleEdit(index, row) {
    
      this.$router.push("/category/edit?id=" + row.id);
    },

    goAdd() {
      this.$router.push("/category/categoryadd");
    },
    del(i) {
      // 调用删除的接口
      this.$http.post("/catedelete", { id: i }).then((res) => {
        if (res.data.code == 200) {
          this.getList();
          this.$message({
            message: "删除成功",
            type: "success",
          });
        }
      });
    },
  },
};
</script>

<style lang="stylus" scoped>
    // img{width:100px;}
</style>