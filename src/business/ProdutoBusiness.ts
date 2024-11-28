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
      if (isNaN(preco) || isNaN(quantidadeEmEstoque)) {
        throw new Error("Campos com formato inválido");
      }
      if (!preco || !quantidadeEmEstoque || !idCategoria || !nome) {
        throw new Error("Campos faltando");
      }

      const categoria = await this.categoriaData.verificarCategoriaExiste(
        idCategoria
      );

      if (categoria != true) {
        throw new Error("Categoria inexistente");
      }
      const idProduto = generatedId();
      const produto = this.produtoData.adicionarUmProduto(
        idProduto,
        idCategoria,
        nome,
        preco,
        quantidadeEmEstoque
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
      if (isNaN(preco) || isNaN(quantidadeEmEstoque)) {
        throw new Error("Campos com formato inválido");
      }
      if (
        !nome ||
        !preco ||
        !quantidadeEmEstoque ||
        !idCategoria ||
        !idProduto
      ) {
        throw new Error("Campos faltando");
      }

      const categoria = await this.categoriaData.verificarCategoriaExiste(
        idCategoria
      );

      if (categoria != true) {
        throw new Error("Categoria inexistente");
      }
      const produto = await this.produtoData.verificarProdutoExiste(idProduto);
      if (produto != true) {
        throw new Error("Produto inexistente");
      }
      const produtoAtualizado = this.produtoData.atualizarUmProdutoPorId(
        idProduto,
        idCategoria,
        nome,
        preco,
        quantidadeEmEstoque
      );
      return produtoAtualizado;
    } catch (error: any) {
      throw new Error(error);
    }
  };
  deletarProdutoPorId = async (idProduto: string) => {
    try {
      const produto = await this.produtoData.verificarProdutoExiste(idProduto);
      if (produto != true) {
        throw new Error("Produto inexistente");
      }
      this.produtoData.deletarProdutoPorId(idProduto);
      return "";
    } catch (error: any) {
      throw new Error(error.message);
    }
  };
  buscarProdutoPorId = async (idProduto: string) => {
    try {
      const produto = await this.produtoData.buscarProdutoPorId(idProduto);

      if (produto.length === 0) {
        throw new Error("Produto inexistente");
      }
      return produto;
    } catch (error: any) {
      throw new Error(error.message);
    }
  };

  buscarTodosOsProdutos = async () => {
    try {
      const produtos = await this.produtoData.buscarTodosOsProdutos();
      return produtos;
    } catch (error: any) {
      throw new Error(error.message);
    }
  };

  atualizarQuantidadeDeUmProduto = async (
    idProduto: string,
    quantidadeEmEstoque: number
  ) => {
    try {
      if (!idProduto || quantidadeEmEstoque === undefined) {
        throw new Error("Campos faltando");
      }

      if (isNaN(quantidadeEmEstoque)) {
        throw new Error("Campos com formato inválido");
      }

      const produto = await this.produtoData.verificarProdutoExiste(idProduto);
      if (!produto) {
        throw new Error("Produto inexistente");
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

  buscarProdutoDeUmFornecedorEspecifico = async (
    idProduto: string,
    idFornecedor: string
  ) => {
    try {
      const produto = await this.produtoData.verificarProdutoExiste(idProduto);
      if (produto != true) {
        throw new Error("Produto inexistente");
      }
      const fornecedor = await this.fornecedorData.verificarFornecedorExiste(
        idFornecedor
      );
      if (fornecedor != true) {
        throw new Error("Fornecedor inexistente");
      }
      const produtoDoFornecedor =
        await this.produtoData.verificarProdutoExisteNoFornecedor(
          idProduto,
          idFornecedor
        );
      if (produtoDoFornecedor != true) {
        throw new Error(
          "Nenhuma associação encontrada entre o produto e o fornecedor"
        );
      }
      const produtoProcurado =
        await this.produtoData.buscarProdutoDeUmFornecedorEspecifico(
          idProduto,
          idFornecedor
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
      if (isNaN(precoMax) || isNaN(precoMin)) {
        throw new Error("Campos com formato inválido");
      }
      if (idCategoria) {
        const categoria = await this.categoriaData.verificarCategoriaExiste(
          idCategoriaString
        );

        if (categoria != true) {
          throw new Error("Categoria inexistente");
        }
      }

      if (precoMin > precoMax) {
        throw new Error("Preço mínimo maior que preço máximo");
      }
      const produtos =
        await this.produtoData.buscarProdutosPorPrecoNomeCategoria(
          precoMin,
          precoMax,
          nomeString,
          idCategoriaString
        );
      return produtos;
    } catch (error: any) {
      throw new Error(error.message);
    }
  };
}
