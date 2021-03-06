export interface Party {
	id?: string
	name: string
	members: [string]
	maxMembers: number
	totalMembers: number
	owner: PartyOwner
	createdAt?: Date
	updatedAt?: Date
	canJoin?: boolean
}

export interface PartyOwner {
	id: string
	name: string
}
