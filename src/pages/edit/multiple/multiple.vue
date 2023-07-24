<template>
  <view class="form">
    <u-navbar titleWidth="250rpx" :title="'共同编辑'" bgColor="#f6f6f6" :autoBack="true" />
    <view class="form__information">
      <FormInput
        :type="'text'"
        :name="'名称'"
        :maxLength="30"
        :readOnly="false"
        :placeHolder="'最多输入三十字'"
        v-model:input="form.name"
      />
    </view>
    <view class="form__information">
      <u-row customStyle="margin-bottom: 10px">
        <u-col span="10.5">
          <u-text color="#353535" :bold="true" text="隐私" />
        </u-col>
        <u-col span="1.5">
          <u-switch :disabled="false" v-model="form.privacy" size="20" :activeValue="true" />
        </u-col>
      </u-row>
      <FormInput
        :type="'number'"
        :name="'金额'"
        :maxLength="10"
        :isDetail="false"
        :placeHolder="'请输入金额'"
        :unitName="'元'"
        v-model:input="form.price"
        :span="4"
      />
      <FormInput
        :type="'number'"
        :name="'数量'"
        :maxLength="10"
        :isDetail="false"
        :placeHolder="'请输入数量'"
        v-model:input="form.count"
      />
      <FormDate :is-detail="false" v-model:date="form.date" />
      <FormInput
        :type="'text'"
        :name="'状态'"
        :maxLength="30"
        :isDetail="false"
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
    <view class="form__submit">
      <u-button @click="submitMultiple" type="primary" text="确认" />
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { useFormStore } from '@/stores/form'
// 引入组件
import FormDate from '@/components/Form/FormDate/FormDate.vue'
import FormInput from '@/components/Form/FormInput/FormInput.vue'

const useForm = useFormStore()
const submitMultiple = () => {
  const tempForm = {
    count: form.count,
    date: new Date(form.date).toJSON(),
    name: form.name,
    price: form.price,
    privacy: form.privacy ? 1 : 0,
    state: form.state
  }
  useForm.changeModifyItem(useForm.ids, tempForm)
}
const toast = ref()
//弹出提示
const showToast = (): void => {
  toast.value.show({
    message: "用于描述物品的使用状态,比如可以填入'五成新'、'未使用过'、'已借出'等"
  })
}
//表单数据
const form = reactive({
  count: 0,
  date: Date.now(),
  name: '',
  price: 0,
  privacy: true,
  state: ''
})
</script>

<style lang="scss">
.form {
  padding: 30rpx;
  background-color: #f6f6f6;
  padding-top: 200rpx;
  height: 100vh;
  &__information {
    border-radius: 30rpx;
    background-color: #fff;
    padding: 20rpx;
    margin-bottom: 30rpx;
  }

  &__submit {
    margin: 0 auto;
    width: 200rpx;
  }
}
</style>
