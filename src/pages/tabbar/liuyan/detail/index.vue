<template>
  <view class="liuyan-detail-c">
    <view class="ctr content-c">{{ data.text }}</view>
    <view class="ctr image-c">
      <image
        @tap="handlePreview(item)"
        class="image"
        mode="aspectFill"
        v-for="item in data.imgs"
        :src="item"
      />
    </view>
    <view class="ctr action-bar" @tap="showPinglun = true">
      <svg-icon
        class="icon"
        color="#333"
        width="16"
        height="16"
        :data="require('@icons/icon-message.svg')"
      ></svg-icon>
      <view class="text">写评论</view>
    </view>
    <view class="ctr text-area" v-if="showPinglun">
      <view class="input-boder">
        <input class="input" v-model="pinglunBody.text" type="text" placeholder="请输入评论内容" />
        <nut-button size="small" @tap="addPinglun" type="primary">确定</nut-button>
      </view>
    </view>
    <view class="pinglun-content">
      <view class="content" v-if="list.length" v-for="(item) in list" :key="item.id">
        <view class="text webline-2">{{ item.body.text }}</view>
        <view class="time">{{ item.ctime }}</view>
      </view>
      <view class="empty">暂无评论</view>
    </view>
  </view>
</template>

<script lang='ts'>
import { Current, previewImage, showToast } from '@tarojs/taro'
import { defineComponent, reactive, ref } from 'vue'
import * as LiuyanService from '@/service/LiuyanService'
export default defineComponent({
  name: 'LiuyanDetail',
  setup() {
    const showPinglun = ref(false)
    const data = reactive({
      text: '我是留言呀老师教萨拉副科级阿什拉夫;加了;分几块拉风卡乐芙;阿伏伽德罗;暗示分离;按数据库到拉萨;九分裤;飒飒;艾弗森;家发牢骚;咖啡;安抚;就伏拉夫;反垃圾;链接啊了;是否;',
      imgs: [
        'http://m.360buyimg.com/mobilecms/s750x366_jfs/t1/18629/34/3378/144318/5c263f64Ef0e2bff0/0d650e0aa2e852ee.jpg',
      ]
    })
    const pinglunBody = reactive({
      text: ''
    })
    const list: any = reactive([])
    function handlePreview(item) {
      previewImage({
        current: item, // 当前显示图片的http链接
        urls: data.imgs // 需要预览的图片http链接列表
      })
    }
    const id: any = Current.page?.options?.id
    function getData() {
      if (id) {
        LiuyanService.getMessage({
          id,
        }).then(res => {
          if (res.code == 200) {
            Object.assign(data, JSON.parse(res.data.body))
          }
        })
        LiuyanService.getMessageList({
          pageUtil: {
            page: 1,
            limit: 100
          },
          data: {
            tid: id
          }
        }).then(res => {
          list.push(...(res.data.data || []))
        })
      }
    }
    function addPinglun() {
      LiuyanService.addMessage({
        tid: id,
        body: JSON.stringify(pinglunBody),
        status: 1
      }).then(res => {
        if (res.code === 200) {
          showToast({ title: '发表成功' })
          pinglunBody.text = ''
          showPinglun.value = false
          LiuyanService.getMessageList({
            pageUtil: {
              page: 1,
              limit: 100
            },
            data: {
              tid: id
            }
          }).then(res => {
            list.length = 0
            list.push(...(res.data.data || []))
          })
        }
      })
    }
    getData()
    return {
      data,
      showPinglun,
      handlePreview,
      addPinglun,
      pinglunBody,
      list
    }
  }
})
</script>
<style lang='less'>
.liuyan-detail-c {
  .content-c {
    background-color: #fff;
    padding: 20px 14px;
    font-size: 15px;
    text-align: justify;
  }
  .ctr {
    border-bottom: 0.5px solid #f2f2f2;
  }
  .image-c {
    background-color: #fff;
    padding: 10px 14px;
    display: grid;
    row-gap: 10px;
    justify-content: space-between;
    grid-template-columns: repeat(auto-fill, 110px);

    .image {
      width: 110px;
      height: 110px;
    }
  }
  .action-bar {
    text-align: right;
    background-color: #fff;
    padding: 5px 14px;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    .icon {
      margin-right: 5px;
    }
    .text {
      font-size: 12px;
    }
  }
  .text-area {
    background-color: #fff;
    padding: 10px 10px;
    .input-boder {
      border-radius: 25px;
      padding: 4px;
      border: 1px solid @main-color;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .input {
        flex: 1;
        font-size: 14px;
        padding-left: 10px;
      }
    }
  }
  .pinglun-content {
    margin-top: 10px;
    .content {
      background-color: #fff;
      border-bottom: 0.5px solid #f2f2f2;
      padding: 5px 14px;
      .text {
        font-size: 14px;
        color: #888;
      }
      .time {
        font-size: 13px;
        color: #888;
        text-align: right;
      }
    }
  }
}
</style>