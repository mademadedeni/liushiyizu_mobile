<template>
  <div
    class="_100vh"
    style="overflow: auto;"
    v-infinite-scroll="loadMore"
    infinite-scroll-disabled="loading"
    infinite-scroll-distance="10"
  >
    <Header />
    <Article :article="article" v-for="article in articles" :key="article.id"></Article>
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
      totalCount: 0
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
