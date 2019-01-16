<template>
  <div class="hello">
    <group>
      <x-input title="账号" placeholder="请输入账号" v-model="username"></x-input>
      <x-input title="密码" type="password" placeholder="请输入密码" v-model="password"></x-input>
    </group>
    <br>
    <x-button text="登陆" type="primary" @click.native="submitForm"></x-button>
  </div>
</template>

<script>
import Vue from 'vue'
import { Group, XInput, XButton } from 'vux';
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      username: '',
      password: ''
    }
  },
  methods: {
    submitForm() {
      // if(this.checked == true) {
      //     this.setCookie(this.ruleForm.username, this.ruleForm.password, 7)
      // }else {
      //     this.clearCookie()
      // }
      console.log(this.username)
      this.$axios.post('/admin/authentication', {
              username: this.username,
              password: this.password
      },
      ).then((res) => {
          localStorage.setItem('ms_username', res.data.data.name)
          localStorage.setItem('token', res.data.data.token)
          this.$router.push('/');
      }).catch((res) => {
        // Toast('登陆失败');
      })
  },
  },
  // Vue.component('group', Group)
  components: {
    Group,
    XButton,
    XInput
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 0.7rem;
}
a {
  color: #42b983;
}
</style>
