// pages/mine/mine.js

const app = getApp();

Page({

  data: {
    username: '',
    avatarUrl: '/images/user_unlogin.png',
    logged: false,
    openid: ''
  },

  onLoad: function (options) {
    //从本地存储中读取
    let username = wx.getStorageSync('username');
    let avatarUrl = wx.getStorageSync('avatarUrl');
    let openid = wx.getStorageSync('openid');
    if (username) {
      this.setData({
        username: username,
        avatarUrl: avatarUrl,
        logged: true,
        openid: openid
      })
      app.globalData.openid = openid
    }
  },

  onGetUserInfo: function (e) {
    console.log(e);
    let d = e.detail.userInfo;
    this.setData({
      username: d.nickName,
      avatarUrl: d.avatarUrl,
      logged: true
    })
    //存入本地存储区，保持登录状态
    wx.setStorageSync('username', d.nickName)
    wx.setStorageSync('avatarUrl', d.avatarUrl)

    // 调用云函数
    wx.cloud.callFunction({
      name: 'login',
      data: {},
      success: res => {
        console.log('[云函数] [login] user openid: ', res.result.openid)
        app.globalData.openid = res.result.openid
        this.setData({
          openid: res.result.openid
        })
        //存入本地存储区，保持登录状态
        wx.setStorageSync('openid', res.result.openid)
      },
      fail: err => {
        console.error('[云函数] [login] 调用失败', err)
      }
    })
  },


  //我的日程分布
  showHighest: function () {
    wx.navigateTo({
      url: 'highest/highest',
    })
  },
  //我的完成情况
  showAnalysis: function () {
    wx.navigateTo({
      url: 'analysis/analysis',
    })
  },
  //待完成日程
  showListTodo: function () {
    wx.navigateTo({
      url: 'lists/list_todo',
    })
  },
  //已完成日程
  showListDone: function () {
    wx.navigateTo({
      url: 'lists/list_done',
    })
  },
  //未完成日程
  showListUndone: function () {
    wx.navigateTo({
      url: 'lists/list_undone',
    })
  },
  //关于
  showInfo: function () {
    wx.showModal({
      title: 'EasierHelper',
      content: '希望这是大家生活中的小惊喜。',
      showCancel: false
    })
  },


})