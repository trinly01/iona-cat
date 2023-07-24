<template>
    <div class="flex items-center justify-center">
      <div class="relative">
        <select
          v-model="selectedBreed"
          @change="filterImages"
          class="block appearance-none bg-white border border-gray-300 rounded-md px-4 py-2 pr-8 focus:outline-none focus:border-blue-500 focus:ring focus:ring-blue-200"
        >
          <option v-for="breed in breedOptions" :value="breed.id" :key="breed.id">{{ breed.name }}</option>
        </select>
        <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
          <svg class="h-4 w-4 fill-current" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <!-- SVG code for the dropdown arrow -->
          </svg>
        </div>
      </div>
      <!-- <input
        v-model="searchText"
        @input="filterImages"
        class="ml-4 rounded-md border border-gray-300 p-2"
        type="text"
        placeholder="Search"
      /> -->
    </div>
  </template>
  
  <script setup>
  import { computed, watch } from 'vue';
  import { useCatStore } from '@/stores/cats';
  
  const catStore = useCatStore();
  
  // Create an array of breed options with 'all' as the first element
  const breedOptions = computed(() => {
    const breeds = catStore.getBreedList;
    return [{ name: 'All', id: 'all' }, ...breeds.map((breed) => ({ name: breed.name, id: breed.id }))];
  });
  
  // Reactive variables for selected breed and search text
  const selectedBreed = ref('all');
  const searchText = ref('');
  
  // Watch for changes in selected breed and trigger the fetch whenever it changes
  watch(selectedBreed, () => {
    fetchImagesByBreed(selectedBreed.value, searchText.value);
  });
  
  // Watch for changes in search text and trigger the fetch whenever it changes
  watch(searchText, () => {
    fetchImagesByBreed(selectedBreed.value, searchText.value);
  });
  
  // Fetch cat images by breed
  async function fetchImagesByBreed(breedId, searchText) {
    // You may set additional parameters for the fetchCatImages action
    // For example, you can set the breedIds parameter to the selected breedId
    try {
      await catStore.fetchCatImages(0, breedId, 10, 'RAND', 1, '', '', searchText);
    } catch (error) {
      console.error('Error fetching cat images:', error);
    }
  }
  
  // Filter the images based on the selected breed and search text
  function filterImages() {
    const filteredImages = catStore.filterImages(selectedBreed.value, searchText.value);
    catStore.setFilteredImages(filteredImages);
  }
  </script>
  
  <style>
  /* Add any custom styles here if needed */
  </style>
  