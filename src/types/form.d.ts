interface PhotoData {
	url: string
}

interface TagData {
	name: string
	id: number
}
interface AssociatedItemData {
	name: string
	id: number
}
interface SubordinateSpaceData {
	name: string
	id: number
	parent: number
}
interface AdministratorData {
	name: string
	id: number
	avatar: string
}
interface HistoryData {
	userName: string
	content: string
	date: number
}
interface CommentData {
	url: string[]
	content: string
}
export interface ItemData {
	id: number
	photo: PhotoData[]
	attribute: number
	name: string
	code: string
	privary: boolean
	tag: tagData[]
	amount: number
	mount: number
	date: number
	url: string
	state: string
	associatedItem: associatedItemData[]
	subordinateSpace: SubordinateSpaceData[[]]
	administrator: administratorData[]
	comment: commentData
	history: historyData[]
}
