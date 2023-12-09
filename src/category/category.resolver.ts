import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql'
import { CategoryService } from './category.service'
import { CreateCategoryInput } from './dto/create-category.input'
import { UpdateCategoryInput } from './dto/update-category.input'
import { Category } from './entities/category.entity'

@Resolver(() => Category)
export class CategoryResolver {
	constructor(private readonly categoryService: CategoryService) {}

	@Query(() => [Category], { name: 'getAllCategory' })
	findAllCategories() {
		return this.categoryService.findAll()
	}

	@Query(() => Category, { name: 'getCategoryById' })
	findCategoryById(@Args('id', { type: () => Int }) id: number) {
		return this.categoryService.findOne(id)
	}

	@Mutation(() => Category, { name: 'createCategory' })
	createCategory(
		@Args('createCategoryInput') createCategoryInput: CreateCategoryInput
	) {
		return this.categoryService.create(createCategoryInput)
	}

	@Mutation(() => Category, { name: 'updateCategory' })
	updateCategory(
		@Args('updateCategoryInput') updateCategoryInput: UpdateCategoryInput
	) {
		return this.categoryService.update(
			updateCategoryInput.id,
			updateCategoryInput
		)
	}

	@Mutation(() => Category, { name: 'deleteCategory' })
	deleteCategory(@Args('id', { type: () => Int }) id: number) {
		return this.categoryService.remove(id)
	}
}
