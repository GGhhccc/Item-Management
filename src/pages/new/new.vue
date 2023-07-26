<template>
  <view class="form">
    <u-form errorType="toast" :rules="rules" :model="form" ref="formVerify">
      <!-- 表单验证 -->
      <u-form-item prop="name" />
      <u-navbar titleWidth="250rpx" :title="'新建'" bgColor="#f6f6f6" :autoBack="true" />
      <view class="form__photo">
        <FormPhoto :size="'310rpx'" v-model:photoList="form.images" />
      </view>
      <view class="form__information">
        <u-row customStyle="margin-bottom: 10px">
          <u-col span="2">
            <u-text :bold="true" text="属性" />
          </u-col>
          <u-col span="6">
            <u-radio-group
              v-model="radioValue"
              placement="row"
              shape="square"
              :disabled="currentFloor === 1"
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
          :placeHolder="'最多输入三十字'"
          v-model:input="form.name"
        >
          <template #icon>
            <view class="form__information__icon"> * </view>
          </template>
        </FormInput>
        <u-row>
          <u-col span="2">
            <u-text color="#353535" :bold="true" text="二维码" />
          </u-col>
          <u-col span="10">
            <u-input placeholder="保存即可生成二维码" border="none" readonly />
          </u-col>
        </u-row>
      </view>
      <view class="form__information">
        <u-row customStyle="margin-bottom: 10px">
          <u-col span="10.5">
            <u-text color="#353535" :bold="true" text="隐私" />
          </u-col>
          <u-col span="1.5">
            <u-switch v-model="privacy" size="20" :activeValue="true" />
          </u-col>
        </u-row>
        <PasswordPopup
          :popup="popup"
          @close="popup = false"
          @confirmGesture="confirmGesture"
          @confirmNumber="confirmNumber"
        />
        <FormShow :is-detail="false" v-model:show="showTag" @click="addTag = true" :name="'标签'" />
        <view v-if="showTag" class="form__information__tag">
          <FormTag
            v-for="(item, index) in labelBox"
            :checked="true"
            :tag="item"
            :key="index"
            :shape="'square'"
          ></FormTag>
        </view>
        <FormInput
          :type="'number'"
          :name="'金额'"
          :maxLength="10"
          :placeHolder="'请输入金额'"
          :unitName="'元'"
          v-model:input="form.price"
          :span="4"
        />
        <FormInput
          v-if="currentFloor !== 1"
          :type="'number'"
          :name="'数量'"
          :maxLength="10"
          :placeHolder="'请输入数量'"
          v-model:input="form.count"
        />
        <FormDate v-model:date="date" />
        <FormInput
          v-if="currentFloor !== 1"
          :type="'text'"
          :name="'链接'"
          :maxLength="100"
          :placeHolder="'输入物品/空间的购买链接'"
          v-model:input="form.url"
        />
        <FormInput
          :type="'text'"
          :name="'状态'"
          :maxLength="30"
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
      <view v-if="currentFloor !== 1" class="form__information">
        <FormShow
          v-model:show="showSpace"
          :url="'new/tag/tag'"
          :name="'从属空间'"
          :isDetail="false"
        />
        <view class="form__information__subSpace" v-show="showSpace">
          <view class="space__subSpace__floor">
            <SubordinateSpaceItem
              v-for="(item, subIndex) in pathInfo"
              :ids="[]"
              :titlePadding="'10rpx 10rpx'"
              :tagPadding="'0 20rpx'"
              v-show="pathFloor >= subIndex"
              @radioClick="radioClick"
              :parent="subIndex ? spacesBox[subIndex - 1].id : 0"
              :id="spacesBox[subIndex].id"
              :subordinateSpaces="item"
              :key="subIndex"
              :floor="subIndex + 1"
              :currentFloor="currentFloor - 1"
            />
          </view>
        </view>
      </view>
      <view class="form__information">
        <u-text color="#353535" customStyle="margin-bottom: 10px" :bold="true" text="备注" />
        <FormPhoto :size="'140rpx'" v-model:photoList="form.figures" />
        <u-textarea
          maxlength="200"
          :count="true"
          :autoHeight="true"
          border="none"
          v-model="form.comment"
          placeholder="补充描述该物品/空间"
        />
      </view>
    </u-form>
    <view class="form__submit">
      <u-button
        :loading="isLoading"
        loadingText="新建中"
        @click="submitForm"
        type="primary"
        text="确认"
      />
    </view>
    <u-popup :safeAreaInsetBottom="false" round="20rpx" mode="bottom" :show="addTag">
      <view class="form__popup">
        <view class="form__popup__title">
          <u-text bold size="40rpx" :text="'标签'" />
          <u-icon @click="toTag" color="#5196ff" name="edit-pen-fill"></u-icon>
        </view>
        <view class="form__popup__operate">
          <u-text @click="addTag = false" lines="1" size="20rpx" :text="'取消'" />
          <u-line margin="15rpx 20rpx" color="#efeff2" length="50%" direction="col"></u-line>
          <u-text @click="clearTag()" color="#82b4fe" lines="1" size="20rpx" :text="'清除'" />
          <u-line margin="15rpx 20rpx" color="#efeff2" length="50%" direction="col"></u-line>
          <u-text @click="confirmTag()" color="#82b4fe" lines="1" size="20rpx" :text="'确认'" />
        </view>
        <view class="form__popup__tags">
          <FormMultiple
            :tagBox="tagBox"
            :tags="useTag.tagInfo.tagData"
            @checkboxClick="checkboxClick"
          />
        </view>
      </view>
    </u-popup>
  </view>
