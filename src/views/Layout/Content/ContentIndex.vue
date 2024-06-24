<template>
  <div class="incontent">
    <!-- 顶部 -->
    <div class="header">
      <div class="icon">
        <i @click="changeMenu" class="iconfont icon-zhedie2"></i>
      </div>
      <div class="header-right">
        <div class="quitLogin">
        <el-dropdown  trigger="click"  @command="quitLogin">
      <span class="el-dropdown-link">
        欢迎！
      </span>
      <el-dropdown-menu slot="dropdown" >
        <el-dropdown-item  command="a">退出 登录</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
          <a href="#">
            <span v-if="isLogin" >{{ this.isLogin[0].name  }}</span>
            <span v-if="isLogin===''" @click="goLogin" >去登录</span>
          </a>
        </div>
        <div @click="alertVisible = true">
          <el-avatar @click="alertVisible = true" class="avatar"
            :src=(isLogin)?isLogin[0].avatar:null></el-avatar>
        </div>
        <el-dialog :visible.sync="alertVisible" width="30%">
          <div style="width: 200px;height: 200px;"></div>

          <!-- // 定位盒子 -->
          <div class="avatarDialog">
            <input type="file" @change="changeAvatar" class="inputFile">

            <!-- // 图片盒子 -->
            <div class="avatarLoad">
              <!-- <el-avatar :src=this.ImageSrc></el-avatar> -->

              <img :src=this.Image.ImageSrc width="200px" height="200px">

            </div>
          </div>
          <span slot="footer" class="dialog-footer">
            <el-button @click="alertVisible = false">取 消</el-button>
            <el-button type="primary" @click="onChangeAvatar,alertVisible = false">确 定</el-button>
          </span>
        </el-dialog>
      </div>
    </div>
    <!-- 内容区域 -->
    <router-view></router-view>
  </div>
</template>

<script>
// import { mapState, mapGetters } from 'vuex'
import { getInfo } from '@/utils/storage'
import { userMsg } from '@/api/user'
export default {
  name: 'ContentIndex',
  data () {
    return {
      alertVisible: false,

      isLogin: '',

      Image: {
        ImageSrc: ''
      }
    }
  },
  created () {
    this.isLogins()
    // this.loadAvatar()
  },
  methods: {
    quitLogin (a) {
      localStorage.removeItem('hm_shopping_info')
      this.$router.push('/login')
      this.$message.success('退出成功！')
      // console.log('44444444')
    },
    // 头像更换
    async onChangeAvatar () {
      await userMsg(1, this.Image)
    },
    // 加载头像
    // async loadAvatar () {
    //   // const res = await userMsgById(1)
    //   // this.Image.ImageSrc = res.data.avatar
    //   const defaultObj = { avatar: '', name: '' }
    //   const result = localStorage.getItem('hm_shopping_info')
    //   this.Image = JSON.parse(result)
    //   return this.Image ? this.Image : defaultObj
    // },
    isLogins () {
      if (getInfo().name !== '') {
        this.isLogin = getInfo()
      }
      console.log(this.isLogin)
    },
    changeAvatar (event) {
      const file = event.target.files[0]// 获取到文件
      // 创建一个FileReader对象
      const reader = new FileReader()
      reader.onload = (e) => {
        // 获取base64格式的图片数据
        const base64Image = e.target.result
        console.log(base64Image)
        this.Image.ImageSrc = base64Image
        // 在这里可以处理base64格式的图片数据，例如保存到服务器或显示在页面上等操作
      }
      reader.readAsDataURL(file)// 读取文件
    },
    changeMenu () {
      this.$emit('changeMenu')
    },
    goLogin () {
      this.$router.push('/login')
    }
  }
}
</script>
<style lang="less" scoped>
.header {
  background: #409eff;
  height: 56px;
  width: 100%;
  line-height: 56px;
  color: #fff;
  display: flex;
}

.incontent {
  transition: all .3;
}

.icon {
  i {
    font-size: 24px
  }
}

.header-right {
  flex: 1;
  text-align: right;
  align-self: flex-end;
  line-height: 56px;
  position: relative;

  a:hover {
    color: #eee
  }
}

a {
  color: azure;
}

.quitLogin {
  padding-right: 70px;
}

.avatar {
  cursor: pointer;
  position: absolute;
  right: 10px;
  top: 8px;
}

//   img:not([ImageSrc]){
// opacity:0;
// }
.avatarLoad img {
  border-radius: 100px;
  // border: 0;
  outline: none;
  // box-shadow: none ;
  // border: 2px solid skyblue ;
  background-color: #fff;
}
// 相对定位父亲盒子
.avatarDialog {
  position: relative;
}
// 头像盒子
.avatarLoad {
  border: none;
  position: absolute;
  top: -215px;
  left:60px;
}
// 文件上传盒子
.inputFile {
  position: absolute;
  top: 0px;
  left: 60px;
}

/deep/ .el-dialog {
  width: 350px !important;
}
.el-dropdown-link {
  font-size: 12px;
    cursor: pointer;
    color: #fff;
  }
  .demonstration {
    display: block;
    color: #8492a6;
    font-size: 10px;
    margin-bottom: 10px;
  }
  .el-dropdown-menu__item{
    line-height: 20px;
  }
  </style>
