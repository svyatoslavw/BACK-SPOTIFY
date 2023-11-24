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

		switch (type) {
			case 'INDIVIDUAL':
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
					cancel_url: `http://localhost:4000/premium/success/session?canceled=true`
				})
				break

			case 'DUO':
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
					cancel_url: `http://localhost:4000/premium/success/session?canceled=true`
				})
				break

			case 'STUDENT':
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
					cancel_url: `http://localhost:4000/premium/success/session?canceled=true`
				})
				break
			case 'FAMILY':
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
					cancel_url: `http://localhost:4000/premium/success/session?canceled=true`
				})
				break

			default:
				throw new Error('Error')
		}

		const premium = await this.prisma.premium.create({
			data: {
				type: type,
				users: {
					connect: {
						id: userId
					}
				},
				price: 10
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
