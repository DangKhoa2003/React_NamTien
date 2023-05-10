import mongoose from "mongoose";
const productSchema = mongoose.Schema({
    title: String,
    selectedFile: String,
    likeCount: {
        type: Number,
        default: 0
    },
    category: String
});

const ProductMessage = mongoose.model('ProductMessage', productSchema);
export default ProductMessage;