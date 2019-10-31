import { writable } from 'svelte/store';

function radioStore() {
    const { subscribe, set, update } = writable([]);

    return {
        subscribe,
        set,
        update,
        load: () => {
            fetch(`https://deezerdevs-deezer.p.rapidapi.com/radio/lists`, {
                method: "GET",
                headers: {
                    "x-rapidapi-host": "deezerdevs-deezer.p.rapidapi.com",
                    "x-rapidapi-key": "6d76812301mshae66073ae2beca5p1e12adjsnc9f2b3725389"
                }
            })
                .then(response => {
                    return response.json();
                })
                .then(response => {
                    set(response.data);
                })
                .catch(err => {
                    console.log(err);
                });
        }
    };
}

export const radio = radioStore();