<template>
  <template>
    <u-skeleton rows="16" :loading="isLoading" title animate class="message-list">
      <view v-if="!isLoading">
        <!-- 总列表 -->
        <template v-if="!isEmpty">
          <view v-for="(item, index) in currentMessageList.messageList" :key="index">
            <MessageItem :message-data="item" @onClick="chooseMessage(index)" />
          </view>
        </template>

        <!-- 消息为空 -->
        <!-- <view class="message-list__empty" v-if="isEmpty">
          <view class="message-list__empty__text">暂无消息</view>
          <u-image
            src="/static/isEmpty.png"
            mode="aspectFit"
            width="200px"
            height="200px"
          ></u-image>
        </view> -->
        <Empty v-if="isEmpty" />
      </view>
    </u-skeleton>
  </template>
</template>

<script setup lang="ts">
import { useMessageStore } from '@/stores/message'
import { storeToRefs } from 'pinia'
import { ref } from 'vue'

const searchStore = useMessageStore()
const { currentMessageList } = storeToRefs(searchStore)
const { fetchNewMessageList } = searchStore

// 是否正在加载
const isLoading = ref(false)
// 手动控制禁用加载
const manualDisable = ref(false)
// 是否为空
const isEmpty = ref(false)

// 是否正在加载更多消息
const isLoadingMore = ref(false)

// 点击消息进入聊天界面
const chooseMessage = (index: number) => {
  // uni.navigateTo({
  //   url: `/pages/message/chatbox/chatbox?index=${index}`
  // })
  console.log('系统通知')
}
</script>

<style lang="scss">
.message-list {
  &__empty {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding-top: 2300rpx;
    letter-spacing: 2rpx;
    color: $uni-text-color-grey;

    &__text {
      font-weight: bold;
      font-size: 18px;
    }
  }
}
</style>
