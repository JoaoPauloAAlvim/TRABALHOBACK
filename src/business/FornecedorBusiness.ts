import { FornecedorData } from "../data/FornecedorData";
import { MissingFieldsError, SupplierNotFoundError } from "../errors/CustomErrors";

export class FornecedorBusiness {
  fornecedorData = new FornecedorData();

  buscarTodosOsFornecedores = async () => {
      const fornecedores =
        await this.fornecedorData.buscarTodosOsFornecedores();
      return fornecedores;
    } 
  buscarProdutosDeUmFornecedor = async (idFornecedor: string) => {
      const fornecedor = await this.fornecedorData.verificarFornecedorExiste(
        idFornecedor
      );
      if (!fornecedor) {
        throw new SupplierNotFoundError();
      }
      const produtos = await this.fornecedorData.buscarProdutosDeUmFornecedor(
        idFornecedor
      );
      return produtos;
    } 
  buscarFornecedoresPorNome = async (
    nomeFornecedor: string,
    offset: number,
    limit: number,
    ordenacao: string
  ) => {
      
      if (isNaN(limit) || isNaN(offset)) {
        throw new MissingFieldsError();
      }
      const fornecedores = await this.fornecedorData.buscarFornecedoresPorNome(
        offset,
        limit,
        nomeFornecedor,
        ordenacao
      );

      return fornecedores;
    } 
}
