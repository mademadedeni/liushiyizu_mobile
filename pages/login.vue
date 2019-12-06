<template>
  <div class="_100vh" style="overflow: auto;">
    <Header />
    <div class="Plf20 Prt20">
      <div class="login_box">
        <mt-field label="用户名" placeholder="请输入用户名" v-model="user.name"></mt-field>
        <mt-field label="密码" placeholder="请输入密码" type="password" v-model="user.password"></mt-field>
        <div class="autologin mint-cell-wrapper">
          <mt-switch v-model="user.autoLogin">自动登录</mt-switch>
        </div>
      </div>
      <div class="Mtp20">
        <mt-button @click="login" class="wido100" type="primary">保存</mt-button>
      </div>
    </div>
  </div>
</template>

<script>
import Header from "~/components/common/header.vue";
import { api } from "~/assets/js/common/axios.js";
import { Toast } from "mint-ui";
import _ from "lodash";

export default {
  components: {
    Header
  },
  data: function() {
    return {
      user: {
        name: "",
        password: "",
        autoLogin: false
      }
    };
  },
  methods: {
    login() {
      var that = this;
      if (!that.user.name) {
        Toast({
          message: "用户名不能为空！",
          position: "bottom",
          duration: 3000
        });
        return;
      }

      if (_.size(that.user.password) < 6) {
        Toast({
          message: "密码最少6个字符！",
          position: "bottom",
          duration: 3000
        });
        return;
      }
      api
        .post(that.api + "/user/login", this.user)
        .then(function(res) {
          if (res.data.success) {
            window.location.href = "/mobile";
          } else {
            Toast({
              message: "用户名或密码错误",
              position: "bottom",
              duration: 3000
            });
          }
          that.isLogin = false;
        })
        .catch(function(error) {
          console.log(error);
        });
    }
  }
};
</script>

<style lang="scss">
.login_box {
  margin-top: 20px;

  .autologin {
    min-height: 48px;
  }
}
</style>
