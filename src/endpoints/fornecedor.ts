import { Router } from "express";
import { Request, Response } from "express";
import { connection } from "../connection";

const fornecedorRouter = Router();

fornecedorRouter.get("/fornecedores", async (req: Request, res: Response) => {
  try {
    const fornecedores = await connection("fornecedor");
    res.status(200).send(fornecedores);
  } catch (error: any) {
    res.send(error.message || error.sql.message);
  }
});

fornecedorRouter.get(
  "fornecedores/:idFornecedor/produtos",
  async (req: Request, res: Response) => {
    const idFornecedor = req.params.idFornecedor as string;

    try {
      const fornecedor = await connection("fornecedor").where(
        "idfornecedor",
        idFornecedor
      );
      if (fornecedor.length === 0) {
        res.status(404);
        throw new Error("Fornecedor não encontrado");
      }
      const produtosDoFornecedor = await connection("produto_fornecedor")
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

      res.status(200).send(produtosDoFornecedor);
    } catch (error: any) {
      res.send(error.message || error.sql.message);
    }
  }
);

export default fornecedorRouter;
