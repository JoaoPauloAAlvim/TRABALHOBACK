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
      const produtos = await connection("produto_fornecedor")
        .join(
          "produto",
          "produto_fornecedor.idproduto",
          "=",
          "produto.idproduto"
        )
        .join(
          "fornecedor",
          "produto_fornecedor.idfornecedor",
          "=",
          "fornecedor.idfornecedor"
        )
        .where("produto_fornecedor.idfornecedor", idFornecedor)
        .select(
          "produto.nome as nomeProduto",
          "fornecedor.nomefornecedor as nomeFornecedor",
          "produto.*"
        );
      return produtos;
    } catch (error: any) {
      throw new Error(error.message || error.sql.message);
    }
  };
  verificarFornecedorExiste = async(idFornecedor:string) =>{
    try {
        const fornecedor = await connection("fornecedor").where("idfornecedor",idFornecedor)
        if(fornecedor.length===0){
           return false;
        }
        return true
    } catch (error:any) {
        throw new Error(error.message || error.sql.message);
    }
  }
}
