<template>
	<view class="form">
		<u-no-network />
		<u-navbar
			titleWidth="250rpx"
			:title="isEdit || isDetail ? title : '新建'"
			bgColor="#f6f6f6"
			:autoBack="isDetail"
			@leftClick="showSave = !isDetail"
		/>
		<view class="form__photo">
			<u-upload
				:fileList="form.photo"
				@afterRead="photoAfterRead"
				@delete="deletePhoto"
				accept="image"
				name="1"
				multiple
				:maxCount="5"
				width="310rpx"
				height="310rpx"
				:previewImage="true"
				:disabled="isDetail"
				:deletable="!isDetail"
			>
				<image
					src="../../static/icons/photograph.png"
					:style="{ width: '310rpx', height: '310rpx', display: isDetail ? 'none' : 'block' }"
				/>
			</u-upload>
		</view>
		<u-form errorType="toast" :rules="rules" :model="form" ref="formVerify">
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
				<u-row customStyle="margin-bottom: 10px">
					<u-col span="2">
						<u-text :bold="true" text="名称" />
					</u-col>
					<u-col span="9">
						<u-input
							placeholder="最多输入三十字"
							border="none"
							maxlength="30"
							type="text"
							:readonly="isDetail"
							v-model="form.name"
						/>
					</u-col>
					<u-col span="1">
						<u-form-item prop="name" />
					</u-col>
				</u-row>
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
				<u-row customStyle="margin-bottom: 10px">
					<u-col :span="isDetail ? 11.5 : 10.5">
						<u-text :bold="true" text="标签" />
					</u-col>
					<u-col :span="isDetail ? 0.5 : 1">
						<u-icon
							@click="showTag = !showTag"
							color="#3988ff"
							:name="showTag ? 'arrow-down-fill' : 'play-left-fill'"
						/>
					</u-col>
					<u-col span="0.5">
						<u-icon v-if="!isDetail" @click="toTag" name="plus" color="#2979ff" size="15" />
					</u-col>
				</u-row>
				<u-row
					v-if="showTag"
					customStyle="display: flex;justify-content: flex-start;flex-flow:row wrap;"
				>
					<view :style="tagSize(item.name.length)" v-for="(item, index) in form.tag" :key="index">
						<u-tag :text="item.name" :plain="!item.checked" :name="index" @click="checkboxClick" />
					</view>
				</u-row>
				<u-row customStyle="margin-bottom: 10px">
					<u-col span="2">
						<u-text :bold="true" text="金额" />
					</u-col>
					<u-col span="9">
						<u-input
							v-model="form.amount"
							placeholder="请输入金额"
							border="none"
							maxlength="10"
							type="number"
							:readonly="isDetail"
						/>
					</u-col>
					<u-col span="1">
						<u-form-item prop="amount" />
					</u-col>
				</u-row>
				<u-row customStyle="margin-bottom: 10px">
					<u-col span="2">
						<u-text :bold="true" text="数量" />
					</u-col>
					<u-col span="9">
						<u-input
							v-model="form.mount"
							placeholder="请输入数量"
							border="none"
							maxlength="10"
							type="number"
							:readonly="isDetail"
						/>
					</u-col>
					<u-col span="1">
						<u-form-item prop="mount" />
					</u-col>
				</u-row>
				<u-row customStyle="margin-bottom: 10px">
					<u-col span="3">
						<u-text :bold="true" text="入库日期" />
					</u-col>
					<u-col span="2">
						<u-text @click="showDate = !isDetail" :text="year" />
					</u-col>
					<u-col span="1">
						<u-text :bold="true" text="年" />
					</u-col>
					<u-col span="1">
						<u-text @click="showDate = !isDetail" :text="month" />
					</u-col>
					<u-col span="1">
						<u-text :bold="true" text="月" />
					</u-col>
					<u-col span="1">
						<u-text @click="showDate = !isDetail" :text="day" />
					</u-col>
					<u-col span="1">
						<u-text :bold="true" text="日" />
					</u-col>
				</u-row>
				<u-picker
					:defaultIndex="defaultDate"
					@confirm="setDate"
					@change="changeDate"
					:immediateChange="true"
					@cancel="showDate = false"
					:show="showDate"
					:columns="yearList"
				/>
				<u-row customStyle="margin-bottom: 10px">
					<u-col span="2">
						<u-text :bold="true" text="链接" />
					</u-col>
					<u-col span="10">
						<u-input
							placeholder="输入物品/空间的购买链接"
							border="none"
							maxlength="100"
							type="text"
							:readonly="isDetail"
							v-model="form.url"
						/>
					</u-col>
				</u-row>
				<u-row>
					<u-col span="2" customStyle="position: relative;">
						<u-text :bold="true" text="状态" />
						<u-icon
							@click="showState = true"
							name="question-circle"
							customStyle="position: absolute;top:-5px;left:30px"
						/>
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
					</u-col>
					<u-col span="10">
						<u-input
							v-model="form.state"
							border="none"
							maxlength="30"
							type="text"
							:readonly="isDetail"
						/>
					</u-col>
				</u-row>
			</view>
			<view class="form__imformation">
				<u-row customStyle="margin-bottom: 10px">
					<u-col :span="isDetail ? 11.5 : 10.5">
						<u-text :bold="true" text="关联物品" />
					</u-col>
					<u-col :span="isDetail ? 0.5 : 1">
						<u-icon
							@click="showAssociate = !showAssociate"
							color="#3988ff"
							:name="showAssociate ? 'arrow-down-fill' : 'play-left-fill'"
						/>
					</u-col>
					<u-col span="0.5">
						<u-icon v-if="!isDetail" @click="toAssociate" name="plus" color="#2979ff" size="15" />
					</u-col>
				</u-row>
				<u-row
					v-if="showAssociate"
					customStyle="display: flex;justify-content: flex-start;flex-flow:row wrap;"
				>
					<view :style="tagSize(item.name.length)" v-for="(item, index) in form.tag" :key="index">
						<u-tag :text="item.name" :plain="!item.checked" :name="index" @click="checkboxClick" />
					</view>
				</u-row>
				<u-row v-if="isDetail || isEdit" customStyle="margin-bottom: 10px">
					<u-col :span="isDetail ? 11.5 : 10.5">
						<u-text :bold="true" text="从属空间" />
					</u-col>
					<u-col :span="isDetail ? 0.5 : 1">
						<u-icon
							@click="showSpace = !showSpace"
							color="#3988ff"
							:name="showSpace ? 'arrow-down-fill' : 'play-left-fill'"
						/>
					</u-col>
					<u-col span="0.5">
						<u-icon
							v-if="!isDetail"
							@click="showHiddenSpace = true"
							name="plus"
							color="#2979ff"
							size="15"
						/>
					</u-col>
				</u-row>
				<u-collapse v-if="(isDetail || isEdit) && showSpace" :border="false">
					<u-collapse-item
						v-for="(item, index) in form.subordinateSpace"
						:title="`第${index + 1}层`"
						name="index"
						:key="index"
					>
						<u-row customStyle="display: flex;justify-content: flex-start;flex-flow:row wrap;">
							<view
								:style="tagSize(item2.name.length)"
								v-for="(item2, index2) in item"
								:key="index2"
							>
								<u-tag
									:bgColor="bgColor(item2.floor, item2.parent)"
									:borderColor="bgColor(item2.floor, item2.parent)"
									:color="textColor(item2.floor, item2.parent)"
									@click="radioClick(index2, item2.floor, item2.parent)"
									:key="index2"
									:plain="!item2.checked"
									shape="circle"
									:text="item2.name"
								/>
							</view>
						</u-row>
					</u-collapse-item>
				</u-collapse>
				<u-popup
					:safeAreaInsetBottom="false"
					round="30rpx"
					mode="bottom"
					:show="showHiddenSpace"
					@close="showHiddenSpace = false"
				>
					<view class="form__imformation">
						<u-row customStyle="margin-bottom: 10px">
							<u-col span="8">
								<u-text :bold="true" text="从属空间" />
							</u-col>
							<u-text @click="showHiddenSpace = false" align="center" size="20rpx" text="取消" />
							<u-line direction="col" length="40rpx" />
							<u-text @click="saveSpace" align="center" size="20rpx" color="#75acfe" text="确定" />
						</u-row>
						<u-collapse :border="false">
							<u-collapse-item
								v-for="(item, index) in form.subordinateSpace"
								:title="`第${index + 1}层`"
								name="index"
								:key="index"
							>
								<u-row customStyle="display: flex;justify-content: flex-start;flex-flow:row wrap;">
									<view
										:style="tagSize(item2.name.length)"
										v-for="(item2, index2) in item"
										:key="index2"
									>
										<u-tag
											:bgColor="bgColor(item2.floor, item2.parent)"
											:borderColor="bgColor(item2.floor, item2.parent)"
											:color="textColor(item2.floor, item2.parent)"
											:key="index2"
											@click="radioClick(index2, item2.floor, item2.parent)"
											:plain="!item2.checked"
											shape="circle"
											:text="item2.name"
										/>
									</view>
								</u-row>
							</u-collapse-item>
						</u-collapse>
					</view>
				</u-popup>
				<u-row>
					<u-col :span="isDetail ? 11.5 : 10.5">
						<u-text :bold="true" text="管理人" />
					</u-col>
					<u-col :span="isDetail ? 0.5 : 1">
						<u-icon
							@click="showAdministrator = !showAdministrator"
							color="#3988ff"
							:name="showAdministrator ? 'arrow-down-fill' : 'play-left-fill'"
						/>
					</u-col>
					<u-col span="0.5">
						<u-icon
							v-if="!isDetail"
							@click="toAdministrator"
							name="plus"
							color="#2979ff"
							size="15"
						/>
					</u-col>
				</u-row>
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
				<u-upload
					:fileList="form.comment.url"
					@afterRead="commentAfterRead"
					@delete="deleteComment"
					accept="image"
					name="1"
					multiple
					:maxCount="isDetail ? form.photo.length : 5"
					width="140rpx"
					height="140rpx"
					:deletable="!isDetail"
					:previewImage="true"
				/>
				<u-textarea
					maxlength="200"
					count
					:autoHeight="true"
					border="none"
					v-model="form.comment.content"
					placeholder="补充描述该物品/空间"
				/>
			</view>
			<view v-if="isEdit || isDetail" class="form__imformation">
				<u-row>
					<u-col span="11.5">
						<u-text :bold="true" text="历史记录" />
					</u-col>
					<u-col span="0.5">
						<u-icon
							@click="showHistory = !showHistory"
							color="#3988ff"
							:name="showHistory ? 'arrow-down-fill' : 'play-left-fill'"
						/>
					</u-col>
				</u-row>
				<view v-show="showHistory" :key="index" v-for="(item, index) in form.history">
					<view class="form__imformation__history">
						<view class="form__imformation__history__user">
							<text class="form__imformation__history__user-username">{{ item.username }}</text>
							<u-text lines="1" size="22rpx" :text="item.content" />
						</view>
						<u-text align="right" color="#aaadb7" :text="changeTime(item.date)" />
					</view>
					<u-line customStyle="margin:0 auto" direction="row" length="80%"></u-line>
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
onMounted(() => {
	uni.showShareMenu({
		withShareTicket: true,
		menus: ['shareAppMessage', 'shareTimeline']
	})
	if (props.isDetail || props.isEdit)
		form = reactive({
			...useForm.itemData
		})
})
const setDate = (e: any) => {
	year.value = e.value[0]
	month.value = e.value[1]
	day.value = e.value[2]
	showDate.value = false
	defaultDate.value[0] = new Date().getFullYear() - year.value
	defaultDate.value[1] = month.value - 1
	defaultDate.value[2] = day.value - 1
}
const useForm = useFormStore()
const title = useForm.itemData.name
const props = withDefaults(
	defineProps<{
		isEdit?: boolean
		isDetail?: boolean
	}>(),
	{
		isEdit: false,
		isDetail: false
	}
)
const showDate = ref(false)
const showHiddenSpace = ref(false)
const showSpace = ref(true)
const showState = ref(false)
const showCode = ref(false)
const showTag = ref(true)
const showHistory = ref(true)
const showAssociate = ref(true)
const showAdministrator = ref(true)
const showSave = ref(false)
const isPrivacy = ref(true)
const radioValue = ref('空间')
let form = reactive({
	...useForm.itemFormData
})
form.date = new Date().getTime()
const cancelSave = () => {
	showSave.value = false
	uni.switchTab({
		url: '/pages/home/home'
	})
}
const saveForm = () => {
	if (props.isEdit) Object.assign(useForm.tempItemData, form)
	else Object.assign(useForm.itemFormData, form)
	showSave.value = false
	uni.switchTab({
		url: '/pages/home/home'
	})
}
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
const formVerify = ref()
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
const time = new Date(form.date)
const year = ref(time.getFullYear())
const month = ref(time.getMonth() + 1)
const day = ref(time.getDay())
const yearList = ref([
	[
		year.value,
		year.value - 2,
		year.value - 2,
		year.value - 3,
		year.value - 4,
		year.value - 5,
		year.value - 6,
		year.value - 7,
		year.value - 8,
		year.value - 9
	],
	[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
	[
		1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26,
		27, 28, 29, 31
	]
])
const defaultDate = ref([new Date().getFullYear() - year.value, month.value - 1, day.value - 1])
const changeDate = (e: any) => {
	console.log(day)
	if (e.value[0] % 4 === 0 && e.value[0] % 100 !== 0 && e.value[1] === 2)
		yearList.value[2] = [
			1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26,
			27, 28, 29
		]
	else if (e.value[0] % 4 !== 0 && e.value[1] === 2)
		yearList.value[2] = [
			1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26,
			27, 28
		]
	else if (e.value[1] === 4 || e.value[1] === 6 || e.value[1] === 9 || e.value[1] === 11)
		yearList.value[2] = [
			1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26,
			27, 28, 29, 30
		]
	else
		yearList.value[2] = [
			1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26,
			27, 28, 29, 31
		]
}
const attributeClick = (name: string) => {
	form.attribute = name === '空间' ? 0 : 1
}
const changeTime = (timestamp: number): string => {
	const date = new Date(timestamp)
	return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDay()}`
}
onShareAppMessage(() => {
	return {
		title: 'shuzhi',
		imageUrl: 'https://uiadmin.net/uview-plus/components/input.html'
	}
})
const tagSize = (length: number) => {
	return `width:${length * 15 + 18}px;margin:0 10rpx 20rpx 0;`
}
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
const saveSpace = () => {
	console.log(1)
}
const checkboxClick = (name: number) => {
	if (!props.isDetail) form.tag[name].checked = !form.tag[name].checked
}
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
const toAssociate = () => {
	uni.navigateTo({
		url: '/pages/new/dependence/dependence'
	})
}
const toAdministrator = () => {
	console.log(1)
}
const toTag = () => {
	uni.navigateTo({
		url: '/pages/new/tag/tag'
	})
}
const deletePhoto = (event: any) => {
	form.photo.splice(event.index, 1)
}
const deleteComment = (event: any) => {
	form.comment.url.splice(event.index, 1)
}
const photoAfterRead = (event: any) => {
	for (let index = 0; index < event.file.length; index++) {
		form.photo.push({
			url: event.file[index].url
		})
	}
}
const commentAfterRead = (event: any) => {
	for (let index = 0; index < event.file.length; index++) {
		form.comment.url.push({
			url: event.file[index].url
		})
	}
}
</script>

<style lang="scss">
.form {
	margin-top: 48px;
	padding: 30rpx;
	background-color: #f6f6f6;

	&__photo {
		padding: 60rpx 0rpx 20rpx 30rpx;
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

		&__administrator {
			width: 80rpx;
			margin-right: 20rpx;
		}

		&__history {
			display: flex;

			&__user {
				display: flex;
				width: 70%;

				&-username {
					margin-right: 20rpx;
				}
			}
		}
	}

	&__submit {
		margin: 0 auto;
		width: 200rpx;
	}
}
</style>
