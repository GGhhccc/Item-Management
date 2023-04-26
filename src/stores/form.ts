import type { ItemData } from '@/types/form'
import { defineStore } from 'pinia'
import { ref, reactive } from 'vue'

export const useFormStore = defineStore('form', () => {
	const itemData = reactive<ItemData>({
		id: 8,
		photo: [{ url: 'https://cdn.seovx.com/d/?mom=302' }],
		attribute: 0,
		name: 'decade品红腰带',
		code: 'data:image/png;base64,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',
		privary: true,
		tag: [
			{
				name: '电子产品',
				checked: true
			},
			{
				name: '生活用品',
				checked: false
			},
			{
				name: '回血道具',
				checked: false
			},
			{
				name: '神装',
				checked: false
			}
		],
		amount: 114,
		mount: 514,
		date: 1681989647439,
		url: 'https://uiadmin.net/uview-plus/components/input.html',
		state: '半身不遂',
		associatedItem: [],
		subordinateSpace: [
			[
				{
					name: '汤臣一品',
					checked: true,
					id: 1,
					parent: -1,
					floor: 1
				},
				{
					name: '碧桂园',
					checked: false,
					id: 2,
					parent: -1,
					floor: 1
				},
				{
					name: '故宫',
					checked: false,
					id: 3,
					parent: -1,
					floor: 1
				}
			],
			[
				{
					name: '卧室',
					checked: true,
					id: 4,
					parent: 1,
					floor: 2
				},
				{
					name: '厨房',
					checked: false,
					id: 5,
					parent: 2,
					floor: 2
				},
				{
					name: '厕所',
					checked: false,
					id: 6,
					parent: 3,
					floor: 2
				}
			],
			[
				{
					name: '衣柜',
					checked: true,
					id: 7,
					parent: 4,
					floor: 3
				},
				{
					name: '马桶',
					checked: false,
					id: 8,
					parent: 5,
					floor: 3
				},
				{
					name: '床底',
					checked: false,
					id: 9,
					parent: 6,
					floor: 3
				}
			]
		],
		administrator: [
			{
				name: '灵梦',
				avatar: 'https://cdn.seovx.com/d/?mom=302'
			},
			{
				name: '魔理沙',
				avatar: 'https://cdn.seovx.com/d/?mom=302'
			},
			{
				name: '幽幽子',
				avatar: 'https://cdn.seovx.com/d/?mom=302'
			},
			{
				name: '妖梦',
				avatar: 'https://cdn.seovx.com/d/?mom=302'
			},
			{
				name: '八云紫',
				avatar: 'https://cdn.seovx.com/d/?mom=302'
			}
		],
		comment: {
			url: [{ url: 'https://cdn.seovx.com/d/?mom=302' }],
			content: '这是俺捡滴'
		},
		history: [
			{
				username: '灵梦',
				content: '把腰带卖掉拿去买酒了',
				date: 1681989647439
			},
			{
				username: '魔理沙',
				content: '尝试用到弹幕游戏中',
				date: 1681989646666
			},
			{
				username: '幽幽子',
				content: '啃了一口',
				date: 1681989640000
			}
		]
	})
	const tempItemData = reactive<ItemData>({
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
	const itemFormData = reactive<ItemData>({
		id: 0,
		photo: [],
		attribute: 0,
		name: '0',
		code: '',
		privary: true,
		tag: [],
		amount: 0,
		mount: 0,
		date: 0,
		url: '',
		state: '',
		associatedItem: [],
		subordinateSpace: [],
		administrator: [[]],
		comment: {
			url: [],
			content: ''
		},
		history: []
	})
	const submitForm = () => {
		console.log(1)
	}
	const allItemData = reactive([
		[
			{
				name: '汤臣一品',
				attribute: 0,
				url: 'https://cdn.seovx.com/d/?mom=302',
				id: 1,
				parent: -1,
				floor: 1,
				privary: true,
				administrator: [
					'https://cdn.seovx.com/d/?mom=302',
					'https://cdn.seovx.com/d/?mom=302',
					'https://cdn.seovx.com/d/?mom=302',
					'https://cdn.seovx.com/d/?mom=302',
					'https://cdn.seovx.com/d/?mom=302'
				],
				content: [
					'https://cdn.seovx.com/d/?mom=302',
					'https://cdn.seovx.com/d/?mom=302',
					'https://cdn.seovx.com/d/?mom=302',
					'https://cdn.seovx.com/d/?mom=302',
					'https://cdn.seovx.com/d/?mom=302'
				]
			},
			{
				name: '碧桂园',
				attribute: 0,
				id: 2,
				url: 'https://cdn.seovx.com/d/?mom=302',
				parent: -1,
				floor: 1,
				privary: true,
				administrator: [
					'https://cdn.seovx.com/d/?mom=302',
					'https://cdn.seovx.com/d/?mom=302',
					'https://cdn.seovx.com/d/?mom=302',
					'https://cdn.seovx.com/d/?mom=302',
					'https://cdn.seovx.com/d/?mom=302'
				],
				content: [
					'https://cdn.seovx.com/d/?mom=302',
					'https://cdn.seovx.com/d/?mom=302',
					'https://cdn.seovx.com/d/?mom=302',
					'https://cdn.seovx.com/d/?mom=302',
					'https://cdn.seovx.com/d/?mom=302'
				]
			},
			{
				name: '故宫',
				attribute: 0,
				url: 'https://cdn.seovx.com/d/?mom=302',
				id: 3,
				parent: -1,
				privary: false,
				floor: 1,
				administrator: [
					'https://cdn.seovx.com/d/?mom=302',
					'https://cdn.seovx.com/d/?mom=302',
					'https://cdn.seovx.com/d/?mom=302',
					'https://cdn.seovx.com/d/?mom=302',
					'https://cdn.seovx.com/d/?mom=302'
				],
				content: [
					'https://cdn.seovx.com/d/?mom=302',
					'https://cdn.seovx.com/d/?mom=302',
					'https://cdn.seovx.com/d/?mom=302',
					'https://cdn.seovx.com/d/?mom=302',
					'https://cdn.seovx.com/d/?mom=302'
				]
			}
		],
		[
			{
				name: '卧室',
				attribute: 0,
				url: 'https://cdn.seovx.com/d/?mom=302',
				id: 4,
				parent: 1,
				privary: true,
				floor: 2,
				administrator: [
					'https://cdn.seovx.com/d/?mom=302',
					'https://cdn.seovx.com/d/?mom=302',
					'https://cdn.seovx.com/d/?mom=302',
					'https://cdn.seovx.com/d/?mom=302',
					'https://cdn.seovx.com/d/?mom=302'
				],
				content: [
					'https://cdn.seovx.com/d/?mom=302',
					'https://cdn.seovx.com/d/?mom=302',
					'https://cdn.seovx.com/d/?mom=302',
					'https://cdn.seovx.com/d/?mom=302',
					'https://cdn.seovx.com/d/?mom=302'
				]
			},
			{
				name: '厨房',
				attribute: 0,
				url: 'https://cdn.seovx.com/d/?mom=302',
				id: 5,
				parent: 2,
				privary: true,
				floor: 2,
				administrator: [
					'https://cdn.seovx.com/d/?mom=302',
					'https://cdn.seovx.com/d/?mom=302',
					'https://cdn.seovx.com/d/?mom=302',
					'https://cdn.seovx.com/d/?mom=302',
					'https://cdn.seovx.com/d/?mom=302'
				],
				content: [
					'https://cdn.seovx.com/d/?mom=302',
					'https://cdn.seovx.com/d/?mom=302',
					'https://cdn.seovx.com/d/?mom=302',
					'https://cdn.seovx.com/d/?mom=302',
					'https://cdn.seovx.com/d/?mom=302'
				]
			},
			{
				name: '厕所',
				attribute: 0,
				url: 'https://cdn.seovx.com/d/?mom=302',
				id: 6,
				parent: 3,
				privary: false,
				floor: 2,
				administrator: [
					'https://cdn.seovx.com/d/?mom=302',
					'https://cdn.seovx.com/d/?mom=302',
					'https://cdn.seovx.com/d/?mom=302',
					'https://cdn.seovx.com/d/?mom=302',
					'https://cdn.seovx.com/d/?mom=302'
				],
				content: [
					'https://cdn.seovx.com/d/?mom=302',
					'https://cdn.seovx.com/d/?mom=302',
					'https://cdn.seovx.com/d/?mom=302',
					'https://cdn.seovx.com/d/?mom=302',
					'https://cdn.seovx.com/d/?mom=302'
				]
			},
			{
				name: '手办',
				attribute: 1,
				url: 'https://cdn.seovx.com/d/?mom=302',
				id: 7,
				parent: 1,
				privary: true,
				floor: 3,
				administrator: [
					'https://cdn.seovx.com/d/?mom=302',
					'https://cdn.seovx.com/d/?mom=302',
					'https://cdn.seovx.com/d/?mom=302',
					'https://cdn.seovx.com/d/?mom=302',
					'https://cdn.seovx.com/d/?mom=302'
				],
				content: [
					'https://cdn.seovx.com/d/?mom=302',
					'https://cdn.seovx.com/d/?mom=302',
					'https://cdn.seovx.com/d/?mom=302',
					'https://cdn.seovx.com/d/?mom=302',
					'https://cdn.seovx.com/d/?mom=302'
				]
			}
		],
		[
			{
				name: '风扇',
				attribute: 1,
				url: 'https://cdn.seovx.com/d/?mom=302',
				id: 8,
				parent: 5,
				privary: true,
				floor: 3,
				administrator: [
					'https://cdn.seovx.com/d/?mom=302',
					'https://cdn.seovx.com/d/?mom=302',
					'https://cdn.seovx.com/d/?mom=302',
					'https://cdn.seovx.com/d/?mom=302',
					'https://cdn.seovx.com/d/?mom=302'
				],
				content: [
					'https://cdn.seovx.com/d/?mom=302',
					'https://cdn.seovx.com/d/?mom=302',
					'https://cdn.seovx.com/d/?mom=302',
					'https://cdn.seovx.com/d/?mom=302',
					'https://cdn.seovx.com/d/?mom=302'
				]
			},
			{
				name: '衣柜',
				attribute: 0,
				url: 'https://cdn.seovx.com/d/?mom=302',
				id: 9,
				parent: 4,
				privary: false,
				floor: 3,
				administrator: [
					'https://cdn.seovx.com/d/?mom=302',
					'https://cdn.seovx.com/d/?mom=302',
					'https://cdn.seovx.com/d/?mom=302',
					'https://cdn.seovx.com/d/?mom=302',
					'https://cdn.seovx.com/d/?mom=302'
				],
				content: [
					'https://cdn.seovx.com/d/?mom=302',
					'https://cdn.seovx.com/d/?mom=302',
					'https://cdn.seovx.com/d/?mom=302',
					'https://cdn.seovx.com/d/?mom=302',
					'https://cdn.seovx.com/d/?mom=302'
				]
			},
			{
				name: '马桶',
				attribute: 0,
				url: 'https://cdn.seovx.com/d/?mom=302',
				id: 10,
				parent: 5,
				privary: true,
				floor: 3,
				administrator: [
					'https://cdn.seovx.com/d/?mom=302',
					'https://cdn.seovx.com/d/?mom=302',
					'https://cdn.seovx.com/d/?mom=302',
					'https://cdn.seovx.com/d/?mom=302',
					'https://cdn.seovx.com/d/?mom=302'
				],
				content: [
					'https://cdn.seovx.com/d/?mom=302',
					'https://cdn.seovx.com/d/?mom=302',
					'https://cdn.seovx.com/d/?mom=302',
					'https://cdn.seovx.com/d/?mom=302',
					'https://cdn.seovx.com/d/?mom=302'
				]
			},
			{
				name: '床底',
				attribute: 0,
				url: 'https://cdn.seovx.com/d/?mom=302',
				id: 11,
				parent: 6,
				privary: true,
				floor: 3,
				administrator: [
					'https://cdn.seovx.com/d/?mom=302',
					'https://cdn.seovx.com/d/?mom=302',
					'https://cdn.seovx.com/d/?mom=302',
					'https://cdn.seovx.com/d/?mom=302',
					'https://cdn.seovx.com/d/?mom=302'
				],
				content: [
					'https://cdn.seovx.com/d/?mom=302',
					'https://cdn.seovx.com/d/?mom=302',
					'https://cdn.seovx.com/d/?mom=302',
					'https://cdn.seovx.com/d/?mom=302',
					'https://cdn.seovx.com/d/?mom=302'
				]
			}
		]
	])
	const currentId = ref(0)
	const currentFloor = ref(0)
	const currentName = ref('')
	const spaces = ref<string[]>([])
	return {
		itemData,
		itemFormData,
		submitForm,
		allItemData,
		tempItemData,
		currentId,
		currentFloor,
		currentName,
		spaces
	}
})
