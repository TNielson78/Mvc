document.querySelector (".card button").addEventListener("click", async (event) => {
event.preventDefault();
const id = event.target.getAttribute("data-id");
console.log(id);
const response = await fetch(`/api/posts/${id}`, {
  method: "DELETE",
});
console.log(response);
   if (response.ok) {
     document.location.replace("/profile");
   } else {
     alert("Failed to delete post");
   }
   

});
