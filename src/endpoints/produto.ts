import { Router } from "express";
import { Request, Response } from "express";
import { connection } from "../connection";
import { generatedId } from "../middlewares/generatedId";
import typeProduto from "../types/typeProduto";

const produtoRouter = Router();

produtoRouter.get("/produtos", async (req: Request, res: Response) => {
  try {
    const produtos = await connection("produto");
    res.status(200).send(produtos);
  } catch (error: any) {
    res.send(error.message || error.sql.message);
  }
});

produtoRouter.get(
  "/produtos/:idProduto",
  async (req: Request, res: Response) => {
    const idProduto = req.params.idProduto as string;

    try {
      const produtoProcurado = await connection("produto").where(
        "idproduto",
        idProduto
      );
      if (produtoProcurado.length === 0) {
        res.status(404);
        throw new Error("Produto não encontrado.");
      }
      res.status(200).send(produtoProcurado);
    } catch (error: any) {
      res.send(error.message || error.sql.message);
    }
  }
);

produtoRouter.get("/produtos", async (req: Request, res: Response) => {
  const ordenacao = req.query.ordenacao === "desc" ? "desc" : "asc";
  const idCategoria = req.query.idCategoria as string;

  try {
    const limit = Number(req.query.limit) || 10;
    const offset = Number(req.query.offset) || 0;
    if (isNaN(limit) || isNaN(offset)) {
      res.status(400);
      throw new Error("Campo(s) com formato inválido");
    }
    let query = connection("produto")
      .offset(offset)
      .limit(limit)
      .orderBy("nome", ordenacao);
    if (idCategoria) {
      query = query.where("idcategoria", idCategoria);
    }
    const produtos = await query;
    res.status(200).send(produtos);
  } catch (error: any) {
    res.send(error.message || error.sql.message);
  }
});

produtoRouter.get("/produtos", async (req: Request, res: Response) => {
  const nome = req.query.nome as string;
  const idCategoria = req.query.idCategoria as string;

  try {
    const precoMin = Number(req.query.precoMin) || 0;
    const precoMax = Number(req.query.precoMax) || Infinity;
    if (isNaN(precoMax) || isNaN(precoMin)) {
      res.status(400);
      throw new Error("Campo(s) com formato inválido");
    }
    const categoria = await connection("categoria").where(
      "idcategoria",
      idCategoria
    );
    if (categoria.length === 0) {
      res.status(404);
      throw new Error("Categoria não encontrada");
    }
    if (precoMin > precoMax) {
      res.status(422);
      throw new Error("Preço mínimo maior que preço máximo");
    }
    let query = connection("produto")
      .where("preco", ">=", precoMin)
      .andWhere("preco", "<=", precoMax);
    if (nome) {
      query = query.andWhere("nome", "ILIKE", `%${nome}%`);
    }
    if (idCategoria) {
      query = query.andWhere("idcategoria", idCategoria);
    }
    const produtos = await query;
    res.status(200).send(produtos);
  } catch (error: any) {
    res.send(error.message || error.sql.message);
  }
});
produtoRouter.get("/produtos", async (req: Request, res: Response) => {
  const nome = req.query.nome as string;

  try {
    let produtos;
    if (nome) {
      produtos = await connection("produto").where(
        "nome",
        "ILIKE",
        `%${nome}%`
      );
    } else {
      produtos = await connection("produto");
    }
    res.status(200).send(produtos);
  } catch (error: any) {
    res.send(error.message || error.sql.message);
  }
});

produtoRouter.get(
  "produtos/:idProduto/fornecedor/:idFornecedor",
  async (req: Request, res: Response) => {
    const idProduto = req.params.idProduto as string;
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
      const produto = await connection("produto").where("idproduto", idProduto);
      if (produto.length === 0) {
        res.status(404);
        throw new Error("Produto não encontrado");
      }
      const produtoProcurado = await connection("produto_fornecedor")
        .where("idproduto", idProduto)
        .andWhere("idfornecedor", idFornecedor);

      if (produtoProcurado.length === 0) {
        res.status(404);
        throw new Error(
          "Nenhuma associação encontrada entre o produto e o fornecedor"
        );
      }
      res.status(200).send(produtoProcurado);
    } catch (error: any) {
      res.send(error.message || error.sql.message);
    }
  }
);

