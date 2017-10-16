const sendButton = document.getElementsByClassName('send')[0],
    reloadButton = document.getElementsByClassName('reload')[0],
    postsWrap = document.getElementsByClassName('posts')[0],
    username = document.getElementsByClassName('username')[0],
    message = document.getElementsByClassName('message')[0];
errorText = document.getElementsByClassName('error')[0];

sendButton.addEventListener('click', () => {
    sendMessage();
})

window.onload = () => {
    getPosts();
}

reloadButton.addEventListener('click', () => {
    getPosts();
})

username.addEventListener('keypress', function (e) {
    if (e.keyCode === 13) {
        sendMessage();
    }
})

message.addEventListener('keypress', function (e) {
    if (e.keyCode === 13) {
        sendMessage();
    }
})

function getPosts() {
    ajaxRequest({
        method: 'GET',
        url: '/api/posts',
        callback: function (data) {
            console.log(data);
            data = JSON.parse(data);
            insertPost(data);
        }
    });
}

function sendMessage() {
    errorText.style.display = 'none';
    if (message.value.length > 0 && username.value.length > 0) {
        ajaxRequest({
            method: 'POST',
            url: '/api/posts',
            data: {
                message: message.value,
                username: username.value
            },
            callback: function (err, data) {
                if (err) {
                    console.error(err);
                    errorText.style.display = 'block';
                } else {
                    getPosts();
                    message.value = '';
                }
            }
        })
    } else {
        console.error('empty');
    }
}

function createPost(obj) {
    let post = document.createElement('div');
    let text = document.createElement('p');
    let username = document.createElement('p');
    post.classList.add('posts__item');
    text.classList.add('item__text');
    username.classList.add('item__username');

    text.innerHTML = obj.message;
    username.innerHTML = obj.username;

    post.appendChild(text);
    post.appendChild(username);

    return post;
}

function insertPost(arr) {
    postsWrap.innerHTML = '';
    arr.forEach(el => {
        postsWrap.appendChild(createPost(el))
    })
}

function ajaxRequest(options) {
    const url = options.url;
    const method = options.method;
    const callback = options.callback || function () { };
    const data = options.data || {};
    const xmlHttp = new XMLHttpRequest();

    xmlHttp.open(method, url);
    xmlHttp.setRequestHeader('Content-Type', 'application/json');
    xmlHttp.send(JSON.stringify(data));

    xmlHttp.onreadystatechange = function () {
        if (xmlHttp.readyState == 4) {
            callback(xmlHttp.responseText)
        }
    }
}
