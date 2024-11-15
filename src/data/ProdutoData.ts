import { connection } from "../connection";
import typeProduto from "../types/typeProduto";

export class ProdutoData {
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
      const produto = await connection("produto").where({ idProduto });
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

  atualizarQuantidadeDeUmProdutoPorId = async (
    quantidadeEmEstoque: number,
    idProduto: string
  ) => {
    try {
      await connection("produto")
        .where("idproduto", idProduto)
        .update({ quantidadeemestoque: quantidadeEmEstoque });
    } catch (error: any) {
      throw new Error(error.message || error.sql.message);
    }
  };
  deletarProdutoPorId = async (idProduto: string) => {
    try {
      await connection("produto").where("idproduto", idProduto).delete();
    } catch (error: any) {
      throw new Error(error.message || error.sql.message);
    }
  };

  buscarProdutosPorCategoriaComOrdenacaoPaginacao = async (
    idCategoria: string,
    offset: number,
    limit: number,
    ordenacao: string
  ) => {
    try {
      let query = connection("produto")
        .offset(offset)
        .limit(limit)
        .orderBy(ordenacao);
      if (idCategoria) {
        query = query.where("idcategoria", idCategoria);
      }
      const produtos = await query;
      return produtos;
    } catch (error: any) {
      throw new Error(error.message || error.sql.message);
    }
  };

  buscarProdutosPorNome = async (nome: string) => {
    try {
      let produtos;
      if (nome) {
        produtos = await connection("produto").where(
          "nome",
          "ILIKE",
          `${nome}`
        );
      } else {
        produtos = await connection("produto");
      }
      return produtos;
    } catch (error: any) {
      throw new Error(error.message || error.sql.message);
    }
  };
  buscarProdutoDeUmFornecedorEspecifico = async (
    idProduto: string,
    idFornecedor: string
  ) => {
    try {
      const produto = await connection("produto_fornecedor")
        .where("idproduto", idProduto)
        .andWhere("idfornecedor", idFornecedor);
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
        query = query.andWhere("nome", "ILIKE", `%${nome}%`);
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
