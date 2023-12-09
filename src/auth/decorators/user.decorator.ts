// -------------------------
// NOT WORKING WITH GRAPHQL!
// -------------------------

// import { ExecutionContext, createParamDecorator } from '@nestjs/common'
// import { GqlExecutionContext } from '@nestjs/graphql'
// import { User } from '@prisma/client'

// export const CurrentUser = createParamDecorator(
// 	(data: keyof User, context: ExecutionContext) => {
// 		const ctx = GqlExecutionContext.create(context)
// 		const request = ctx.getContext().req
// 		const user = request.user

// 		if (!user) {
// 			throw new Error('User not authenticated or user data is missing')
// 		}

// 		return data ? user[data] : user
// 	}
// )
