export const fetchPosts = async() => {
    let posts = await fetch('https://jsonplaceholder.typicode.com/posts')
    posts = await posts.json()
    return posts
}