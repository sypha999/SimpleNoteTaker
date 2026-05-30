import mongoose, {
    Document,
    Schema
} from 'mongoose';

export interface CategoryDocument
    extends Document {

    name: string;
}

const categorySchema =
    new Schema<CategoryDocument>(
        {
            name: {
                type: String,
                required: true,
                unique: true
            }
        },
        {
            timestamps: true
        }
    );

export default mongoose.model<
    CategoryDocument
>(
    'Category',
    categorySchema
);