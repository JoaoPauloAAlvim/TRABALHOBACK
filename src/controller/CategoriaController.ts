import { Request, Response } from "express";
import { CategoriaBusiness } from "../business/CategoriaBusiness";
export class CategoriaController {
  categoriaBusiness = new CategoriaBusiness();

  buscarTodasCategorias = async (req: Request, res: Response) => {
    try {
      const categorias = await this.categoriaBusiness.buscarTodasCategorias();
      res.status(200).send(categorias);
    } catch (error: any) {
      res.send("Erro ao buscar categorias");
    }
  };
  buscarTodosProdutosDeUmaCategoria = async (req: Request, res: Response) => {
    try {
      const idCategoria = req.params.idCategoria as string;
      const produtos =
        await this.categoriaBusiness.buscarTodosOsProdutosDeUmaCategoria(
          idCategoria
        );
      res.status(200).send(produtos);
    } catch (error: any) {
      if (error.message.includes("Categoria Inexistente")) {
        res.status(404).send(error.message);
      }else{
        res.send("Erro ao buscar produtos");
      }
    }
  };
  buscarCategoriasPorNome = async (req: Request, res: Response) => {
    try {
      const nomeCategoria = req.query.nomeCategoria as string;
      const categorias = await this.categoriaBusiness.buscarCategoriasPorNome(
        nomeCategoria
      );
      res.status(200).send(categorias);
    } catch (error: any) {
      res.send("Erro ao buscar categorias");
    }
  };
}
