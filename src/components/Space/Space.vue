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
    <view v-if="!spaceData" class="space__hello">
      <u-text size="80rpx" text="HELLO!"></u-text>
    </view>
    <view v-if="!spaceData" class="space__empty">
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
    <view v-for="(item, index) in spaceData" :key="index">
      <SpaceItem
        :bgColor="bgColor(index)"
        @click="chooseItem(index)"
        @longpress="showOperate = true"
        :item="item"
        :show="showOperate"
      />
    </view>
    <view v-show="showOperate" class="space__operate">
      <view>
        <u-icon @click="toEdit" size="50rpx" name="edit-pen-fill" color="#3988ff"></u-icon>
        <u-text size="25rpx" color="#88898c" align="center" text="编辑" :bold="true" />
      </view>
      <view>
        <u-icon
          @click="showSpace = true"
          size="50rpx"
          name="rewind-right-fill"
          color="#3988ff"
        ></u-icon>
        <u-text size="25rpx" color="#88898c" align="center" text="移动" :bold="true" />
      </view>
      <view>
        <u-icon @click="deleteItem" size="50rpx" name="trash" color="#898a8d"></u-icon>
        <u-text size="25rpx" color="#88898c" align="center" text="删除" :bold="true" />
      </view>
      <view>
        <u-icon @click="cancel" size="50rpx" name="close" color="#898a8d"></u-icon>
        <u-text size="25rpx" color="#88898c" align="center" text="取消" :bold="true" />
      </view>
    </view>
    <u-modal
      @cancel="showDelete = false"
      @confirm="comfirmDelete"
      :showCancelButton="true"
      :show="showDelete"
      width="600rpx"
    >
      确认删除?
    </u-modal>
    <u-popup :safeAreaInsetBottom="false" round="20rpx" mode="bottom" :show="showSpace">
      <view class="space__subordinateSpace">
        <view class="space__subordinateSpace__title">
          <u-text bold size="40rpx" :text="'从属空间'" />
        </view>
        <view class="space__subordinateSpace__confirm">
          <u-text @click="showSpace = false" lines="1" size="20rpx" :text="'取消'" />
          <u-line margin="15rpx 20rpx" color="#efeff2" length="50%" direction="col"></u-line>
          <u-text @click="confirmMove()" color="#82b4fe" lines="1" size="20rpx" :text="'确认'" />
        </view>
      </view>
      <view class="space__subordinateSpace__currentSpace">
        <view class="space__subordinateSpace__currentSpace__icon">
          <u-icon size="27rpx" name="play-right-fill" color="#3988ff"></u-icon>
        </view>
        <text
          style="font-weight: 600"
          v-for="(item, index) in useForm.spaces.slice(0, 10)"
          :key="index"
        >
          {{ item }}
          <text v-if="index !== 9"> >&nbsp; </text>
        </text>
      </view>
      <view class="space__subordinateSpace__floor">
        <SubordinateSpaceItem
          :titlePadding="'10rpx 40rpx'"
          :tagPadding="'0 70rpx'"
          v-show="currentFloor >= index"
          @radioClick="radioClick"
          :parent="parentBox[index]"
          :id="spacesBox[index]"
          v-for="(item, index) in useForm.itemData.subordinateSpace"
          :subordinateSpaces="item"
          :key="index"
          :floor="index + 1"
        />
      </view>
    </u-popup>
  </view>
</template>

<script setup lang="ts">
import { useFormStore } from '@/stores/form'
import { useSpaceStore } from '@/stores/space'
import { ref, onMounted } from 'vue'
import SpaceItem from '@/components/Space/SpaceItem/SpaceItem.vue'
import SubordinateSpaceItem from '@/components/Space/SubordinateSpaceItem/SubordinateSpaceItem.vue'
import { storeToRefs } from 'pinia'
const space = useSpaceStore()
const { fetchAllRooms, fetchRoomItems } = space
const { spaceInfo } = storeToRefs(space)
const spaceData = ref()

