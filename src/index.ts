import express from "express";
import cors from "cors";
import { Request, Response } from "express";
import { connection } from "./connection";
import { generatedId } from "./generatedId";

const app = express();
app.use(cors());
app.use(express.json());

app.get("/produtos/:idProduto", async (req: Request, res: Response) => {
  const idProduto = req.params.idProduto;

  try {
    const produtoProcurado = await connection("produto")
      .where("idproduto", idProduto);
    if (produtoProcurado.length === 0) {
      res.status(404);
      throw new Error("Produto não encontrado.");
    }
    res.status(200).send(produtoProcurado);
  } catch (error: any) {
    res.send(error.message || error.sql.message);
  }
});

app.delete("/produtos/:idProduto", async (req: Request, res: Response) => {
  const idProduto = req.params.idProduto;

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
  const { nome, preco, quantidadeEmEstoque, idCat, idFornecedor } = req.body;
  Number(preco),Number(quantidadeEmEstoque),Number(idCat),Number(idFornecedor);
  const idProduto=generatedId()

  try {
    if(isNaN(preco) || isNaN(quantidadeEmEstoque)||isNaN(idCat)||isNaN(idFornecedor)){
      res.status(400);
      throw new Error("Campo(s) com tipo inválido")
    }
    if (!nome || !preco || !quantidadeEmEstoque || !idCat || !idFornecedor) {
      res.status(400);
      throw new Error("Campos faltando");
    }
    const categoria = await connection("categoria")
      .where("idcat", idCat);
    if (categoria.length === 0) {
      res.status(404);
      throw new Error("Categoria não encontrada");
    }
    
    await connection("produto")
      .insert({
        idproduto:idProduto,
        nome,
        preco,
        quantidadeemestoque:quantidadeEmEstoque,
        idcat:idCat
      });
    res.status(201).send("Produto criado")
  } catch (error: any) {
    res.send(error.message || error.sql.message);
  }
});

app.put("/produtos/:idProduto", async (req: Request, res: Response) => {
  const idProduto = req.params.idProduto;
  const { nome, preco, quantidadeEmEstoque, idCat, idFornecedor } = req.body;
  Number(preco),Number(quantidadeEmEstoque),Number(idCat),Number(idFornecedor);
  
  try {
    if(isNaN(preco) || isNaN(quantidadeEmEstoque)||isNaN(idCat)||isNaN(idFornecedor)){
      res.status(400);
      throw new Error("Campo(s) com tipo inválido")
    }
    if (!nome || !preco || !quantidadeEmEstoque || !idCat || !idFornecedor) {
      res.status(400);
      throw new Error("Campos faltando");
    }
    const categoria = await connection("categoria")
      .where("idcat", idCat);
    if (categoria.length === 0) {
      res.status(404);
      throw new Error("Categoria não encontrada");
    }

    const produtoAtualizado = await connection('produto')
      .where("idproduto", idProduto)
      .update({
        nome,
        preco,
        quantidademEstoque:quantidadeEmEstoque,
        idcat:idCat
      });
    if (produtoAtualizado === 0) {
      res.status(404);
      throw new Error("Produto não encontrado.");
    }
    res.status(200).send("Produto atualizado com sucesso");
  } catch (error: any) {
    res.send(error.message || error.sql.message);;
   }
});

app.get("/categorias",async(req: Request, res: Response)=>{
  try {
    const categorias =await connection ("categoria");
    res.status(200).send(categorias);
  } catch (error:any) {
    res.send(error.message || error.sql.message);
  }
});

app.get("/produtos",async(req: Request, res: Response)=>{
  try {
    const produtos =await connection ("produto");
    res.status(200).send(produtos);
  } catch (error:any) {
    res.send(error.message || error.sql.message);
  }
});

app.get("/fornecedores",async(req: Request, res: Response)=>{
  try {
    const fornecedores =await connection ("fornecedor");
    res.status(200).send(fornecedores);
  } catch (error:any) {
    res.send(error.message || error.sql.message);
  }
});

app.listen(3003, () => {
  console.log(`Server is running on port 3003`);
});