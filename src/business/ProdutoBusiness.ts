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
      

      const categoria = await this.categoriaData.verificarCategoriaExiste(idCategoria);

      if (categoria != true) {
        throw new Error("Categoria inexistente");
      }
      if (isNaN(preco) || isNaN(quantidadeEmEstoque)) {
        throw new Error("Campos com formato inválido");
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

      if (isNaN(precoNumber) || isNaN(quantidadeEmEstoqueNumber)) {
        throw new Error("Campos com formato inválido");
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
  //ok
  deletarProdutoPorId = async(idProduto:string)=>{
    try {
      const produto = await this.produtoData.verificarProdutoExiste(idProduto)
      if (produto !=true) {
        throw new Error("Produto inexistente");
      }
      this.produtoData.deletarProdutoPorId(idProduto)
      return "";
    } catch (error:any) {
      throw new Error(error.message);
    }
  }
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
      if (!quantidadeEmEstoque || !idProduto) {
        throw new Error("Campos faltando");
      }
      if (isNaN(quantidadeEmEstoque)) {
        throw new Error("Campos com formato inválido");
      }
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
    idCategoria: string,
    offset: number,
    limit: number,
    ordenacao: string
  ) => {
    
    try {
      if (isNaN(limit) || isNaN(offset)) {
        throw new Error("Campos com formato inválido");
      }
      const produtos =
        await this.produtoData.buscarProdutosPorCategoriaComOrdenacaoPaginacao(
          idCategoria,
          offset,
          limit,
          ordenacao
        );

      return produtos;
    } catch (error: any) {
      throw new Error(error.message);
    }
  };
  buscarProdutosPorNome = async (nome: string) => {
    try {
      const produtos = await this.produtoData.buscarProdutosPorNome(nome);
      return produtos;
    } catch (error: any) {
      throw new Error(error.message);
    }
  };
  buscarProdutoDeUmFornecedorEspecifico = async (
    idProduto: string,
    idFornecedor: string
  ) => {
    try {
      const produto = await this.produtoData.verificarProdutoExiste(
        idProduto
      );
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
      const categoria = await this.categoriaData.verificarCategoriaExiste(
        idCategoriaString
      );

      if (categoria != true) {
        throw new Error("Categoria inexistente");
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
