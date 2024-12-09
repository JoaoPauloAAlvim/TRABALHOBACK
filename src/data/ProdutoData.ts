import { connection } from "../connection";
import typeProduto from "../types/typeProduto";
import { CategoriaData } from "./CategoriaData";

export class ProdutoData {
  categoriaData = new CategoriaData();
  buscarTodosOsProdutos = async () => {
    try {
      const produtos = await connection("produto");
      return produtos;
    } catch (error: any) {
      throw new Error(error.sqlMessage || error.message);
    }
  };

  buscarProdutoPorId = async (idProduto: string) => {
    try {
      const produto = await connection("produto").where("idproduto", idProduto);
      return produto;
    } catch (error: any) {
      throw new Error(error.sqlMessage || error.message);
    }
  };

  adicionarUmProduto = async (
    idProduto: string,
    idCategoria: string,
    nome: string,
    preco: number,
    quantidadeEmEstoque: number
  ) => {
    try {
      const novoProduto: typeProduto = {
        idproduto: idProduto,
        nome: nome,
        preco: preco,
        quantidadeemestoque: quantidadeEmEstoque,
        idcategoria: idCategoria,
      };
      await connection("produto").insert(novoProduto);
    } catch (error: any) {
      throw new Error(error.sqlMessage || error.message);
    }
  };

  atualizarUmProdutoPorId = async (
    idProduto: string,
    idCategoria: string,
    nome: string,
    preco: number,
    quantidadeEmEstoque: number
  ) => {
    try {
      const produtoAtualizado: typeProduto = {
        idproduto: idProduto,
        nome: nome,
        preco: preco,
        quantidadeemestoque: quantidadeEmEstoque,
        idcategoria: idCategoria,
      };
      await connection("produto")
        .where("idproduto", idProduto)
        .update(produtoAtualizado);
    } catch (error: any) {
      throw new Error(error.sqlMessage || error.message);
    }
  };

  deletarProdutoPorId = async (idProduto: string) => {
    try {
      await connection("produto").where("idproduto", idProduto).delete();
    } catch (error: any) {
      throw new Error(error.message || error.sql.message);
    }
  };

  buscarProdutoDeUmFornecedorEspecifico = async (
    idProduto: string,
    idFornecedor: string
  ) => {
    try {
      const produto = await connection("produto_fornecedor as pf")
        .join("produto as p", "pf.idproduto", "=", "p.idproduto")
        .join("fornecedor as f", "pf.idfornecedor", "=", "f.idfornecedor")
        .where("pf.idproduto", idProduto)
        .andWhere("pf.idfornecedor", idFornecedor)
        .select(
          "p.nome as nomeProduto",
          "p.preco",
          "f.nomefornecedor as nomeFornecedor",
          "f.contatofornecedor",
          "f.enderecofornecedor"
        );
      return produto;
    } catch (error: any) {
      throw new Error(error.message || error.sql.message);
    }
  };
  buscarProdutosPorPrecoNomeCategoria = async (
    precoMin: number,
    precoMax: number,
    nome: string,
    idCategoria: string
  ) => {
    try {
      let query = connection("produto")
        .where("preco", ">=", precoMin)
        .andWhere("preco", "<=", precoMax);
      if (nome) {
        query = query.andWhere("nome", "LIKE", `%${nome}%`);
      }
      if (idCategoria) {
        query = query.andWhere("idcategoria", idCategoria);
      }
      const produtos = await query;
      return produtos;
    } catch (error: any) {
      throw new Error(error.message || error.sql.message);
    }
  };
  verificarProdutoExiste = async (idProduto: string) => {
    try {
      const produto = await connection("produto").where("idproduto", idProduto);
      if (produto.length === 0) {
        return false;
      }
      return true;
    } catch (error: any) {
      throw new Error(error.message || error.sql.message);
    }
  };
  verificarProdutoExisteNoFornecedor = async (
    idProduto: string,
    idFornecedor: string
  ) => {
    try {
      const produto = await connection("produto_fornecedor")
        .where("idproduto", idProduto)
        .andWhere("idfornecedor", idFornecedor);

      if (produto.length === 0) {
        return false;
      }
      return true;
    } catch (error: any) {
      throw new Error(error.message || error.sql.message);
    }
  };
}
