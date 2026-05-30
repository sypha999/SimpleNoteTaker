import Category from '../models/Category';

export class CategoryService {

    async findOrCreateCategory(
        categoryName: string
    ) {

        let category =
            await Category.findOne({
                name: categoryName
            });

        if (!category) {

            category =
                await Category.create({
                    name: categoryName
                });
        }

        return category;
    }
}