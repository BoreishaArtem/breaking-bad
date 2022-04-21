import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'HomeView',
      component: () => import('../views/HomeView.vue'),
    },
    {
      path: '/episode/:season/:episodeId',
      name: 'EpisodeView',
      component: () => import('../views/EpisodeView.vue'),
      props: true,
    },
    {
      path: '/character/:characterId',
      name: 'CharacterView',
      component: () => import('../views/CharacterView.vue'),
      props: true,
    },
  ]
});

export default router;
