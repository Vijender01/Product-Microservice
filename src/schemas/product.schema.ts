import * as mongoose from 'mongoose';

export interface IProductSchema extends mongoose.Document {
  product_name: string;
  price: number;
  quantity: number;
  company: string;
  date_of_manufacture: Date;
  description: string;
  category: 'Electronics' | 'Clothing' | 'Groceries' | 'Furniture' | 'Books';
}

export const ProductSchema = new mongoose.Schema<IProductSchema>(
  {
    product_name: {
      type: String,
      required: [true, 'Product name cannot be empty'],
      trim: true,
      maxlength: [100, 'Product name cannot exceed 100 characters'],
    },
    price: {
      type: Number,
      required: [true, 'Price cannot be empty'],
      min: [0, 'Price cannot be negative'],
    },
    quantity: {
      type: Number,
      required: [true, 'Quantity cannot be empty'],
      min: [0, 'Quantity cannot be negative'],
    },
    company: {
      type: String,
      required: [true, 'Company name cannot be empty'],
      trim: true,
    },
    date_of_manufacture: {
      type: Date,
      required: [true, 'Date of manufacture cannot be empty'],
    },
    description: {
      type: String,
      trim: true,
      maxlength: [500, 'Description cannot exceed 500 characters'],
    },
    category: {
      type: String,
      enum: ['Electronics', 'Clothing', 'Groceries', 'Furniture', 'Books'],
      required: [true, 'Category cannot be empty'],
    },
  },
  {
    timestamps: true, // Adds createdAt and updatedAt fields
    toObject: {
      versionKey: false,
      transform: (_doc, ret: { [key: string]: any }) => {
        delete ret._id; // Remove _id from the response
      },
    },
    toJSON: {
      versionKey: false,
      transform: (_doc, ret: { [key: string]: any }) => {
        delete ret._id; // Remove _id from the response
      },
    },
  },
);

export const ProductModel = mongoose.model<IProductSchema>(
  'Product',
  ProductSchema,
);
