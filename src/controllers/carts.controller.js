// carts.controller.js

import { cartsService, productsService } from "../services/service.js";
import { Types } from "mongoose";

class CartsController {
  createOne = async (req, res, next) => {
    // primero compruebo que no exista el producto con ese usuario 
    const data = {
      product_id: req.params.id,
      user_id: req.user._id,
    };

     console.log("data");
    console.log(data);
    let exist = await cartsService.readBy(data);
    if(!exist) {
       let response = await cartsService.createOne(data);
    res.json200(response);
    } else {
      res.json400("Producto ya existe")
    }
  };
  readById = async (req, res, next) => {
    const { id } = req.params;
    let response = await productsService.readById(id);
    res.json200(response);
  };
  readBy = async (req, res, next) => {
    console.log("en el ready");
    const filter = {}; 
      if(req.query.product_id) {
        filter.product_id = new Types.ObjectId(req.query.product_id);
      }
      if(req.query.user_id) {
        filter.user_id = new Types.ObjectId(req.query.user_id); 
      }
      console.log(filter);

    let response = await cartsService.readBy(filter);
    console.log(response);
    res.json200(response);
  };
  readAll = async (req, res, next) => {
    const filter = {};
      filter.user_id = new Types.ObjectId(req.query.user_id); 

      let response = await cartsService.readAll(filter);
      res.json200(response);
  }  
  
}

const cartsController = new CartsController();
export default cartsController;
