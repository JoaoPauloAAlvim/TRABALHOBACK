import { connection } from "../connection";

export class FornecedorData {
  buscarTodosOsFornecedores = async () => {
    try {
      const fornecedores = await connection("fornecedor");
      return fornecedores;
    } catch (error: any) {
      throw new Error(error.message || error.sql.message);
    }
  };

  buscarProdutosDeUmFornecedor = async (idFornecedor: string) => {
    try {
      const produtos = await connection("produto_fornecedor as pf")
        .join("produto as p", "pf.idproduto", "=", "p.idproduto")
        .join("fornecedor as f", "pf.idfornecedor", "=", "f.idfornecedor")
        .where("pf.idfornecedor", idFornecedor)
        .select(
          "p.idproduto",
          "p.nome",
          "p.preco",
          "p.quantidadeemestoque",
          "f.nomefornecedor"
        );
      return produtos;
    } catch (error: any) {
      console.error("Erro ao buscar produtos do fornecedor:", error);
      throw new Error(error.message || error.sql.message);
    }
  };
  buscarFornecedoresPorNome = async (
    offset: number,
    limit: number,
    nomeFornecedor: string,
    ordenacao: string
  ) => {
    try {
      let fornecedores;
      if (nomeFornecedor) {
        fornecedores = await connection("fornecedor")
          .where("nomefornecedor", "LIKE", `%${nomeFornecedor}%`)
          .orderBy("nome", ordenacao)
          .limit(limit)
          .offset(offset);
      } else {
        fornecedores = await connection("fornecedor")
          .orderBy("nomefornecedor", ordenacao)
          .limit(limit)
          .offset(offset);
      }
      return fornecedores;
    } catch (error: any) {
      throw new Error(error.message || error.sql.message);
    }
  };

  verificarFornecedorExiste = async (idFornecedor: string) => {
    try {
      const fornecedor = await connection("fornecedor").where(
        "idfornecedor",
        idFornecedor
      );
      if (fornecedor.length === 0) {
        return false;
      }
      return true;
    } catch (error: any) {
      throw new Error(error.message || error.sql.message);
    }
  };
}
