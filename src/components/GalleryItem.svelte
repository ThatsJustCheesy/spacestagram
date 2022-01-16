<script lang="ts">
  import { fade, FadeParams, scale, ScaleParams } from "svelte/transition";

  export let id: number;
  export let imageSrc: string;
  export let imageAlt: string;
  export let liked: boolean;

  export let toggleLiked: (id: number) => void;

  function likeButtonClicked() {
    toggleLiked(id);
  }

  let hovered = false;
  function likeButtonMouseOver() {
    hovered = true;
  }
  function likeButtonMouseOut() {
    hovered = false;
  }

  let heartFadeParams: FadeParams = { duration: 200 };
  let heartScaleInParams: ScaleParams = { start: 3 };
  let heartScaleOutParams: ScaleParams = { start: 2, duration: 200 };
</script>

<div class="card position-relative">
  <img src={imageSrc} class="card-img-top" alt={imageAlt} />

  <div class="card-body">
    <h3 class="card-title"><slot name="title" /></h3>
    <h4 class="card-subtitle mb-2"><slot name="subtitle" /></h4>
    <p class="h5 mb-2 text-muted"><slot name="meta" /></p>
    <p class="card-text"><slot name="description" /></p>

    <button
      aria-label="Like"
      class="like-button btn-lg fs-2"
      on:click={likeButtonClicked}
      on:mouseover={likeButtonMouseOver}
      on:focus={likeButtonMouseOver}
      on:mouseout={likeButtonMouseOut}
      on:blur={likeButtonMouseOut}
    >
      <div class="grid-hack-container">
        {#if liked}
          <i
            class="heart bi bi-heart-fill"
            in:scale={heartScaleInParams}
            out:scale={heartScaleOutParams}
          />
        {:else}
          {#if hovered}
            <i
              class="heart bi bi-heart-fill"
              class:noncommittal={!liked}
              transition:fade={heartFadeParams}
            />
          {/if}
          <i class="heart bi bi-heart" transition:fade={heartFadeParams} />
        {/if}
      </div>
    </button>
    <button
      class="magnify-button btn-lg fs-2"
      data-bs-toggle="modal"
      data-bs-target="#img-modal-{id}"
    >
      <i
        aria-label="Enlarge"
        class="magnify bi bi-zoom-in"
        transition:fade={heartFadeParams}
      />
    </button>

    <div
      class="modal fade"
      id="img-modal-{id}"
      aria-labelledby="img-modal-title-{id}"
      aria-hidden="true"
      tabindex="-1"
    >
      <div class="modal-dialog modal-dialog-centered modal-xl">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="img-modal-title-{id}">
              <slot name="title" />
              <slot name="subtitle" />
            </h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            />
          </div>
          <div class="modal-body">
            <img class="modal-img" src={imageSrc} alt={imageAlt} />
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

<style>
  .like-button {
    position: absolute;
    top: 1%;
    left: 3%;

    background: transparent !important;
    border: none !important;
  }

  .magnify-button {
    position: absolute;
    top: 1%;
    right: 3%;

    background: transparent !important;
    border: none !important;
  }

  .grid-hack-container {
    display: grid;
  }
  .heart {
    grid-column: 1/2;
    grid-row: 1/2;
    color: red;
  }
  .heart.noncommittal {
    opacity: 50%;
  }

  .magnify {
    color: white;
  }

  .modal-img {
    max-width: 100%;
    object-fit: contain;
  }
</style>
