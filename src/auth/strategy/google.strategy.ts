import { Injectable } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { Profile } from 'passport'
import { Strategy } from 'passport-google-oauth20'
import { AuthService } from '../auth.service'

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy) {
	constructor(private authService: AuthService) {
		super({
			clientID:
				'127050566013-j82k8voee4fdu6ah4i4qg9qahhsjbg30.apps.googleusercontent.com',
			clientSecret: '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',
			callbackURL: 'http://localhost:4000/auth/google/redirect',
			scope: ['profile', 'email']
		})
	}

	async validate(accessToken: string, refreshToken: string, profile: Profile) {
		console.log(accessToken)
		console.log(refreshToken)
		console.log(profile)

		const user = await this.authService.authGoogle({
			email: profile.emails[0].value,
			name: profile.displayName
		})

		return user || null
	}
}
