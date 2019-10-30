<script>
  import Nav from "../components/Nav.svelte";

  export let segment;
</script>

<style global lang="scss">
  @import "./leaves/leaves.scss";
</style>

<Nav {segment} />

<main class="container">
  <slot />
</main>