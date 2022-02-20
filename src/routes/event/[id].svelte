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
		var dt = new Date(start);
        var enddt = new Date(end)

        //console.log(dt)

		while (dt <= enddt) {
            console.log(dt)
            let temp = new Date(dt)
            console.log(temp)
			arr.push(temp);
			dt.setDate(dt.getDate() + 1);
		}
        console.log(arr)
		return arr;

	};

    let dateArr = getDateArray(event.start, event.end)
    console.log(dateArr)

    const getAttachedUsers = async () => {
        let {data, error} = await supabase.from('user-events').select('user_id').match({event_name: event.event_name})
        console.log(data)
        return data;
    }

    const getAvailableDates = async ()=>{
        let users = await getAttachedUsers();
        users = [...users, {'user_id' : $user.id}]
        //console.log(users)
        for(let i = 0; i < users.length; i++){
            const {data, error} = await supabase.from('dates').select('date').match({user_id: users[i].user_id})
            let taken_dates = data;
            for(let k = 0; k < taken_dates.length; k++){
                var curr = new Date(taken_dates[k].date)
                for(let j = 0; j < dateArr.length; j++){
                    console.log('hoo')
                    if(dateArr[j].getTime() == curr.getTime()){
                        dateArr.splice(j,1)
                        console.log('hey')
                    }
                        
                }
            }
        }

        alert(dateArr)
        return dateArr;
    }


</script>

<div
	class="hover:scale-125 transition ease-in-out delay-125 container mx-auto my-8 bg-purple-200 px-[20%] py-9 rounded-lg shadow-md"
>
	<button on:click={deleteEventer(event.id)} class="font-bold text-2xl relative left-64 bottom-4">
		x
	</button>
	<h1 class="text-3xl text-indigo-900 relative">{event.event_name}</h1>
    <button on:click={getAvailableDates} class="rounded p-5 m-5 bg-fuchsia-400 text-3xl text-indigo-900">get dates</button>
</div>
