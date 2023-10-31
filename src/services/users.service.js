export const fetchUsers = async () => {
    let users = await fetch('https://jsonplaceholder.typicode.com/users')
    users = await users.json()
    console.log(users)
    return users
}