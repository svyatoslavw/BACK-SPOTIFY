import { Injectable } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { Profile } from 'passport'
import { Strategy } from 'passport-github2'
import { AuthService } from '../auth.service'

@Injectable()
export class GithubStrategy extends PassportStrategy(Strategy) {
	constructor(private authService: AuthService) {
		super({
			clientID: '747a662f6f3a9fff59c5',
			clientSecret: 'abf6b63cd90897a41c54c85aec4c04436bf7aab7',
			callbackURL: 'http://localhost:4000/auth/github/redirect',
			scope: ['profile']
		})
	}

	async validate(accessToken: string, refreshToken: string, profile: Profile) {
		console.log(accessToken)
		console.log(refreshToken)
		console.log(profile)

		const user = await this.authService.authGoogle({
			email: profile.username + '@gmail.com',
			name: profile.username
		})

		return user || null
	}
}
