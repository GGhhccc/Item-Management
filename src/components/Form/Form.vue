<template>
  <view class="form">
    <u-form errorType="toast" :rules="rules" :model="form" ref="formVerify">
      <u-form-item prop="amount" />
      <u-form-item prop="name" />
      <u-form-item prop="mount" />
      <u-navbar
        titleWidth="250rpx"
        :title="isEdit || isDetail ? title : '新建'"
        bgColor="#f6f6f6"
        :autoBack="isDetail"
        @leftClick="showSave = !isDetail"
      />
      <view class="form__photo">
        <FormPhoto :size="'310rpx'" v-model:photoList="form.photo" :isDetail="isDetail" />
      </view>
      <view class="form__imformation">
        <u-row customStyle="margin-bottom: 10px">
          <u-col span="2">
            <u-text :bold="true" text="属性" />
          </u-col>
          <u-col span="6">
            <u-radio-group
              @change="attributeClick"
              :disabled="isDetail"
              v-model="radioValue"
              placement="row"
            >
              <u-radio :customStyle="{ marginRight: '20rpx' }" label="空间" name="空间" />
              <u-radio :customStyle="{ marginRight: '20rpx' }" label="物品" name="物品" />
            </u-radio-group>
          </u-col>
        </u-row>
        <FormInput
          :type="'text'"
          :name="'名称'"
          :maxLength="30"
          :readOnly="isDetail"
          :placeHolder="'最多输入三十字'"
          v-model:input="form.name"
        />
        <u-row>
          <u-col span="2">
            <u-text :bold="true" text="二维码" />
          </u-col>
          <u-col span="10">
            <u-input
              v-if="!(isDetail || isEdit)"
              placeholder="保存即可生成二维码"
              border="none"
              readonly
            />
            <u-icon v-if="isDetail || isEdit" @click="showCode = true" name="grid"></u-icon>
          </u-col>
          <u-popup
            overlayOpacity="0"
            :safeAreaInsetBottom="false"
            round="30rpx"
            mode="center"
            :show="showCode"
            @close="showCode = false"
          >
            <view class="form__imformation__code">
              <view class="form__imformation__code__text">
                <u-text size="28rpx" color="#000" align="center" text="将物品二维码发送给好友" />
                <u-button
                  disabled
                  customStyle="border:none;width:50rpx;"
                  open-type="share"
                  icon="share"
                />
              </view>
              <image class="form__imformation__code__img" :src="form.code" />
            </view>
          </u-popup>
        </u-row>
      </view>
      <view class="form__imformation">
        <u-row customStyle="margin-bottom: 10px">
          <u-col span="10.5">
            <u-text :bold="true" text="隐私" />
          </u-col>
          <u-col span="1.5">
            <u-switch :disabled="isDetail" v-model="isPrivacy" size="20" :activeValue="true" />
          </u-col>
        </u-row>
        <FormShow v-model:show="showTag" :url="'new/tag/tag'" :name="'标签'" :isDetail="isDetail" />
        <FormMultiple v-if="showTag" :tags="form.tag" @checkboxClick="checkboxClick" />
        <FormInput
          :type="'number'"
          :name="'金额'"
          :maxLength="10"
          :isDetail="isDetail"
          :placeHolder="'请输入金额'"
          v-model:input="form.amount"
        />
        <FormInput
          :type="'number'"
          :name="'数量'"
          :maxLength="10"
          :isDetail="isDetail"
          :placeHolder="'请输入数量'"
          v-model:input="form.mount"
        />
        <FormDate v-model:date="form.date" />
        <FormInput
          :type="'text'"
          :name="'链接'"
          :maxLength="100"
          :isDetail="isDetail"
          :placeHolder="'输入物品/空间的购买链接'"
          v-model:input="form.url"
        />
        <FormInput
          :type="'text'"
          :name="'状态'"
          :maxLength="30"
          :isDetail="isDetail"
          :placeHolder="'输入物品状态'"
          v-model:input="form.state"
        >
          <template #icon>
            <u-icon
              @click="showState = true"
              name="question-circle"
              customStyle="position: absolute;top:-5px;left:30px"
            />
          </template>
        </FormInput>
        <u-popup
          :safeAreaInsetBottom="false"
          round="30rpx"
          mode="center"
          :show="showState"
          @close="showState = false"
        >
          <view class="form__imformation__state">
            <u-text
              color="#000"
              customStyle="margin-bottom:10px"
              size="20px"
              align="center"
              text="状态"
            />
            <u-text
              color="#000"
              align="center"
              text="用于描述物品的使用状态,比如可以填入'五成新'、'未使用过'、'已借出'等"
            />
            <u-button
              @click="showState = false"
              customStyle="width:200rpx;margin:50rpx auto;"
              text="确认"
              color="#9bc2ff"
            />
          </view>
        </u-popup>
      </view>
      <view class="form__imformation">
        <FormShow
          v-model:show="showAssociate"
          :url="'new/dependence/dependence'"
          :name="'关联物品'"
          :isDetail="isDetail"
        />
        <FormMultiple v-if="showAssociate" :tags="form.tag" @checkboxClick="checkboxClick" />
        <FormShow
          v-model:show="showSpace"
          :url="'new/tag/tag'"
          :name="'从属空间'"
          :isDetail="isDetail"
        />
        <u-collapse v-if="(isDetail || isEdit) && showSpace" :border="false">
          <u-collapse-item
            v-for="(item, index) in form.subordinateSpace"
            :title="`第${index + 1}层`"
            name="index"
            :key="index"
          >
            <view class="form__imformation__tag">
              <FormTag
                :tag="item2"
                v-for="(item2, index2) in item"
                :key="index2"
                :bgColor="bgColor(item2.floor, item2.parent)"
                :borderColor="bgColor(item2.floor, item2.parent)"
                :color="textColor(item2.floor, item2.parent)"
                @click="radioClick(index2, item2.floor, item2.parent)"
                :shape="'circle'"
              />
            </view>
          </u-collapse-item>
        </u-collapse>
        <FormShow
          v-model:show="showAdministrator"
          :url="'new/tag/tag'"
          :name="'管理人'"
          :isDetail="isDetail"
        />
        <u-row v-if="showAdministrator" customStyle="margin-top:10px">
          <view
            v-for="(item, index) in form.administrator"
            :key="index"
            class="form__imformation__administrator"
          >
            <u-avatar size="80rpx" :src="item.avatar"></u-avatar>
            <u-text size="25rpx" lines="1" :bold="true" align="center" :text="item.name" />
          </view>
        </u-row>
      </view>
      <view class="form__imformation">
        <u-text customStyle="margin-bottom: 10px" :bold="true" text="备注" />
        <FormPhoto :size="'140rpx'" v-model:photoList="form.comment.url" :isDetail="isDetail" />
        <u-textarea
          maxlength="200"
          :count="true"
          :autoHeight="true"
          border="none"
          v-model="form.comment.content"
          placeholder="补充描述该物品/空间"
        />
      </view>
      <view v-if="isEdit || isDetail" class="form__imformation">
        <FormShow v-model:show="showHistory" :name="'历史记录'" :isDetail="true" />
        <view v-show="showHistory" :key="index" v-for="(item, index) in form.history">
          <FormHistory :history="item" />
        </view>
      </view>
    </u-form>
    <view v-if="!isDetail" class="form__submit">
      <u-button @click="submitForm" type="primary" text="确认" />
    </view>
    <u-modal
      @cancel="cancelSave"
      @confirm="saveForm"
      :showCancelButton="true"
      :show="showSave"
      width="600rpx"
    >
      是否暂存编辑内容?
    </u-modal>
  </view>
