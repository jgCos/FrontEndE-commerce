import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import AboutView from "../views/AboutView.vue";
import CarrinhoView from "../views/CarrinhoView.vue";
import ProdutoView from "../views/ProdutoView.vue";
import ComprasView from "../views/ComprasView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/about",
      name: "about",
      component: AboutView,
    },
    {
      path: "/carrinho",
      name: "carrinho",
      component: CarrinhoView,
    },
    {
      path: "/produto",
      name: "produto",
      component: ProdutoView,
    },
    {
      path: "/compras",
      name: "compras",
      component: ComprasView,
    },
  ],
});

export default router;
