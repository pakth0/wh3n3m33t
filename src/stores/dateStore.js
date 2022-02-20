import { writable } from "svelte/store";
import { supabase } from "../supabase.js";
import { v4 as uuidv4 } from 'uuid';
export const dates = writable([])

export const loadDates = async () =>{
    const {data, error} = await supabase.from('dates').select()

    if(error) return console.error(error)
    dates.set(data) 
}

export const addDate = async (date, conflict_name, user_id) => {
   const {data, error} = await supabase.from('dates').insert([{date, conflict_name, user_id}])

   if(error) return console.error(error)
    
    dates.update((cur) => {
        const newDates = [...cur, data[0]];
        return newDates;
    }) 
}

export const deleteDate = async (id) =>{
    const {error} = await supabase.from('dates').delete().match({id})

    if(error) return console.error(error)

    dates.update((dates) => dates.filter((date) => date.id !== id))
}