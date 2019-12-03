// pages/mine/highest/highest.js

const app = getApp()

Page({

  data: {
    highestNum: 10, //重要性高的日程数目  priority:2
    higherNum: 10, //重要性中等的日程数目  priority:1
    highNum: 10, //重要性低的日程数目  priority:0
  },

  onLoad: async function () {
    const db = wx.cloud.database({}); //获取数据库的引用
    const table = db.collection('schedule'); //获取该集合的引用
    let openid = app.globalData.openid;
    let _this = this;
    //highestNum
    let highestNum = 0;
    await table.where({
      _openid: openid,
      priority: 2
    }).count().then(res => {
      highestNum = res.total
    });
    //higherNum
    let higherNum = 0;
    await table.where({
      _openid: openid,
      priority: 1
    }).count().then(res => {
      higherNum = res.total
    });
    //highNum
    let highNum = 0;
    await table.where({
      _openid: openid,
      priority: 0
    }).count().then(res => {
      highNum = res.total
    });
    this.setData({
      highestNum: highestNum,
      higherNum: higherNum,
      highNum: highNum
    })
  },

  //我的完成情况
  show: function () {
    this.setData({
      showed: true
    });
    let context = wx.createCanvasContext('Canvas');
    let array = [this.data.highestNum, this.data.higherNum, this.data.highNum];
    let colors = ['#CD3700', '#CD9B9B', '#B3B3B3'];
    let total = 0;
    for (let val = 0; val < array.length; val++) {
      total += array[val];
    }
    let point = { x: 160, y: 120 };
    let radius = 100;
    for (let i = 0; i < array.length; i++) {
      context.beginPath();
      let start = 0;
      if (i > 0) {
        for (let j = 0; j < i; j++) {
          start += array[j] / total * 2 * Math.PI;
        }
      }
      context.arc(point.x, point.y, radius, start, start + array[i] / total * 2 * Math.PI, false);
      context.setLineWidth(2)
      context.lineTo(point.x, point.y);
      context.setStrokeStyle('#F5F5F5');
      context.setFillStyle(colors[i]);
      context.fill();
      context.closePath();
      context.stroke();
    }
    context.draw();
  },


})