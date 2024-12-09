import { CategoriaData } from "../data/CategoriaData";
import { CategoryNotFoundError } from "../errors/CustomErrors";

export class CategoriaBusiness {
  categoriaData = new CategoriaData();

  buscarTodasCategorias = async () => {
      const categorias = await this.categoriaData.buscarTodasAsCategorias();
      return categorias;
  };

  buscarTodosOsProdutosDeUmaCategoria = async (idCategoria: string) => {
      const categoria = await this.categoriaData.verificarCategoriaExiste(
        idCategoria
      );
      if (categoria != true) {
        throw new CategoryNotFoundError();
      }

      const produtos =
        await this.categoriaData.buscarTodosOsProdutosDeUmaCategoria(
          idCategoria
        );
      return produtos;
    } 
  buscarCategoriasPorNome = async (nomeCategoria: string) => {
      const categorias = await this.categoriaData.buscarCategoriasPorNome(
        nomeCategoria
      );
      return categorias;
    }
}