</template>

<script setup lang="ts">
import { ref, reactive, watch } from 'vue'
import { useFormStore } from '@/stores/form'
import { useTagStore } from '@/stores/tag'
import { useSpaceStore } from '@/stores/space'
import type { ItemForm, RoomForm, LabelData, imgData } from '@/types/form.d.ts'
import type { PathData } from '@/types/space.d.ts'
// 引入组件
import FormDate from '@/components/Form/FormDate/FormDate.vue'
import FormTag from '@/components/Form/FormTag/FormTag.vue'
import FormShow from '@/components/Form/FormShow/FormShow.vue'
import FormPhoto from '@/components/Form/FormPhoto/FormPhoto.vue'
import FormInput from '@/components/Form/FormInput/FormInput.vue'
import FormMultiple from '@/components/Form/FormMultiple/FormMultiple.vue'
import SubordinateSpaceItem from '@/components/Space/SubordinateSpaceItem/SubordinateSpaceItem.vue'
const useTag = useTagStore()
const { fetchAllTags } = useTag
const useForm = useFormStore()
const { submitRoom, submitItem, addImg, addFigure, currentFloor } = useForm
const useSpace = useSpaceStore()
const { pathInfo, spaces } = useSpace
// 第一次进入页面时，获取所有标签
if (!useTag.tagInfo.tagData.length) fetchAllTags()

//表单数据
const form = reactive({
  images: [] as imgData[],
  figures: [] as imgData[],
  name: '',
  count: 1,
  price: '',
  url: '',
  state: '',
  comment: ''
})

//上传图片
async function uploadImg(images: imgData[], type: number): Promise<imgData[]> {
  if (type)
    for (let i = 0; i < images.length; i++) {
      images[i] = await addFigure(images[i].url)
    }
  else
    for (let i = 0; i < images.length; i++) {
      images[i] = await addImg(images[i].url)
    }
  return images
}

// 是否正在提交
const isLoading = ref(false)

//物品属性
const radioValue = ref('空间')

//隐私
const privacy = ref(false)
//密码弹窗
const popup = ref(false)
//密码
const PIN = ref('')
//验证手势密码
const confirmGesture = (password: number) => {
  PIN.value = password.toString()
}
//验证数字密码
const confirmNumber = (password: number) => {
  PIN.value = password.toString()
}
watch(
  () => privacy.value,
  () => {
    if (privacy.value) popup.value = true
    else PIN.value = ''
  }
)
watch(
  () => popup.value,
  () => {
    if (!popup.value && !PIN.value) privacy.value = false
  }
)
//显示标签
const showTag = ref(true)
//添加标签
const addTag = ref(false)
//标签数组
const labelBox = ref<LabelData[]>([])
//初始化选取标签数组
const tagBox = ref<boolean[]>(new Array(useTag.tagInfo.tagData).fill(false))
//清空标签
const clearTag = (): void => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  tagBox.value.forEach((item) => (item = false))
  labelBox.value = []
  addTag.value = false
}
//标签选择事件
const checkboxClick = (index: number): void => {
  tagBox.value[index] = !tagBox.value[index]
}
//确认添加标签
const confirmTag = (): void => {
  addTag.value = false
  labelBox.value = []
  for (let i = 0; i < tagBox.value.length; i++) {
    if (tagBox.value[i]) labelBox.value.push(useTag.tagInfo.tagData[i])
  }
}
//跳转至标签编辑页
const toTag = (): void => {
  uni.navigateTo({
    url: `/pages/new/tag/tag`
  })
}

//日期
const date = ref(Date.now())
//将时间戳转换为年月日
function currentTime(timestamp: number): string {
  var now = new Date(timestamp)
  var zeroFill = function (value: number) {
    if (value < 10) {
      return '0' + String(value)
    }
    return value
  }

  var year = now.getFullYear()
  //年
  var month = zeroFill(now.getMonth() + 1)
  //月
  var day = zeroFill(now.getDate())

  return `${year}-${month}-${day}`
}

//弹出状态提示
const toast = ref()
const showToast = (): void => {
  toast.value.show({
    message: "用于描述物品的使用状态,比如可以填入'五成新'、'未使用过'、'已借出'等"
  })
}

