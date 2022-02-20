<script>
    import { onMount } from 'svelte';
    import {supabase} from "../supabase.js";
    import {user} from "../stores/authStore.js"
    import { bind } from "svelte/internal";
    import { addEvent } from "../stores/eventStore.js";

    let created = false;

    onMount(async () => {
		created = false;
	});

   let event_name;
   let loading = false;
  
   let creator_id = $user.id
   let start;
   let end;

   const createEvent = async () =>{
       try {
           loading = true;
           addEvent(start, end, event_name, creator_id)
           //const {data, error} = await supabase.from('events').insert([{event_name, creator_id, start, end}])
           //if(error) throw error
       } catch (error) {
           console.log(error)
       } finally{
           loading = false
           created = true;
       }

   }
</script>

{#if !created}
    <form class="flex flex-col" on:submit|preventDefault={createEvent}>
        <div class="mt-14 flex flex-col">
            <div>
                <label class="text-4xl text-indigo-800" for="name">event name: </label>
                <input class=" border-2 rounded-lg shadow-md py-2 mx-2 text-2xl font-semibold text-blue-800" name="name" type="text" placeholder="enter event name!" bind:value={event_name}>
            </div>
    
    
            <label class="text-4xl text-blue-800 mt-10" for="start">range start date: </label>
            <input class="text-2xl text-blue-800 mt-2" type="date" name="start" bind:value={start}>
    
            <label class="text-4xl text-red-800 mt-10" for="end">range end date: </label>
            <input class="text-2xl text-red-800 mt-2" type="date" name="end" bind:value={end}>
        </div>
        <button class="py-4 my-10 px-4 rounded-lg shadow-lg text-3xl text-white bg-blue-400" type="submit" disabled={loading}>create!</button>
    </form>
{:else}
     <h1 class="text-4xl text-indigo-900 my-10">successfully created!</h1>
{/if}