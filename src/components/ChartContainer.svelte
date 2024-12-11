<script>
  let { width, height, children} = $props()
</script>

<svg viewBox={`0 0 ${width} ${height}`}>
  {@render children()}
</svg>

<style>
   svg {
    border: 1px dotted gold;
  }
</style>