<script>
  import * as d3 from 'd3'
  let { width, height, margin, yOffset, xOffset, label, textanchor="end", yLabel=false, xLabel=false} = $props()


</script>

{#if width}
  <g class="labels-x-y text-sm">
    {#if xLabel}
    <text
      fill="#fff"
      x={+margin.left + width - 180 + xOffset}
      y={+height + margin.top -40 + yOffset}
      text-anchor={textanchor} 
    >
    {label}
    </text>
    {:else if yLabel}
    <text
      fill="#fff"
      x={+margin.left + xOffset}
      y={+margin.top + yOffset}
      text-anchor={textanchor} 
    >
    {label}
  </text>
    {/if}
  </g>
{/if}