<template>
  <div class="article_item_box">
    <nuxt-link :to="'/articles/'+article.id">
        <h2 class="title">{{article.title}}</h2>
    </nuxt-link>
    <div class="content" v-html="article.content"></div>
    <div class="footer">
      <span>作者：</span>
      <span class="Mrt20">{{article.user.name}}</span>
      <span>日期：</span>
      <span>{{dateFormat(article.updateDate)}}</span>
    </div>
  </div>
</template>

<script>
import utils from "~/assets/js/utils.js";

export default {
  props: {
    article: {
      type: Object
    }
  },
  data: function() {
    return {};
  },
  methods: {
    dateFormat: function(date) {
      return utils.dateFormat({ dateTime: date });
    }
  }
};
</script>

<style lang="scss">
.article_item_box {
  padding: 15px 0 14px;
  margin: 0 15px;
  border-bottom: 0.5px solid #d3d3d3;

  .title {
    font-weight: 600;
    font-size: 17px;
    color: #1a1a1a;
    line-height: 22px;
    overflow: hidden;
    text-overflow: ellipsis;
    -webkit-box-orient: vertical;
  }
  .content {
    padding-top: 11px;
    font-size: 15px;
    overflow: hidden;
    font-weight: 400;
    text-overflow: ellipsis;
    display: -webkit-box;
    line-height: 21px;
    letter-spacing: normal;
    color: #444;
    margin-right: 4px 15px;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
  }
  .footer {
    font-size: 14px;
    color: #999;
    padding-top: 9px;
  }
}
</style>
