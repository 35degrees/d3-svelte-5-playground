<script>
  import * as d3 from 'd3'

  let { width, height, margin, innerWidth, innerHeight, position, scale, tick_outer, tick_number, to_format, no_domain, formatString="$.0f", format_mobile } = $props()

  const formatMobile = (tick) => {
    return "'" + tick.toString().slice(13,15)
  }

  const formatter = d3.format(formatString)
  let transform = $state()
  let g;

  $effect(() => {
    d3.select(g).selectAll('*').remove()

    let axis;

    if (width && scale) {

      switch(position) {
        case 'bottom':
          if (format_mobile) {
            axis = d3.axisBottom(scale)
              .tickFormat(d=>formatMobile(d))
              .tickSizeOuter(tick_outer || 0)
            transform = `translate(0, ${height - margin.bottom})`
          } else {
            axis = d3.axisBottom(scale)
              .ticks(tick_number || 8)
              .tickSizeOuter(tick_outer || 0)
            transform = `translate(0, ${height - margin.bottom})`
          }
          break;
        case 'left':
            if (to_format) {
              axis = d3.axisLeft(scale)
                .tickSizeOuter(tick_outer || 0)
                .tickFormat(d=> formatter(d))
                .ticks(tick_number || 5)
              transform = `translate(${margin.left}, 0)`
            } else {
              axis = d3.axisLeft(scale)
                .ticks(tick_number || 5)        
                .tickSizeOuter(tick_outer || 0)

              transform = `translate(${margin.left},0)`
            }
      }

      if (no_domain) {
        d3.select(g).call(axis).select('.domain').remove()
      } else {
        d3.select(g).call(axis)
      }

    }
  })
</script>

<g class="axis" bind:this={g} {transform}/>

<style>
  .axis {
    shape-rendering: crispEdges;
  }
</style>