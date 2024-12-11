<script>
  import * as d3 from 'd3'

  let { data } = $props()

  let circles = $state(data.radii.map(c => {
    return {
      ...c,
      x: +c.x,
      y: +c.y,
      r: +c.r,

    }
  }))
  $inspect(circles)
  let radius =1
  const getRadius = () => radius++;

  function updateState() {
    circles[0].r = circles[0].r + 4
    console.log('..updating circle');
  }

  function reset() {
   circles = data.radii.map(c => {
    return {
      ...c,
      x: +c.x,
      y: +c.y,
      r: +c.r,
    }
  })
  radius = 1
  }
</script>

<div class="mt-12 min-w-fit text-xl font-bold text-slate-400">Svelte 5</div>
<div class="mb-12 mt-24">
  <svg width="300" height="300" viewBox="0 0 250 250">
    {#each circles as d, i}
      {#if i === 0}
        <circle cx={d.x} cy={d.y} r={d.r + 4 + getRadius()} stroke="#fff" fill="none"/>
        <circle cx={d.x} cy={d.y} r={d.r + getRadius()} fill={d.fill}/>

        {:else}

        <circle cx={d.x} cy={d.y} r={d.r + getRadius()} fill={d.fill}/>
      {/if}
    {/each}
  </svg>

  <button class="variant-filled btn btn-sm mt-4" onclick={updateState}>Update</button>
  <button class="variant-filled-ghost btn btn-sm" onclick={reset}>Reset</button>
</div>

<style>
  svg {
    border: 1px dotted orange
  }
  .btn {
    background-color: aliceblue;
    border-radius: 10px;
    padding: 0.5rem 0.8rem;
  }
  .variant-filled {
    margin-right: 0.5rem;
  }
  circle {
    transition: all 1s ease;
  }
</style>