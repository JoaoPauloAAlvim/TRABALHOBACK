import { ProdutoData } from "../data/ProdutoData";
import { generatedId } from "../middlewares/generatedId";
import { CategoriaData } from "../data/CategoriaData";
import { FornecedorData } from "../data/FornecedorData";

export class ProdutoBusiness {
  produtoData = new ProdutoData();
  categoriaData = new CategoriaData();
  fornecedorData = new FornecedorData();

  cadastroDeProdutos = async (
    preco: number,
    quantidadeEmEstoque: number,
    idCategoria: string,
    nome: string
  ) => {
    try {
      if (!preco || !quantidadeEmEstoque || !idCategoria || !nome) {
        throw new Error("Campos faltando");
      }
      const precoNumber = Number(preco);
      const quantidadeEmEstoqueNumber = Number(quantidadeEmEstoque);
      const idCategoriaString = idCategoria as string;
      const nomeString = nome as string;

      const categoria = await this.categoriaData.verificarCategoriaExiste(
        idCategoriaString
      );

      if (categoria != true) {
        throw new Error("Categoria inexistente");
      }
      if (isNaN(preco) || isNaN(quantidadeEmEstoque)) {
        throw new Error("Campo(s) com tipo inválido");
      }
      const idProduto = generatedId();
      const produto = this.produtoData.adicionarUmProduto(
        idProduto,
        idCategoriaString,
        nomeString,
        precoNumber,
        quantidadeEmEstoqueNumber
      );
      return produto;
    } catch (error: any) {
      throw new Error(error);
    }
  };

  atualizacaoDeProdutos = async (
    preco: number,
    quantidadeEmEstoque: number,
    idCategoria: string,
    nome: string,
    idProduto: string
  ) => {
    try {
      if (
        !nome ||
        !preco ||
        !quantidadeEmEstoque ||
        !idCategoria ||
        !idProduto
      ) {
        throw new Error("Campo(s) faltando");
      }
      const precoNumber = Number(preco);
      const quantidadeEmEstoqueNumber = Number(quantidadeEmEstoque);
      const idCategoriaString = idCategoria as string;
      const nomeString = nome as string;
      const idProdutoString = idProduto as string;

      const categoria = await this.categoriaData.verificarCategoriaExiste(
        idCategoriaString
      );

      if (categoria != true) {
        throw new Error("Categoria inexistente");
      }

      if (isNaN(preco) || isNaN(quantidadeEmEstoque)) {
        throw new Error("Campo(s) com tipo inválido");
      }
      const produtoAtualizado = this.produtoData.atualizarUmProdutoPorId(
        idProdutoString,
        idCategoriaString,
        nomeString,
        precoNumber,
        quantidadeEmEstoqueNumber
      );
      return produtoAtualizado;
    } catch (error: any) {
      throw new Error(error);
    }
  };
  buscarProdutoPorId = async (idProduto: string) => {
    try {
      const produto = await this.produtoData.buscarProdutoPorId(idProduto);

      if (produto.length === 0) {
        throw new Error("Produto inexistente");
      }
    } catch (error: any) {
      throw new Error(error.message);
    }
  };

  buscarTodosOsProdutos = async () => {
    try {
      const produtos = await this.produtoData.buscarTodosOsProdutos();
    } catch (error: any) {
      throw new Error(error.message);
    }
  };

  atualizarQuantidadeDeProdutos = async (
    idProduto: string,
    quantidadeEmEstoque: number
  ) => {
    try {
      const produto = await this.produtoData.verificarProdutoExiste(idProduto);

      if (produto != true) {
        throw new Error("Produto Inexistente");
      }
      const quantidade =
        await this.produtoData.atualizarQuantidadeDeUmProdutoPorId(
          quantidadeEmEstoque,
          idProduto
        );
      return quantidade;
    } catch (error: any) {
      throw new Error(error.message);
    }
  };
  buscarProdutosPorCategoriaOrdernacaoPaginacao = async (
    ordenacao: string,
    idCategoria: string,
    offset: number,
    limit: number
  ) => {
    const ordenacaoString = ordenacao === "desc" ? "desc" : "asc";
    const idCategoriaString = idCategoria as string;
    try {
      const limitNumber = Number(limit) || 10;
      const offsetNumber = Number(offset) || 0;

      if (isNaN(limit) || isNaN(offset)) {
        throw new Error("Campo(s) com formato inválido");
      }
      const produtos =
        await this.produtoData.buscarProdutosPorCategoriaComOrdenacaoPaginacao(
          idCategoriaString,
          offsetNumber,
          limitNumber,
          ordenacaoString
        );

      return produtos;
    } catch (error: any) {
      throw new Error(error.message);
    }
  };
  buscarProdutosPorNome = async (nome: string) => {
    const nomeString = nome as string;
    try {
      const produtos = await this.produtoData.buscarProdutosPorNome(nomeString);
      return produtos;
    } catch (error: any) {
      throw new Error(error.message);
    }
  };
  buscarProdutoDeUmFornecedorEspecifico = async (
    idProduto: string,
    idFornecedor: string
  ) => {
    const idProdutoString = idProduto as string;
    const idFornecedorString = idFornecedor as string;
    try {
      const produto = await this.produtoData.verificarProdutoExiste(
        idProdutoString
      );
      if (produto != true) {
        throw new Error("Produto inexistente");
      }
      const fornecedor = await this.fornecedorData.verificarFornecedorExiste(
        idFornecedorString
      );
      if (fornecedor != true) {
        throw new Error("Fornecedor inexistente");
      }
      const produtoDoFornecedor =
        await this.produtoData.verificarProdutoExisteNoFornecedor(
          idProdutoString,
          idFornecedorString
        );
      if (produtoDoFornecedor != true) {
        throw new Error(
          "Nenhuma associação encontrada entre o produto e o fornecedor"
        );
      }
      const produtoProcurado =
        await this.produtoData.buscarProdutoDeUmFornecedorEspecifico(
          idProdutoString,
          idFornecedorString
        );
      return produtoProcurado;
    } catch (error: any) {
      throw new Error(error.message);
    }
  };
  buscarProdutosPorPrecoNomeCategoria = async (
    precoMin: number,
    precoMax: number,
    nome: string,
    idCategoria: string
  ) => {
    const nomeString = nome as string;
    const idCategoriaString = idCategoria as string;
    try {
      const precoMinNumber = Number(precoMin) || 0;
      const precoMaxNumber = Number(precoMax) || Infinity;

      if (isNaN(precoMax) || isNaN(precoMin)) {
        throw new Error("Campo(s) com formato inválido");
      }
      const categoria = await this.categoriaData.verificarCategoriaExiste(
        idCategoriaString
      );

      if (categoria != true) {
        throw new Error("Categoria inexistente");
      }
      if (precoMinNumber > precoMaxNumber) {
        throw new Error("Preço mínimo maior que preço máximo");
      }
      const produtos =
        await this.produtoData.buscarProdutosPorPrecoNomeCategoria(
          precoMinNumber,
          precoMaxNumber,
          nomeString,
          idCategoriaString
        );
      return produtos;
    } catch (error: any) {
      throw new Error(error.message);
    }
  };
}