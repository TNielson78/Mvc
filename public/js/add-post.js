document.getElementById('new-post-form').addEventListener('submit', async (event) => {
    event.preventDefault();
    console.log(event.target);
    const title = document.querySelector('[name=title]').value.trim();
    const body = document.querySelector('[name=body]').value.trim();
    if (title && body) {
        const response = await fetch(`/api/posts`, {
          method: 'POST',
          body: JSON.stringify({ title, body }),
          headers: {
            'Content-Type': 'application/json',
          },
        });
    
        if (response.ok) {
          document.location.replace('/profile');
        } else {
          alert('Failed to create project');
        }
      }

});




