import tokenService from "./tokenService";

const BASE_URL='https://www.dnd5eapi.co/api/ability-scores/'

export function getAll() {
    return fetch(BASE_URL, {
        headers: {
            'Authorization': 'Bearer ' + tokenService.getToken()
        }
    }).then(res => res.json());
}

export function getOne(abil) {
    console.log(abil)
    return fetch(BASE_URL + abil, {
        headers: {
            'Authorization': 'Bearer ' + tokenService.getToken()
        }
    }).then(res => {
        if(res.ok) return res.json();
        throw new Error(res.text())
    });
}

export default {
    getAll,
    getOne
}