<script>
  import * as d3 from 'd3'
  import Axis_4 from '../../components/charts/Axis_4.svelte';
  import { fly } from 'svelte/transition';
    import Labels_4 from '../../components/charts/Labels_4.svelte';
    import RadialLegend_4 from '../../components/charts/RadialLegend_4.svelte';
    import CategoryLegend from '../../components/charts/CategoryLegend.svelte';
    import Quadtree from '../../components/utilities/Quadtree.svelte';
  let { data } = $props()

  let data2 = data.data

  let updatedData = data2.map(d => {
    return {
      ...d,
      gdp: +d.gdp,
      life_expectancy: +d.life_expectancy,
      population: +d.population

    }
  }).sort((a,b) => b.gdp - a.gdp)

  const cons = new Set(updatedData.map(d => d.continent))
  cons.delete(undefined)
  const continents = Array.from(cons)

  
  let width = 800
  const height = 500;
  const margin = { top: 40, right: 200, bottom: 20, left: 35 };
  // let innerWidth = width - margin.right - margin.left
  // let innerHeight = height - margin.top - margin.bottom

  let xScale = $derived(
    d3.scaleLog()
      .domain(d3.extent(updatedData, d=>d.gdp/d.population))
      .range([margin.left, width-margin.right])
  )

  let yScale = d3.scaleLinear()
    .domain(d3.extent(updatedData, d=>d.life_expectancy))
    .range([height - margin.bottom,margin.top])

  let rScale = d3.scaleSqrt()
    .domain(d3.extent(updatedData, d=> d.population))
    .range([2,20])

  let colorScale = d3.scaleOrdinal()
    .domain(continents)
    .range(d3.schemeCategory10)
</script>

<div class="mx-auto max-w-3xl flex flex-col items-center justify-center lg:flex-row">
  <div class="relative">
    {#if data && width}
    <Quadtree {xScale} {yScale} {width} {height} {margin} data={updatedData} let:visible let:x let:y let:found>
      <div class="circle"
        style="top:{y}px' left:{x.circle}px;display: {visible ? 'block' : 'none'}; width: {rScale(+found.population) * 2 + 5 + 0}px; height: {rScale(+found.population) * 2 + 5}px"
      />
    
    
      <div class="tooltip pointer-events-none bg-gray-50 bg-opacity-90 text-gray-900"
        style="top:{y+5}px;left:{x.square+10}px; display: {visible ? 'block' : 'none'}">
      <h1 class="mb-1 text-base text-gray-900">{found.country}</h1>
    
      </div>
    
      </Quadtree>
    <svg {width} {height}>
        <g>
          <Axis_4 {width} {height} {margin} position="bottom" scale={xScale}/>
          <Axis_4 {width} {height} {margin} position="left" scale={yScale}/>
          <Labels_4 xLabel={true} {width} {height} {margin} yOffset={-30} xOffset={-50} label={'GDP per capita →'} />
          <Labels_4 yLabel={true} textanchor={'start'} {width} {height} {margin} yOffset={10} xOffset={10} label={'Life Expectancy ↑'} />
          {#each updatedData as d,i}
          <circle 
            class={(d.continent)}
            cx={xScale(d.gdp / d.population)}
            cy={yScale(d.life_expectancy)}
            r={rScale(d.population)}
            fill={colorScale(d.continent)}
   
          />
          {/each}
 
        </g>
        <g transform="translate({margin.left -40},0)">
          <RadialLegend_4 {width} {height} {margin} {rScale} />
        </g>
        <g transform="translate({width - margin.right - 146},250)">
          <CategoryLegend
            legend_data={continents}
            {colorScale}
            space={80} />
        </g>
      </svg>
    {/if}
  </div>
</div>




<style>
  svg {
    border-radius: 12px;
    margin: auto 0.2rem;
    color: #87ceeb;
    max-width: 620px;
    width: 100%;
    /* border: 1px solid red; */
    /* background: linear-gradient(to left, #1395c9 0%, #116381 100%) */
  }
  b.tooltip {
    text-overflow: nowrap;
  }
  .tooltip {
    position: absolute;
    font-family: 'Poppins', sans-serif !important;
    width: fit-content;
    line-height: 1.2;
    font-size: 0.875rem;
    z-index: 1;
    padding: 6px;
    transition:
      left 200ms ease,
      top 200ms ease,
      width 1200ms ease;
  }

  .circle {
    position: absolute;
    border-radius: 50%;
    transform: translate(-50%, -50%);
    pointer-events: none;
    width: 10px;
    height: 10px;
    border: 1px solid #fff;
    transition:
      left 320ms ease,
      top 320ms ease;
  }
</style>