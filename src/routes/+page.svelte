<script>
  import { fly } from 'svelte/transition';
  import * as d3 from 'd3'

</script>


<div class="container">
  <div 
    in:fly={{y: 200, duration: 220}}
    out:fly={{y: 200, duration: 220}}
  class="header select-none">

    <h1 class="sm:text-6xl md:text-8xl font-sub text-yellow-600 font-bold tracking-wide" >d3 + svelte 5</h1>
    <p class="sm:text-md md:text-lg text-right mr-10 font-medium"><a href="https://datavisualizationwithsvelte.com/" target="_blank">Working through dataatomic's page</a></p>
  </div>
</div>

<style>
@supports (background-clip: text) {
  h1, p {
    background-image: radial-gradient(circle, rgba(34,193,195,1) 0%, rgba(252,253,45,0.8183648459383753) 100%);
    background-size: cover;
    background-position: center;
    background-clip: text;
    color: transparent;

  }
}
</style>