<script>
  import * as d3 from 'd3'
  let { colorScale, legend_data, space} = $props()

</script>

{#each legend_data as d, i}
  <rect 
    x="25"
    y={i * 30 + 10}
    width="20"
    height="20"
    fill={colorScale(d)}
    rx="3"
    ry="3"
  />

  <text
    class="text fill-gray-200 text-sm select-none" x="56" y={25 + i * 30}
  >
  {d[0] + d.slice(1).toLowerCase()}
  </text>

{/each}