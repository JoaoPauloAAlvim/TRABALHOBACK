import { Request, Response } from "express";
import { ProdutoBusiness } from "../business/ProdutoBusiness";

export class ProdutoController {
  produtoBusiness = new ProdutoBusiness();

  cadastroDeProdutos = async (req: Request, res: Response) => {
    const { idCategoria, nome, preco, quantidadeEmEstoque } = req.body;
    try {
      this.produtoBusiness.cadastroDeProdutos(
        preco,
        quantidadeEmEstoque,
        idCategoria,
        nome
      );
      res.status(201).send("Produto cadastrado com sucesso");
    } catch (error: any) {
      if (error.message.includes("Categoria inexistente")) {
        res.status(404).send(error.message);
      }
      if (error.message.includes("Campos faltando")) {
        res.status(400).send(error.message);
      }
      if (error.message.includes("Tipo inválido")) {
        res.status(422).send(error.message);
      }
      res.send(error.sqlMessage || error.message);
    }
  };

  atualizacaoDeProdutos = async (req: Request, res: Response) => {
    const idProduto = req.params.idProduto;
    const { idCategoria, nome, preco, quantidadeEmEstoque } = req.body;
    try {
      this.produtoBusiness.atualizacaoDeProdutos(
        preco,
        quantidadeEmEstoque,
        idCategoria,
        nome,
        idProduto
      );
      res.status(200).send("Produto atualizado com sucesso");
    } catch (error: any) {
      if (error.message.includes("Categoria inexistente")) {
        res.status(404).send(error.message);
      }
      if (error.message.includes("Campos faltando")) {
        res.status(400).send(error.message);
      }
      if (error.message.includes("Tipo inválido")) {
        res.status(422).send(error.message);
      }
      res.send(error.sqlMessage || error.message);
    }
  };
  buscarProdutoPorId = async (req: Request, res: Response) => {
    const idProduto = req.params.idProduto;
    try {
      const produto = this.produtoBusiness.buscarProdutoPorId(idProduto);
      res.status(200).send(produto);
    } catch (error: any) {
      if (error.message.includes("Produto inexistente")) {
        res.status(404).send(error.message);
      }
      res.send(error.sqlMessage || error.message);
    }
  };
  buscarTodosOsProdutos = async (req: Request, res: Response) => {
    try {
      const produtos = this.produtoBusiness.buscarTodosOsProdutos();
      res.status(200).send(produtos);
    } catch (error: any) {
      res.send(error.sqlMessage || error.message);
    }
  };
  atualizarQuantidadeDeUmProduto = async (req: Request, res: Response) => {
    const idProduto = req.params.idProduto;
    const quantidadeEmEstoque = req.body.quantidadeEmEstoque;
    try {
      this.produtoBusiness.atualizarQuantidadeDeUmProduto(
        idProduto,
        quantidadeEmEstoque
      );
      res.status(200).send("Quantidade do produto atualizada");
    } catch (error: any) {
      if (error.message.includes("Campos faltando")) {
        res.status(400).send(error.message);
      }
      if (error.message.includes("Tipo inválido")) {
        res.status(422).send(error.message);
      }
      if (error.message.includes("Produto inexistente")) {
        res.status(404).send(error.message);
      }
      res.send(error.sqlMessage || error.message);
    }
  };

  buscarProdutosPorCategoriaOrdenacaoPaginacao = async (
    req: Request,
    res: Response
  ) => {
    try {
      const offset = req.query.offset ? Number(req.query.offset) : 0;
      const limit = req.query.limit ? Number(req.query.limit) : 10;
      let ordenacao = req.query.ordenacao;
      if (typeof ordenacao !== "string") {
        ordenacao = "asc";
      }
      const idCategoria = req.query.idCategoria;
      if (typeof idCategoria !== "string") {
        throw new Error("O idCategoria deve ser uma string válida.");
      }
      const produtos =
        this.produtoBusiness.buscarProdutosPorCategoriaOrdernacaoPaginacao(
          ordenacao,
          idCategoria,
          offset,
          limit
        );
      res.status(200).send(produtos);
    } catch (error: any) {
      if (error.message.includes("Campos com formato inválido")) {
        res.status(422).send(error.message);
      }
      res.send(error.sqlMessage || error.message);
    }
  };
  buscarProdutosPorNome = async (req: Request, res: Response) => {
    try {
      let nome = req.query.nome;
      if (typeof nome !== "string") {
        throw new Error("O nome deve ser uma string válida.");
      }
      const produtos = this.produtoBusiness.buscarProdutosPorNome(nome);
      res.status(200).send(produtos);
    } catch (error: any) {
      res.send(error.sqlMessage || error.message);
    }
  };
  buscarProdutoDeUmFornecedorEspecifico = async (
    req: Request,
    res: Response
  ) => {
    try {
      const idProduto = req.params.idProduto;
      const idFornecedor = req.params.idfornecedor;
      const produto =
        this.produtoBusiness.buscarProdutoDeUmFornecedorEspecifico(
          idProduto,
          idFornecedor
        );
      res.status(200).send(produto);
    } catch (error: any) {
      if (error.message.includes("Produto inexistente")) {
        res.status(404).send(error.message);
      }
      if (error.message.includes("Fornecedor inexistente")) {
        res.status(404).send(error.message);
      }
      if (
        error.message.includes(
          "Nenhuma associação encontrada entre o produto e o fornecedor"
        )
      ) {
        res.status(404).send(error.message);
      }
      res.send(error.sqlMessage || error.message);
    }
  };
  buscarProdutosPorPrecoNomeCategoria = async (req: Request, res: Response) => {
    try {
      const precoMin = req.query.precoMin ? Number(req.query.precoMin) : 0;
      const precoMax = req.query.precoMax
        ? Number(req.query.precoMax)
        : Infinity;
      const nome = req.query.nome;
      const idCategoria = req.query.idCategoria;
      if (typeof nome !== "string") {
        throw new Error("O nome deve ser uma string válida.");
      }
      if (typeof idCategoria !== "string") {
        throw new Error("O idCategoria deve ser uma string válida.");
      }
      const produtos = this.produtoBusiness.buscarProdutosPorPrecoNomeCategoria(
        precoMin,
        precoMax,
        nome,
        idCategoria
      );
      res.status(200).send(produtos);
    } catch (error: any) {
      if (error.message.includes("Categoria inexistente")) {
        res.status(404).send(error.message);
      }
      if (error.message.includes("Preço mínimo maior que preço máximo")) {
        res.status(422).send(error.message);
      }
      if (error.message.includes("Campos com formato inválido")) {
        res.status(422).send(error.message);
      }
      res.send(error.sqlMessage || error.message);
    }
  };
}
