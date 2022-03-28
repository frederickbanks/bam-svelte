<script>
    import { app } from "../firebase-config";
    import { onMount } from "svelte";
    import { getAuth, onAuthStateChanged } from "firebase/auth";
    import { goto } from "$app/navigation";

    onMount(() => {
        const auth = getAuth();
        onAuthStateChanged(auth, (user) => {
            if (user) {
                goto('/policies')
            } else {
                goto("/login");
            }
        });
    });
</script>


<slot />