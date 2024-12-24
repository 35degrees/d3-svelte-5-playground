<script>
  import { Tween } from "svelte/motion";
  // import { tweened } from 'svelte/motion'
  let { data, i, fill="#fff"} = $props()

  $inspect('td',data)
  const position = (x, y) => `transform: translate(${x}px, ${y}px)`;

const tweenText = new Tween(data.map(d=>d.width))
 
</script>

{#each data as d, i}
<rect
  x={d.x}
  y={d.y}
  width={d.width}
  height={d.height}
  {fill}
/>
<text
style={position(d.width + 25, +d.y + 24.1)}
fill="red"
text-anchor="start"
class="myText"
>{tweenText[i]}
</text>
{/each}

<style>
  rect {
    transition: all 0.4s ease-in-out
  }
  text { 
    transition: transform 0.4s ease;
  }
  .myText {
    fill: gold;
  
   
  }
</style>