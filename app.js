// app.js
import {checkUpdateVersion} from "./api"
App({
  onLaunch() {
    checkUpdateVersion()
  },
  globalData: {
    userInfo: null
  }
})
