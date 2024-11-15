import { Request, Response } from "express";
import { CategoriaBusiness } from "../business/CategoriaBusiness";
export class CategoriaController {
  categoriaBusiness = new CategoriaBusiness();
  buscarTodasCategorias = async (req: Request, res: Response) => {
    try {
      const fornecedores = this;
      res.status(200).send(fornecedores);
    } catch (error: any) {
      res.send(error.sqlMessage || error.message);
    }
  };
  buscarTodosProdutosDeUmaCategoria = async (req: Request, res: Response) => {
    try {
      const idCategoria = req.params.idCategoria;
      const produtos =
        this.categoriaBusiness.buscarTodosOsProdutosDeUmaCategoria(idCategoria);
      res.status(200).send(produtos);
    } catch (error: any) {
      if (error.message.includes("Fornecedor Inexistente")) {
        res.status(404).send(error.message);
      }
      res.send(error.sqlMessage || error.message);
    }
  };
}
