<script setup lang="ts">
import { products } from '../data/products'
import Header from '../components/Header.vue'
import HomeHero from '../components/HomeHero.vue'
import CategoryStrip from '../components/CategoryStrip.vue'
import FeaturedGrid from '../components/FeaturedGrid.vue'
import StoryBanner from '../components/StoryBanner.vue'
import CTASection from '../components/CTASection.vue'
import { useHead } from '#imports'

useHead({title: 'Home'})
</script>



<template>
  <div>
    <Header />
    <HomeHero />
    <CategoryStrip :products="products" />
    <FeaturedGrid :products="products" />
    <StoryBanner />
    <CTASection />
  </div>
</template>

