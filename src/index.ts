import express from "express";
import knex from "knex";
import cors from "cors";
import dotenv from "dotenv";
import { Request, Response } from "express";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

const connection = knex({
  client: "pg",
  connection: {
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_SCHEMA,
    multipleStatements: true,
  },
});

app.get("/produtos/:idProduto", async (req: Request, res: Response) => {
  const idProduto = Number(req.params.idProduto);

  try {
    if (isNaN(idProduto)) {
      res.status(400);
      throw new Error("Digite um número por favor");
    }
    const produtoProcurado = await connection("produto")
      .select("nome")
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




const PORT = process.env.PORT || 3003;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
