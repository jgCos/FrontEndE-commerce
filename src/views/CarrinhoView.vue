<script setup>
import { useCarrinhoStore } from '../stores/carrinho'
import { useComprasStore } from '../stores/compras'
import { useEstoqueStore } from '../stores/estoque'
import { useRouter } from 'vue-router'

const carrinho = useCarrinhoStore()
const compras = useComprasStore()
const estoque = useEstoqueStore()
const router = useRouter()

const removerItem = (produtoId) => {
  carrinho.removerDoCarrinho(produtoId, estoque.produtos)
}

const comprarItem = (item) => {
  compras.adicionarCompra(item)
  carrinho.itens = carrinho.itens.filter(p => p.id !== item.id)
  router.push({ name: 'comprar' })
}
</script>

<template>
  <div class="p-4">
    <h1 class="text-2xl font-bold mb-4">Carrinho</h1>

    <div v-if="carrinho.itens.length === 0">
      Seu carrinho está vazio.
    </div>

    <ul v-else>
      <li
        v-for="item in carrinho.itens"
        :key="item.id"
        class="mb-3 p-3 border rounded flex justify-between items-center">
        <div>
          <strong>{{ item.title }}</strong><br />
          R$ {{ item.price }} (x{{ item.quantidade }})
        </div>

        <div class="flex gap-2">
          <button
            @click="removerItem(item.id)"
            class="px-5 py-1 text-sm font-bold border border-red-900 text-red-900 bg-transparent hover:text-red-400 transition-colors mx-2">
            Remover
          </button>

          <button
            @click="comprarItem(item)"
            class="px-5 py-1 text-sm font-bold border border-blue-900 text-blue-900 bg-transparent hover:text-blue-400 transition-colors mx-2">
            Comprar
          </button>
        </div>
      </li>
    </ul>
  </div>
</template>
