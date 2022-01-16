<script lang="ts">
  import { ImageViewModel } from "../model/ImageViewModel";
  import GalleryItem from "./GalleryItem.svelte";

  export let items: ImageViewModel[];

  function toggleLiked(itemId: number) {
    const item = items.find((item) => item.id === itemId);
    item.liked = !item.liked;
    items = items;
  }
</script>

<div class="container">
  <div class="row">
    {#each items as item}
      <div class="col-4 g-4">
        <GalleryItem
          id={item.id}
          imageSrc={item.imageSrc}
          imageAlt={item.imageAlt}
          liked={item.liked}
          {toggleLiked}
        >
          <span slot="title"><i>{item.title}</i></span>
          <span slot="subtitle">{item.subtitle}</span>
          <span slot="meta">{item.date}</span>
        </GalleryItem>
      </div>
    {/each}
  </div>
</div>

<style>
  /* .card {
    width: 30vw;
  } */
</style>
