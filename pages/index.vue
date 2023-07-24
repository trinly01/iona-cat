<template>
    <div class="p-8 bg-gradient-to-r from-pink-300 to-blue-200 min-h-screen flex flex-col justify-center items-center">
      <Cats-Filter class="p-4" />
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 max-w-7xl mx-auto px-4">
        <div v-for="image in catImages" :key="image.id" class="rounded-lg shadow-md overflow-hidden transform transition-transform hover:scale-105">
          <img :src="image.url" alt="Cat" class="w-full h-44 object-cover rounded-t-lg" />
          <div class="p-4 bg-white rounded-b-lg flex flex-col items-center">
            <NuxtLink :to="`/cat/${image.id}`" class="text-lg font-semibold text-blue-600 hover:text-blue-800 transition-colors mb-2">
                View Details
            </NuxtLink>
            <!-- Add any other details you want to show about the image here -->
          </div>
        </div>
      </div>
      <button
        ref="loadMoreBtn"
        @click="loadMore"
        class="fixed z-10 bottom-4 left-1/2 transform -translate-x-1/2 px-6 py-3 bg-pink-500 hover:bg-pink-600 text-white rounded-md text-xl font-semibold shadow-md"
      >
        Load More
      </button>

      <div class="fixed inset-x-0 bottom-[-100px] h-[200px] pointer-events-none">
        <div class="h-full w-full bg-gradient-to-t from-white via-white to-transparent"></div>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { useCatStore } from '@/stores/cats'
  
  const catStore = useCatStore()
  const catImages = computed(() => catStore.getImages)
  const breed = computed(() => catStore.breed)
  const loadMoreBtn = ref(null)
  
  try {
    await catStore.fetchCatImages();
    await catStore.fetchBreedList();

    const catInfo = {
      value: catStore.images[0]
    }

    useHead({
      title: 'IONA Lovely Cats',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: 'IONA Lovely Cats',
        },
        // Open Graph Meta Tags for Facebook, LinkedIn, etc.
        {
          hid: 'og:title',
          property: 'og:title',
          content: 'IONA Lovely Cats',
        },
        {
          hid: 'og:description',
          property: 'og:description',
          content: 'IONA Lovely Cats',
        },
        {
          hid: 'og:image',
          property: 'og:image',
          content: 'IONA Lovely Cats',
        },
        // Twitter Card Meta Tags
        {
          hid: 'twitter:card',
          name: 'twitter:card',
          content: 'IONA Lovely Cats',
        },
        {
          hid: 'twitter:title',
          name: 'twitter:title',
          content: 'IONA Lovely Cats',
        },
        {
          hid: 'twitter:description',
          name: 'twitter:description',
          content: 'IONA Lovely Cats',
        },
        {
          hid: 'twitter:image',
          name: 'twitter:image',
          content: catInfo.value.url,
        },
      ],
    });
  } catch (error) {
    console.error('Error fetching cat images:', error);
  }
  
  const loadMore = async () => {
    await catStore.fetchCatImages(catImages.value.length / 10 + 1, 10, breed.value === 'all' ? undefined : breed.value ); // Assuming each page contains 10 images
    // Scroll to the "Load More" button after images have been loaded
    
    window.scrollTo({
      top: document.body.scrollHeight,
      behavior: 'smooth',
    });
};
  </script>
  
  <style>
  /* Add any custom styles here if needed */
  </style>
  