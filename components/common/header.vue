<template>
  <div class="m_header">
    <div class="_header">
      <nuxt-link to="/">
        <img class="logo" src="~/assets/images/logo/logo.jpg" alt="liushiyizu" />
        <label class="logo_text">刘氏一族</label>
      </nuxt-link>
      <div @click="toggleMenu" class="right iconfont" :class="{'icon-menu':!isShowMenu,'icon-close':isShowMenu}"></div>
    </div>
    <transition name="slide-fade">
      <ul v-show="isShowMenu" class="menu_ul">
        <li v-for="menu in menus" :key="menu.id">
          <nuxt-link :to="menu.url">{{menu.name}}</nuxt-link>
        </li>
      </ul>
    </transition>
    <transition name="fade">
      <div v-show="isShowMenu" class="shade"></div>
    </transition>
  </div>
</template>

<script>
export default {
  data: function() {
    return {
      menus: [
        {
          id: 1,
          name: "首页",
          url: "/"
        },
        {
          id: 2,
          name: "文章",
          url: "/articles"
        },
        {
          id: 3,
          name: "游戏",
          url: "/games"
        },
        {
          id: 4,
          name: "游记",
          url: "/notes"
        },
        {
          id: 5,
          name: "个人中心",
          url: "/users"
        }
      ],
      isShowMenu: false
    };
  },
  methods: {
    toggleMenu() {
      this.isShowMenu = !this.isShowMenu;
    }
  }
};
</script>

<style lang="scss" scope>
.m_header {
  height: 50px;
  border-bottom: 1px solid rgba(26, 26, 26, 0.06);
  -webkit-box-shadow: 0 1px 3px 0 rgba(23, 81, 153, 0.05);
  box-shadow: 0 1px 3px 0 rgba(23, 81, 153, 0.05);

  ._header{
      position: relative;
      z-index: 3;
      background-color: #fff;
      height:100%;
  }

  .shade {
    background-color: rgba(10, 10, 10, 0.3);
    position: fixed;
    top: 50px;
    left: 0;
    right: 0;
    bottom: 0;
  }

  .icon-close,.icon-menu {
    font-size: 22px;
    margin-right: 15px;
    margin-top: 14px;
    cursor: pointer;
    color: #8590a6;
  }
  .logo {
    height: 30px;
    margin-left: 10px;
    margin-top: 10px;
    vertical-align: middle;
  }
  .logo_text {
    font-size: 20px;
    color: #007fff;
    line-height: 30px;
    vertical-align: top;
    margin-top: 10px;
    display: inline-block;
  }
  .menu_ul {
    position: fixed;
    left: 0;
    top: 50px;
    right: 0;
    min-height: 20px;
    vertical-align: top;
    background-color: #fff;
    // display: none;
    z-index: 2;
    padding-bottom: 10px;

    li {
      line-height: 50px;
      border-bottom: 1px solid #ebebeb;
      margin: 0 20px;
      font-size: 16px;
      cursor: pointer;

      &:last-child {
        border-bottom: none;
      }
      a {
        display: block;
        padding: 15px 0;
        line-height: 20px;
      }
    }
  }
}
.slide-fade-enter-active {
  transition: all 0.3s ease;
}
.slide-fade-leave-active {
  transition: all 0.8s ease;
}
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active for below version 2.1.8 */ {
  transform: translateY(-200px);
  opacity: 0;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
