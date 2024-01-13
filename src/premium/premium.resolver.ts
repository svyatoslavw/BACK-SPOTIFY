import { Args, Mutation, registerEnumType, Resolver } from '@nestjs/graphql'
import { Premium } from './entities/premium.entity'
import { PremiumService } from './premium.service'
import { PremiumResponse } from './dto/premium.response'
import { UserPremium } from '../enum/premium.enum'


@Resolver()
export class PremiumResolver {
	constructor(private readonly premiumService: PremiumService) {}

	@Mutation(() => PremiumResponse, { name: 'createPayment' })
	createPayment(
		@Args('type') type: UserPremium,
		@Args('id') id: number,
	) {
		return this.premiumService.create(type,id)
	}
}
