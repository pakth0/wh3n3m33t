<script>
    import "../app.css";
    import { supabase } from '../supabase.js'
    import {user} from "../stores/authStore.js"
    import Auth from "../components/Auth.svelte"
    import { loadDates } from "../stores/dateStore.js";
    import { loadEvents } from "../stores/eventStore.js";
    import Navbar from "../components/Navbar.svelte";


    user.set(supabase.auth.user());
  

    supabase.auth.onAuthStateChange((_, session) => {
      user.set(session?.user)
      if(session?.user){
        loadDates();
        loadEvents();
      }
    })
  </script>
  
  <div class="container flex flex-col items-center mx-auto my-6 max-w-lg">
    <a href="/" class="text-6xl font-bold text-indigo-500">
      wh3n3m33t
    </a>
    {#if $user}
      <Navbar/>
      <slot></slot>
    {:else}
      <Auth></Auth>
    {/if}
  </div>