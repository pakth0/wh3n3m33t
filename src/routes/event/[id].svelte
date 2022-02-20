<script context="module">
	export async function load({ params }) {
		//console.log(params)
		const event_id = params.id;
        
		return { props: { event_id } };
	}
</script>

<script>
	import { events, deleteEvent } from '../../stores/eventStore.js';
    import { supabase } from "../../supabase.js";
    import {user} from "../../stores/authStore.js"
	export let event_id;

	console.log(event_id);

	let event;

	for (let i = 0; i < $events.length; i++) {
		//console.log($events)
		if (($events[i].id = event_id)) {
			event = $events[i];
		}
	}

	console.log(event);

	const deleteEventer = async (id) => {
		deleteEvent(id);
	};

	const getDateArray = function (start, end) {
		var arr = new Array()
		let dt = new Date(start);
        let enddt = new Date(end)

		while (dt <= enddt) {
			arr.push(dt);
			dt.setDate(dt.getDate() + 1);
		}
        //console.log(arr)
		return arr;

	};

    let dateArr = getDateArray(event.start, event.end)
    console.log(dateArr)

    const getAttachedUsers = async () => {
        let attachedUsers = await supabase.from('user-events').select('user_id').match({event_name: event.event_name})
        return attachedUsers;
    }

    const getAvailableDates = async ()=>{
        let users = await getAttachedUsers();
        users.push($user.id)
        let avail = []
        for(let i = 0; i < users.length; i++){
            let taken_dates = await supabase.from('dates').select('date').match({user_id: users[i].user_id})
            for(let k = 0; k < taken_dates.length; k++){
                let curr = new Date(taken_dates)
                for(let j = 0; j < dateArr.length; j++){
                    if(curr !== dateArr[j])
                        avail.push(curr)
                }
            }
        }

        console.log(avail)
        alert(avail)
        return avail;
    }


</script>

<div
	class="hover:scale-125 transition ease-in-out delay-125 container mx-auto my-8 bg-purple-200 px-[20%] py-9 rounded-lg shadow-md"
>
	<button on:click={deleteEventer(event.id)} class="font-bold text-2xl relative left-64 bottom-4">
		x
	</button>
	<h1 class="text-3xl text-indigo-900 relative">{event.event_name}</h1>
    <button on:click={getAvailableDates} class="text-3xl text-indigo-900">get dates</button>
	<h1>available dates:</h1>
</div>
