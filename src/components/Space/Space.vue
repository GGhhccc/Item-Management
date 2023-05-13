<template>
  <view class="space">
    <view>
      <view class="space__icon">
        <u-icon color="#fff" size="50rpx" @click="toSearch()" name="search"></u-icon>
      </view>
      <view class="space__icon">
        <u-icon color="#fff" size="40rpx" @click="toAdd()" name="plus"></u-icon>
      </view>
      <view class="space__icon">
        <u-icon color="#fff" size="50rpx" @click="scanCode()" name="scan"></u-icon>
      </view>
    </view>
    <view v-if="showEmpty()" class="space__hello">
      <u-text size="80rpx" text="HELLO!"></u-text>
    </view>
    <view v-if="showEmpty()" class="space__empty">
      尚未添加物品,快去添加吧
      <image class="space__empty-chair" src="../../static/chair.png" />
      <image class="space__empty-plant" src="../../static/plant.png" />
    </view>
    <view v-if="floor" class="space__spaces">
      <view class="space__spaces__wrapper">
        <view
          v-for="(item, index) in useForm.spaces.slice(0, floor)"
          :key="index"
          class="space__spaces__wrapper-unit"
        >
          <view class="space__spaces__wrapper-unit-circle" />
          <view class="space__spaces__wrapper-unit-line" />
          <view class="space__spaces__wrapper-unit-name">
            {{ item }}
          </view>
        </view>
      </view>
    </view>
    <view class="space__tabs">
      <u-tabs
        itemStyle="color:#666666;padding:0; margin-right:20rpx;height: 34px;"
        :list="[{ name: '我的' }, { name: '共同管理' }]"
      />
    </view>
    <view v-for="(item, index) in useForm.allItemData[props.floor]" :key="index">
      <SpaceItem
        :bgColor="bgColor(index)"
        v-if="!floor || item.parent === id"
        @click="chooseItem(index)"
        @longpress="showOperate = true"
        :item="item"
        :show="showOperate"
      />
    </view>
    <view v-show="showOperate" class="space__operate">
      <view>
        <u-icon @click="toEdit" size="60rpx" name="edit-pen-fill" color="#3988ff"></u-icon>
        <u-text size="30rpx" color="#88898c" align="center" text="编辑" :bold="true" />
      </view>
      <view>
        <u-icon @click="move" size="60rpx" name="rewind-right-fill" color="#3988ff"></u-icon>
        <u-text size="30rpx" color="#88898c" align="center" text="移动" :bold="true" />
      </view>
      <view>
        <u-icon @click="deleteItem" size="60rpx" name="trash" color="#898a8d"></u-icon>
        <u-text size="30rpx" color="#88898c" align="center" text="删除" :bold="true" />
      </view>
      <view>
        <u-icon @click="cancel" size="60rpx" name="close" color="#898a8d"></u-icon>
        <u-text size="30rpx" color="#88898c" align="center" text="取消" :bold="true" />
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { useFormStore } from '@/stores/form'
import { ref, onMounted } from 'vue'
import SpaceItem from '@/components/Space/SpaceItem/SpaceItem.vue'
onMounted(() => {
  //开启分享功能
  uni.showShareMenu({
    withShareTicket: true,
    menus: ['shareAppMessage', 'shareTimeline']
  })
})
const props = withDefaults(
  defineProps<{
    //层数
    floor?: number
  }>(),
  {
    floor: 0
  }
)
//是否显示操作菜单
const showOperate = ref(false)
//关闭操作菜单的回调
const cancel = () => {
  showOperate.value = false
  for (let i = 0; i < checkbox.value.length; i++) {
    checkbox.value[i] = false
  }
}
//移动到事件
const move = () => {
  console.log(1)
}
//跳转至编辑页
const toEdit = () => {
  uni.navigateTo({
    url: '/pages/edit/edit'
  })
}
const useForm = useFormStore()
//当前id
const id = useForm.currentId
//是否显示无物提示
const showEmpty = () => {
  if (!props.floor) return false
  let judge = true
  if (useForm.allItemData[props.floor])
    useForm.allItemData[props.floor].map((item: any) => {
      if (item.parent === id) judge = false
    })
  return judge
}
//删除触发的回调
const deleteItem = () => {
  console.log(1)
}
//选择物品或空间触发的回调
const chooseItem = (index: number) => {
  if (showOperate.value) {
    checkbox.value[index] = !checkbox.value[index]
  }
}
//修改背景颜色
const bgColor = (index: number) => {
  if (checkbox.value[index]) return 'background-color: #c8dbfe;'
}
//是否选择的数组
const checkbox = ref<boolean[]>([])
//初始化是否选择的数组
if (useForm.allItemData[props.floor])
  for (let i = 0; i < useForm.allItemData[props.floor].length; i++) {
    checkbox.value[i] = false
  }
