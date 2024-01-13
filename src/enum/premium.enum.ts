export enum UserPremium {
	NONEPREMIUM = 'NONEPREMIUM',
	INDIVIDUAL = 'INDIVIDUAL',
	STUDENT = 'STUDENT',
	DUO = 'DUO',
	FAMILY = 'FAMILY'
}

type UserPremiumType = keyof typeof UserPremium
