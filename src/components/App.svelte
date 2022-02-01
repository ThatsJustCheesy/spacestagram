<script lang="ts">
  import Gallery from "./Gallery.svelte";
  import { fetchNasaRoverImagesForEarthDate } from "../model/NasaRoverImage";
  import { NasaRoverImageViewModel } from "../model/NasaRoverImageViewModel";

  const yesterday = new Date(Date.now() - 2 * 8.64e7);
</script>

<main class="text-center">
  <h1 class="mt-5 mb-4">
    <i class="bi bi-stars" />&nbsp;&nbsp;Spacestagram&nbsp;&nbsp;<i
      class="bi bi-camera-fill"
    />
  </h1>
  <h2 class="h3">
    NASA Mars rover photography from {yesterday.getUTCFullYear()}-{yesterday.getUTCMonth() +
      1}-{yesterday.getUTCDate()}
  </h2>

  {#await fetchNasaRoverImagesForEarthDate(yesterday)}
    <h2 class="loading">Loading…</h2>
  {:then roverImages}
    <Gallery
      items={roverImages.map((image) => new NasaRoverImageViewModel(image))}
    />
  {:catch error}
    <p class="text-danger">Oops! We couldn't fetch your images :(</p>
    <p>{JSON.stringify(error)}</p>
  {/await}
</main>

<style>
  .loading {
    position: absolute;
    top: 50%;
    left: 0;
    right: 0;

    animation: pulse 0.75s infinite;
  }

  @keyframes pulse {
    0%,
    100% {
      opacity: 100%;
    }

    50% {
      opacity: 25%;
    }
  }
</style>
