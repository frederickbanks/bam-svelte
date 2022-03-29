<script>
    import Header from "../lib/components/Header.svelte";
    import { app } from "../firebase-config";
    import { isLoggedIn } from "./stores/authStores";
    import { onMount } from "svelte";
    import { onAuthStateChanged, getAuth } from "firebase/auth";
    import { goto } from "$app/navigation";

    // const auth = getAuth();
    // onMount(() => {
    //     onAuthStateChanged(auth, (user) => {
    //         if (user) {
    //             console.log("user");
    //             isLoggedIn.update(() => true);
    //         } else {
    //             isLoggedIn.update(() => false);
    //             goto("/login");
    //         }
    //     });
    // });
</script>

<Header />

<slot />
