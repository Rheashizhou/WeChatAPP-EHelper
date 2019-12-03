// pages/mine/lists/list_undone.js

const app = getApp()

Page({

  data: {
    sche_list: []
  },

  onLoad: function(options) {
    const db = wx.cloud.database({}); //获取数据库的引用
    const table = db.collection('schedule'); //获取该集合的引用
    let openid = app.globalData.openid;
    let _this = this;
    table.where({
      _openid: openid,
      status: 2
    }).orderBy('due', 'desc').get({ //时间越大越靠前
      success: res => {
        for (let i = 0; i < res.data.length; i++) {
          res.data[i].due = res.data[i].due.toLocaleDateString() + '  ' + res.data[i].due.toLocaleTimeString();
        }
        this.setData({
          sche_list: res.data
        })
      }
    });
  },

})