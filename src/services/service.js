//service.service.js

// import { productsManager, usersManager, cartsManager } from "../managers/mongo/manager.mongo.js";
// import { productsManager, usersManager, cartsManager } from "../dao/factory.js";
// import productsRepository from "../repositories/products.repository.js";
// import cartsRepository from "../repositories/carts.repository.js";
// import usersRepository from "../repositories/users.repository.js";

import { productsRepository, cartsRepository, usersRepository } from "../repositories/repository.js";

class Service {
  constructor(repository) {
    // this.manager = manager;
    this.repository = repository;
  }
  readAll = async (filter) => await this.repository.readAll(filter);
  readById = async (id) => await this.repository.readById(id);
  readBy = async (filter) => await this.repository.readBy(filter);
  createOne = async (data) => await this.repository.createOne(data);
  updateById = async (id, data) => await this.repository.updateById(id, data);
  destroyById = async (id) => await this.repository.destroyById(id);
}

const productsService = new Service(productsRepository);
const cartsService = new Service(cartsRepository);
const usersService = new Service(usersRepository);

export { productsService, cartsService, usersService };
