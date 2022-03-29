<script>
    import Fa from "svelte-fa";
    import { faArrowAltCircleUp } from "@fortawesome/free-solid-svg-icons";
    import { getAuth, onAuthStateChanged } from "firebase/auth";
    import { goto } from "$app/navigation";
    import { onMount } from "svelte";
    import { getDatabase, ref, get, child } from "firebase/database";
    import { format } from "date-fns";

    let hide = false;

    const auth = getAuth();

    export let policies = [];
    export let policiesCount;

    const dbRef = ref(getDatabase());

    onMount(() => {
        onAuthStateChanged(auth, (user) => {
            if (!user) {
                goto("/login");
            }
        });

        get(child(dbRef, "data/"))
            .then((snapshot) => {
                if (snapshot.exists()) {
                    let data = snapshot.val();

                    console.log({ data });
                    [, policies] = Object.values(data);
                   policiesCount = policies.length;

                    console.log(policies);
                } else {
                    console.log("No data available");
                }
            })
            .catch((error) => {
                console.error(error);
            });
    });

    const hidePolicies = () => (hide = !hide);

    const convertDate = (intDate) => {
        const dateToIso = new Date(parseInt(intDate)).toISOString();
        const replaceT = dateToIso.substr(0, 19).replace("T", " ");
        return new Date(replaceT);
    };

    const formatDate = (date, dateFormat = "MM/dd/yyyy") => {
        return date ? format(convertDate(date), dateFormat) : "";
    };

    const handlePolicyClick = (policynumber) => {
        goto(`/policies/${policynumber}`);
    };
</script>

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
            <span>
                <h3 id="all-policies-text">
                    All Policies <span style="color: blue;"
                        >{policiesCount}</span
                    >
                </h3>
            </span>
            <div class="ml mb">See all your policies listed here</div>
        </div>

        <div class="container">
            <table id="example" class="display table">
                <thead class="thead-dark">
                    <tr>
                        <th>Status</th>
                        <th>Insured Name</th>
                        <th>Policy No.</th>
                        <th>Eff. Date</th>
                        <th>Name</th>
                    </tr>
                </thead>
                <tbody>
                    {#each policies as policy}
                        <tr
                            class="policy-row"
                            on:click|preventDefault={handlePolicyClick(
                                policy.policynumber
                            )}
                        >
                            <td>{policy.name}</td>
                            <td>{policy.primaryinsuredname}</td>
                            <td>{policy.policynumber}</td>
                            <td>{formatDate(policy.periodstart)}</td>
                            <td>{policy.agencyname}</td>
                        </tr>
                    {/each}
                </tbody>
            </table>
        </div>
    {/if}
</div>

<style>
    .ml {
        margin-left: 20px;
    }
    .mb {
        margin-bottom: 30px;
    }
    .policy-row {
        cursor: pointer;
    }
    .policy-row:hover {
        background-color: lightgray;
    }
    .toggle-row {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        max-width: 14rem;
        margin-left: 20px;
        margin-bottom: 1.5rem;
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
    #all-policies-text {
        margin-left: 20px;
        margin-bottom: 1.5rem;
        font-size: 1.25rem;
    }
</style>
