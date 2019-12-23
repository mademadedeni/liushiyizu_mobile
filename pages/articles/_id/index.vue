<template>
  <div>
    <mt-header :title="article.title">
      <nuxt-link to="/articles" slot="left">
        <mt-button icon="back">返回</mt-button>
      </nuxt-link>
      <mt-button v-if="!_.isEmpty(user)" @click="isShowMenu=true" icon="more" slot="right"></mt-button>
    </mt-header>
    <div class="article_detail">
      <!-- <h1 class="title">{{article.title}}</h1> -->
      <div class="user_box">
        <div class="left avatar">
          <img :src="res+article.user.avatar" alt="user avatar" />
        </div>
        <div class="Mlf50">
          <div class="p_ibt">
            <h2 class="nickname">{{article.user.nickname||article.user.name}}</h2>
            <div class="date">
              <span>{{dateFormat(article.updateDate)}}</span>
              <span class="Mlf10">阅读</span>
              <span>{{0}}</span>
              <label>{{user.name}}</label>
            </div>
          </div>
          <button class="attention">关注</button>
          <span v-show="false" class="p_ibt attention on">已关注</span>
        </div>
      </div>
      <div class="Mtp20">
        <div class="content" v-html="article.content"></div>
      </div>
    </div>
    <mt-popup class="wido100 Center" v-model="isShowMenu" position="bottom">
      <div class="Ptp10 Pbm10">
        <mt-button @click="delArticle" style="width:100px;" type="primary" size="small">删除</mt-button>
        <span class="Mlf10 Mrt10"></span>
        <n-link :to="'/articles/'+article.id+'/edit'">
          <mt-button style="width:100px;" type="primary" size="small">编辑</mt-button>
        </n-link>
      </div>
    </mt-popup>
  </div>
</template>

<script>
import { api } from "~/assets/js/common/axios.js";
import utils from "~/assets/js/utils.js";
import { mapMutations } from "vuex";
import { MessageBox } from "mint-ui";
import { Toast } from "mint-ui";

export default {
  components: {},
  data: function() {
    return {
      article: {},
      isShowMenu: false
    };
  },
  asyncData: function(context) {
    // context.store.dispatch("getUser");
    return api
      .get("/articles/" + context.params.id)
      .then(res => {
        res.data.data.content = utils.replaceHost(res.data.data.content);
        return { article: res.data.data };
      })
      .catch(err => {

      });
  },
  mounted: function() {
    !this._.isEmpty(this.user) || this.$store.dispatch("getUser");
  },
  computed: {
    user: function() {
      return this.$store.state.userInfo || {};
    }
  },
  methods: {
    dateFormat: function(date) {
      return utils.dateFormat({ dateTime: date });
    },
    delArticle() {
      var that = this;
      if (that.user.id != that.article.user.id) {
        Toast("只能删除自己的文章！");
        that.isShowMenu = false;
        return false;
      }
      MessageBox.confirm("此操作将永久删除该文件, 是否继续?")
        .then(function() {
          api
            .get("/articles/delete/" + that.article.id)
            .then(function(res) {
              if (res.data.success) {
                that.$router.push("/articles");
              } else {
                Toast("删除失败！");
              }
            })
            .catch(function(err) {
              console.error(err);
              Toast("服务器错误");
            });
        })
        .catch(function(err) {
            console.error(err);
        });
    },
    ...mapMutations(["setUser"])
  }
  //   async fetch({ store, params }) {
  //     let { data } = await api.get("/user/user");
  //     store.commit("setUser", data);
  //   }
};
</script>

<style lang="scss">
.article_detail {
  padding: 10px 20px;

  .title {
    font-size: 24px;
    line-height: 26px;
    padding: 10px 0;
    font-weight: 700;
  }
  .user_box {
    margin-top: 15px;

    .avatar {
      width: 40px;
      height: 40px;
      overflow: hidden;

      img {
        border-radius: 50%;
        width: 100%;
        height: 100%;
      }
    }
    .nickname {
      font-size: 16px;
      font-weight: 700;
      color: #333;
    }
    .date {
      color: #999;
      font-size: 13px;
      margin-top: 3px;
    }
    .attention {
      margin: 0 0 0 auto;
      margin-top: 0px;
      padding: 0;
      width: 55px;
      height: 26px;
      font-size: 13px;
      border: 1px solid #6cbd45;
      color: #6cbd45;
      background-color: #fff;
      float: right;
      margin-top: 10px;
    }
    .attention.on {
      color: #fff;
      border-color: #6cbd45;
      background-color: #6cbd45;
      line-height: 26px;
      text-align: center;
    }
  }
  .content {
    font-size: 15px;
    line-height: 24px;
    p {
      margin: 10px 0;
    }
  }
}
</style>
