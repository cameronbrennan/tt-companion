import tokenService from './tokenService';

const BASE_URL = '/api/races/';

export function getAll() {
    return fetch(BASE_URL, {
        headers: {
            'Authorization': 'Bearer ' + tokenService.getToken()
        }
    }).then(res => res.json());
}

export function getOne(id) {
    console.log(id)
    return fetch(BASE_URL + id, {
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