# Demo: [https://iona-cat.vercel.app/](https://iona-cat.vercel.app/)

Personal Touches:
1. Used tailwind css instead of bootstrap to enhance the UI
2. Pinia State Management
3. some Typing using Typescript
4. Composition API
5. Nuxt for server side rending intended for SEO purposes.

Libraries to use

- vue-router
- BootstrapVue
- axios (or fetch API)
- typescript (recommended)
- eslint / tslint (optional)

Notes
● Using Composition API is a plus. But you can opt to use Option API style when
developing. It’s up to you which API style you want to use.

Instructions

1. Create a Vue app that loads images of cats. There are 2 pages: Homepage and Single
Cat Page.
2. The homepage has a select input box where you can choose a breed of cats. Selecting
a breed should load images of cats from the API listed under the corresponding breed.
Clicking on the "Load more" button should display more images that haven't been loaded
yet. Once the images already reach the end of the list, the "Load more" button should
disappear. Selecting a different breed should clear the previous images of cats and
display a new list of images.
3. Clicking on "View details" under each image should redirect to the Single Cat Page. The
Single Cat Page should display the following data: image, breed name, origin,
temperament, and description. Clicking "Back" at the top of the Single Cat Page should
go back to the homepage with the current breed already selected, therefore, the
Homepage should immediately load images of cats under the previously selected breed.
4. The API to use is at https://docs.thecatapi.com/. It is your responsibility to study and
figure out the correct endpoints to use. Please, handle any possible API exceptions by
notifying the user that fetching has failed. Message as an alert / banner: “Apologies but
we could not load new cats for you at this time! Miau!”
5. Commit all code to a public git repository.



Look at the [Nuxt 3 documentation](https://nuxt.com/docs/getting-started/introduction) to learn more.

## Setup

Make sure to install the dependencies:

```bash
# npm
npm install

# pnpm
pnpm install

# yarn
yarn install
```

## Development Server

Start the development server on `http://localhost:3000`:

```bash
# npm
npm run dev

# pnpm
pnpm run dev

# yarn
yarn dev
```

## Production

Build the application for production:

```bash
# npm
npm run build

# pnpm
pnpm run build

# yarn
yarn build
```

Locally preview production build:

```bash
# npm
npm run preview

# pnpm
pnpm run preview

# yarn
yarn preview
```

Check out the [deployment documentation](https://nuxt.com/docs/getting-started/deployment) for more information.
