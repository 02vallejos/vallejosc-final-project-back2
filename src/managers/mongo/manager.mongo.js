import Product from "../../data/models/products.model.js"
import Cart from "../../data/models/carts.model.js"
import User from "../../data/models/users.model.js"

class Manager {
    constructor(model) {
        this.model = model
    }
    createOne = async (data) => await this.model.create(data);
    readAll = async (filter) => await this.model.find(filter).lean();
    readById = async (id) => await this.model.findOne({ _id: id}).lean(); 
    readBy = async (filter) => await this.model.findOne(filter).lean();
    updateById = async (id, data)=> this.model.findByIdAndUpdate(id, data, {new: true});
    destroyById = async (id) => await this.model.findByIdAndDelete(id);
}

const productManager = new Manager(Product);
const cartManager = new Manager(Cart);
const userManager = new Manager(User);

export { productManager, cartManager, userManager};