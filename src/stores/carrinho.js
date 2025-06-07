import { defineStore } from "pinia";

export const useCarrinhoStore = defineStore("carrinho", {
  state: () => ({
    itens: [],
  }),

  actions: {
    adicionarAoCarrinho(produto) {
      if (produto.stock <= 0) return;

      const item = this.itens.find((i) => i.id === produto.id);
      if (item) {
        item.quantidade++;
      } else {
        this.itens.push({
          id: produto.id,
          title: produto.title,
          price: produto.price,
          quantidade: 1,
        });
      }

      produto.stock--;
      this.salvarProdutosLocal(produto);
    },

    removerDoCarrinho(produtoId, produtos) {
      const itemIndex = this.itens.findIndex((i) => i.id === produtoId);
      if (itemIndex === -1) return;

      const item = this.itens[itemIndex];

      if (item.quantidade > 1) {
        item.quantidade--;
      } else {
        this.itens.splice(itemIndex, 1);
      }

      const produtoNaLista = produtos.find((p) => p.id === produtoId);
      if (produtoNaLista) {
        produtoNaLista.stock++;
        this.salvarProdutosLocal(produtoNaLista);
      }
    },

    confirmarCompra(comprasStore) {
      this.itens.forEach(item => {
        comprasStore.adicionarCompra({ ...item });
      });
      this.itens = [];
    },

    devolverCompra(compra, produtos) {
      const produto = produtos.find((p) => p.id === compra.id);
      if (produto) {
        produto.stock += compra.quantidade;
        this.salvarProdutosLocal(produto);
      }
    },

    salvarProdutosLocal(produto) {
      const lista = JSON.parse(localStorage.getItem('produtos_atualizados') || '{}');
      lista[produto.id] = { ...produto };
      localStorage.setItem('produtos_atualizados', JSON.stringify(lista));
    },

    limparCarrinho() {
      this.itens = [];
    }
  },
});
