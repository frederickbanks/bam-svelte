<script>
    import { page } from "$app/stores";
    import { getAuth, onAuthStateChanged } from "firebase/auth";
    import { goto } from "$app/navigation";
    import { onMount } from "svelte";
    import { getDatabase, onValue, ref, get, child } from "firebase/database";

    const auth = getAuth();

    export let policies;
    $: policies;
    export let policy = {};
    $: policy;

  

    onMount(() => {
        onAuthStateChanged(auth, (user) => {
            if (!user) {
                goto("/login");
            }
        });

        const db = getDatabase();
        const dbRef = ref(db, "data/");
        onValue(dbRef, (snapshot) => {
            const data = snapshot.val();
            [, policies] = Object.values(data);
            console.log(policies);
            policy = policies[0];
        });
    });
</script>

<div>{$page.params.id}</div>
<span><a href="/policies"> Back to policies </a></span>
<div>
    <div class="card ml br" style="width: 14rem; height: 10rem">
        <div class="card-body green">
            <h5 class="card-title white">{policy.agencyname}</h5>
            <p class="card-text white">
                Policy#: {policy.policynumber}
            </p>
            <!-- <div></div> -->
        </div>
    </div>
</div>

<style>
    .white {
        color: white;
    }
    .green {
        background-color: darkgreen;
    }

    .ml {
        margin-left: 20px;
    }
    /* .bt {
        border-top: ;
    } */
</style>
