<script>
  import { onMount } from "svelte";
  import { onDestroy } from "svelte";
  import { radio } from "../../stores/radio.js";

  let data = [];
  const unsubscribe = radio.subscribe(store => (data = store.data));

  onMount(async () => {
    radio.load();
  });

  onDestroy(() => {
    if (unsubscribe) {
      unsubscribe();
    }
  });
</script>

<svelte:head>
  <title>Music sharing app</title>
</svelte:head>

<template>
  <div class="row">
    {#each data as item, i}
      <div class="col s6 m4">
        <a
          rel="prefetch"
          href="radio/{item.id}"
          style="background-image: url('{item.picture_big}')"
          class="tile imgTile white">
          <h4>{item.title}</h4>
          <h5>{item.title}</h5>
        </a>
      </div>
    {/each}
  </div>
</template>