produtoRouter.delete(
  "/produtos/:idProduto",
  async (req: Request, res: Response) => {
    const idProduto = req.params.idProduto as string;

    try {
      const produtoDeletado = await connection("produto")
        .where("idproduto", idProduto)
        .delete();
      if (produtoDeletado === 0) {
        res.status(404);
        throw new Error("Produto não encontrado.");
      }
      res.status(204).send("Produto deletado");
    } catch (error: any) {
      res.send(error.message || error.sql.message);
    }
  }
);

produtoRouter.post("/produtos", async (req: Request, res: Response) => {
  const idCategoria = req.body.idCategoria as string;
  const nome = req.body.nome as string;
  const idProduto = generatedId();

  try {
    const preco = Number(req.body.preco);
    const quantidadeEmEstoque = Number(req.body.quantidadeEmEstoque);
    if (isNaN(preco) || isNaN(quantidadeEmEstoque)) {
      res.status(400);
      throw new Error("Campo(s) com tipo inválido");
    }
    if (!nome || !preco || !quantidadeEmEstoque || !idCategoria) {
      res.status(400);
      throw new Error("Campo(s) faltando");
    }
    const categoria = await connection("categoria").where(
      "idcategoria",
      idCategoria
    );
    if (categoria.length === 0) {
      res.status(404);
      throw new Error("Categoria não encontrada");
    }

    const novoProduto: typeProduto = {
      idproduto: idProduto,
      nome: nome,
      preco: preco,
      quantidadeemestoque: quantidadeEmEstoque,
      idcategoria: idCategoria,
    };

    await connection("produto").insert(novoProduto);
    res.status(201).send("Produto criado");
  } catch (error: any) {
    res.send(error.message || error.sql.message);
  }
});

produtoRouter.put(
  "/produtos/:idProduto",
  async (req: Request, res: Response) => {
    const idProduto = req.params.idProduto as string;
    const idCategoria = req.body.idCategoria as string;
    const nome = req.body.nome as string;

    try {
      const preco = Number(req.body.preco);
      const quantidadeEmEstoque = Number(req.body.quantidadeEmEstoque);

      if (isNaN(preco) || isNaN(quantidadeEmEstoque)) {
        res.status(400);
        throw new Error("Campo(s) com tipo inválido");
      }
      if (!nome || !preco || !quantidadeEmEstoque || !idCategoria) {
        res.status(400);
        throw new Error("Campo(s) faltando");
      }
      const categoria = await connection("categoria").where(
        "idcategoria",
        idCategoria
      );
      if (categoria.length === 0) {
        res.status(404);
        throw new Error("Categoria não encontrada");
      }
      const produtoAtualizado: typeProduto = {
        idproduto: idProduto,
        nome: nome,
        preco: preco,
        quantidadeemestoque: quantidadeEmEstoque,
        idcategoria: idCategoria,
      };
      const atualizado = await connection("produto")
        .where("idproduto", idProduto)
        .update(produtoAtualizado);
      if (atualizado === 0) {
        res.status(404);
        throw new Error("Produto não encontrado.");
      }
      res.status(200).send("Produto atualizado com sucesso");
    } catch (error: any) {
      res.send(error.message || error.sql.message);
    }
  }
);

produtoRouter.patch(
  "/produtos/:idProduto",
  async (req: Request, res: Response) => {
    const idProduto = req.params.idProduto as string;
    try {
      const quantidadeEmEstoque = Number(req.body.quantidadeEmEstoque);
      if (!quantidadeEmEstoque) {
        res.status(400);
        throw new Error("Campo(s) faltando");
      }
      if (isNaN(quantidadeEmEstoque)) {
        res.status(400);
        throw new Error("Campo(s) com formato inválido");
      }
      await connection("produto")
        .where("idproduto", idProduto)
        .update({ quantidadeemestoque: quantidadeEmEstoque });
      res.status(200).send("Quantidade atualizada com sucesso");
    } catch (error: any) {
      res.send(error.message || error.sql.message);
    }
  }
);

export default produtoRouter;
