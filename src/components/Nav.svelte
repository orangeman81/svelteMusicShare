<script>
  import { tracks } from "../stores/tracks.js";
  import { BehaviorSubject, Subscription } from "rxjs";
  import { distinctUntilChanged, debounceTime, filter } from "rxjs/operators";
  import { goto } from "@sapper/app";
  import { onMount } from "svelte";
  import { onDestroy } from "svelte";
  export let segment;

  const query$ = new BehaviorSubject("");
  let sub = new Subscription();
  let form;
  const search = event => {
    const query = form.query.value;
    query$.next(query);
  };

  const reset = event => {
    form.reset();
  };

  onMount(async () => {
    sub = query$
      .pipe(
        filter(query => query != ""),
        distinctUntilChanged(),
        debounceTime(600)
      )
      .subscribe(query => goto(`./?query=${query.trim()}`));
  });

  onDestroy(() => {
    if (sub) {
      sub.unsubscribe();
    }
  });
</script>

<style>

</style>

<nav>
  <a href="./">Music Share</a>
  <ul>
    <li>
      <form
        on:input|stopPropagation={event => search(event)}
        class="navSearch"
        bind:this={form}>
        <label>
          <i class="material-icons tile-icon">search</i>
        </label>
        <input
          on:blur={event => reset(event)}
          class="noLine"
          name="query"
          type="search"
          required />
      </form>
    </li>
    <li>
      <a class={segment === undefined ? 'active' : ''} href=".">home</a>
    </li>
    <li>
      <a class={segment === 'radio' ? 'active' : ''} href="radio">radio</a>
    </li>
  </ul>
</nav>
