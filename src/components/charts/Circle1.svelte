<script>
  let { cx, cy, r, fill} = $props()
</script>


<circle 
  {cx}
  {cy}
  {r}
  {fill}
/>

<style>
    circle {
    transition: all 1s ease;

  }
</style>