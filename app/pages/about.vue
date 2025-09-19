<template>
    <Header />
    <section class="relative overflow-hidden">
      <div class="absolute inset-0 pointer-events-none select-none" aria-hidden="true">
        <div class="h-full w-full" style="background: radial-gradient(120% 70% at 50% 0%, #F7F2EA 0%, #FFFFFF 60%);"></div>
      </div>
      <div class="relative mx-auto max-w-7xl px-6 py-16 sm:py-24 grid gap-10 lg:grid-cols-2 lg:items-center">
        <div v-reveal class="space-y-5">
          <p class="uppercase tracking-widest text-[11px] text-gray-600">Since 1998</p>
          <h1 class="text-4xl sm:text-5xl font-bold tracking-tight text-gray-900">About Precious Moments</h1>
          <p class="text-lg text-gray-700 max-w-prose">We craft jewellery to honor the stories you carry. With vintage sensibilities and modern precision, every ring is made to be worn, loved, and passed on.</p>
          <div class="flex items-center gap-3">
            <NuxtLink to="/products" class="inline-flex items-center rounded-md px-4 py-2 text-white" style="background-color:#275B32">Shop Rings</NuxtLink>
            <NuxtLink to="/contact" class="inline-flex items-center rounded-md border px-4 py-2 text-gray-800 hover:bg-gray-50">Book a Consultation</NuxtLink>
          </div>
        </div>
        <div v-reveal :data-reveal-delay="'120ms'" class="relative">
          <div class="grid grid-cols-2 gap-4">
            <img src="/images/ring-7.jpg" alt="Antique milgrain detail" class="w-full rounded-xl shadow-2xl" />
            <img src="/images/ring-14.jpg" alt="Two-tone harmony" class="w-full rounded-xl shadow-2xl translate-y-6" />
            <img src="/images/ring-8.jpg" alt="Emerald cut elegance" class="w-full rounded-xl shadow-2xl -translate-y-2" />
            <img src="/images/ring-20.jpg" alt="Art deco geometry" class="w-full rounded-xl shadow-2xl" />
          </div>
        </div>
      </div>
    </section>

    <!-- Our Story -->
    <section class="mx-auto max-w-7xl px-6 py-12 sm:py-16">
      <div class="grid gap-10 lg:grid-cols-2 lg:items-start">
        <div v-reveal class="space-y-4">
          <h2 class="text-2xl font-semibold text-gray-900">A vintage soul, a modern craft</h2>
          <p class="text-gray-700 leading-relaxed">What began as a small workshop restoring heirloom rings grew into a studio dedicated to timeless design. Our inspiration comes from art‑deco geometry, floral milgrain, and the quiet glow of hand‑polished metal.</p>
          <p class="text-gray-700 leading-relaxed">We believe jewellery should feel lived‑in from day one. That’s why we blend traditional techniques with contemporary engineering—pieces that look like old souls yet wear like new favorites.</p>
          <div class="flex items-center gap-3">
            <NuxtLink to="/products" class="text-sm text-green-800 hover:underline">Browse collection</NuxtLink>
            <span class="text-gray-300">•</span>
            <NuxtLink to="/products/1" class="text-sm text-green-800 hover:underline">See product details</NuxtLink>
          </div>
        </div>
        <div v-reveal :data-reveal-delay="'120ms'" class="rounded-2xl border p-6 sm:p-8" style="background: linear-gradient(90deg, #F7F2EA 0%, #FFFFFF 100%);">
          <h3 class="text-lg font-semibold text-gray-900 mb-3">Craft & Materials</h3>
          <ul class="space-y-3 text-gray-700">
            <li class="flex items-start gap-3"><span>💎</span><span>Conflict‑free stones and recycled gold wherever possible.</span></li>
            <li class="flex items-start gap-3"><span>🛠️</span><span>Hand‑set pavé, precise channel settings, and vintage‑inspired milgrain.</span></li>
            <li class="flex items-start gap-3"><span>✔️</span><span>Comfort‑fit bands and lifetime care for sizing within 30 days.</span></li>
          </ul>
        </div>
      </div>
    </section>

    <!-- Values strip -->
    <section class="mx-auto max-w-7xl px-6 pb-8">
      <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div v-reveal class="rounded-xl border p-5 bg-white shadow-sm">
          <p class="font-medium text-gray-900">Timeless Design</p>
          <p class="text-sm text-gray-600 mt-1">Pieces that age with grace, not trends.</p>
        </div>
        <div v-reveal :data-reveal-delay="'60ms'" class="rounded-xl border p-5 bg-white shadow-sm">
          <p class="font-medium text-gray-900">Honest Materials</p>
          <p class="text-sm text-gray-600 mt-1">Responsibly sourced metals and stones.</p>
        </div>
        <div v-reveal :data-reveal-delay="'120ms'" class="rounded-xl border p-5 bg-white shadow-sm">
          <p class="font-medium text-gray-900">Care & Service</p>
          <p class="text-sm text-gray-600 mt-1">Sizing, guidance, and lifelong support.</p>
        </div>
        <div v-reveal :data-reveal-delay="'180ms'" class="rounded-xl border p-5 bg-white shadow-sm">
          <p class="font-medium text-gray-900">Made to Wear</p>
          <p class="text-sm text-gray-600 mt-1">Comfort‑fit profiles for everyday ease.</p>
        </div>
      </div>
    </section>

    <!-- CTA banner -->
    <section class="py-10">
      <div class="mx-auto max-w-7xl px-6">
        <div class="rounded-2xl border p-8 sm:p-10 flex flex-col items-start gap-4 md:flex-row md:items-center md:justify-between" style="background: linear-gradient(90deg, #F7F2EA 0%, #FFFFFF 100%);">
          <div class="space-y-1">
            <h3 class="text-xl font-semibold text-gray-900">Ready to find your heirloom?</h3>
            <p class="text-sm text-gray-700">Explore the collection or speak with a Diamond Specialist.</p>
          </div>
          <div class="flex items-center gap-3">
            <NuxtLink to="/products" class="inline-flex items-center rounded-md px-4 py-2 text-white" style="background-color:#275B32">Browse Rings</NuxtLink>
            <NuxtLink to="/contact" class="inline-flex items-center rounded-md border px-4 py-2 text-gray-800 hover:bg-gray-50">Contact us</NuxtLink>
          </div>
        </div>
      </div>
    </section>
</template>

<script setup>
useHead({
  title: 'About us',
  meta: [
    { name: 'description', content: 'Precious Moments crafts vintage‑inspired rings with modern precision. Discover our story, materials, and care.' }
  ]
})
</script>