//显示从属空间
const showSpace = ref(true)
//选择从属空间
const spacesBox = ref<PathData[]>([])
//当前层数
const pathFloor = ref<number>(0)
//初始化从属空间数组
for (let i = 0; i < pathInfo.length; i++) {
  spacesBox.value[i] = { fatherId: 0, id: 0, name: '', layer: 0 }
}
for (let i = 0; i < currentFloor - 1; i++) {
  pathFloor.value++
  spacesBox.value[i] = {
    fatherId: i ? spacesBox.value[i - 1].id : 0,
    id: spaces[i].id,
    name: spaces[i].name,
    layer: i
  }
}
//从属空间标签点击事件
const radioClick = (index: number, floor: number): void => {
  //点击已选择标签
  if (spacesBox.value[floor - 1].id === pathInfo[floor - 1][index].id) {
    //修改当前楼层
    pathFloor.value = floor - 1
    //清空当前点击索引之后的已选择空间缓存
    for (let i = floor - 1; i < spacesBox.value.length; i++) {
      if (!spacesBox.value[i]) break
      spacesBox.value[i] = { fatherId: 0, id: 0, name: '', layer: 0 }
    }
  }
  //点击未选择标签
  else {
    // 修改当前楼层
    pathFloor.value = floor
    // 将当前路径存入已选择路径缓存中
    spacesBox.value[floor - 1] = pathInfo[floor - 1][index]
    // 清空当前点击索引之后的已选择空间缓存
    for (let i = floor; i < spacesBox.value.length; i++) {
      if (!spacesBox.value[i]) break
      spacesBox.value[i] = { fatherId: 0, id: 0, name: '', layer: 0 }
    }
  }
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
  ]
}

//上传表单时的回调
const submitForm = (): void => {
  formVerify.value
    .validate()
    .then(async () => {
      try {
        const images = await uploadImg(form.images, 0)
        const figures = await uploadImg(form.figures, 1)
        if (currentFloor === 1) {
          const tempForm = <RoomForm>{
            privacy: privacy.value ? 1 : 0,
            type: 0,
            price: Number(form.price),
            name: form.name,
            state: form.state,
            address: '',
            location: '',
            comment: form.comment,
            date: currentTime(date.value),
            images: images,
            figures: figures,
            labels: labelBox.value,
            password: privacy.value ? PIN.value : ''
          }
          if (!PIN.value) delete tempForm.password
          isLoading.value = true
          await submitRoom(tempForm)
          uni.showToast({
            title: '新建成功',
            icon: 'success',
            duration: 2000
          })
          isLoading.value = false
          setTimeout(() => {
            uni.navigateBack({
              delta: 1
            })
          }, 1000)
        } else {
          const paths = []
          for (let i = 0; i < pathFloor.value; i++) {
            paths.push({
              id: spacesBox.value[i].id,
              name: spacesBox.value[i].name
            })
          }
          const tempForm = <ItemForm>{
            privacy: privacy.value ? 1 : 0,
            type: radioValue.value === '空间' ? 1 : 2,
            price: Number(form.price),
            count: Number(form.count),
            name: form.name,
            state: form.state,
            comment: form.comment,
            date: currentTime(date.value),
            path: paths,
            labels: labelBox.value,
            fatherName: spacesBox.value[pathFloor.value - 1].name,
            url: form.url,
            images: images,
            figures: figures,
            password: privacy.value ? PIN.value : ''
          }
          if (!PIN.value) delete tempForm.password
          isLoading.value = true
          await submitItem(spacesBox.value[pathFloor.value - 1].id, tempForm)
          uni.showToast({
            title: '新建成功',
            icon: 'success',
            duration: 2000
          })
          isLoading.value = false
          setTimeout(() => {
            uni.navigateBack({
              delta: 1
            })
          }, 1000)
        }
      } catch {
        isLoading.value = false
      }
    })
    .catch((error: any) => {
      console.log(error)
    })
}
</script>

<style lang="scss">
.form {
  padding: 30rpx;
  margin-top: 40px;
  background-color: #f6f6f6;

  &__photo {
    padding: 0rpx 0rpx 20rpx 30rpx;
  }

  &__popup {
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

    &__tags {
      padding: 20rpx;
    }
  }

  &__information {
    border-radius: 30rpx;
    background-color: #fff;
    padding: 20rpx;
    margin-bottom: 30rpx;

    &__subSpace {
      max-height: 200px;
      overflow-y: auto;
    }

    &__tag {
      display: flex;
      justify-content: flex-start;
      flex-flow: row wrap;
    }

    &__icon {
      position: absolute;
      top: -5px;
      left: 30px;
      color: red;
      font-size: 30rpx;
    }
  }

  &__submit {
    margin: 0 auto;
    width: 200rpx;
  }
}
</style>
