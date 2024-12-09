import { Request, Response } from "express";
import { FornecedorBusiness } from "../business/FornecedorBusiness";
import { InvalidFormatError, SupplierNotFoundError } from "../errors/CustomErrors";
export class FornecedorController {
  fornecedorBusiness = new FornecedorBusiness();
  buscarTodosFornecedores = async (req: Request, res: Response) => {
    try {
      const fornecedores =
        await this.fornecedorBusiness.buscarTodosOsFornecedores();
      res.status(200).send(fornecedores);
    } catch (error: any) {
      res.send("Erro ao buscar fornecedores");
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
      if (error instanceof SupplierNotFoundError) {
        res.status(404).send(error.message);
      }else{
        res.send("Erro ao buscar produtos ");
      }
    }
  };
  buscarFornecedoresPorNome = async (req: Request, res: Response) => {
    const nomeFornecedor = req.query.nomeFornecedor as string;
    const defaultOffset = 0;
    const defaultLimit = 10;
    try {
      const offset = parseInt(req.query.offset as string) || defaultOffset;
      const limit = parseInt(req.query.limit as string) || defaultLimit;
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
      if (error instanceof InvalidFormatError) {
        res.status(422).send("Campos com formato inválido");
      } else {
        res.send("Erro ao buscar fornecedores");
      }
    }
  };
}
