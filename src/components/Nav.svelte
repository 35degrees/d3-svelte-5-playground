<script>
  import Icon from "@iconify/svelte";
import DropdownMenu from "./DropdownMenu.svelte";

let isOpen = $state(false)
$inspect(isOpen)

function handleClick() {
  isOpen = !isOpen
}
</script>

<div class="container">
  <nav id="nav" class="absolute top-0 left-0 right-0 mx-auto flex flex-row justify-between text-yellow-400 items-center p-2 px-8 w-full max-w-[1100px] text-center select-none">

    <h1 class="text-2xl  font-semibold "><a href="/">
      <Icon icon="teenyicons:home-solid" width="25" height="25" /></a></h1>
    <div class="dropdown transition-all duration-150 z-35 -py-4 relative border-yellow-400" class:border-b-2={isOpen} onclick={() => handleClick()}>

      <button 
       class=" text-xl cursor-pointer p-3 right-8 hover:scale-[102%]">DV Lessons</button>
      <DropdownMenu bind:isOpen />
    </div>
  </nav>
</div>

