<script>
  import data from '/src/lib/data.json';
  import { fade, slide } from 'svelte/transition';
  let { isOpen=$bindable() } = $props()




</script>

{#if isOpen}
  <div 
  transition:fade={{duration: 150}} class="dropdown-container absolute -left-[0.9rem] flex flex-col mt-1">
    <ul class="dropdown-list relative">
      {#each data as item, i}
      <li
  
        class="text-green-400 mb-1 w-[150px] select-none    my-1"
      >
      <a href="/{item.tagline}" class="flex -py-2 flex-row gap-3 justify-center items-end">
      <p class="text-sm mb-[2px]">{item.id + 1}</p>
      <h3 class="text-md">{item.title}</h3>
    </a>
    </li>
      {/each}
    </ul>
  </div>
{/if}