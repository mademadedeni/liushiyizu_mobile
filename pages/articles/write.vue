<template>
  <div class="_100vh" style="overflow: auto;">
    <mt-header title="新建文章">
      <nuxt-link to="/articles" slot="left">
        <mt-button icon="back">返回</mt-button>
      </nuxt-link>
    </mt-header>
    <div class="Plf20 Prt20">
      <div>
        <mt-field label placeholder="标题(3-50)" v-model="article.title"></mt-field>
      </div>
      <div class="Mtp20">
        <mt-field
          label
          placeholder="内容(10-10000)"
          type="textarea"
          rows="10"
          v-model="article.content"
        ></mt-field>
      </div>
      <div class="Mtp20">
        <mt-button @click="save" class="wido100" type="primary">保存</mt-button>
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
      article: {}
    };
  },
  methods: {
    save() {
      var that = this;
      if (!that.article.title) {
        Toast({
          message: "标题不能为空！",
          position: "bottom",
          duration: 3000
        });
        return;
      }

      if (_.size(that.article.content) < 9) {
        Toast({
          message: "内容最少9个字！",
          position: "bottom",
          duration: 3000
        });
        return;
      }

      api
        .post("/article/create", that.article)
        .then(function(res) {
          if (res.data.message == "success") {
            Toast({
              message: "创建成功！",
              iconClass: "icon icon-success",
              duration: 1000
            });
            window.setTimeout(function() {
              window.location.href = "/mobile/articles";
            }, 1000);
          } else {
            Toast({
              message: "创建失败！",
              position: "bottom",
              duration: 3000
            });
            console.log(res.data.message);
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    }
  }
};
</script>

<style lang="scss">
</style>
