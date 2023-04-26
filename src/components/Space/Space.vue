<template>
  <view class="home">
    <view>
      <view class="home__icon">
        <u-icon color="#fff" size="50rpx" @click="toSearch()" name="search"></u-icon>
      </view>
      <view class="home__icon">
        <u-icon color="#fff" size="40rpx" @click="toAdd()" name="plus"></u-icon>
      </view>
      <view class="home__icon">
        <u-icon color="#fff" size="50rpx" @click="scanCode()" name="scan"></u-icon>
      </view>
    </view>
    <view v-if="showEmpty()" class="home__hello">
      <u-text size="80rpx" text="HELLO!"></u-text>
    </view>
    <view v-if="showEmpty()" class="home__empty">
      尚未添加物品,快去添加吧
      <image class="home__empty-chair" src="../../static/chair.png" />
      <image class="home__empty-plant" src="../../static/plant.png" />
    </view>
    <view v-if="floor" class="home__spaces">
      <view class="home__spaces__wrapper">
        <view
          v-for="(item, index) in useForm.spaces.slice(0, floor)"
          :key="index"
          class="home__spaces__wrapper-unit"
        >
          <view class="home__spaces__wrapper-unit-circle" />
          <view class="home__spaces__wrapper-unit-line" />
          <view class="home__spaces__wrapper-unit-name">
            {{ item }}
          </view>
        </view>
      </view>
    </view>
    <view class="home__tabs">
      <u-tabs
        itemStyle="color:#666666;padding:0; margin-right:20rpx;height: 34px;"
        :list="[{ name: '我的' }, { name: '共同管理' }]"
      />
    </view>
    <view v-for="(item, index) in useForm.allItemData[props.floor]" :key="index">
      <view
        @click="chooseItem(index)"
        @longpress="showOperate = true"
        v-if="!floor || item.parent === useForm.currentId"
        :style="bgColor(index)"
        class="home__item"
      >
        <image
          @click="toDetail(item.id, item.attribute, item.name, item.floor)"
          class="home__item-img"
          :src="item.url"
        />
        <view class="home__item-attribute">
          <u-icon size="40rpx" color="#4d94ff" :name="item.attribute ? 'grid' : 'home'" />
        </view>
        <view v-if="item.privary" class="home__item-lock">
          <u-icon size="40rpx" color="#4d94ff" name="lock"></u-icon>
        </view>
        <view class="home__item__imformation">
          <view class="home__item__imformation-name">
            {{ item.name }}
          </view>
          <view class="home__item__imformation-administrator">
            <u-icon size="40rpx" color="#4c92fb" name="account"></u-icon>
          </view>
          <view class="home__item__imformation-avatar">
            <u-avatar-group size="40rpx" :urls="item.administrator"></u-avatar-group>
          </view>
          <view class="home__item__imformation-list">
            <u-icon color="#5096fe" size="40rpx" name="list"></u-icon>
          </view>
          <view class="home__item__imformation-time">
            <u-icon size="40rpx" name="clock"></u-icon>
            <u-text margin="0 0 0 10rpx" size="30rpx" color="#979797" text="2018-8-21" />
          </view>
        </view>
        <view class="home__item__content">
          <u-avatar
            v-for="(item2, index2) in item.content"
            :key="index2"
            :src="item2"
            customStyle="margin-right:20rpx"
            size="50rpx"
          />
        </view>
      </view>
    </view>
    <view v-show="showOperate" class="home__operate">
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
const props = withDefaults(
  defineProps<{
    floor?: number
  }>(),
  {
    floor: 0
  }
)
const showOperate = ref(false)
const cancel = () => {
  showOperate.value = false
  for (let i = 0; i < checkbox.value.length; i++) {
    checkbox.value[i] = false
  }
}
const move = () => {
  console.log(1)
}
const toEdit = () => {
  uni.navigateTo({
    url: '/pages/edit/edit'
  })
}
const showEmpty = () => {
  if (!props.floor) return false
  let judge = true
  if (useForm.allItemData[props.floor])
    useForm.allItemData[props.floor].map((item: any) => {
      if (item.parent === useForm.currentId) judge = false
    })
  return judge
}
const useForm = useFormStore()
const deleteItem = () => {
  console.log(1)
}
const chooseItem = (index: number) => {
  if (showOperate.value) {
    checkbox.value[index] = !checkbox.value[index]
  }
}
const bgColor = (index: number) => {
  if (checkbox.value[index]) return 'background-color: #c8dbfe;'
}
const toDetail = (id: number, attribute: number, name: string, floor: number) => {
  if (!showOperate.value) {
    useForm.currentId = id
    useForm.currentFloor = floor
    useForm.currentName = name
    useForm.spaces[floor - 1] = name
    uni.navigateTo({
      url: `/pages/details/details?id=${id}&attribute=${attribute}&name=${name}`
    })
  }
}
const checkbox = ref<boolean[]>([])
for (let i = 0; i < useForm.allItemData[props.floor].length; i++) {
  checkbox.value[i] = false
}
onMounted(() => {
  uni.showShareMenu({
    withShareTicket: true,
    menus: ['shareAppMessage', 'shareTimeline']
  })
})
const scanCode = (): void => {
  uni.scanCode({
    success() {
      console.log(1)
    }
  })
}
const toSearch = (): void => {
  uni.navigateTo({
    url: '/pages/search/search'
  })
}
const toAdd = (): void => {
  uni.switchTab({
    url: '/pages/new/new'
  })
}
</script>

<style lang="scss">
.home {
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

  &__item {
    box-shadow: 0 5px 5px #e3ebfe;
    box-sizing: border-box;
    position: relative;
    width: 650rpx;
    margin: 0 auto;
    margin-top: 30rpx;
    border: #eeeef0 solid 2px;
    border-radius: 30rpx;
    height: 200rpx;
    padding: 25rpx;

    &-img {
      width: 150rpx;
      height: 150rpx;
      border-radius: 20rpx;
    }

    &-attribute {
      position: absolute;
      left: 35rpx;
      top: 35rpx;
      background-color: #fff;
      border-radius: 10rpx;
    }

    &-lock {
      position: absolute;
      left: 80rpx;
      top: 35rpx;
      background-color: #fff;
      border-radius: 10rpx;
    }

    &__imformation {
      position: absolute;
      right: 25rpx;
      top: 25rpx;
      width: 430rpx;
      height: 40rpx;
      display: flex;
      justify-content: flex-start;
      align-items: center;

      &-name {
        line-height: 40rpx;
        white-space: nowrap;
        overflow: hidden;
        width: 120rpx;
        text-overflow: ellipsis;
        font-weight: 1000;
        display: inline-block;
        margin-right: 10rpx;
      }

      &-administrator {
        display: inline-block;
        background-color: #d8d7db;
        border-radius: 10rpx;
        margin-right: 10rpx;
      }

      &-avatar {
        display: inline-block;
      }

      &-list {
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 10rpx;
        width: 50rpx;
        height: 50rpx;
        background-color: #f2f2f2;
        position: absolute;
        right: 30rpx;
        top: -5rpx;
      }

      &-time {
        position: absolute;
        left: 10rpx;
        top: 50rpx;
        display: flex;
        align-items: center;
      }
    }

    &__content {
      width: 400rpx;
      overflow: hidden;
      display: inline-flex;
      margin-left: 20rpx;
      justify-content: flex-start;
    }
  }
}
</style>
