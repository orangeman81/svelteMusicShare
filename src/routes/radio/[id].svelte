<script context="module">
  export async function preload(page) {
    const id = page.params.id;
    let details;
    return fetch(`https://deezerdevs-deezer.p.rapidapi.com/radio/${id}`, {
      method: "GET",
      headers: {
        "x-rapidapi-host": "deezerdevs-deezer.p.rapidapi.com",
        "x-rapidapi-key": "6d76812301mshae66073ae2beca5p1e12adjsnc9f2b3725389"
      }
    })
      .then(response => {
        return response.json();
      })
      .then(res => {
        details = res;
      })
      .then(() => {
        return fetch(
          `https://deezerdevs-deezer.p.rapidapi.com/radio/${id}/tracks`,
          {
            method: "GET",
            headers: {
              "x-rapidapi-host": "deezerdevs-deezer.p.rapidapi.com",
              "x-rapidapi-key":
                "6d76812301mshae66073ae2beca5p1e12adjsnc9f2b3725389"
            }
          }
        )
          .then(response => {
            return response.json();
          })
          .then(res => {
            details.tracks = res.data;
            return { details };
          });
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
  {#if details}
    <header class="mainHeader">
      <span class="d-flex f-center">
        <img
          src={details.picture_medium}
          class="imgRound mr-24"
          alt={details.title} />
        <span>
          <h1>{details.title}</h1>
        </span>
      </span>
      <span class="actions">
        <a href="radio">
          <i class="material-icons tile-icon">list</i>
        </a>
      </span>
    </header>
    <hr />
    <ul class="list">
      {#each details.tracks as item}
        <li>
          <span class="d-flex f-center">
            <img
              src={item.album.cover_medium}
              class="imgRound mr-24"
              alt={item.artist.name} />
            <p>
              {item.artist.name}&ensp;&VerticalSeparator;&ensp;{item.title_short}
            </p>
          </span>
          <audio controls>
            <source src={item.preview} type="audio/mpeg" />
          </audio>
        </li>
      {/each}
    </ul>
  {/if}

</template>
