<script>
  import { onMount } from "svelte";
  import { onDestroy } from "svelte";
  import { tracks } from "../stores/tracks.js";

  let data = [];
  const unsubscribe = tracks.subscribe(store => (data = store.data));

  onMount(async () => {
    tracks.load('jimi hendrix');
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
  {#if data[0]}
    <header class="mainHeader">
      <span class="d-flex f-center">
        <img
          src={data[0].artist.picture}
          class="imgRound mr-24"
          alt={data[0].artist.name} />
        <span>
          <h1>{data[0].artist.name}</h1>
          <p class="d-flex f-center">
            {data[0].artist.type}&ensp;&VerticalSeparator;&ensp;
            <i class="material-icons tile-icon">favorite</i>
            &thinsp;{data[0].rank}
          </p>
        </span>
      </span>
    </header>
    <hr />
  {/if}
  <div class="row">
    {#each data as item, i}
      <div class="col s6 m4">
        <a
          rel="prefetch"
          href="./{item.album.id}"
          style="background-image: url('{item.album.cover_big}')"
          class="tile imgTile white">
          <h4>{item.title_short}</h4>
          <h5>{item.artist.name}&ensp;&VerticalSeparator;&ensp;{item.type}</h5>
        </a>
      </div>
    {/each}
  </div>
</template>
