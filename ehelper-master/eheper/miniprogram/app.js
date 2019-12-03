//app.js
App({
  onLaunch: function () {
    
    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力')
    } else {
      wx.cloud.init({
        env: 'ehelper-6ec657',
        traceUser: true,
      })
    }

    this.globalData = {
      openid: "",
      priorityArr:[0,0,0],
      statusArr:[0,0,0]
    }
  }
})
