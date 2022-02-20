import { writable } from "svelte/store";
import { supabase } from "../supabase.js";
export const events = writable([])

export const loadEvents = async () =>{
    const {data, error} = await supabase.from('events').select()
    console.log(data)

    if(error) return console.error(error)
    events.set(data) 
}

export const addEvent = async (start, end, event_name, creator_id) => {
   const {data, error} = await supabase.from('events').insert([{start, end, event_name, creator_id}])

   if(error) return console.error(error)
    
    events.update((cur) => {
        const newEvents = [...cur, data[0]];
        return newEvents;
    }) 
}

export const deleteEvent = async (id) =>{
    const {error} = await supabase.from('events').delete().match({id})

    if(error) return console.error(error)

    events.update((events) => events.filter((date) => date.id !== id))
}