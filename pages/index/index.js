// index.js
// 获取应用实例
const app = getApp()
import { go} from "../../api"
Page({
  data: {
  },
  goUserInfo(){
    go('../userInfo/index')
  },
  async onLoad() {
  }
})
