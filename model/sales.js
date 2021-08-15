import mongoose from 'mongoose'
const { Schema } = mongoose

const SalesDetailSchema = new Schema({
    product_id: { type: Schema.Types.ObjectId, ref: 'products' },
    name: String,
    qty: Number,
    price: Number,
})

const SalesSchema = new Schema({
    full_name: String,
    address: String,
    items: [SalesDetailSchema],
    total_price: Number,
    createdAt: { type: Date, default: Date.now() }
})

export default mongoose.model('sales', SalesSchema)