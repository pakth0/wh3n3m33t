<script>
    import { events } from "../../stores/eventStore.js";

    const deleteEventer = async (id) =>{
       deleteEvent(id)
   }

</script>

{#each $events as event}
         <a href='/event/{event.id}' class = "hover:scale-125 transition ease-in-out delay-125 container mx-auto my-8 bg-purple-200 px-[20%] py-9 rounded-lg shadow-md">
            <button on:click={deleteEventer(event.id)} class="font-bold text-2xl relative left-64 bottom-4">
                x
            </button>
            <h1 class = "text-3xl text-indigo-900 relative">{event.event_name}</h1>
         </a>
{/each}