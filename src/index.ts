import express from "express";
import cors from "cors";
import { Request, Response } from "express";
import { connection } from "./connection";
import { generatedId } from "./generatedId";
import typeProduto from "./types/typeProduto";

const app = express();
app.use(cors());
app.use(express.json());

app.get("/produtos/:idProduto", async (req: Request, res: Response) => {
  const idProduto = req.params.idProduto;

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
});
app.get("/produtos", async (req: Request, res: Response) => {
  const offset = Number(req.query.offset) || 0;
  const limit = Number(req.query.limit) || 10;
  const ordenacao = req.query.ordenacao === "desc" ? "desc" : "asc";
  const idCat = Number(req.query.idCat);

  try {
    if (isNaN(limit) || isNaN(offset) || isNaN(idCat)) {
      res.status(400);
      throw new Error("Campos com formato inválido");
    }
    const produtos = await connection("produto")
      .where("idcat", idCat)
      .offset(offset)
      .limit(limit)
      .orderBy("nome", ordenacao);
    res.status(200).send(produtos)
  } catch (error: any) {
    res.send(error.message || error.sql.message);
  }
});

app.get("/produtos", async (req: Request, res: Response) => {
  const nome = req.query.nome as string;
  const idCat=Number(req.query.idCat);
  const precoMin = Number(req.query.precoMin) || 0;
  const precoMax = Number(req.query.precoMax)|| Infinity;

  try {
    if(isNaN(idCat)|| isNaN(precoMax)|| isNaN(precoMin)){
      res.status(400);
      throw new Error("Campos com formato inválido")
    }
    const categoria = await connection("categoria").where("idcat",idCat);
    if(categoria.length===0){
      res.status(404);
      throw new Error("Categoria não encontrada");
    }
     let query= connection("produto")
     .where("preco",">=",precoMin)
     .andWhere("preco","<=",precoMax);
     if(nome){
      query=query.andWhere("nome", "ILIKE", `%${nome}%`);
     }
     if(idCat){
      query=query.andWhere("idcat",idCat)
     }
     const produtos=await query;
     res.status(200).send(produtos);
  } catch (error:any) {
    res.send(error.message || error.sql.message);
  }
})
app.get("/produtos", async (req: Request, res: Response) => {
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

app.delete("/produtos/:idProduto", async (req: Request, res: Response) => {
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
});

app.post("/produtos", async (req: Request, res: Response) => {
  const { nome, preco, quantidadeEmEstoque, idCat } = req.body;
  Number(preco), Number(quantidadeEmEstoque), Number(idCat);
  nome as string;
  const idProduto = generatedId();

  try {
    if (isNaN(preco) || isNaN(quantidadeEmEstoque) || isNaN(idCat)) {
      res.status(400);
      throw new Error("Campo(s) com tipo inválido");
    }
    if (!nome || !preco || !quantidadeEmEstoque || !idCat) {
      res.status(400);
      throw new Error("Campos faltando");
    }
    const categoria = await connection("categoria").where("idcat", idCat);
    if (categoria.length === 0) {
      res.status(404);
      throw new Error("Categoria não encontrada");
    }

    const novoProduto: typeProduto = {
      idproduto: idProduto,
      nome: nome,
      preco: preco,
      quantidadeemestoque: quantidadeEmEstoque,
      idcat: idCat,
    };

    await connection("produto").insert({ novoProduto });
    res.status(201).send("Produto criado");
  } catch (error: any) {
    res.send(error.message || error.sql.message);
  }
});

app.put("/produtos/:idProduto", async (req: Request, res: Response) => {
  const idProduto = req.params.idProduto;
  const { nome, preco, quantidadeEmEstoque, idCat } = req.body;
  nome as string;
  Number(preco), Number(quantidadeEmEstoque), Number(idCat);

  try {
    if (isNaN(preco) || isNaN(quantidadeEmEstoque) || isNaN(idCat)) {
      res.status(400);
      throw new Error("Campo(s) com tipo inválido");
    }
    if (!nome || !preco || !quantidadeEmEstoque || !idCat) {
      res.status(400);
      throw new Error("Campos faltando");
    }
    const categoria = await connection("categoria").where("idcat", idCat);
    if (categoria.length === 0) {
      res.status(404);
      throw new Error("Categoria não encontrada");
    }
    const produtoAtualizado: typeProduto = {
      idproduto: idProduto,
      nome: nome,
      preco: preco,
      quantidadeemestoque: quantidadeEmEstoque,
      idcat: idCat,
    };
    const atualizado = await connection("produto")
      .where("idproduto", idProduto)
      .update({ produtoAtualizado });
    if (atualizado === 0) {
      res.status(404);
      throw new Error("Produto não encontrado.");
    }
    res.status(200).send("Produto atualizado com sucesso");
  } catch (error: any) {
    res.send(error.message || error.sql.message);
  }
});

app.patch("/produtos/:idProduto", async (req: Request, res: Response) => {
  const idProduto = req.params.idProduto as string;
  const quantidadeEmEstoque = req.body;
  Number(quantidadeEmEstoque);
  try {
    if (!quantidadeEmEstoque) {
      res.status(400);
      throw new Error("Campos faltando");
    }
    if (isNaN(quantidadeEmEstoque)) {
      res.status(400);
      throw new Error("Campos com formato inválido");
    }
    const quantidadeAtualizada = await connection("produto")
      .where("idproduto", idProduto)
      .update({ quantidadeemestoque: quantidadeEmEstoque });
  } catch (error: any) {
    res.send(error.message || error.sql.message);
  }
});

app.get("/categorias", async (req: Request, res: Response) => {
  try {
    const categorias = await connection("categoria");
    res.status(200).send(categorias);
  } catch (error: any) {
    res.send(error.message || error.sql.message);
  }
});

app.get("/produtos", async (req: Request, res: Response) => {
  try {
    const produtos = await connection("produto");
    res.status(200).send(produtos);
  } catch (error: any) {
    res.send(error.message || error.sql.message);
  }
});

app.get("/fornecedores", async (req: Request, res: Response) => {
  try {
    const fornecedores = await connection("fornecedor");
    res.status(200).send(fornecedores);
  } catch (error: any) {
    res.send(error.message || error.sql.message);
  }
});

app.listen(3003, () => {
  console.log(`Server is running on port 3003`);
});
