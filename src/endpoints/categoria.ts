import { Router } from "express";
import { Request, Response } from "express";
import { connection } from "../connection";

const categoriaRouter = Router();

categoriaRouter.get("/categorias", async (req: Request, res: Response) => {
  try {
    const categorias = await connection("categoria");
    res.status(200).send(categorias);
  } catch (error: any) {
    res.send(error.message || error.sql.message);
  }
});

categoriaRouter.get(
  "categorias/:idCategoria/produtos",
  async (req: Request, res: Response) => {
    const idCategoria = req.params.idCategoria as string;

    try {
      const categoria = await connection("categoria").where(
        "idcategoria",
        idCategoria
      );
      if (categoria.length === 0) {
        res.status(404);
        throw new Error("Categoria não encontrada");
      }
      const produtosDaCategoria = await connection("produto")
        .join("categoria", "produto.idcategoria", "=", "categoria.idcategoria")
        .where("produto.idcategoria", idCategoria)
        .select("produto.*", "categoria.nomecategoria as nomeCategoria");

      res.status(200).send(produtosDaCategoria);
    } catch (error: any) {
      res.send(error.message || error.sql.message);
    }
  }
);

export default categoriaRouter;
