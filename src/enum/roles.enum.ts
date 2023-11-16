enum UserRole {
	USER = 'USER',
	ADMIN = 'ADMIN',
	MODERATOR = 'MODERATOR',
	SUPPORT = 'SUPPORT',
	DEVELOPER = 'DEVELOPER'
}

type UserRoleType = keyof typeof UserRole
