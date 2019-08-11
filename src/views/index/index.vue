<template>
  <div id="app">
    <el-container class="container">
      <el-aside :width="isCollapse?'64px':'200px'" show-timeout="1000" hide-timeout="300">
        <div class="logo" :class="{miniLogo:isCollapse}"></div>
        <!-- 下拉菜单 -->
        <!--
            default-active="1" ：默认选中
        -->
        <el-menu
          :collapse="isCollapse"
          :collapse-transition="false"
          :default-active="$route.path"
          router
          class="el-menu-vertical-demo"
          background-color="#002033"
          text-color="#fff"
          active-text-color="#ffd04b"
        >
          <el-menu-item index="/index">
            <i class="el-icon-s-home"></i>
            <span slot="title">首页</span>
          </el-menu-item>
          <el-menu-item index="/article">
            <i class="el-icon-menu"></i>
            <span slot="title">内容管理</span>
          </el-menu-item>
          <el-menu-item index="/images">
            <i class="el-icon-document"></i>
            <span slot="title">素材管理</span>
          </el-menu-item>
          <el-menu-item index="/publish">
            <i class="el-icon-s-promotion"></i>
            <span slot="title">文章发布</span>
          </el-menu-item>
          <el-menu-item index="/comment">
            <i class="el-icon-s-comment"></i>
            <span slot="title">评论管理</span>
          </el-menu-item>
          <el-menu-item index="/fans">
            <i class="el-icon-present"></i>
            <span slot="title">粉丝管理</span>
          </el-menu-item>
          <el-menu-item index="/setting">
            <i class="el-icon-setting"></i>
            <span slot="title">个人设置</span>
          </el-menu-item>
        </el-menu>
      </el-aside>

      <el-container>
        <el-header>
          <!-- toggle:控制侧边栏的收 放 -->
          <span class="el-icon-s-fold" @click="toggleMenu()"></span>
          <span class="text">江苏传智播客科技教育有限公司</span>
          <!-- 绑定组件提供的command -->
          <el-dropdown @command="clickMenu">
            <span class="el-dropdown-link">
              <img :src="photo" alt />
              {{name}}
              <i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <!-- 使用command绑定方法 -->
              <el-dropdown-item icon="el-icon-setting" command="setting">个人设置</el-dropdown-item>
              <el-dropdown-item icon="el-icon-unlock" command="logOut">退登录</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </el-header>
        <el-main>
          <!-- 二级路由 -->
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import Store from '../../store/store'
import eventBus from '../../components/eventBus'

export default {
  data () {
    return {
      isCollapse: false,
      name: '',
      photo: ''
    }
  },
  created () {
    // 用户名的更新
    eventBus.$on('updateUser', data => {
      this.name = data
    })
    // 用户头像的更新
    eventBus.$on('updatePhoto', data => {
      this.photo = data
    })
    this.name = Store.getUser().name
    this.photo = Store.getUser().photo
  },
  methods: {
    toggleMenu () {
      this.isCollapse = !this.isCollapse
    },
    setting () {
      this.$router.push('/setting')
    },
    logOut () {
      Store.clearUser()
      this.$router.push({ name: 'login' })
    },
    // 组件提供的事件 command
    clickMenu (menuType) {
      this[menuType]()
    }
  }
}
</script>

<style lang="less" scoped>
.container {
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
  .el-aside {
    background-color: #002033;
    .logo {
      width: 100%;
      height: 4rem;
      background: url(../../assets/images/logo_admin.png) no-repeat center /
        140px auto;
    }
    .miniLogo {
      background-image: url(../../assets/images/logo_admin_01.png);
      background-size: 36px auto;
    }
    .el-menu {
      border-right: 0;
    }
  }
  .el-header {
    border-bottom: 1px solid #ddd;
    line-height: 3.75rem;
    .el-icon-s-fold {
      font-size: 1.875rem;
      vertical-align: middle;
    }
    .text {
      vertical-align: middle;
      margin-left: 0.625rem;
    }
    .el-dropdown {
      float: right;
      font-weight: bolder;
      img {
        width: 2.25rem;
        height: 2.25rem;
        border-radius: 50%;
        vertical-align: middle;
      }
    }
  }
}
</style>
