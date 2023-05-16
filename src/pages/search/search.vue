<template>
  <view class="search" :style="{ paddingTop: navBarHeight + 'px' }">
    <u-navbar title="搜索" autoBack></u-navbar>

    <SearchInput :search-list-data="currentSearchList.searchList" @reset-input="resetInput" />

    <view class="search__screen" @click="openPopup">
      <view class="iconfont search__screen__icon">&#xe609;</view>
      <view>筛选</view>
    </view>

    <u-popup
      :show="showPopup"
      mode="bottom"
      :round="10"
      overlayOpacity="0.6"
      @close="closePopupEvent"
    >
      <view class="search__popup">
        <view class="search__popup__head-title">
          <span>筛选</span>
        </view>
        <view class="search__popup__title">
          <view
            @click="selectItem(0)"
            :class="showControl.showProperties ? 'search__popup__title--active' : ''"
          >
            <span>属性</span>
          </view>
          <view
            @click="selectItem(1)"
            :class="showControl.showTags ? 'search__popup__title--active' : ''"
          >
            <span>标签</span>
          </view>
          <view
            @click="selectItem(2)"
            :class="showControl.showPrice ? 'search__popup__title--active' : ''"
          >
            <span>金额</span>
          </view>
          <view
            @click="selectItem(3)"
            :class="showControl.showDate ? 'search__popup__title--active' : ''"
          >
            <span>入库日期</span>
          </view>
        </view>
        <view class="search__popup__properties" v-if="showControl.showProperties">
          <view class="search__popup__properties__list">
            <SortButton
              title="物品"
              width="200"
              marginBottom="18"
              :is-active="isItemSelected"
              @on-click="sortByProperties(0)"
            />
            <SortButton
              title="空间"
              width="200"
              :is-active="isSpaceSelected"
              @on-click="sortByProperties(1)"
            />
          </view>
        </view>

        <view class="search__popup__tags" v-if="showControl.showTags">
          <view class="search__popup__tags__list">
            <view
              class="search__popup__tags__list__item"
              v-for="(item, index) in currentSearchList.tagsList"
              :key="index"
            >
              <SortButton
                width="100%"
                :title="item.tag"
                :is-active="item.checked"
                @on-click="selectTag(index)"
              />
            </view>
          </view>
        </view>

        <u-form v-if="showControl.showPrice" :rules="rules" :model="priceRange" ref="priceForm">
          <u-form-item prop="lowPrice">
            <u-input
              v-model="priceRange.lowPrice"
              placeholder="自定最低价"
              custom-style="
                width: 130px;
                height: 30px;
              "
            ></u-input>
          </u-form-item>
          <u-form-item>
            <u-line color="#cecece" length="16px" margin="18px 10px"></u-line>
          </u-form-item>
          <u-form-item prop="highPrice">
            <u-input
              v-model="priceRange.highPrice"
              placeholder="自定最高价"
              custom-style="
                width: 130px;
                height: 30px;
              "
            ></u-input>
          </u-form-item>
        </u-form>

        <view class="search__popup__date" v-if="showControl.showDate">
          <view>
            <SortButton
              title="按最近入库日期显示"
              width="230"
              marginBottom="18"
              :is-active="sortInReverseTime"
              @on-click="selectDate(0)"
            />
            <SortButton
              title="按最远入库日期显示"
              width="230"
              :is-active="sortInTime"
              @on-click="selectDate(1)"
            />
          </view>
        </view>

        <view class="search__popup__submit">
          <view class="search__popup__submit__content">
            <u-button
              text="取消"
              custom-style="
								width: '140px',
								height: '40px',
								border: none;
								border-radius: 30px 0 0 30px;
								background-color: #d9d9d9;
								color: #fff;
							"
              @click="cancelScreen"
            ></u-button>
            <u-button
              text="确认"
              custom-style="
								width: '140px',
								height: '40px',
								border: none;
								border-radius: 0 30px 30px 0;
								background-color: #3988ff;
								color: #fff;
							"
              :loading="isSubmitting"
              loadingText=" 提交中"
              @click="submitScreen"
            ></u-button>
          </view>
        </view>
      </view>
    </u-popup>

    <view class="search__list">
      <SearchList />
    </view>
  </view>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  options: { styleIsolation: 'shared' }
})
</script>

<script setup lang="ts">
import { onShow } from '@dcloudio/uni-app'
import { ref, reactive } from 'vue'
import { useSearchStore } from '@/stores/search'
import { storeToRefs } from 'pinia'
import type { ShowControl } from '@/types/search'

const searchStore = useSearchStore()
const { currentSearchList } = storeToRefs(searchStore)
const { setTagsList, fetchScreenSearchList } = searchStore

const showPopup = ref(false)
const priceForm = ref()
const isSubmitting = ref(false)

// 筛选标题是否选择
const showControl = reactive<ShowControl>({
  showProperties: true,
  showPrice: false,
  showTags: false,
  showDate: false
})

const resetShowControl = () => {
  showControl.showProperties = false
  showControl.showPrice = false
  showControl.showTags = false
  showControl.showDate = false
}

