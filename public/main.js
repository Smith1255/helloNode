var update = document.getElementById('update');
var del = document.getElementById('delete');


update.addEventListener('click', function() {
    fetch('/', {
        method: 'put',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            'name': 'The Creator: ',
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
del.addEventListener('click', function () {
    fetch('/', {
        method: 'delete',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            'name': 'Andrew'
        })
    })
        .then(function(res) {
            if (res.ok) return res.json()
        })
        .then(function(data) {
            console.log(data);
            window.location.reload(true)
        })
});