</template>

<script setup lang="ts">
import { ref, onMounted, reactive } from 'vue'
import { useFormStore } from '@/stores/form'
import { onShareAppMessage } from '@dcloudio/uni-app'
import type { ItemData } from '@/types/form'
// 分享时的图片及链接
onShareAppMessage(() => {
  return {
    title: 'shuzhi',
    imageUrl: 'https://uiadmin.net/uview-plus/components/input.html'
  }
})
onMounted(() => {
  // 开启分享功能
  uni.showShareMenu({
    withShareTicket: true,
    menus: ['shareAppMessage', 'shareTimeline']
  })
})
const props = withDefaults(
  defineProps<{
    //是否为编辑页
    isEdit?: boolean
    //是否为详情页
    isDetail?: boolean
    //表单数据
    itemData?: ItemData
  }>(),
  {
    isEdit: true,
    isDetail: false,
    itemData: () => ({
      id: 0,
      photo: [],
      attribute: 0,
      name: '',
      code: '',
      privary: true,
      tag: [],
      amount: 0,
      mount: 0,
      date: 0,
      url: '',
      state: '',
      associatedItem: [],
      subordinateSpace: [[]],
      administrator: [],
      comment: {
        url: [],
        content: ''
      },
      history: []
    })
  }
)
const useForm = useFormStore()
//显示从属空间
const showSpace = ref(true)
//显示状态
const showState = ref(false)
//显示二维码
const showCode = ref(false)
//显示标签
const showTag = ref(true)
//多选事件
const checkboxClick = (name: number) => {
  if (!props.isDetail) form.tag[name].checked = !form.tag[name].checked
}
//显示历史记录
const showHistory = ref(false)
//显示从属空间
const showAssociate = ref(false)
//文字颜色
const textColor = (floor: number, parent: number) => {
  if (floor !== 1) {
    for (let i = 0; i < form.subordinateSpace[floor - 2].length; i++) {
      if (
        form.subordinateSpace[floor - 2][i].id === parent &&
        form.subordinateSpace[floor - 2][i].checked
      )
        return
    }
    return '#d0d0d0'
  }
}
//背景颜色
const bgColor = (floor: number, parent: number) => {
  if (floor !== 1) {
    for (let i = 0; i < form.subordinateSpace[floor - 2].length; i++) {
      if (
        form.subordinateSpace[floor - 2][i].id === parent &&
        form.subordinateSpace[floor - 2][i].checked
      )
        return
    }
    return '#f3f3f5'
  }
}
//单选事件
const radioClick = (index: number, floor: number, parent: number) => {
  if (!props.isDetail) {
    if (!bgColor(floor, parent)) {
      if (form.subordinateSpace[floor - 1][index].checked === false) {
        for (let index = floor; index < form.subordinateSpace.length; index++) {
          for (let index2 = 0; index2 < form.subordinateSpace[floor].length; index2++) {
            form.subordinateSpace[floor].map((item: any) => {
              item.checked = false
            })
          }
        }
      }
      form.subordinateSpace[floor - 1].map((item: any) => {
        item.checked = false
      })
      form.subordinateSpace[floor - 1][index].checked = true
    }
  }
}
//显示管理人
const showAdministrator = ref(false)
//显示是否暂存数据
const showSave = ref(false)
//是否设置隐私
const isPrivacy = ref(true)
//物品属性
const radioValue = ref('空间')
//属性点击事件
const attributeClick = (name: string) => {
  form.attribute = name === '空间' ? 0 : 1
}
//表单数据
const form = reactive<ItemData>({
  ...props.itemData
})
//标题
const title = form.name
//取消暂存
const cancelSave = () => {
  showSave.value = false
  uni.switchTab({
    url: '/pages/home/home'
  })
}
//暂存表单数据
const saveForm = () => {
  if (props.isEdit) Object.assign(useForm.tempItemData, form)
  else Object.assign(useForm.itemFormData, form)
  showSave.value = false
  uni.switchTab({
    url: '/pages/home/home'
  })
}
//表单规则
const formVerify = ref()
const rules = {
  name: [
    {
      required: true,
      message: '请输入名称',
      trigger: ['blur', 'change']
    }
  ],
  amount: [
    {
      required: true,
      message: '请输入金额',
      trigger: ['blur', 'change']
    }
  ],
  mount: [
    {
      required: true,
      message: '请输入数量',
      trigger: ['blur', 'change']
    }
  ]
}
//上传表单时的回调
const submitForm = () => {
  formVerify.value
    .validate()
    .then(() => {
      console.log(1)
    })
    .catch(() => {
      console.log(0)
    })
}
</script>

<style lang="scss">
.form {
  padding: 30rpx;
  background-color: #f6f6f6;

  &__photo {
    padding: 0rpx 0rpx 20rpx 30rpx;
  }

  &__imformation {
    border-radius: 30rpx;
    background-color: #fff;
    padding: 20rpx;
    margin-bottom: 30rpx;

    &__state {
      width: 500rpx;
      padding: 50rpx 50rpx 0 50rpx;
      border-radius: 30rpx;
      background-color: #fcfcfe;
      text-align: center;
    }

    &__code {
      width: 400rpx;
      padding-top: 20rpx;

      &__text {
        display: flex;
        padding: 0 30rpx 0 30rpx;
        justify-content: center;
      }

      &__img {
        width: 300rpx;
        height: 300rpx;
        margin: 0 50rpx;
      }
    }

    &__tag {
      display: flex;
      justify-content: flex-start;
      flex-flow: row wrap;
    }

    &__administrator {
      width: 80rpx;
      margin-right: 20rpx;
    }
  }

  &__submit {
    margin: 0 auto;
    width: 200rpx;
  }
}
</style>
