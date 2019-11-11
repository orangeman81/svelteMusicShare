import { goto } from "@sapper/app";
import { writable } from 'svelte/store';

function trackStore() {
    const { subscribe, set, update } = writable({
        data: [],
        query: "jimi hendrix",
        details: {}
    });

    return {
        subscribe,
        set,
        update,
        load: (query) => {
            fetch(`https://deezerdevs-deezer.p.rapidapi.com/search?q=${query}`, {
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
                    update(tracks => {
                        return {
                            ...tracks,
                            data: response.data,
                            query: query
                        }

                    });
                })
                .then(() => goto(`./?query=${query}`))
                .catch(err => {
                    console.log(err);
                });
        }
    };
}

export const tracks = trackStore();