import express from "express";
import cors from "cors";
import { produtoRouter } from "./routes/produtoRouter";
import { fornecedorRouter } from "./routes/fornecedorRouter";
import { categoriaRouter } from "./routes/categoriaRouter";

const app = express();
app.use(cors());
app.use(express.json());

app.use("/produtos",produtoRouter)
app.use("fornecedores",fornecedorRouter)
app.use("categoria",categoriaRouter)

app.listen(3003, () => {
  console.log("Server is running on port 3003");
});
