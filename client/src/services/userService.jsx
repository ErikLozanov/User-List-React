const baseUrl = 'http://localhost:3030/jsonstore/users';

export async function getAll () {
    const request = await fetch(baseUrl);
    const response = await request.json();
    return response;
}