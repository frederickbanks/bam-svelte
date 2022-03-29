<script>
    import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
    import { onMount } from "svelte";
    // import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
    // import Fa from "svelte-fa";
    import { goto } from "$app/navigation";
    import { page, navigating } from "$app/stores";
    // import { isLoggedIn } from "../../routes/stores/authStores";

    let email;
    const auth = getAuth();

    onMount(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                email = user.email;
            }
        });
    });
    // let down = true;

    // const handleRotate = () => (down = !down);

    const logOut = () => {
        signOut(auth)
            .then(() => {
                localStorage.removeItem("uid");
                goto("/login");
            })
            .catch((e) => {
                console.log(e);
            });
    };
</script>

<div id="header">
    <a href="/policies">
        <img id="bam-logo" alt="" src="../../static/BIN_logo.webp" />
    </a>
    {#if email}
        <div>Signed in as {email}</div>
        <button on:click|preventDefault={logOut}>Log Out</button>

        <!-- <button id="button" on:click={handleRotate}>
            <Fa translateY={-0.2} rotate={down && 180} icon={faChevronDown} />
        </button> -->
        <!-- {#if down} -->
        <!-- <div>
            <ul>
                <li on:click|preventDefault={logOut()}>Sign Out</li>
            </ul>
        </div> -->
        <!-- {/if} -->
    {/if}
</div>
<div id="seperator" />

<style>
    button {
        cursor: pointer;
        border: none;
        background-color: white;
    }
    #header {
        justify-content: space-between;
        display: flex;
        align-items: center;
        margin-right: 20px;
    }
    #seperator {
        display: flex;
        background-color: rgb(0, 72, 81);
        height: 4.5rem;
        margin: 0;
    }
    #bam-logo {
        width: 20rem;
    }
</style>
