enum UserPremium {
	NONEPREMIUM = 'NONE PREMIUM',
	INDIVIDUAL = 'INDIVIDUAL',
	STUDENT = 'STUDENT',
	DUO = 'DUO',
	FAMILY = 'FAMILY'
}

type UserPremiumType = keyof typeof UserPremium
