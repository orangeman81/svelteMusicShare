<script context="module">
  import { radio } from "../../stores/radio.js";

  export async function preload(page) {
    return this.fetch(`https://deezerdevs-deezer.p.rapidapi.com/radio/lists`, {
      method: "GET",
      headers: {
        "x-rapidapi-host": "deezerdevs-deezer.p.rapidapi.com",
        "x-rapidapi-key": "6d76812301mshae66073ae2beca5p1e12adjsnc9f2b3725389"
      }
    })
      .then(response => {
        return response.json();
      })
      .then(radios => {
        return radio.set(radios.data);
      })
      .catch(err => {
        console.log(err);
      });
  }
</script>

<script>
  import { onDestroy } from "svelte";

  let data = [];
  const unsubscribe = radio.subscribe(store => (data = store));

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
