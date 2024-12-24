<script>
  import { quadtree } from 'd3-quadtree';
  export let xScale, yScale, width, height;

  let visible = false;
  let found = {};
  let e = {};

  export let margin;
  export let data;
  export let searchRadius = undefined;

  function findItem(evt) {
    const xLayerKey = 'layerX';
    const yLayerKey = 'layerY';

    found = finder.find(evt[xLayerKey], evt[yLayerKey], searchRadius) || {};
    visible = Object.keys(found).length > 0;
  }

  let finder;

  $: if (data) {
    finder = quadtree()
      .x(function (d) {
        return xScale(+d.gdp / +d.population);
      })
      .y(function (d) {
        return yScale(+d.life_expectancy);
      })
      .addAll(data);
  }

  const getPosition = (found) => {
    if (found && found.gdp && found.population) {
      const xPos = xScale(+found.gdp / +found.population);
      if (xPos > 0.9 * xScale.range()[1]) {
        return { circle: xPos, square: xPos - 100 };
      } else {
        return { circle: xPos, square: xPos };
      }
    }
  };
</script>

<div
  aria-hidden
  class="bg"
  on:mousemove={findItem}
  on:blur={() => (visible = false)}
  on:mouseout={() => (visible = false)} />
{#if found.gdp && found.population}
  <slot
    x={getPosition(found)}
    y={yScale(+found.life_expectancy)}
    {found}
    {visible}
    {margin}
    {e} />
{/if}

<style>
  .bg {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
  }
</style>