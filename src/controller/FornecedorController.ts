import { Request, Response } from "express";
import { FornecedorBusiness } from "../business/FornecedorBusiness";
export class FornecedorController {
  fornecedorBusiness = new FornecedorBusiness();
  buscarTodosFornecedores = async (req: Request, res: Response) => {
    try {
      const fornecedores = await  this.fornecedorBusiness.buscarTodosOsFornecedores();
      res.status(200).send(fornecedores);
    } catch (error: any) {
      res.status(500).send(error.sqlMessage || error.message);    }
  };
  buscarTodosProdutosDeUmFornecedor = async (req: Request, res: Response) => {
    try {
      const idFornecedor = req.params.idFornecedor;
      const produtos =
        await this.fornecedorBusiness.buscarProdutosDeUmFornecedor(idFornecedor);
      res.status(200).send(produtos);
    } catch (error: any) {
      if (error.message.includes("Fornecedor Inexistente")) {
        res.status(404).send(error.message);
      }
      res.status(500).send(error.sqlMessage || error.message);    }
  };
}