const selectItem = (index: number) => {
  // navIndex.value = index
  // showTitle.value = titleList.value[index]
  switch (index) {
    case 0:
      resetShowControl()
      showControl.showProperties = !showControl.showProperties
      break
    case 1:
      resetShowControl()
      showControl.showTags = !showControl.showTags
      break
    case 2:
      resetShowControl()
      showControl.showPrice = !showControl.showPrice
      break
    case 3:
      resetShowControl()
      showControl.showDate = !showControl.showDate
      break
    default:
      resetShowControl()
  }
}

// 筛选属性
const isItemSelected = ref(false)
const isSpaceSelected = ref(false)
const sortByProperties = (index: number) => {
  if (index) {
    isSpaceSelected.value = !isSpaceSelected.value
    isItemSelected.value = false
  } else {
    isItemSelected.value = !isItemSelected.value
    isSpaceSelected.value = false
  }
}

// 筛选标签
const selectTag = (index: number) => {
  currentSearchList.value.tagsList[index].checked = !currentSearchList.value.tagsList[index].checked
}

// 筛选金额
const priceRange = reactive({
  lowPrice: '',
  highPrice: ''
})

const rules = {
  lowPrice: [
    {
      pattern: /^[0-9]*$/g,
      message: '请输入数字',
      trigger: ['change', 'blur']
    }
  ],
  highPrice: [
    {
      pattern: /^[0-9]*$/g,
      message: '请输入数字',
      trigger: ['change', 'blur']
    }
  ]
}

// 筛选入库日期
const sortInTime = ref(false)
const sortInReverseTime = ref(false)
const selectDate = (index: number) => {
  if (index) {
    sortInTime.value = !sortInTime.value
    sortInReverseTime.value = false
  } else {
    sortInReverseTime.value = !sortInReverseTime.value
    sortInTime.value = false
  }
}

const resetInput = () => {
  // isSearch.value = false
}

const navBarHeight = ref<number>(44)
// 获取小程序胶囊按钮
const getCapsule = () => {
  const menuButton = uni.getMenuButtonBoundingClientRect()
  navBarHeight.value = menuButton.bottom + 16
}

const closePopupEvent = () => {
  showPopup.value = false
  currentSearchList.value.searchList = uni.getStorageSync('searchList')
}

const openPopup = () => {
  showPopup.value = !showPopup.value
}

const cancelScreen = () => {
  closePopupEvent()
}

const submitScreen = () => {
  priceForm.value
    .validate()
    .then(async () => {
      try {
        isSubmitting.value = true
        await fetchScreenSearchList()
        uni.showToast({
          title: '筛选成功',
          icon: 'none'
        })
        isSubmitting.value = false
        closePopupEvent()
      } catch {}
    })
    .catch(() => {
      uni.showToast({
        title: '请输入正确的金额',
        icon: 'none'
      })
    })
}

// 点击排序
// let isClickSort = ref(false)
// let sortResult = ref<any>([])
// const sortByItem = (index: number) => {
// 	sortResult.value = currentSearchList.value.searchList.filter((value: any) => {
// 		return value.properties === 1
// 	})
// 	isClickSort.value = true
// }

onShow(() => {
  getCapsule()
  setTagsList(currentSearchList.value.tagsList)
})
</script>

<style lang="scss" scoped>
.search {
  // background: linear-gradient(
  //     167.84deg,
  //     rgba(155, 195, 255, 0.35) 0%,
  //     rgba(255, 255, 255, 0.44) 38.02%,
  //     rgba(255, 255, 255, 0.31) 41.67%,
  //     rgba(161, 159, 241, 0.12) 72.92%,
  //     rgba(57, 136, 255, 0.08) 100%
  //   ),
  //   #fff;

  &__screen {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 90px;
    height: 30px;
    background-color: #f8f9fd;
    border-radius: 15px;
    font-size: 14px;
    margin-bottom: 15px;
    margin-left: 8%;

    &__icon {
      font-size: 22px;
    }
  }

  &__popup {
    padding: 20px;

    &__head-title {
      display: flex;
      justify-content: center;
      font-size: 22px;
      font-weight: bold;
    }

    &__title {
      display: flex;
      justify-content: space-between;
      padding: 30px 18px 18px 18px;

      &--active {
        transform: scale(1.2);
        font-weight: bold;
      }
    }

    &__properties {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 140px;

      &__list {
        gap: 1px;
      }
    }

    &__tags {
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 0 14px;
      height: 140px;

      &__list {
        display: flex;
        flex-wrap: wrap;
        width: 100%;
        gap: 10px;

        &__item {
          width: 30%;
        }
      }
    }

    &__date {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 140px;
    }

    &__submit {
      display: flex;
      justify-content: center;
      margin: 18px 0 16px 0;

      &__content {
        display: flex;
        width: 280px;
      }
    }
  }

  &__list {
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 85%;
    margin: 0 auto;
  }
}

:deep(.u-form) {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 140px;
}

:deep(.u-form-item) {
  height: 80px;
}
</style>
