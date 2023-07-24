import { defineStore } from 'pinia';

export interface CatImage {
  id?: string;
  url?: string;
  width?: number;
  height?: number;
}

interface Breed {
  id: string;
  name: string;
  // Add any other properties needed for filtering
}

export const useCatStore = defineStore('cat', {
  state: () => ({
    images: [] as CatImage[],
    breedList: [] as Breed[],
    filteredImages: [] as CatImage[],
    breed: 'all',
    search: ''
  }),
  getters: {
    getImages: (state) => state.images,
    getFilteredImage: (state) => state.filteredImages,
    getBreedList: (state) => state.breedList,
  },
  actions: {
    async fetchCatImages(
      page = 0,
      limit = 10,
      breedIds = '',
      order = 'RAND',
      hasBreeds = 1,
      categoryIds = '',
      subId = ''
    ) {
      console.log('Fetching', breedIds)

      try {
        const fetchedImages: CatImage[] = await $fetch('https://api.thecatapi.com/v1/images/search', {
          method: 'GET',
          params: {
            page,
            limit,
            breed_ids: breedIds,
            order,
            has_breeds: hasBreeds,
            category_ids: categoryIds,
            sub_id: subId,
          },
        });
        
        // Filter out any duplicate IDs from the fetched images
        // console.log('Filtering', this.images)
        const newImages = fetchedImages.filter((image) => !this.images.some((img) => img.id === image.id));
        
        // Append the new images to the existing array
        this.images = [...this.images, ...newImages];
      } catch (error) {
        console.error('Error fetching cat images:', error);
      }
    },
    async fetchBreedList() {
      try {
        const breeds: Breed[] = await $fetch('https://api.thecatapi.com/v1/breeds');
        this.breedList = breeds;
      } catch (error) {
        console.error('Error fetching cat breeds:', error);
      }
    },
    filterImages(selectedBreed: string, searchText: string) {
      // Filter the images based on the selected breed and search text
      this.images = []
      
      if (selectedBreed === 'all') {
        this.fetchCatImages()
      } else {
        this.fetchCatImages(
          0,
          10,
          selectedBreed
        )
      }
      

      this.search = searchText,
      this.breed = selectedBreed

      // console.log('Filtering 2', this.images, selectedBreed, searchText)
      // const filteredImages = this.images.filter((image) => {
      //   const breedFilter = selectedBreed === 'all' || image.breeds.some((breed) => breed.id === selectedBreed);
      //   const searchFilter = searchText === '' || image.breeds[0].name.toLowerCase().includes(searchText.toLowerCase());
      //   return breedFilter && searchFilter;
      // });
      // return filteredImages;
    },
    setFilteredImages(filteredImages: CatImage[]) {
      // Update the filtered images
      this.filteredImages = filteredImages;
    },
  },
});