//扫码
const scanCode = (): void => {
  uni.scanCode({
    success() {
      console.log(1)
    }
  })
}
//跳转搜索页
const toSearch = (): void => {
  uni.navigateTo({
    url: '/pages/search/search'
  })
}
//跳转添加页
const toAdd = (): void => {
  uni.switchTab({
    url: '/pages/new/new'
  })
}
</script>

<style lang="scss">
.space {
  padding-top: 150rpx;
  height: calc(100vh - 150rpx);
  overflow: auto;
  background: linear-gradient(
    to top left,
    #dfecff 0%,
    #f0f4fe 10%,
    #f3f3fd 20%,
    #f4f4fe 30%,
    #f5f5fe 40%,
    #fefefe 50%,
    #fff 60%,
    #fbfcff 70%,
    #eff6ff 80%,
    #e6f0ff 90%,
    #dceaff 100%
  );

  &__icon {
    float: right;
    width: 70rpx;
    height: 70rpx;
    border-radius: 10rpx;
    background-color: #7d7191;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-right: 20rpx;
  }

  &__hello {
    width: 600rpx;
    margin: 0 auto;
    margin-top: 100rpx;
  }

  &__operate {
    box-sizing: border-box;
    display: flex;
    position: fixed;
    bottom: 0;
    left: 0;
    width: 750rpx;
    height: 200rpx;
    padding: 0 50rpx 0 50rpx;
    justify-content: space-around;
  }

  &__empty {
    box-sizing: border-box;
    padding: 35rpx;
    font-size: 30rpx;
    color: #979797;
    background-color: #bcd8ff;
    position: relative;
    margin: 0 auto;
    width: 650rpx;
    height: 200rpx;
    border-radius: 30rpx;

    &-chair {
      width: 250rpx;
      height: 250rpx;
      position: absolute;
      right: 50rpx;
      bottom: 0;
    }

    &-plant {
      width: 100rpx;
      height: 100rpx;
      position: absolute;
      bottom: 0;
      right: 0;
    }
  }

  &__spaces {
    background-color: #5a5c60;
    width: 600rpx;
    height: 5rpx;
    margin: 100rpx auto;
    position: relative;

    &__wrapper {
      position: absolute;
      top: -8rpx;
      left: -40rpx;
      display: flex;
      justify-content: flex-start;

      &-unit {
        width: 100rpx;
        margin-right: 22rpx;

        &-circle {
          background-color: #979797;
          width: 20rpx;
          height: 20rpx;
          margin: 0 auto;
          border-radius: 10rpx;
        }

        &-line {
          width: 5rpx;
          background-color: #b8babe;
          height: 35rpx;
          margin: 0 auto;
        }

        &-name {
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          text-align: center;
          line-height: 50rpx;
          width: 100rpx;
          height: 50rpx;
          font-size: 25rpx;
          border-radius: 10rpx;
          background-color: #fcfcfc;
          color: #565656;
          box-shadow: 0 5px 5px #e1e7f0;
          font-weight: 800;
        }
      }
    }
  }

  &__tabs {
    padding-top: 80rpx;
    width: 650rpx;
    margin: 0 auto;
  }
}
</style>
