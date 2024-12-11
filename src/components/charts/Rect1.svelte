<script>
  let { width, height, x, y, fill="#fff"} = $props()

  
</script>


<rect 
  {width}
  {height}
  {x}
  {y}
  {fill}
/>


<style>
  rect {
    transition: width 0.28s ease-in-out;
  }
</style>