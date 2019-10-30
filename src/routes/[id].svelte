<script context="module">
  export function preload(page) {
    const id = page.params.id;
    return fetch(`https://deezerdevs-deezer.p.rapidapi.com/album/${id}`, {
      method: "GET",
      headers: {
        "x-rapidapi-host": "deezerdevs-deezer.p.rapidapi.com",
        "x-rapidapi-key": "6d76812301mshae66073ae2beca5p1e12adjsnc9f2b3725389"
      }
    })
      .then(response => {
        return response.json();
      })
      .then(details => {
        return { details };
      })
      .catch(err => {
        console.log(err);
      });
  }
</script>

<script>
  export let details;
</script>

<template>
  <header class="mainHeader">
    <span class="d-flex f-center">
      <img
        src={details.artist.picture}
        class="imgRound mr-24"
        alt={details.artist.name} />
      <span>
        <h1>{details.artist.name}</h1>
        <p class="d-flex f-center">{details.title}</p>
      </span>
    </span>
    <span class="actions">
      <a href="./">
        <i class="material-icons tile-icon">list</i>
      </a>
    </span>
  </header>
  <hr />
  <ul class="list">
    {#each details.tracks.data as item}
      <li>
        <h5>{item.title_short}</h5>
        <audio controls>
          <source src={item.preview} type="audio/mpeg" />
        </audio>
      </li>
    {/each}
  </ul>
</template>
