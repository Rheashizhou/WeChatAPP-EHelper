// pages/home/homepage.js
import { $wuxCalendar } from '../../dist/index'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    value1:[],
    //日程项
    array: [{
      addurl:"../coin/add.png",
      date: "2019-5-11",
      content: "论文提交",
      time: "12:20",
      picture: "https://picsum.photos/750/750/?random&s=1",
      status:"1",
      important:"3",
      msg:"已办项"
    },
    {
        date: "2019-5-30",
        content: "小程序提交",
        time: "23:20",
      picture: "https://picsum.photos/750/750/?random&s=4",
        status:"0",
        important:"5",
        msg:"待办项"
      }]
  },
 
  addsche(){
    wx.navigateTo({
      url: '../uploadpicture/uploadpicturepage',
    })
  },
  deletesche(){
    wx.showModal({
      title: 'delete',
      content: 'click to delete',
    })
  },
  openCalendar() {
    $wuxCalendar().open({
      value: this.data.value1,
      onChange: (values, displayValues) => {
        console.log('onChange', values, displayValues)
        this.setData({
          value1: displayValues,
        })
      },
    })
  }
})