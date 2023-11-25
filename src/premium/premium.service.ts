import { Injectable, Res } from '@nestjs/common'
import { Response } from 'express'
import { PrismaService } from 'src/prisma.service'
import Stripe from 'stripe'

@Injectable()
export class PremiumService {
	constructor(private prisma: PrismaService) {}

	async create(type: UserPremiumType, userId: number) {
		const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
			apiVersion: '2023-10-16',
			appInfo: {
				name: 'spotify-clone',
				version: '0.1.0'
			}
		})

		let session: any
		let price: number

		switch (type) {
			case 'INDIVIDUAL':
				price = 4.99
				session = await stripe.checkout.sessions.create({
					line_items: [
						{
							price: 'price_1OG0uBAHPs9P3eDBhmDUfoxx',
							quantity: 1
						}
					],
					mode: 'subscription',
					customer: 'cus_P49FTV4LMX5Z4z',
					success_url: `http://localhost:4000/premium/success/session?success=true`,
					cancel_url: `http://localhost:4000/premium/success/session?canceled=true`,
					subscription_data: {
						trial_period_days: 30
					}
				})
				break

			case 'DUO':
				price = 6.49
				session = await stripe.checkout.sessions.create({
					line_items: [
						{
							price: 'price_1OG2OIAHPs9P3eDBkmYFJjfP',
							quantity: 1
						}
					],
					mode: 'subscription',
					customer: 'cus_P49FTV4LMX5Z4z',
					success_url: `http://localhost:4000/premium/success/session?success=true`,
					cancel_url: `http://localhost:4000/premium/success/session?canceled=true`,
					subscription_data: {
						trial_period_days: 30
					}
				})
				break

			case 'STUDENT':
				price = 2.49
				session = await stripe.checkout.sessions.create({
					line_items: [
						{
							price: 'price_1OG2P9AHPs9P3eDB1WvKt2db',
							quantity: 1
						}
					],
					mode: 'subscription',
					customer: 'cus_P49FTV4LMX5Z4z',
					success_url: `http://localhost:4000/premium/success/session?success=true`,
					cancel_url: `http://localhost:4000/premium/success/session?canceled=true`,
					subscription_data: {
						trial_period_days: 30
					}
				})
				break
			case 'FAMILY':
				price = 7.99
				session = await stripe.checkout.sessions.create({
					line_items: [
						{
							price: 'price_1OG2QOAHPs9P3eDBalLJnc5W',
							quantity: 1
						}
					],
					mode: 'subscription',
					customer: 'cus_P49FTV4LMX5Z4z',
					success_url: `http://localhost:4000/premium/success/session?success=true`,
					cancel_url: `http://localhost:4000/premium/success/session?canceled=true`,
					subscription_data: {
						trial_period_days: 30
					}
				})
				break

			default:
				throw new Error()
		}
		const premium = await this.prisma.premium.create({
			data: {
				type: type,
				users: {
					connect: {
						id: userId
					}
				},
				price
			}
		})

		const order = await this.prisma.order.create({
			data: {
				status: 'PAYED',
				price: premium.price,
				item: {
					connect: {
						id: premium.id
					}
				},
				user: {
					connect: {
						id: userId
					}
				}
			}
		})

		return session
	}

	async successSession(@Res() session: Response) {
		session.redirect(process.env.APP_URL)
	}
}
