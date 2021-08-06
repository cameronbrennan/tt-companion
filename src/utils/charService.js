import tokenService from './tokenService';

const BASE_URL = '/api/characters';

export function create(character){
    return fetch(BASE_URL, {
        method: 'POST',
        body: character,
        headers: {
            'Authorization': 'Bearer ' + tokenService.getToken()
        }
    }).then(res => res.json());
}

export function getAll() {
    return fetch(BASE_URL, {
        headers: {
            'Authorization': 'Bearer ' + tokenService.getToken()
        }
    }).then(res => res.json());
}


export default {
    create,
    getAll
}