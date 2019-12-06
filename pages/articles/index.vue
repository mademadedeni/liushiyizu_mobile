<template>
  <div
    class="_100vh"
    style="overflow: auto;"
    v-infinite-scroll="loadMore"
    infinite-scroll-disabled="loading"
    infinite-scroll-distance="10"
  >
    <mt-header title="文章">
      <nuxt-link to="/" slot="left">
        <mt-button icon="back">首页</mt-button>
      </nuxt-link>
      <mt-button @click="isShowMenu=true" icon="more" slot="right"></mt-button>
    </mt-header>
    <Article :article="article" v-for="article in articles" :key="article.id"></Article>
    <mt-popup class="wido100 Center" v-model="isShowMenu" position="bottom">
      <div class="Ptp10 Pbm10">
        <n-link to="/articles/write">
          <mt-button style="width:100px;" type="primary" size="small">新建</mt-button>
        </n-link>
        <!-- <span class="Mlf10 Mrt10"></span>
        <n-link :to="'/articles/'+article.id+'/edit'">
          <mt-button style="width:100px;" type="primary" size="small">编辑</mt-button>
        </n-link> -->
      </div>
    </mt-popup>
  </div>
</template>

<script>
import Header from "~/components/common/header.vue";
import Article from "~/components/article.vue";
import { api } from "~/assets/js/common/axios.js";

export default {
  components: {
    Header,
    Article
  },
  data: function() {
    return {
      loading: false,
      articles: [],
      totalCount: 0,
      isShowMenu: false
    };
  },
  asyncData(context) {
    return api
      .get("/articles", { pageNum: 1, pageSize: 8 })
      .then(res => {
        if (res.data.success) {
          var articles = res.data.data;
          return { articles: articles, totalCount: res.data.totalCount };
        }
        return {};
      })
      .catch(err => {
        console.log(err);
      });
  },
  methods: {
    loadMore() {
      var _this = this;
      _this.loading = true;
      api.get("/articles", { pageNum: 1, pageSize: 8 }).then(res => {
        if (res.data.success) {
          _this.articles = res.data.data;
          _this.totalCount = res.data.totalCount;
        }
        if (_this.articles.length < _this.totalCount) {
          _this.loading = false;
        }
      });
    }
  }
};
</script>

<style lang="scss">
</style>
