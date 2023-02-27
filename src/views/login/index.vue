<template>
  <div class="logins">
    <div class="login">
      <div class="title"><span>登陆页面</span></div>
      <el-form
        :label-position="labelPosition"
        label-width="80px"
        :model="formLabelAlign"
      >
        <el-form-item label="账号">
          <el-input v-model="input1"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input type="password" v-model="input2"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button style="margin-left: 60px" :plain="true" @click="btn1"
            >登录</el-button
          >
          <el-button style="margin-left: 50px" @click="btn2">注册</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { sign, login } from '@/api/class'
export default {
  data() {
    return {
      labelPosition: 'right',
      formLabelAlign: {
        name: '',
        region: '',
        type: ''
      },
      input1: '',
      input2: ''
    }
  },

  methods: {
    // 登录
    async btn1() {
      const { data: res } = await login({
        username: this.input1,
        password: this.input2
      })
      if (res.status === 200) {
        this.$store.commit('btn_name', this.input1)
        this.$message(`账号为${this.input1}的用户${res.message}`)
        sessionStorage.setItem('token', res.token)
        this.$router.replace('/')
        // 登录成功后将密码清除
        this.input2 = ''
      } else {
        this.$message(`${res.message}`)
      }
    },

    // 注册
    async btn2() {
      const { data: res } = await sign({
        username: this.input1,
        password: this.input2
      })
      console.log(res)
      if (res.status === 200) {
        this.$message(`${res.message}`)
      } else {
        this.$message(`${res.message}`)
      }
    }
  }
}
</script>

<style lang="less" scoped>
.logins {
  display: flex;
  flex-direction: row;
  justify-content: center;
  .login {
    width: 500px;
    height: 250px;
    margin-top: 250px;
    padding: 20px 50px 0 20px;
    background-color: antiquewhite;
    .title {
      font-size: 20px;
      text-align: center;
      margin-left: 30px;
      padding-bottom: 20px;
    }
  }
}
</style>
