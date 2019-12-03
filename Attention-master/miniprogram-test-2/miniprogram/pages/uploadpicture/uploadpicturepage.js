// pages/uploadpicture/uploadpicturepage.js
import { $wuxCalendar } from '../../dist/index'

Page({
  data: {

    value1: [],
    //表单数据
    title:"",
    time:"",
    position:"",
    conent:"",
    important:"",
    active:"",
    fileList: [{
      //添加上传文件 此时为默认
      uid: 0,
      status: 'uploading',
      url: 'https://wux.cdn.cloverstd.com/qrcode.jpg',
    },
  
    ],
  },
  onChange(e) {
    console.log('onChange', e)
    const { file } = e.detail
    
      this.setData({
        imageUrl: file.url,
      })
    
  },
  onSuccess(e) {
    console.log('onSuccess', e)
  },
  onFail(e) {
    console.log('onFail', e)
  },
  onComplete(e) {
    console.log('onComplete', e)
    wx.hideLoading()
  },
  
  onPreview(e) {
    console.log('onPreview', e)
    const { file, fileList } = e.detail
    wx.previewImage({
      current: file.url,
      urls: fileList.map((n) => n.url),
    })
  },
  onRemove(e) {
    const { file, fileList } = e.detail
    wx.showModal({
      content: '确定删除？',
      success: (res) => {
        if (res.confirm) {
          this.setData({
            fileList: fileList.filter((n) => n.uid !== file.uid),
          })
        }
      },
    })
  }, 
  onSave(e) {
    wx.showModal({
      content: "click to save",
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
