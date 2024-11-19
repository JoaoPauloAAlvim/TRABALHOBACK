import  express  from "express";
import { FornecedorController } from "../controller/FornecedorController";

export const fornecedorRouter =express.Router()

const fornecedorController= new FornecedorController()

fornecedorRouter.get("/",fornecedorController.buscarFornecedoresPorNome)
fornecedorRouter.get("/",fornecedorController.buscarTodosFornecedores)
fornecedorRouter.get("/:idFornecedor/produtos",fornecedorController.buscarTodosProdutosDeUmFornecedor)