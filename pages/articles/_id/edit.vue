<template>
  <div class="_100vh" style="overflow: auto;">
    <mt-header title="编辑文章">
      <nuxt-link :to="'/articles/'+article.id" slot="left">
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
        <mt-button @click="update" class="wido100" type="primary">更新</mt-button>
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
  asyncData: function(context) {
    // context.store.dispatch("getUser");
    return api
      .get("/articles/" + context.params.id)
      .then(res => {
        return { article: res.data.data };
      })
      .catch(err => {
        console.log(err);
      });
  },
  methods: {
    update() {
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
        .post("/articles/"+that.article.id+"/update", that.article)
        .then(function(res) {
          if (res.data.success) {
            Toast({
              message: "更新成功！",
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
