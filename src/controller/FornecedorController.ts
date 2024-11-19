import { Request, Response } from "express";
import { FornecedorBusiness } from "../business/FornecedorBusiness";
export class FornecedorController {
  fornecedorBusiness = new FornecedorBusiness();
  buscarTodosFornecedores = async (req: Request, res: Response) => {
    try {
      const fornecedores =
        await this.fornecedorBusiness.buscarTodosOsFornecedores();
      res.status(200).send(fornecedores);
    } catch (error: any) {
      res.status(500).send(error.sqlMessage || error.message);
    }
  };
  buscarTodosProdutosDeUmFornecedor = async (req: Request, res: Response) => {
    try {
      const idFornecedor = req.params.idFornecedor as string;
      const produtos =
        await this.fornecedorBusiness.buscarProdutosDeUmFornecedor(
          idFornecedor
        );
      res.status(200).send(produtos);
    } catch (error: any) {
      if (error.message.includes("Fornecedor Inexistente")) {
        res.status(404).send(error.message);
      }
      res.status(500).send(error.sqlMessage || error.message);
    }
  };
  buscarFornecedoresPorNome = async (
    req: Request,
    res: Response
  ) => {

    const nomeFornecedor = req.query.nomeFornecedor as string;
    try {
      const offset = req.query.offset
        ? Math.max(Number(req.query.offset), 0)
        : 0;
      const limit = req.query.limit ? Math.max(Number(req.query.limit), 1) : 10;

      let ordenacao = req.query.ordenacao as string;
      if (!ordenacao || !["asc", "desc"].includes(ordenacao.toLowerCase())) {
        ordenacao = "asc";
      }

      const fornecedores =
        await this.fornecedorBusiness.buscarFornecedoresPorNome(
          nomeFornecedor,
          offset,
          limit,
          ordenacao
        );
      res.status(200).send(fornecedores);
    } catch (error: any) {
      if (error.message) {
        res.status(422).send("Campos com formato inválido");
      } else {
        res.send("Erro ao buscar produtos");
      }
    }
  };
}
