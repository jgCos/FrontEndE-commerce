<script setup>
import { ref, watch, onMounted } from 'vue'
import { useCarrinhoStore } from '../stores/carrinho'
import { useEstoqueStore } from '../stores/estoque'

const busca = ref('')
const carrinho = useCarrinhoStore()
const estoque = useEstoqueStore()

const buscarProdutos = async (query = '') => {
  await estoque.carregarProdutos(query)
}

onMounted(() => {
  buscarProdutos()
})

let timeout
watch(busca, (novoValor) => {
  clearTimeout(timeout)
  timeout = setTimeout(() => {
    buscarProdutos(novoValor)
  }, 500)
})

const adicionarProduto = (produtoId) => {
  const produto = estoque.getProduto(produtoId)
  if (produto?.stock > 0) {
    carrinho.adicionarAoCarrinho(produto)
  } else {
    alert('Produto sem estoque disponível')
  }
}
</script>

<template>
  <main class="p-4 max-w-7xl mx-auto">
    <h1 class="text-2xl font-bold mb-4">Buscar Produtos</h1>

    <input
      v-model="busca"
      type="text"
      placeholder="Buscar produtos pelo nome..."
      class="w-full p-2 mb-6 border rounded font-bold text-gray-700"
    />

    <div v-if="estoque.carregando" class="text-center py-10">Carregando produtos...</div>

    <div v-else class="flex flex-wrap gap-4 justify-center">
      <div
        v-for="produto in estoque.produtos"
        :key="produto.id"
        class="flex-none w-[180px] border rounded-lg p-3 shadow hover:shadow-md transition"
      >
        <img
          :src="produto.thumbnail"
          :alt="produto.title"
          class="w-full h-28 object-cover rounded mb-2 border border-blue-500"
        />
        <h2 class="text-sm font-semibold truncate" :title="produto.title">
          {{ produto.title }}
        </h2>
        <p class="text-gray-300 font-bold text-xs capitalize">
          Categoria: {{ produto.category }}
        </p>
        <p class="text-green-700 font-bold text-sm">R$ {{ produto.price }}</p>
        <p class="text-xs font-bold text-gray-400">
          Em Estoque: {{ produto.stock > 0 ? `${produto.stock} unidades` : 'Indisponível' }}
        </p>

        <button
          @click="adicionarProduto(produto.id)"
          style="color: darkgreen; font-weight: bold; border: 1px solid darkgreen; background: transparent;"
          @mouseover="e => e.target.style.color = 'lightgreen'"
          @mouseout="e => e.target.style.color = 'darkgreen'"
        >
          Adicionar
        </button>
      </div>
    </div>
  </main>
</template>
