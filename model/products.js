import mongoose from 'mongoose'
const { Schema } = mongoose

const ProductSchema = new Schema({
    sku: {
        type: String,
        required: true,
        unique: true,
    },
    name: {
        type: String,
        required: true
    },
    description: String
})

export default mongoose.model('products', ProductSchema)