<script setup>
import { onMounted } from 'vue'
import { useEstoqueStore } from '../stores/estoque'

const estoque = useEstoqueStore()

onMounted(() => {
  if (!estoque.produtos.length) {
    estoque.carregarProdutos()
  }
})
</script>

<template>
  <main class="p-4 max-w-7xl mx-auto">
    <h1 class="text-2xl font-bold mb-4">Catálogo de Produtos</h1>

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
          class="w-full h-28 object-cover rounded mb-2"
        />
        <h2 class="text-sm font-semibold truncate" :title="produto.title">
          {{ produto.title }}
        </h2>
        <p class="text-gray-300 font-bold text-xs capitalize">Categoria: {{ produto.category }}</p>
        <p class="text-green-700 font-bold text-sm">R$ {{ produto.price }}</p>
        <p class="text-xs font-bold text-gray-400">
          Em Estoque: {{ produto.stock > 0 ? `${produto.stock} unidades` : 'Indisponível' }}
        </p>
      </div>
    </div>
  </main>
</template>
