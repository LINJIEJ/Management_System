<template>
  <div class="category">
    <div class="wrapper">
      <div class="title">产品类目管理</div>
      <div class="tree">
        <!-- 一级按钮 -->
        <el-button type="warning" style="margin-bottom:20px;" @click="Firstbtn">新增一级导航类目</el-button>
        <!-- tree内容结构 -->
        <el-tree :data="data" show-checkbox node-key="id" default-expand-all :expand-on-click-node="false"
          :render-content="renderContent" :props="defaultProps">
        </el-tree>
      </div>
      <!-- 弹出框 -->
      <div>
        <el-dialog :title="title" :visible.sync="dialogVisible" width="30%">
          <el-input v-model="input" placeholder="请输入内容"></el-input>
          <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="submit">确 定</el-button>
          </span>
        </el-dialog>
      </div>
    </div>
  </div>
</template>

<script>
import { getAllTreeList, addChildList, updateChildList, removeChildList, addFirstChildList } from '@/api/class'
export default {
  data() {
    return {
      // 自定义lable名字
      defaultProps: {
        label: 'name'
      },
      // 增加修改按钮中的表单的值
      input: '',
      // 识别是点击的增加按钮还是修改按钮
      type: '增',
      addOrUpdate_data: {},
      // 控制弹出框的标题
      title: '标题',
      // 用于控制弹出框是否弹出
      dialogVisible: false,
      data: [{
        id: 1,
        name: '一级',
        children: [{
          id: 4,
          name: '二级'
        }]
      }, {
        id: 2,
        name: '一级',
        children: [{
          id: 5,
          name: '二级'
        }, {
          id: 6,
          name: '二级'
        }]
      }]
    }
  },
  methods: {
    // 获取所有产品分类
    async getTreeList() {
      const { data: res } = await getAllTreeList()
      const oneArr = []
      const otheArr = []
      // 筛选出一级分类和其他二级等分类，一级分类添加到oneArr，其他二级等分类添加到otheArr
      res.data.forEach(ele => {
        if (ele.type === 1) {
          ele.children = []
          oneArr.push(ele)
        } else {
          otheArr.push(ele)
        }
      })
      // 通过遍历两个数组，匹配type和cid，相同的话说明是同一级分类下的，将其添加到oneArr的children中
      oneArr.forEach((ele) => {
        otheArr.forEach((element) => {
          if (ele.cid === element.type) {
            ele.children.push(element)
          }
        })
      })
      // 最后将oneArr赋值到data下，使其成功渲染
      this.data = oneArr
    },

    // 弹出框的确定提交事件
    submit() {
      // 判断input中的值是否为空
      if (this.input === '') {
        this.dialogVisible = false
      } else {
        // 不为空，开始执行增或改的操作
        if (this.type === '增') {
          this.append_router(this.addOrUpdate_data)
          this.$message({
            type: 'success',
            message: '添加成功!'
          })
        } else if (this.type === '减') {
          this.update_router(this.addOrUpdate_data)
          this.$message({
            type: 'success',
            message: '修改成功!'
          })
        } else if (this.type === '一级分类') {
          this.append_Firstrouter()
          this.$message({
            type: 'success',
            message: '添加成功!'
          })
        }
        this.dialogVisible = false
      }
    },

    // 增加一级分类的请求
    async append_Firstrouter() {
      await addFirstChildList({
        name: this.input
      })
      this.getTreeList()
    },

    // 增加二级分类的请求
    async append_router(value) {
      await addChildList({
        name: this.input,
        cid: value.cid
      })
      this.getTreeList()
    },

    // 修改的请求
    async update_router(value) {
      await updateChildList({
        id: value.id,
        name: this.input
      })
      this.getTreeList()
    },

    // 删除的请求
    async remove_router(value) {
      await removeChildList({
        id: value.id
      })
      this.getTreeList()
    },

    Firstbtn() {
      this.input = ''
      this.dialogVisible = true
      this.type = '一级分类'
      this.title = '增加一级分类'
    },

    // 增加按钮
    append(node, data) {
      this.input = ''
      this.dialogVisible = true
      this.type = '增'
      this.title = `增加【${node.data.name}】子分类`
      this.addOrUpdate_data = node.data
    },

    // 修改按钮
    update(node, data) {
      this.input = node.data.name
      this.dialogVisible = true
      this.type = '改'
      this.title = `修改【${node.data.name}】分类`
      this.addOrUpdate_data = node.data
    },

    // 删除按钮
    remove(node, data) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.addOrUpdate_data = node.data
        this.remove_router(this.addOrUpdate_data)
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },

    renderContent(h, { node, data, store }) {
      return (
        <span class="custom-tree-node">
          <span class="name">{node.label}</span>
          {
            node.level === 1
              ? <span>
                <el-button class='mini' on-click={() => this.append(node, data)} icon="el-icon-plus">新增</el-button>
                <el-button class='mini' on-click={() => this.update(node, data)} icon="el-icon-edit">修改</el-button>
                <el-button class='mini' type="danger" on-click={() => this.remove(node, data)} icon="el-icon-delete">删除</el-button>
              </span>
              : <span>
                <el-button class='mini' on-click={() => this.update(node, data)} icon="el-icon-edit">修改</el-button>
                <el-button class='mini' type="danger" on-click={() => this.remove(node, data)} icon="el-icon-delete">删除</el-button>
              </span>
          }
        </span>)
    }
  },
  created() {
    this.getTreeList()
  }
}
</script>

<style lang="less" scoped>
.custom-tree-node {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 14px;
  padding-right: 8px;
}

.category {
  margin: 10px;
}

.wrapper {
  padding: 10px;
  margin-top: 10px;
  background: #fff;

  .title {
    background: #f6f6f6;
    height: 50px;
    line-height: 50px;
    font-weight: bold;
    padding-left: 10px;
  }

  .tree {
    margin: 10px;

    /deep/ .mini {
      padding: 4px 10px;
      font-size: 14px;
    }

    /deep/ .el-tree-node__content {
      margin-bottom: 10px;
    }
  }

  /deep/ .name {
    width: 300px;
    display: inline-block;
  }
}
</style>
