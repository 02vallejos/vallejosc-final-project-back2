//service.service.js

import { productsRepository, cartsRepository, usersRepository } from "../repositories/repository.js";

class Service {
  constructor(repository) {
    // this.manager = manager;
    this.repository = repository;
  }
  createOne = async (data) => await this.repository.createOne(data);
  readAll = async (filter) => await this.repository.readAll(filter);
  readById = async (id) => await this.repository.readById(id);
  readBy = async (filter) => await this.repository.readBy(filter);
  updateById = async (id, data) => await this.repository.updateById(id, data);
  destroyById = async (id) => await this.repository.destroyById(id);
}

const productsService = new Service(productsRepository);
const cartsService = new Service(cartsRepository);
const usersService = new Service(usersRepository);

export { productsService, cartsService, usersService };
