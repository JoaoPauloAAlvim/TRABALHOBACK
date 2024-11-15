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
    const idFornecedorString = idFornecedor as string;
    try {
      const fornecedor = await this.fornecedorData.verificarFornecedorExiste(
        idFornecedorString
      );
      if (fornecedor != true) {
        throw new Error("Fornecedor Inexistente");
      }
      const produtos = await this.fornecedorData.buscarProdutosDeUmFornecedor(
        idFornecedorString
      );
      return produtos;
    } catch (error: any) {
        throw new Error(error.message);
    }
  };
}
