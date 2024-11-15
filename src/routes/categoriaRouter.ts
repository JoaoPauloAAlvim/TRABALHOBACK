import  express  from "express";
import { CategoriaController } from "../controller/CategoriaController";

export const categoriaRouter =express.Router()

const categoriaController= new CategoriaController()

categoriaRouter.get("/categorias",categoriaController.buscarTodasCategorias)
categoriaRouter.get("/categorias/:idCategoria/produtos",categoriaController.buscarTodosProdutosDeUmaCategoria)