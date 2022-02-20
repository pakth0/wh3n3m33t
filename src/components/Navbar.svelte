<script>
    import {supabase} from "../supabase.js"

    const logout = () =>{
        console.log("logging out")
        supabase.auth.signOut();
    }
</script>
<div class="flex justify-between my-10">
    <a class="text-center py-4 my-10 px-8 mx-5 rounded-lg shadow-lg text-3xl text-white bg-blue-300" href="/createEvent">create event!</a>
    <a class="text-center py-4 my-10 px-8 mx-5 rounded-lg shadow-lg text-3xl text-white bg-purple-300" href="/event">manage events!</a>
    <a class="text-center py-4 my-10 px-8 mx-5 rounded-lg shadow-lg text-3xl text-white bg-green-300" href="/joinEvent">join event!</a>
    <a class="text-center py-4 my-10 px-8 mx-5 rounded-lg shadow-lg text-3xl text-white bg-orange-300" href="/editSchedule">edit schedule!</a>
    <button on:click={logout} class="py-4 my-10 px-8 mx-5 rounded-lg shadow-lg text-3xl text-white bg-red-300">log out!</button>
</div>
