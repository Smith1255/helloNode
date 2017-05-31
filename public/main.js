var update = document.getElementById('update');
var del = document.getElementById('delete');

update.addEventListener('click', function() {
    fetch('hello', {
        method: 'put',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            'name': 'Andrew',
            'quote': 'Hey, I didnt say that!'
        })
    })
        .then(function(res) {
            if (res.ok) return res.json()
        })
        .then(function(data) {
            console.log(data);
            window.location.reload(true);
        })
});