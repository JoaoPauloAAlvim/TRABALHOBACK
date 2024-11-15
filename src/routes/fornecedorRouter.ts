import  express  from "express";
import { FornecedorController } from "../controller/FornecedorController";

export const fornecedorRouter =express.Router()

const fornecedorController= new FornecedorController()

fornecedorRouter.get("/fornecedores",fornecedorController.buscarTodosFornecedores)
fornecedorRouter.get("/fornecedores/:idfornecedor/produtos",fornecedorController.buscarTodosProdutosDeUmFornecedor)