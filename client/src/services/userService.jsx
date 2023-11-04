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

export async function getOne (userId) {
    const request = await fetch(`${baseUrl}/${userId}`);
    const response = await request.json();

    const user = {
        firstName: response.firstName,
        lastName: response.lastName,
        email: response.email,
        phoneNumber: response.phoneNumber,
        imageUrl: response.imageUrl,
        country: response.address.country,
        city: response.address.city,
        street: response.address.street,
        streetNumber: response.address.streetNumber,
      }
    return user;
}