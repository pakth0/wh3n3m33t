<script>
    import { onMount } from 'svelte';
    import {user} from "../stores/authStore.js"
    import { addDate, deleteDate } from "../stores/dateStore.js";
    import { dates } from "../stores/dateStore.js";

    let created = false;

    onMount(async () => {
		created = false;
	});

   let conflict_name;
   let loading = false;
  
   let user_id = $user.id
   let date;

   const createEvent = async () =>{
       try {
           loading = true;
           addDate(date, conflict_name, user_id)
           if(error) throw error
       } catch (error) {
           console.log(error)
       } finally{
           loading = false
           created = true;
       }
   }

   const deleteEvent = async (id) =>{
       deleteDate(id)
   }
</script>

{#if !created}
    <form class="flex flex-col" on:submit|preventDefault={createEvent}>
        <div class="mt-7 flex flex-col">
            <div>
                <label class="text-4xl text-orange-800" for="name">conflict name: </label>
                <input class=" border-2 rounded-lg shadow-md py-2 mx-2 text-xl font-semibold text-neutral-500" name="name" type="text" placeholder="enter event name!" bind:value={conflict_name}>
            </div>
    
    
            <label class="text-4xl text-amber-800 mt-10" for="start">date of conflict: </label>
            <input class="text-2xl text-neutral-500 mt-2" type="date" name="start" bind:value={date}>
        </div>
        <button class="py-4 my-10 px-4 rounded-lg shadow-lg text-3xl text-white bg-orange-400" type="submit" disabled={loading}>create!</button>
    </form>
{:else}
     <h1 class="text-4xl text-indigo-900 my-10">successfully created!</h1>
{/if}

<div class="flex flex-col items-center">
    <h1 class="text-6xl text-indigo-600 my-6">current conflicts:</h1>
    {#each $dates as date}
         <div class = "hover:scale-125 transition ease-in-out delay-125 container mx-auto my-8 bg-slate-200 px-[20%] py-9 rounded-lg shadow-md">
            <button on:click={deleteEvent(date.id)} class="font-bold text-2xl relative left-64 bottom-4">
                x
            </button>
            <h1 class = "text-3xl text-indigo-900 relative">{date.conflict_name}</h1>
         </div>
    {/each}
</div>