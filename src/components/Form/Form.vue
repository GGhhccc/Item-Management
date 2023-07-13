<template>
  <view class="form">
    <u-form errorType="toast" :rules="rules" :model="form" ref="formVerify">
      <!-- 表单验证 -->
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
              :disabled="isDetail || isMultiple"
              v-model="radioValue"
              placement="row"
              shape="square"
            >
              <u-radio :customStyle="{ marginRight: '20rpx' }" label="空间" name="空间" />
              <u-radio :customStyle="{ marginRight: '20rpx' }" label="物品" name="物品" />
            </u-radio-group>
          </u-col>
        </u-row>
        <FormInput
          v-if="!isMultiple"
          :type="'text'"
          :name="'名称'"
          :maxLength="30"
          :readOnly="isDetail"
          :placeHolder="'最多输入三十字'"
          v-model:input="form.name"
        />
        <u-row v-if="!isMultiple">
          <u-col span="2">
            <u-text color="#353535" :bold="true" text="二维码" />
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
            <u-text color="#353535" :bold="true" text="隐私" />
          </u-col>
          <u-col span="1.5">
            <u-switch :disabled="isDetail" v-model="isPrivacy" size="20" :activeValue="true" />
          </u-col>
        </u-row>
        <FormShow v-model:show="showTag" :url="'new/tag/tag'" :name="'标签'" :isDetail="isDetail" />
        <FormMultiple
          v-if="showTag"
          :tagBox="tagBox"
          :tags="form.tag"
          @checkboxClick="checkboxClick"
        />
        <FormInput
          v-if="!isMultiple"
          :type="'number'"
          :name="'金额'"
          :maxLength="10"
          :isDetail="isDetail"
          :placeHolder="'请输入金额'"
          :unitName="'元'"
          v-model:input="form.amount"
          :span="4"
        />
        <FormInput
          v-if="!isMultiple"
          :type="'number'"
          :name="'数量'"
          :maxLength="10"
          :isDetail="isDetail"
          :placeHolder="'请输入数量'"
          v-model:input="form.mount"
        />
        <FormDate :is-detail="isDetail" v-model:date="form.date" />
        <FormInput
          v-if="!isMultiple"
          :type="'text'"
          :name="'链接'"
          :maxLength="100"
          :isDetail="isDetail"
          :placeHolder="'输入物品/空间的购买链接'"
          v-model:input="form.url"
          :display="!isDetail"
        />
        <FormInput
          v-if="!isMultiple"
          :type="'text'"
          :name="'状态'"
          :maxLength="30"
          :isDetail="isDetail"
          :placeHolder="'输入物品状态'"
          v-model:input="form.state"
        >
          <template #icon>
            <u-icon
              @click="showToast()"
              name="question-circle"
              customStyle="position: absolute;top:-5px;left:30px"
            />
          </template>
        </FormInput>
        <u-toast ref="toast"></u-toast>
      </view>
      <view class="form__imformation">
        <FormShow
          v-model:show="showAssociate"
          :url="'new/dependence/dependence'"
          :name="'关联物品'"
          :isDetail="isDetail"
        />
        <FormMultiple
          v-if="showAssociate"
          :tagBox="tagBox"
          :tags="form.tag"
          @checkboxClick="checkboxClick"
        />
        <FormShow
          v-model:show="showSpace"
          :url="'new/tag/tag'"
          :name="'从属空间'"
          :isDetail="isDetail"
        />
        <view class="form__imformation__subordinateSpace" v-show="showSpace">
          <SubordinateSpaceItem
            :titlePadding="'10rpx 10rpx'"
            :tagPadding="'0 20rpx'"
            v-show="currentFloor >= index && (!isDetail || index !== currentFloor)"
            @radioClick="radioClick"
            :parent="parentBox[index]"
            :id="spacesBox[index]"
            v-for="(item, index) in useForm.itemData.subordinateSpace"
            :subordinateSpaces="item"
            :key="index"
            :floor="index + 1"
          />
        </view>
        <FormShow
          @click="addAdministrator = true"
          v-model:show="showAdministrator"
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
        <u-text color="#353535" customStyle="margin-bottom: 10px" :bold="true" text="备注" />
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
      <view v-if="(isEdit || isDetail) && !isMultiple" class="form__imformation">
        <FormShow v-model:show="showHistory" :name="'历史记录'" :isDetail="true" />
        <view v-show="showHistory" :key="index" v-for="(item, index) in form.history">
          <FormHistory :history="item" />
        </view>
      </view>
    </u-form>
    <view v-if="!isDetail" class="form__submit">
      <u-button @click="submitForm" type="primary" text="确认" />
    </view>
    <u-popup :safeAreaInsetBottom="false" round="20rpx" mode="bottom" :show="addAdministrator">
      <view class="form__administrator">
        <view class="form__administrator__title">
          <u-text bold size="40rpx" :text="'管理人'" />
          <u-icon color="#5196ff" name="edit-pen-fill"></u-icon>
        </view>
        <view class="form__administrator__operate">
          <u-text @click="addAdministrator = false" lines="1" size="20rpx" :text="'取消'" />
          <u-line margin="15rpx 20rpx" color="#efeff2" length="50%" direction="col"></u-line>
          <u-text @click="clear()" color="#82b4fe" lines="1" size="20rpx" :text="'清除'" />
          <u-line margin="15rpx 20rpx" color="#efeff2" length="50%" direction="col"></u-line>
          <u-text @click="confirm()" color="#82b4fe" lines="1" size="20rpx" :text="'确认'" />
        </view>
      </view>
      <view class="form__avatars">
        <view v-for="(item, index) in form.administrator" :key="index" class="form__avatars__item">
          <u-avatar @click="tick(index)" size="80rpx" :src="item.avatar"></u-avatar>
          <u-text size="25rpx" lines="1" :bold="true" align="center" :text="item.name" />
          <view v-show="tickBox[index] === true" class="form__avatars__item__tick">
            <u-icon size="25rpx" name="checkmark" color="#fff"></u-icon>
          </view>
        </view>
      </view>
      <view class="form__authority">
        <u-radio-group v-model="authorityValue" placement="column" shape="square">
          <u-radio :customStyle="{ marginRight: '20rpx' }" label="仅查看" name="仅查看" />
          <u-radio
            :customStyle="{ marginRight: '20rpx' }"
            label="可查看并编辑"
            name="可查看并编辑"
          />
        </u-radio-group>
      </view>
    </u-popup>
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
// 引入组件
import FormDate from '@/components/Form/FormDate/FormDate.vue'
import FormShow from '@/components/Form/FormShow/FormShow.vue'
import FormPhoto from '@/components/Form/FormPhoto/FormPhoto.vue'
import FormInput from '@/components/Form/FormInput/FormInput.vue'
import FormMultiple from '@/components/Form/FormMultiple/FormMultiple.vue'
import FormHistory from '@/components/Form/FormHistory/FormHistory.vue'
import SubordinateSpaceItem from '@/components/Space/SubordinateSpaceItem/SubordinateSpaceItem.vue'
// 表单数据类型
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
    //是否为多选编辑
    isMultiple?: boolean
  }>(),
  {
    isEdit: false,
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
    }),
    isMultiple: false
  }
)
const useForm = useFormStore()
//显示从属空间
const showSpace = ref(true)
//显示二维码
const showCode = ref(false)
//显示标签
const showTag = ref(true)
//显示添加管理员
const addAdministrator = ref(false)
//多选事件
const checkboxClick = (index: number): void => {
  if (!props.isDetail) tagBox.value[index] = !tagBox.value[index]
}
const clear = (): void => {
  addAdministrator.value = false
}
const confirm = (): void => {
  addAdministrator.value = false
}
const tick = (index: number): void => {
  tickBox.value[index] = !tickBox.value[index]
}
//显示历史记录
const showHistory = ref(false)
//显示从属空间
const showAssociate = ref(false)
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
//弹出消息提示
const toast = ref()
//弹出提示
const showToast = (): void => {
  toast.value.show({
    message: "用于描述物品的使用状态,比如可以填入'五成新'、'未使用过'、'已借出'等"
  })
}
//显示管理人
const showAdministrator = ref(false)
//显示是否暂存数据
const showSave = ref(false)
//是否设置隐私
const isPrivacy = ref(true)
//属性点击事件
const attributeClick = (name: string): void => {
  form.attribute = name === '空间' ? 0 : 1
}
//表单数据
const form = reactive<ItemData>({
  ...props.itemData
})
//选取标签数组
const tagBox = ref<boolean[]>(new Array(form.tag.length).fill(false))
const tickBox = ref<boolean[]>(new Array(form.administrator.length).fill(false))
//物品属性
const radioValue = form.attribute ? ref('物品') : ref('空间')
const authorityValue = ref('仅查看')
//标题
const title = form.name
//取消暂存
const cancelSave = (): void => {
  showSave.value = false
  uni.navigateBack({
    delta: 1 //返回层数，2则上上页
  })
}
//暂存表单数据
const saveForm = (): void => {
  if (props.isEdit) Object.assign(useForm.tempItemData, form)
  else Object.assign(useForm.itemFormData, form)
  showSave.value = false
  uni.navigateBack({
    delta: 1 //返回层数，2则上上页
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
const submitForm = (): void => {
  if (!props.isMultiple)
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

  &__administrator {
    padding: 30rpx;
    padding-bottom: 0;
    display: flex;
    flex-wrap: wrap;
    &__title {
      display: flex;
      margin-right: 280rpx;
    }
    &__operate {
      width: 250rpx;
      display: flex;
    }
  }

  &__authority {
    padding-left: 40rpx;
    padding-bottom: 40rpx;
  }

  &__avatars {
    display: flex;
    padding: 20rpx 40rpx;
    padding-right: 0;
    overflow-x: auto;
    flex-wrap: nowrap;
    &__item {
      padding-right: 20rpx;
      position: relative;
      &__tick {
        width: 28rpx;
        height: 28rpx;
        border-radius: 14rpx;
        background-color: #ff6464;
        position: absolute;
        right: 15rpx;
        bottom: 30rpx;
        display: flex;
        align-items: center;
        justify-content: center;
      }
    }
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

    &__subordinateSpace {
      max-height: 200px;
      overflow-y: auto;
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
