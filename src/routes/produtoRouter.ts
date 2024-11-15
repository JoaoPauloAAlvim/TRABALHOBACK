import  express  from "express";
import { ProdutoController } from "../controller/ProdutoController";

export const produtoRouter =express.Router()

const produtoController= new ProdutoController()

produtoRouter.post("/produtos",produtoController.cadastroDeProdutos)
produtoRouter.put("/produtos/:idProduto",produtoController.atualizacaoDeProdutos)
produtoRouter.patch("/produtos/:idProduto/quantidade",produtoController.atualizarQuantidadeDeUmProduto)
produtoRouter.delete("/produtos/:idProduto",produtoController.deletarProdutoPorId)
produtoRouter.get("/produtos",produtoController.buscarTodosOsProdutos)
produtoRouter.get("/produtos/:idProduto",produtoController.buscarProdutoPorId)
produtoRouter.get("/produtos/categoria",produtoController.buscarProdutosPorCategoriaOrdenacaoPaginacao)
produtoRouter.get("/produtos/nome",produtoController.buscarProdutosPorNome)
produtoRouter.get("/produtos/filtro",produtoController.buscarProdutosPorPrecoNomeCategoria)
produtoRouter.get("/produtos/:idProduto/fornecedor/:idFornecedor",produtoController.buscarProdutoDeUmFornecedorEspecifico)
