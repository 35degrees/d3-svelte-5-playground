<script>
  import * as d3 from 'd3'
  let { data } = $props()

  let birthrates = $state(data.birthrate.map(b => {
    return {
      ...b,
      birthrate: +b.birthrate
    }
  }))



  $inspect(birthrates)

  let width = $state(500)
  let height = 350
  let margin = { top: 20, right: 15, bottom: 20, left: 25}
  let innerWidth = $derived(width - margin.right - margin.left)
  let barWidth = $derived(innerWidth / birthrates.length)
  let innerHeight = height - margin.top - margin.bottom
  const yTicks = [0,5,10,15,20]

  let xScale = $derived(
    d3.scaleLinear()
      .domain([0,birthrates.length])
      .range([0, innerWidth])
  )

  let yScale = d3.scaleLinear()
    .domain([0, Math.max.apply(null, yTicks)])
    .range([innerHeight, 0])

  function formatMobile(tick) {
    return "'" + tick.toString().slice(-2)
  }
</script>

<div class="chart" bind:clientWidth={width}>

  <svg {width} {height} viewBox={`0 0 ${width} ${height}`}>
    <g class="bars" transform={`translate(${margin.left}, ${margin.top})`}>
      {#each birthrates as d, i}
        <rect 
          x={xScale(i) + 2}
          y={yScale(d.birthrate)}
          width={barWidth * 0.9}
          height={yScale(0) - yScale(d.birthrate)}
        
        />

        <circle 
          cx={xScale(i) + 2}
          cy={yScale(d.birthrate)}
          r="5"
          fill="#fff"
        
        />
      {/each}
    </g>

    <g class="axis y-axis">
      {#each yTicks as tick}
        <g class="tick tick-{tick}" transform={`translate(0, ${yScale(tick) + 20})`}>
            <line x2={width}/>
            <text y="-4">
              {tick} {tick === 20 ? ' per 1,000 population' : ''}
            </text>
        </g>
      {/each}
    </g>

    <g class="axis x-axis">
      {#each birthrates as d, i}
        <g class="tick" transform="translate({xScale(i)}, {height})">
          <text
            x={(barWidth / 2) + 10} y="-4"
          >
            {width > 380 ? d.year : formatMobile(d.year)}
          </text>
        </g>
      {/each}

    </g>
  </svg>
</div>

<style>
  svg {
    border: 1px solid green
  }
  .bars rect {
    fill: #fcd34d;
    stroke: none;
  }

  .tick {
    font-family: 'Poppins', sans-serif;
    font-size: 0.8rem;
    font-weight: 200;
    color: #fff;
  }

  .tick text {
    fill: #fff;
    text-anchor: start;
    color: #fff;
  }

  .tick line {
    stroke: #fcd34d;
    stroke-dasharray: 2;
    opacity: 0.8;
  }

  .x-axis .tick text {
    text-anchor: start;
    color: #fff;
  }
  .tick.tick-0 line {
    display: inline-block;
    stroke-dasharray: 0;
  }
</style>