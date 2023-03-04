let postsArray = []
const titleInput = document.getElementById("post-title")
const bodyInput = document.getElementById("post-body")
const form = document.getElementById("new-post")

function renderPosts(){
    let html=''
    for (posts of postsArray){
        html += `<h3>${posts.title}</h3>
                <p>${posts.body}</p>`
    }
    document.getElementById("blog-list").innerHTML = html   
}

fetch("https://apis.scrimba.com/jsonplaceholder/posts")
    .then(res => res.json())
    .then(data => {
        postsArray = data.slice(0, 4)
        renderPosts()
    })
form.addEventListener("submit", function(e){
    e.preventDefault()
    const postTitle = titleInput.value 
    const postBody = bodyInput.value
    const data = {
        title: postTitle,
        body: postBody
    }

    const options = {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
            "content-type": "application/json"
        }
    }

    fetch("https://apis.scrimba.com/jsonplaceholder/posts", options)
        .then(res => res.json())
        .then(data => {
            if(data.title && data.body){
                postsArray.unshift(data)
                renderPosts()
                form.reset()
            }
        })

})