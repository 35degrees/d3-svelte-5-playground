<script>
import { fly, fade } from 'svelte/transition';

import * as d3 from 'd3'
import Circle1 from '../../components/charts/Circle1.svelte';
import Rect1 from '../../components/charts/Rect1.svelte';
import RectTween from '../../components/charts/RectTween.svelte';
import ChartContainer from '../../components/ChartContainer.svelte';
let tweenName = $state('')
  let { data } = $props()
  let data1 = data.data1
  $inspect(data1)
  let data2 = data.data2
  let data3 = data.data3
  let data4 = data.data4
  let tweenedData = $state([])
  $inspect(data2)

  let width = 600
  let height = 300

  let isOne = $state(true)
  let circData = $state(data1)
  let isThree = $state(true)
  let rectData = $state(data3)
  let options = ['Circle', 'Rectangle', 'Rectangle Tweened']
  let optionState = $state('Circle')
  let onclick = $state()
  $inspect(optionState)

  $effect(() => {
    setInterval(changeData, 2000)
    tweenedData = data4.map(item => {
      return {
        ...item,
        height: +item.height,
        width:  Math.floor(Math.random() * item.width)
      }
    })
  })

  function changeData() {
    if (optionState === "Circle") {

      isOne = !isOne
      !isOne ? circData = data2 : circData = data1
    } else if (optionState === 'Rectangle') {
      isThree = !isThree
      !isThree ? rectData = data3 : rectData = data4
    } 
  }
  function handleClick() {
    tweenedData = data4.map(item => {
      return {
        ...item,
        width: Math.floor(Math.random() * item.width)
      }
    })
  }

 
  // $inspect(isOne)

</script>

<div class="flex flex-row justify-center items-center">
  {#each options as option}
    <p 
    onclick={() => optionState = option} class="optionState text-md opacity-80 cursor-pointer text-white text-center border-2 border-dashed border-white mx-0 py-1 mb-4 w-[150px] font-normal">
      {option}
    </p>
  {/each}
</div>


  <div 
  class="rsvg" >

  <ChartContainer {width} {height}>
    {#if optionState === 'Circle'}
    {#each circData as d}


      <Circle1 cx={d.x} cy={d.y} r={d.r} fill={d.fill}/>

    {/each}
    {:else if optionState === 'Rectangle'}
    {#each rectData as d}
    <Rect1 x={d.x} y={d.y} width={d.width} height={d.height}/>
    {/each}
    {:else if optionState === 'Rectangle Tweened'}
  
    <RectTween data={tweenedData}/>

    {/if}
  </ChartContainer>
  {#if optionState === 'Rectangle Tweened'}
<button onclick={handleClick} class="bg-yellow-500 fixed rounded-lg py-1 px-4 mt-2"><p class="text-black text-lg ">Animate</p></button>
{/if}
  </div>


<style>
  .rsvg {
    width: 600px;
  }
 
  .optionState:first-of-type, .optionState:nth-of-type(2) {
    border-right: none;
  }
</style>