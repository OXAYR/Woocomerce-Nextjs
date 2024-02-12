
const users = [
    { id: 1, email: 'uzairmaqsood451@gmail.com', password: 'uzair12345.' },
    { id: 2, email: 'user2', password: 'password2' }
];


export async function signIn(email, password) {
    console.log("email---------->", email);
    console.log("Password--------->", password);
    const user = users.find(user => user.email === email && user.password === password);
    console.log("user------>", user);
    if (user) {

        return { success: true, user };
    } else {
        return { success: false, message: "Invalid user" };
    }
}

