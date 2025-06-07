import { defineStore } from 'pinia'
import axios from 'axios'

export const useEstoqueStore = defineStore('estoque', {
  state: () => ({
    produtos: [],
    carregando: false,
  }),

  actions: {
    async carregarProdutos(query = '') {
      this.carregando = true
      try {
        const url = query
          ? `https://dummyjson.com/products/search?q=${encodeURIComponent(query)}`
          : 'https://dummyjson.com/products?limit=20'

        const resposta = await axios.get(url)
        const apiProdutos = resposta.data.products

        // Usar o mesmo localStorage que o restante da app usa: "produtos_atualizados"
        const atualizados = JSON.parse(localStorage.getItem('produtos_atualizados') || '{}')

        this.produtos = apiProdutos.map(produto => ({
          ...produto,
          stock: atualizados[produto.id]?.stock ?? produto.stock
        }))
      } catch (erro) {
        console.error('Erro ao carregar produtos:', erro)
      } finally {
        this.carregando = false
      }
    },

    salvarEstoqueLocal() {
      const atualizados = {}
      this.produtos.forEach(p => {
        atualizados[p.id] = { id: p.id, stock: p.stock, title: p.title, price: p.price }
      })
      localStorage.setItem('produtos_atualizados', JSON.stringify(atualizados))
    },

    reduzirEstoque(id, quantidade = 1) {
      const produto = this.produtos.find(p => p.id === id)
      if (produto && produto.stock >= quantidade) {
        produto.stock -= quantidade
        this.salvarEstoqueLocal()
      }
    },

    aumentarEstoque(id, quantidade = 1) {
      const produto = this.produtos.find(p => p.id === id)
      if (produto) {
        produto.stock += quantidade
        this.salvarEstoqueLocal()
      }
    },

    setEstoque(id, novoValor) {
      const produto = this.produtos.find(p => p.id === id)
      if (produto) {
        produto.stock = novoValor
        this.salvarEstoqueLocal()
      }
    },

    getProduto(id) {
      return this.produtos.find(p => p.id === id)
    }
  }
})
