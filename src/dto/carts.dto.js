// CartsDTO.js

import env from "../helpers/env.helper.js";
import crypto from "crypto";

const PERSISTENCE = env.PERSISTENCE;

class CartsDTO {
  constructor(data) {
    if (PERSISTENCE !== "mongo") {
      this._id = crypto.randomBytes(12).toString("hex");
    }
    this.product_id = data.product_id;
    this.user_id = data.user_id;
    this.cuantity = data.cuantity || 1;
    this.state = data.state || "reserved";
    if (PERSISTENCE !== "mongo") {
      this.createdAt = new Date();
      this.updatedAt = new Date();
    }
  }
}

export default CartsDTO;
