import express from "express";
import { ProdutoController } from "../controller/ProdutoController";

export const produtoRouter = express.Router();

const produtoController = new ProdutoController();

produtoRouter.post('/', produtoController.cadastroDeProdutos);
produtoRouter.put('/:idProduto', produtoController.atualizacaoDeProdutos);
produtoRouter.patch('/:idProduto/quantidade', produtoController.atualizarQuantidadeDeUmProduto);
produtoRouter.delete("/:idProduto", produtoController.deletarProdutoPorId);
produtoRouter.get('/', produtoController.buscarTodosOsProdutos);
produtoRouter.get('/:idProduto', produtoController.buscarProdutoPorId);
produtoRouter.get('/categoria', produtoController.buscarProdutosPorCategoriaOrdenacaoPaginacao);
produtoRouter.get('/nome', produtoController.buscarProdutosPorNome);
produtoRouter.get('/filtro', produtoController.buscarProdutosPorPrecoNomeCategoria);
produtoRouter.get('/:idProduto/fornecedores/:idFornecedor', produtoController.buscarProdutoDeUmFornecedorEspecifico);
