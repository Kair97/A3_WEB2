const API_URL = "/api/blogs";

async function createBlog(){
    const titleI = document.getElementById("title");
    const bodyI = document.getElementById("body");
    const authorI = document.getElementById("author");

    const title = titleI.value;
    const body = bodyI.value;
    const author = authorI.value;
    if (!title || !body) {
        alert("Title and body are required");
        return ;
    }

    await fetch(API_URL, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({title, body, author})
    });

    titleI.value = "";
    bodyI.value = "";
    authorI.value = "";

    loadBlogs();
}

async function loadBlogs(){
    const res = await fetch(API_URL);
    const blogs = await res.json();

    const blogsDiv = document.getElementById("blogs");
    blogsDiv.innerHTML ="";

    blogs.forEach(blog => {
    const div = document.createElement("div");
    div.className = "card mb-3";

    div.innerHTML = `
      <div class="card-body">
        <h5 class="card-title">${blog.title}</h5>
        <p class="card-text">${blog.body}</p>
        <p class="text-muted">Author: ${blog.author}</p>
        <button class="btn btn-danger btn-sm" onclick="deleteBlog('${blog._id}')">
          Delete
        </button>
      </div>
    `;

    blogsDiv.appendChild(div);
});


}

async function deleteBlog(id){
    await fetch(`${API_URL}/${id}`, {
        method: "DELETE"
    });

    loadBlogs();
}

loadBlogs();