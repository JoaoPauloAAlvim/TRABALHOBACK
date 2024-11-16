import { Request, Response } from "express";
import { ProdutoBusiness } from "../business/ProdutoBusiness";

export class ProdutoController {
  produtoBusiness = new ProdutoBusiness();
  //ok
  cadastroDeProdutos = async (req: Request, res: Response) => {
    const { idCategoria, nome, preco, quantidadeEmEstoque } = req.body;
    try {
      const precoNumber = Number(preco);
      const quantidadeEmEstoqueNumber = Number(quantidadeEmEstoque);
      const idCategoriaString = idCategoria as string;
      const nomeString = nome as string;

      await this.produtoBusiness.cadastroDeProdutos(
        precoNumber,
        quantidadeEmEstoqueNumber,
        idCategoriaString,
        nomeString
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
      res.status(500).send(error.sqlMessage || error.message);
    }
  };
  //ok
  atualizacaoDeProdutos = async (req: Request, res: Response) => {
    const idProduto = req.params.idProduto as string;
    const { idCategoria, nome, preco, quantidadeEmEstoque } = req.body;
    const idCategoriaString = idCategoria as string;
    const nomeString = nome as string;
    try {
      const precoNumber = Number(preco);
      const quantidadeEmEstoqueNumber = Number(quantidadeEmEstoque);
      await this.produtoBusiness.atualizacaoDeProdutos(
        precoNumber,
        quantidadeEmEstoqueNumber,
        idCategoriaString,
        nomeString,
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
      res.status(500).send(error.sqlMessage || error.message);
    }
  };
  //ok
  buscarProdutoPorId = async (req: Request, res: Response) => {
    const idProduto = req.params.idProduto as string;
    try {
      const produto = await this.produtoBusiness.buscarProdutoPorId(idProduto);
      res.status(200).send(produto);
    } catch (error: any) {
      if (error.message.includes("Produto inexistente")) {
        res.status(404).send(error.message);
      }
      res.send(error.sqlMessage || error.message);
    }
  };
  //ok
  buscarTodosOsProdutos = async (req: Request, res: Response) => {
    try {
      const produtos = await this.produtoBusiness.buscarTodosOsProdutos();
      res.status(200).send(produtos);
    } catch (error: any) {
      res.status(500).send(error.sqlMessage || error.message);
    }
  };
  //ok
  atualizarQuantidadeDeUmProduto = async (req: Request, res: Response) => {
    const idProduto = req.params.idProduto as string;
    try {
      const quantidadeEmEstoque = Number(req.body.quantidadeEmEstoque);
      await this.produtoBusiness.atualizarQuantidadeDeUmProduto(
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
      res.status(500).send(error.sqlMessage || error.message);
    }
  };

  buscarProdutosPorCategoriaOrdenacaoPaginacao = async (
    req: Request,
    res: Response
  ) => {
    const idCategoria = req.query.idCategoria as string;
    try {
      const offset = req.query.offset ? Number(req.query.offset) : 0;
      const limit = req.query.limit ? Number(req.query.limit) : 10;
      let ordenacao = req.query.ordenacao as string;
      if (ordenacao !== "asc" && ordenacao !== "desc") {
        ordenacao = "asc";
      }
      const produtos =
        await this.produtoBusiness.buscarProdutosPorCategoriaOrdernacaoPaginacao(
          idCategoria,
          offset,
          limit,
          ordenacao
        );

      res.status(200).send(produtos);
    } catch (error: any) {
      if (error.message.includes("Campos com formato inválido")) {
        res.status(422).send(error.message);
      }
      res.status(500).send(error.message);
    }
  };

  buscarProdutosPorNome = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    try {
      const nome = req.query.nome as string;
      const produtos = await this.produtoBusiness.buscarProdutosPorNome(nome);
      res.status(200).send(produtos);
    } catch (error: any) {
      res.status(500).send(error.sqlMessage || error.message);
    }
  };
  //ok
  buscarProdutoDeUmFornecedorEspecifico = async (
    req: Request,
    res: Response
  ) => {
    const idProduto = req.params.idProduto as string;
    const idFornecedor = req.params.idFornecedor as string;
    try {
      const produto =
        await this.produtoBusiness.buscarProdutoDeUmFornecedorEspecifico(
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
      res.status(500).send(error.sqlMessage || error.message);
    }
  };
  buscarProdutosPorPrecoNomeCategoria = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    const nome = req.query.nome as string;
    const idCategoria = req.query.idCategoria as string;
    try {
      const precoMin = req.query.precoMin ? Number(req.query.precoMin) : 0;
      const precoMax = req.query.precoMax
        ? Number(req.query.precoMax)
        : Infinity;
      const produtos =
        await this.produtoBusiness.buscarProdutosPorPrecoNomeCategoria(
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
      res.status(500).send(error.sqlMessage || error.message);
    }
  };
  //ok
  deletarProdutoPorId = async (req: Request, res: Response): Promise<void> => {
    const idProduto = req.params.idProduto as string;
    try {
      await this.produtoBusiness.deletarProdutoPorId(idProduto);
      res.status(204).send();
    } catch (error: any) {
      if (error.message.includes("Produto inexistente")) {
        res.status(404).send(error.message);
      }
      res.status(500).send(error.sqlMessage || error.message);
    }
  };
}