if (!useFormStore().currentFloor) {
  ;(async () => {
    await fetchAllRooms()
    spaceData.value = spaceInfo.value.spaceData
  })()
} else {
  ;(async () => {
    await fetchRoomItems(useFormStore().currentId)
    spaceData.value = spaceInfo.value.spaceData
  })()
}

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
const showSpace = ref(false)
//是否显示操作菜单
const showOperate = ref(false)
//是否显示删除弹窗
const showDelete = ref(false)
//关闭操作菜单的回调
const cancel = (): void => {
  showOperate.value = false
  for (let i = 0; i < checkbox.value.length; i++) {
    checkbox.value[i] = false
  }
}
const confirmMove = (): void => {
  showSpace.value = false
}
//选择从属空间的id
const spacesBox = ref<number[]>([1, 4, 0])
//当前每一层空间的父空间id
const parentBox = ref<number[]>([0, 1, 4])
//当前层数
const currentFloor = ref<number>(2)
//从属空间标签点击事件
const radioClick = (id: number, floor: number): void => {
  //点击已选择标签
  if (spacesBox.value[floor - 1] === id) {
    //修改当前楼层
    currentFloor.value = floor - 1
    //清空当前点击索引之后的已选择空间id缓存
    for (let i = floor - 1; i < spacesBox.value.length; i++) {
      if (!spacesBox.value[i]) break
      spacesBox.value[i] = 0
    }
  }
  //点击未选择标签
  else {
    //修改当前楼层
    currentFloor.value = floor
    //将当前id存入已选择id缓存中
    spacesBox.value[floor - 1] = id
    //清空当前点击索引之后的已选择空间id缓存
    for (let i = floor; i < spacesBox.value.length; i++) {
      if (!spacesBox.value[i]) break
      spacesBox.value[i] = 0
    }
    parentBox.value[floor] = id
  }
}
//跳转至编辑页
const toEdit = (): void => {
  //是否可以进行多选编辑操作
  let multiple = true
  //选择数目
  let mount = 0
  //第一个选择物品属性
  let firstAttribute = 0
  let index = 0
  for (const item of checkbox.value) {
    if (item) {
      if (!mount) firstAttribute = useForm.allItemData[props.floor][index].type
      mount++
      if (mount > 1 && (!firstAttribute || !useForm.allItemData[props.floor][index].type)) {
        uni.showToast({
          title: '只能对物品进行多选编辑操作',
          icon: 'none'
        })
        multiple = false
        return
      }
      useForm.IDbox = []
      useForm.IDbox.push(useForm.allItemData[props.floor][index].id)
    }
    index++
  }
  if (multiple && mount > 1)
    uni.navigateTo({
      url: '/pages/edit/multiple/multiple'
    })
  else if (mount === 1) {
    uni.navigateTo({
      url: '/pages/edit/edit'
    })
  }
}
const useForm = useFormStore()
//删除触发的回调
const deleteItem = (): void => {
  showDelete.value = true
}
//确认删除
const comfirmDelete = (): void => {
  showDelete.value = false
}
//选择物品或空间触发的回调
const chooseItem = (index: number): void => {
  if (showOperate.value) checkbox.value[index] = !checkbox.value[index]
}
//修改背景颜色
const bgColor = (index: number): string | undefined => {
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
  uni.navigateTo({
    url: '/pages/new/new'
  })
}
</script>

<style lang="scss">
.space {
  padding-top: 100px;
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

  &__subordinateSpace {
    padding: 30rpx;
    padding-bottom: 0;
    display: flex;
    flex-wrap: wrap;

    &__title {
      width: 550rpx;
    }

    &__confirm {
      width: 140rpx;
      display: flex;
    }

    &__currentSpace {
      padding: 10rpx 30rpx;
      display: flex;
      flex-wrap: wrap;

      &__icon {
        margin-top: 9rpx;
        margin-right: 10rpx;
      }
    }

    &__floor {
      max-height: 190px;
      overflow-y: auto;
    }
  }
}
</style>
