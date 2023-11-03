const baseUrl = 'http://localhost:3030/jsonstore/users';

export async function getAll () {
    const request = await fetch(baseUrl);
    const response = await request.json();
    return response;
};


export async function create (userInfo) {



    const request = await fetch(baseUrl,{
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(userInfo)
    });

    return request.json();
}