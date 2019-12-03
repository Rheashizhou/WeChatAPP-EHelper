// pages/mine/list/list.js

const app = getApp()

Page({

  data: {
    data: '',
    openid: '',

  },

  onLoad: function(options) {
    let openid = app.globalData.openid;
    const db = wx.cloud.database();
    const _ = db.command;
    // 查询当前用户所有的 counters
    db.collection('schedule').where({
      _openid: openid
    }).get({
      success: res => {
        this.setData({
          data: res.data
        })
        console.log('[数据库] [查询记录] 成功: ', res.data)
      },
      fail: err => {
        console.error('[数据库] [查询记录] 失败：', err)
      }
    })


  },

  



})