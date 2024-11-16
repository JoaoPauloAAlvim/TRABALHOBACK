import  express  from "express";
import { CategoriaController } from "../controller/CategoriaController";

export const categoriaRouter =express.Router()

const categoriaController= new CategoriaController()

categoriaRouter.get("/",categoriaController.buscarTodasCategorias)
categoriaRouter.get("/:idCategoria/produtos",categoriaController.buscarTodosProdutosDeUmaCategoria)