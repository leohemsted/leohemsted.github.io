console.log('hello');

var load_content = function(event) {
    event.preventDefault();
    var xhr = new XMLHttpRequest();
    xhr.addEventListener("load", function(){
        console.log('loaded!')
        document.getElementById('main').innerHTML = this.responseText;
    });
    xhr.open('GET', event.currentTarget.getAttribute('data-content_url'));
    xhr.send();
};

// get all the links in the navbar with the internal class - we'll want those to trigger our single page app loading shenanigans. The external links we can just ignore
Array.prototype.slice.call(document.querySelectorAll('.nav a.internal')).map(
    function(x){
        x.onclick = load_content;
});
