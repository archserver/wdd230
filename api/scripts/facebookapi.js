fetch('https://graph.facebook.com/me/feed', {
    method: 'POST',
    headers: {
        'Authorization': 'ACCESS TOKEN',
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({
        message: 'Your message here'
    })
})
.then(response => response.json())
.then(data => console.log(data))
.catch(error => console.log('Error:', error));
