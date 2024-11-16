import express from "express";
import cors from "cors";
import { categoriaRouter } from "./routes/categoriaRouter"
import { fornecedorRouter } from "./routes/fornecedorRouter"
import { produtoRouter } from "./routes/produtoRouter"

const app = express();
app.use(cors());
app.use(express.json());

app.use('/produtos',produtoRouter)
app.use('/fornecedores',fornecedorRouter)
app.use('/categorias',categoriaRouter)

app.listen(3003, () => {
  console.log("Server is running on port 3003");
});
