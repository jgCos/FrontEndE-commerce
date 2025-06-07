import { defineStore } from "pinia";
import { ref, watch } from "vue";

export const useComprasStore = defineStore("compras", () => {
  const lista = ref(JSON.parse(localStorage.getItem("compras_historico") || "[]"));

  function salvarHistoricoLocal() {
    localStorage.setItem("compras_historico", JSON.stringify(lista.value));
  }

  function adicionarCompra(item) {
    lista.value.push({ ...item });
    salvarHistoricoLocal();
  }

  function devolverCompra(produtoId) {
    const index = lista.value.findIndex(i => i.id === produtoId);
    if (index !== -1) {
      const item = lista.value[index];

      const listaProdutos = JSON.parse(localStorage.getItem("produtos_atualizados") || "{}");
      if (listaProdutos[item.id]) {
        listaProdutos[item.id].stock += item.quantidade;
        localStorage.setItem("produtos_atualizados", JSON.stringify(listaProdutos));
      }

      lista.value.splice(index, 1); // remove do histórico
      salvarHistoricoLocal();
    }
  }

  function removerDoHistorico(produtoId) {
    const index = lista.value.findIndex(i => i.id === produtoId);
    if (index !== -1) {
      lista.value.splice(index, 1);
      salvarHistoricoLocal();
    }
  }

  return {
    lista,
    adicionarCompra,
    devolverCompra,
    removerDoHistorico,
  };
});
