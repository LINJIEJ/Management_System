<template>
  <div class="addpage">
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
      <el-form-item label="所属分类" prop="category">
        <span>{{ treenamed }}</span>
      </el-form-item>
      <el-form-item label="商品名称" prop="name">
        <el-input v-model="ruleForm.name"></el-input>
      </el-form-item>
      <el-form-item label="商品价格" prop="price">
        <el-input v-model="ruleForm.price"></el-input>
      </el-form-item>
      <el-form-item label="商品数量" prop="number">
        <el-input v-model="ruleForm.number"></el-input>
      </el-form-item>
      <!-- 添加时间 -->
      <el-form-item label="添加时间" prop="time">
        <el-time-picker v-model="time" :picker-options="{
          selectableRange: '00:00:00 - 24:00:00',
        }" placeholder="任意时间点">
        </el-time-picker>
      </el-form-item>

      <el-form-item label="商品卖点" prop="selling">
        <el-input v-model="ruleForm.selling"></el-input>
      </el-form-item>
      <el-form-item label="商品图片" prop="img">
        <!-- 图片上传 -->
        <el-upload name:file action="/api/Img" list-type="picture-card" :file-list="fileList" ref="upload"
          :on-success="handleAvatarSuccess">
          <i class="el-icon-plus"></i>
        </el-upload>
        <el-dialog :visible.sync="dialogVisible">
          <img width="100%" :src="dialogImageUrl" alt="" />
        </el-dialog>
      </el-form-item>
      <el-form-item label="商品描述" prop="description">
        <!-- 富文本编辑器 -->
        <Toolbar style="border-bottom: 1px solid #ccc" :editor="editor" :defaultConfig="toolbarConfig" :mode="mode" />
        <Editor style="height: 300px; overflow-y: hidden" v-model="html" :defaultConfig="editorConfig" :mode="mode"
          @onCreated="onCreated" />
      </el-form-item>
      <!-- 开关 -->
      <el-form-item>
        <el-form-item label="是否上架商品" prop="isShow">
          <el-switch v-model="istrue" active-color="#13ce66"></el-switch>
        </el-form-item>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { Editor, Toolbar } from '@wangeditor/editor-for-vue'
import { addProduct, updateProduct } from '@/api/class'
import { removeHTMLTag } from '@/request/common'
import { mapState } from 'vuex'
const dayjs = require('dayjs')
export default {
  components: { Editor, Toolbar },
  props: ['treenamed'],
  data() {
    return {
      ruleForm: {
        // 商品表单属性
        category: '',
        name: '',
        price: '',
        number: '',
        selling: '',
        img: [],
        description: '',
        // 添加时间属性
        time: ''
      },
      istrue: true,
      // 上传的图片列表
      fileList: [],
      // 添加时间属性
      time: dayjs(new Date()).format('YYYY-MM-DD HH:mm:ss'),
      // 上传图片属性
      dialogImageUrl: '',
      dialogVisible: false,
      // 富文本编辑器属性
      editor: null,
      html: '<p>hello</p>',
      toolbarConfig: {},
      editorConfig: { placeholder: '请输入内容...' },
      mode: 'default',
      // 表单规则
      rules: {
        // category: [
        //   { required: true, message: '请输入所属分类', trigger: 'blur' }
        // ],
        name: [{ required: true, message: '请输入商品名称', trigger: 'blur' }],
        price: [{ required: true, message: '请输入商品价格', trigger: 'blur' }],
        number: [
          { required: true, message: '请输入商品数量', trigger: 'blur' }
        ],
        selling: [
          { required: true, message: '请输入商品卖点', trigger: 'blur' }
        ],
        description: [
          { required: true, message: '请输入商品描述', trigger: 'blur' }
        ]
      },
      page_num: ''
    }
  },
  methods: {
    // 表单提交按钮+商品添加请求
    submitForm(formName) {
      // 添加页面
      if (this.$store.state.title === '添加') {
        this.$refs[formName].validate(async (valid) => {
          if (valid) {
            const { data: res } = await addProduct(this.ruleForm)
            console.log(res)
            if (res.status === 200) {
              this.$message({
                message: '添加商品成功',
                type: 'success'
              })
              // 进行路由页面跳转
              this.$router.push('/products/list')
            }
          } else {
            console.log('error submit!!')
            return false
          }
        })
      } else {
        // 编辑页面
        this.$refs[formName].validate(async (valid) => {
          if (valid) {
            console.log(this.ruleForm)
            const { data: res } = await updateProduct(this.ruleForm)
            console.log(res)
            if (res.status === 200) {
              this.$message({
                message: '修改商品成功',
                type: 'success'
              })
              // 进行路由页面跳转
              this.$router.push('/products/list')
            }
          } else {
            console.log('error submit!!')
            return false
          }
        })
      }
    },

    // 表单重置按钮
    resetForm(formName) {
      if (this.$store.state.title === '编辑') {
        this.ruleForm = { ...this.$store.state.exit }
      } else {
        this.$refs[formName].resetFields()
        // 清空图片的方法
        this.$refs.upload.clearFiles()
        this.ruleForm.category = ''
        this.html = ''
      }
    },

    // 图片上传成功的回调函数
    async handleAvatarSuccess(response, file) {
      this.imageUrl = URL.createObjectURL(file.raw)
      // 获取上传成功后的图片的地址 <img src=''/> http://localhost:7788/+相对路径
      const url = response.path.slice(8)
      // 得到后台数据中的图片地址
      const imgUrl = 'http://localhost:8080/' + url
      this.$emit('sendImg', imgUrl)
    },

    // 富文本编辑器方法
    onCreated(editor) {
      this.editor = Object.seal(editor) // 一定要用 Object.seal() ，否则会报错
    }
  },

  // 计算属性
  computed: {
    ...mapState(['exit'])
  },

  // 监听props中的treenamed属性
  watch: {
    treenamed: {
      immediate: true,
      handler(newval) {
        this.ruleForm.category = newval
        // this.ruleForm.time = this.time
      }
    },
    // 监听html中的数据
    html: {
      immediate: true,
      handler(newval) {
        this.ruleForm.description = removeHTMLTag(newval)
      }
    }
  },

  created() {
    if (this.$store.state.title === '编辑') {
      this.ruleForm = { ...this.$store.state.exit }
    } else {
      this.ruleForm = {}
      this.ruleForm.time = this.time
      // 清空图片的方法
      this.img = []
      // this.ruleForm.category = ''
      this.html = ''
    }
  },

  // 销毁的生命周期
  beforeDestroy() {
    const editor = this.editor
    if (editor == null) return
    editor.destroy() // 组件销毁时，及时销毁编辑器
  }
}
</script>

<style src="@wangeditor/editor/dist/css/style.css"></style>
<style lang="less" scoped>
.addpage {
  padding-top: 30px;
  padding-right: 30px;
}
</style>
