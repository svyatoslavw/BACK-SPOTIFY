enum UserRole {
	USER = 'USER',
	ADMIN = 'ADMIN',
	MODERATOR = 'MODERATOR',
	ARTIST = 'ARTIST',
	DEVELOPER = 'DEVELOPER'
}

type UserRoleType = keyof typeof UserRole
