import { CategoriaData } from "../data/CategoriaData";

export class CategoriaBusiness {
  categoriaData = new CategoriaData();

  buscarTodasCategorias = async () => {
    try {
      const categorias = await this.categoriaData.buscarTodasAsCategorias();
      return categorias;
    } catch (error: any) {
      throw new Error(error.message);
    }
  };

  buscarTodosOsProdutosDeUmaCategoria = async (idCategoria: string) => {
    try {
      const categoria = await this.categoriaData.verificarCategoriaExiste(
        idCategoria
      );
      if (categoria != true) {
        throw new Error("Categoria inexistente");
      }

      const produtos =
        await this.categoriaData.buscarTodosOsProdutosDeUmaCategoria(
          idCategoria
        );
      return produtos;
    } catch (error: any) {
      throw new Error(error.message);
    }
  };
  buscarCategoriasPorNome = async (nomeCategoria: string) => {
    try {
      const categorias = await this.categoriaData.buscarCategoriasPorNome(nomeCategoria);
      return categorias;
    } catch (error: any) {
      throw new Error(error.message);
    }
  };
}
