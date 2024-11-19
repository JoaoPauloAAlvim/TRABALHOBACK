import express from "express";
import { ProdutoController } from "../controller/ProdutoController";

export const produtoRouter = express.Router();

const produtoController = new ProdutoController();

produtoRouter.get('/filtro', produtoController.buscarProdutosPorPrecoNomeCategoria); 
produtoRouter.post('/', produtoController.cadastroDeProdutos); 
produtoRouter.get('/', produtoController.buscarTodosOsProdutos); 

produtoRouter.get('/:idProduto/fornecedores/:idFornecedor', produtoController.buscarProdutoDeUmFornecedorEspecifico); 
produtoRouter.patch('/:idProduto/quantidade', produtoController.atualizarQuantidadeDeUmProduto); 
produtoRouter.put('/:idProduto', produtoController.atualizacaoDeProdutos); 
produtoRouter.delete('/:idProduto', produtoController.deletarProdutoPorId); 
produtoRouter.get('/:idProduto', produtoController.buscarProdutoPorId);
