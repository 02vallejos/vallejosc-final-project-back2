// products.dto.js
import env from "../helpers/env.helper.js";
import crypto from "crypto";

const PERSISTENCE = env.PERSISTENCE;

class ProductsDTO {
  constructor(data) {
    if (PERSISTENCE !== "mongo") {
      this._id = crypto.randomBytes(12).toString("hex");
    }
    this.title = data.title;
    this.description = data.description;
    this.categoy = data.categoy;
    this.image =
      data.image ||
      "https://img.freepik.com/vector-gratis/carrito-compras-cosmeticos_98292-6793.jpg?ga=GA1.1.252099479.1720272023&semt=ais_hybrid&w=740";
    this.price = data.price || 10;
    this.stock = data.stock || 10;
    this.onsale = data.onsale || false;
    this.owner_id = data.owner_id;
    if (PERSISTENCE !== "mongo") {
      this.createdAt = new Date();
      this.updatedAt = new Date();
    }
  }
}

export default ProductsDTO;
