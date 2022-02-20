<script>
    import {supabase} from "../supabase.js"

    let loading = false
    let email;

    const handleLogin = async () =>{
        try {
            loading = true;

            console.log(email)
            const {error} = await supabase.auth.signIn({email});

            if(error) throw error;
            alert('check your email for link!')
        } catch (error) {
            console.error(error)
            alert(error.error_description || error.message)
        } finally{
            loading = false
        }
    }
</script>

<form class="flex flex-col" on:submit|preventDefault={handleLogin}>
    <div class="mt-14">
        <label class="text-4xl text-indigo-800" for="email">email: </label>
        <input class=" border-2 rounded-lg shadow-md py-2 mx-2 text-2xl font-semibold text-red-800" name="email" type="email" placeholder="enter your email!" bind:value={email}>
    </div>
    <button class="py-4 my-10 px-4 rounded-lg shadow-lg text-3xl text-white bg-indigo-300" type="submit" disabled={loading}>login!</button>
</form>
