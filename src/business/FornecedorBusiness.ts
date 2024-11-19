import { FornecedorData } from "../data/FornecedorData";

export class FornecedorBusiness {
  fornecedorData = new FornecedorData();

  buscarTodosOsFornecedores = async () => {
    try {
      const fornecedores =
        await this.fornecedorData.buscarTodosOsFornecedores();
      return fornecedores;
    } catch (error: any) {
      throw new Error(error.message);
    }
  };
  buscarProdutosDeUmFornecedor = async (idFornecedor: string) => {
    try {
      const fornecedor = await this.fornecedorData.verificarFornecedorExiste(
        idFornecedor
      );
      if (fornecedor != true) {
        throw new Error("Fornecedor Inexistente");
      }
      const produtos = await this.fornecedorData.buscarProdutosDeUmFornecedor(
        idFornecedor
      );
      return produtos;
    } catch (error: any) {
      throw new Error(error.message);
    }
  };
  buscarFornecedoresPorNome = async (
    nomeFornecedor: string,
    offset: number,
    limit: number,
    ordenacao: string
  ) => {
    try {
      if (isNaN(limit) || isNaN(offset)) {
        throw new Error("Campos com formato inválido");
      }
      const fornecedores = await this.fornecedorData.buscarFornecedoresPorNome(
        offset,
        limit,
        nomeFornecedor,
        ordenacao
      );

      return fornecedores;
    } catch (error: any) {
      throw new Error(error.message);
    }
  };
}
