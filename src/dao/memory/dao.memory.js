class DaoMemory {
  constructor() {}

  createOne = async (data) => {/*logica para crear uno */};
  readAll = async (filter) => {/*logica para crear uno */};
  readById = async (data) => {};
  readBy = async (id) => {};
  updateById = async (id, data) => {};
  destroyById = async (id) => {};
}

const productsManager = new DaoMemory(Product);
const cartsManager = new DaoMemory(Cart);
const usersManager = new DaoMemory(User);

export { productsManager, cartsManager, usersManager};