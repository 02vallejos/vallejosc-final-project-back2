class DaoFs {
  constructor() {}

  createOne = () => {};
  readAll = () => {};
  readById = () => {};
  readBy = () => {};
  updateById = () => {};
  destroyById = (id) => {};
}

const productsManager = new DaoFs(Product);
const cartsManager = new DaoFs(Cart);
const usersManager = new DaoFs(User);

export { productsManager, cartsManager, usersManager};