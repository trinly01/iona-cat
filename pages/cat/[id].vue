<template>
  <div class="p-8 bg-gradient-to-r from-pink-300 to-blue-200 min-h-screen flex flex-col justify-center items-center">
    <div class="max-w-3xl w-full p-4 bg-white rounded-lg shadow-md">
      <img :src="catInfo.url" :alt="catInfo.breeds[0].name" class="w-full h-64 object-cover rounded-t-lg" />
      <div class="p-4">
        <h2 class="text-2xl font-bold mb-2">{{ catInfo.breeds[0].name }}</h2>
        <p class="text-gray-600 text-sm mb-4">{{ catInfo.breeds[0].description }}</p>
        <div class="grid grid-cols-2 gap-2">
          <div v-for="key in catInfoKeys" :key="key">
            <p class="font-semibold">{{ capitalize(key) }}:</p>
            <p>{{ catInfo.breeds[0][key] }}</p>
          </div>
          <!-- Add more important details here as needed -->
        </div>
        <div class="mt-4">
          <NuxtLink to="/" class="px-6 py-3 bg-blue-500 text-white rounded-md text-xl font-semibold shadow-md hover:bg-blue-600">
            Back to Gallery
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router';

const route = useRoute();

const catInfo = ref(null);

// Fetch cat information using $fetch

  try {
    const response = await $fetch(`https://api.thecatapi.com/v1/images/${route.params.id}`);
    catInfo.value = response;


    useHead({
    title: catInfo.value.breeds[0].name,
    meta: [
      {
        hid: 'description',
        name: 'description',
        content: catInfo.value.breeds[0].description,
      },
      // Open Graph Meta Tags for Facebook, LinkedIn, etc.
      {
        hid: 'og:title',
        property: 'og:title',
        content: catInfo.value.breeds[0].name,
      },
      {
        hid: 'og:description',
        property: 'og:description',
        content: catInfo.value.breeds[0].description,
      },
      {
        hid: 'og:image',
        property: 'og:image',
        content: catInfo.value.url,
      },
      // Twitter Card Meta Tags
      {
        hid: 'twitter:card',
        name: 'twitter:card',
        content: 'summary_large_image',
      },
      {
        hid: 'twitter:title',
        name: 'twitter:title',
        content: catInfo.value.breeds[0].name,
      },
      {
        hid: 'twitter:description',
        name: 'twitter:description',
        content: catInfo.value.breeds[0].description,
      },
      {
        hid: 'twitter:image',
        name: 'twitter:image',
        content: catInfo.value.url,
      },
    ],
  });
  } catch (error) {
    console.error('Error fetching cat information:', error);
  }

const catInfoKeys = computed(() => {
  if (catInfo.value && catInfo.value.breeds[0]) {
    return Object.keys(catInfo.value.breeds[0]);
  }
  return [];
});

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
</script>

<style>
/* Add any custom styles here if needed */
</style>
