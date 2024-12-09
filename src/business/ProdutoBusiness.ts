import { ProdutoData } from "../data/ProdutoData";
import { generatedId } from "../middlewares/generatedId";
import { CategoriaData } from "../data/CategoriaData";
import { FornecedorData } from "../data/FornecedorData";
import {
  AssociationNotFoundError,
  CategoryNotFoundError,
  InvalidFormatError,
  InvalidPriceRangeError,
  MissingFieldsError,
  ProductNotFoundError,
  SupplierNotFoundError,
  
} from "../errors/CustomErrors";

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
      if (isNaN(preco) || isNaN(quantidadeEmEstoque)) {
        throw new InvalidFormatError();
      }
      if (!preco || !quantidadeEmEstoque || !idCategoria || !nome) {
        throw new MissingFieldsError();
      }

      const categoria = await this.categoriaData.verificarCategoriaExiste(
        idCategoria
      );

      if (categoria != true) {
        throw new CategoryNotFoundError();
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
    } 

  atualizacaoDeProdutos = async (
    preco: number,
    quantidadeEmEstoque: number,
    idCategoria: string,
    nome: string,
    idProduto: string
  ) => {
      if (isNaN(preco) || isNaN(quantidadeEmEstoque)) {
        throw new InvalidFormatError();
      }
      if (
        !nome ||
        !preco ||
        !quantidadeEmEstoque ||
        !idCategoria ||
        !idProduto
      ) {
        throw new MissingFieldsError();
      }

      const categoria = await this.categoriaData.verificarCategoriaExiste(
        idCategoria
      );

      if (categoria != true) {
        throw new CategoryNotFoundError();
      }
      const produto = await this.produtoData.verificarProdutoExiste(idProduto);
      if (produto != true) {
        throw new ProductNotFoundError();
      }
      const produtoAtualizado = this.produtoData.atualizarUmProdutoPorId(
        idProduto,
        idCategoria,
        nome,
        preco,
        quantidadeEmEstoque
      );
      return produtoAtualizado;
    } 
  deletarProdutoPorId = async (idProduto: string) => {
      const produto = await this.produtoData.verificarProdutoExiste(idProduto);
      if (produto != true) {
        throw new ProductNotFoundError();
      }
      this.produtoData.deletarProdutoPorId(idProduto);
      return "";
    } 
  buscarProdutoPorId = async (idProduto: string) => {
      const produto = await this.produtoData.buscarProdutoPorId(idProduto);
      if (!produto) {
        throw new ProductNotFoundError();
      }
      return produto;
    } 

  buscarTodosOsProdutos = async () => {
      const produtos = await this.produtoData.buscarTodosOsProdutos();
      return produtos;
    } 
  
  buscarProdutoDeUmFornecedorEspecifico = async (
    idProduto: string,
    idFornecedor: string
  ) => {
      const produto = await this.produtoData.verificarProdutoExiste(idProduto);
      if (produto != true) {
        throw new ProductNotFoundError();
      }
      const fornecedor = await this.fornecedorData.verificarFornecedorExiste(
        idFornecedor
      );
      if (fornecedor != true) {
        throw new SupplierNotFoundError();
      }
      const produtoDoFornecedor =
        await this.produtoData.verificarProdutoExisteNoFornecedor(
          idProduto,
          idFornecedor
        );
      if (produtoDoFornecedor != true) {
        throw new AssociationNotFoundError();
      }
      const produtoProcurado =
        await this.produtoData.buscarProdutoDeUmFornecedorEspecifico(
          idProduto,
          idFornecedor
        );
      return produtoProcurado;
    } 
  buscarProdutosPorPrecoNomeCategoria = async (
    precoMin: number,
    precoMax: number,
    nome: string,
    idCategoria: string
  ) => {
    const nomeString = nome as string;
    const idCategoriaString = idCategoria as string;
      if (isNaN(precoMax) || isNaN(precoMin)) {
        throw new InvalidFormatError();
      }
      if (idCategoria) {
        const categoria = await this.categoriaData.verificarCategoriaExiste(
          idCategoriaString
        );

        if (categoria != true) {
          throw new CategoryNotFoundError();
        }
      }

      if (precoMin > precoMax) {
        throw new InvalidPriceRangeError();
      }
      const produtos =
        await this.produtoData.buscarProdutosPorPrecoNomeCategoria(
          precoMin,
          precoMax,
          nomeString,
          idCategoriaString
        );
      return produtos;
    } 
}
