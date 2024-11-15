import { connection } from "../connection";

export class CategoriaData {
  buscarTodasAsCategorias = async () => {
    try {
      const categorias = await connection("categoria");
      return categorias;
    } catch (error: any) {
      throw new Error(error.message || error.sql.message);
    }
  };

  buscarTodosOsProdutosDeUmaCategoria = async (idCategoria: string) => {
    try {
        const produtos = await connection("produto")
        .join("categoria", "produto.idcategoria", "=", "categoria.idcategoria")
        .where("produto.idcategoria", idCategoria)
        .select("produto.*", "categoria.nomecategoria as nomeCategoria");
        return produtos; 
    } catch (error:any) {
        throw new Error(error.message || error.sql.message);
    }
  };
  verificarCategoriaExiste = async(idCategoria:string) =>{
    try {
        const categoria = await connection("categoria").where("idcategoria",idCategoria)
        if(categoria.length===0){
            return false;
        }
        return true;
    } catch (error:any) {
        throw new Error(error.message || error.sql.message);
    }
  }
}
