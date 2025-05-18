import { Schema, Types, model } from "mongoose";

const collection = "products";
const schema = new Schema(
  {
    title: { type: String, required: true, index: true },
    description: { type: String },
    category: { type: String, default: "Laptops", enum: ["Tablets", "Smartphones", "Laptops", "Smartwatches", "Headphones", "Speakers", "Desktops", "Streaming Devices", "Keyboards", "Accessories", "Virtual Reality", "Fitness", "Cameras", "Gaming", "Televisions", "Soundbars"], index: true },
    image: { type: String, default: "https://img.freepik.com/vector-gratis/carrito-compras-cosmeticos_98292-6793.jpg?ga=GA1.1.252099479.1720272023&semt=ais_hybrid&w=740" },
    price: { type: Number, default: 10 },
    stock: { type: Number, default: 10 },
    onsale: { type: Boolean, default: false },
    owner_id: { type: Types.ObjectId, ref: "users", index: true },
  },
  { timestamps: true }
);

schema.pre(/^find/, function () {
  this.populate("owner_id", "email avatar");
});

const Product = model(collection, schema);
export default Product;
