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
        <button class="btn btn-secondary btn-sm me-2" onclick="openUpdateModal('${blog._id}', '${blog.title}', '${blog.body}', '${blog.author}')">
          Edit
        </button>
        <button class="btn btn-danger btn-sm" onclick="deleteBlog('${blog._id}')">
          Delete
        </button>
      </div>
    `;

    blogsDiv.appendChild(div);
});
}

async function loadById(){

  const BlogIdInput = document.getElementById("blogIdInput");
  const blogIdInputValue = BlogIdInput.value.trim();

  if (!blogIdInputValue){
    alert("Id is required");
    return 
  }

  const res = await fetch(`${API_URL}/${blogIdInputValue}`);

  if (!res.ok) {
    alert("Blog not found")
    return 
  }

  const curBlog = await res.json();

  const blogById = document.getElementById("blogId");
  blogById.innerHTML ="";

  const div = document.createElement("div");
  div.className = "card mb-3";
  div.innerHTML =  `
  <div class="card-body blogIdf">
        <h5 class="card-title">${curBlog.title}</h5>
        <p class="card-text">${curBlog.body}</p>
        <p class="text-muted">Author: ${curBlog.author}</p>
        <button class="btn btn-secondary btn-sm me-2" onclick="openUpdateModal('${curBlog._id}', '${curBlog.title}', '${curBlog.body}', '${curBlog.author}')">
          Edit
        </button>
        <button class="btn btn-danger btn-sm" onclick="deleteBlog('${curBlog._id}')">
          Delete
        </button>
      </div>
    `;

    blogById.appendChild(div);
    
  BlogIdInput.value = ""

}

let currentBlogId = null;

function openUpdateModal(id, title, body, author){

  currentBlogId = id

  document.getElementById("updateTitle").value = title;
  document.getElementById("updateBody").value = body;
  document.getElementById("updateAuthor").value = author;

  const modal = new bootstrap.Modal(

    document.getElementById("updateModal")
  );
  modal.show();

} 


async function submitUpdate() {
    const title = document.getElementById("updateTitle").value;
    const body = document.getElementById("updateBody").value;
    const author = document.getElementById("updateAuthor").value;

    if (!title || !body) {
        alert("Title and body are required");
        return;
    }

    await fetch(`${API_URL}/${currentBlogId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, body, author })
    });

    // Close modal
    const modalElement = document.getElementById("updateModal");
    const modalInstance = bootstrap.Modal.getInstance(modalElement);
    modalInstance.hide();

    loadBlogs();
}


async function deleteBlog(id){
    await fetch(`${API_URL}/${id}`, {
        method: "DELETE"
    });

    loadBlogs();
}

loadBlogs();