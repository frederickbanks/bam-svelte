<script>
    import Fa from "svelte-fa";
    import { faArrowAltCircleUp } from "@fortawesome/free-solid-svg-icons";
    import Header from "../../lib/components/Header.svelte";
    import { getAuth, onAuthStateChanged } from "firebase/auth";
    import { goto } from "$app/navigation";
    import { onMount } from "svelte";

    let hide = false;

    const auth = getAuth();

    onMount(() => {
        onAuthStateChanged(auth, (user) => {
            if (!user) {
                goto("/login");
            }
        });
    });

    const hidePolicies = () => (hide = !hide);

    let policiesCount = "8459";

</script>

<Header />

<div class="existing-policies-info">
    <div class="spacer" />
    <div class="toggle-row">
        <h1 id="existing-policies-header">Existing Policies</h1>
        <button id="button" on:click={hidePolicies}>
            <Fa
                style="color:blue"
                translateY={-0.2}
                rotate={hide && 180}
                icon={faArrowAltCircleUp}
            />
        </button>
    </div>
    {#if !hide}
        <div>
            <span >
                <h3 id="all-policies-text">
                    All Policies <span style="color: blue;">{policiesCount}</span> 
                </h3>
            </span>
            <span class="ml">See all your policies listed here</span>
        </div>
    {/if}
</div>

<style>
    .ml {
        margin-left: 20px;
    }
    .toggle-row {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        max-width: 14rem;
        margin-left: 20px;
        margin-bottom: 1.5rem ;
    }

    #existing-policies-header {
        font-size: 1.5rem;
        font-weight: bold;
        text-align: left;
        font-weight: 700;
    }
    #button {
        all: unset;
        cursor: pointer;
    }
    .spacer {
        margin-bottom: 40px;
    }
    #all-policies-text{
        margin-left: 20px;
        margin-bottom: 1.5rem;
        font-size: 1.25rem;
    }
</style>
