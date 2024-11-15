import express from "express";
import cors from "cors";
import categoriaRouter from "./endpoints/categoria";
import produtoRouter from "./endpoints/produto";
import fornecedorRouter from "./endpoints/fornecedor";

const app = express();
app.use(cors());
app.use(express.json());

app.use("/categorias", categoriaRouter);
app.use("/produtos", produtoRouter);
app.use("/fornecedores", fornecedorRouter);

app.listen(3003, () => {
  console.log("Server is running on port 3003");
});
