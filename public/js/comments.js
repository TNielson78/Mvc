document.querySelector('.comment-form').addEventListener('submit', function(e){
e.preventDefault();
const commentText = document.querySelector('textarea[name="comment-body"]').value;
console.log(commentText);
console.log(window.location.toString());
const postId = window.location.toString().split('/').pop().split('?')[0];
console.log(postId);
if(commentText && postId){
    fetch('/api/comments', {
        method: 'POST',
        body: JSON.stringify({
            post_id: postId,
            body: commentText
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(response => {
        if(response.ok){
            document.location.reload();
        } else {
            alert('Failed to add comment');
        }
    });
}
else{
    alert('You must enter a comment to submit');
}
});
