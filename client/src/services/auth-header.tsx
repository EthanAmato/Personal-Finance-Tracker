
//For accessing protected data
//  checks Local Storage for user item. 
// If there is a logged in user with accessToken (a JSON web token), 
// return HTTP Authorization header. Otherwise, return an empty object.
export default function authHeader() {
    const userStr = localStorage.getItem('user');
    let user = null;
    if (userStr) user = JSON.parse(userStr)

    if(user && user.accessToken) {
        return {'x-access-token': 'Bearer' + user.accessToken};
    } else {
        return {'x-access-token': null}; //specific to node express backend 
    }
}