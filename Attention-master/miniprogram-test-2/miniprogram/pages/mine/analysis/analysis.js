// pages/mine/analysis/analysis.js

const app = getApp()

const regeneratorRuntime = require('../../../utils/regenerator/runtime-module');

Page({

  data: {
    todoNum: 0, //待完成日程数目  status:0
    doneNum: 0, //已完成日程数目  status:1
    undoneNum: 0, //未完成日程数目  status:2
    showed: false,
  },

  onLoad: async function() {
    const db = wx.cloud.database({}); //获取数据库的引用
    const table = db.collection('schedule'); //获取该集合的引用
    let openid = app.globalData.openid;
    let _this = this;
    //todoNum
    let todoNum = 0;
    await table.where({
      _openid: openid,
      status: 0
    }).count().then(res => {
      todoNum = res.total
    });
    //doneNum
    let doneNum = 0;
    await table.where({
      _openid: openid,
      status: 1
    }).count().then(res => {
      doneNum = res.total
    });
    //undoneNum
    let undoneNum = 0;
    await table.where({
      _openid: openid,
      status: 2
    }).count().then(res => {
      undoneNum = res.total
    });
    this.setData({
      todoNum: todoNum,
      doneNum: doneNum,
      undoneNum: undoneNum
    })
  },

  //我的完成情况
  show: function (){
    this.setData({
      showed: true
    });
    let context = wx.createCanvasContext('Canvas');
    let array = [this.data.todoNum, this.data.doneNum, this.data.undoneNum];
    let colors = ['#FFD700', '#B4EEB4', '#B3B3B3'];
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