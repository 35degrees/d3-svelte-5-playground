<script>
  import * as d3 from 'd3'
  let { width, height, rScale, margin} = $props()
  let radialLegendData = $state([30000000, 300000000, 1000000000])

  function format_number(d) {
    if (d < 1000000000) {
      const div = +d / +1000000 + 'M'
      return div
    } else {
      const div = +d /  +1000000000 + 'B';
      return div
    }
  }
</script>

<g fill="red" transform="translate(102,118)">
  <text
    class="fill-gray-200 text-lg" x="0" y="35" text-anchor="middle"
  >
  Population
  </text>
  {#each radialLegendData as d}
    <circle 
      class="radial-legend-circle fill-transparent stroke-gray-100 select-none"
      cx="0"
      cy={10- rScale(d)}
      r={rScale(d)}
    />

    <text
      class="fill-gray-200 text-xs select-none" x="40" y={13-2 * rScale(d)}
    >
  {format_number(d)}
    </text>

    <line 
      class="stroke-gray-300 stroke-1"
      x1="0"
      x2="35"
      y1={10 - 2 * rScale(d)}
      y2={10-2 * rScale(d)}
    
    />
  {/each}
</g>

<style>
  .radial-legend-circle {
    stroke-dasharray: 2 2;
    box-sizing: border-box;
  }
</style>