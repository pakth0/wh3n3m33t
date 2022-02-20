<script>
    import {supabase} from "../supabase.js";
    import {user} from "../stores/authStore.js"

   let event_name;
   let loading = false;
   let joined = false;
   let user_id = $user.id

   const goToEvent = async () =>{
       try {
           loading = true;
           const {data, error} = await supabase.from('user-events').insert([{event_name, user_id}])
           if(error) throw error
       } catch (error) {
           console.log(error)
       } finally{
           loading = false
           joined = true;
       }

   }
</script>
{#if !joined}
    <form class="flex flex-col" on:submit|preventDefault={goToEvent}>
        <div class="mt-14">
            <label class="text-4xl text-indigo-800" for="event">event name: </label>
            <input class=" border-2 rounded-lg shadow-md py-2 mx-2 text-2xl font-semibold text-blue-800" name="event" type="text" placeholder="enter event name!" bind:value={event_name}>
        </div>
        <button class="py-4 my-10 px-4 rounded-lg shadow-lg text-3xl text-white bg-green-400" type="submit" disabled={loading}>join!</button>
    </form>
{:else}
    <h1 class="text-4xl text-indigo-900 my-10">successfully joined!</h1>
{/if}

