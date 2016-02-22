var selectNavOption = function(event) {
    event.preventDefault();

    // update selection
    document.querySelector('.selected').classList.remove('selected');
    event.currentTarget.parentElement.classList.add('selected');

    loadContent(event.currentTarget.getAttribute('data-content-url'));

};

var loadContent = function(url) {
    var xhr = new XMLHttpRequest();
    xhr.addEventListener('load', function(){
        document.getElementById('main').innerHTML = this.responseText;
        // recolour any code blocks (if relevant)
        Prism.highlightAll();
    });
    xhr.open('GET', url);
    xhr.send();
};

window.onload = function(){
    // get all the links in the navbar with the internal class - we'll want those to trigger our single page app loading shenanigans. The external links we can just ignore
    Array.prototype.slice.call(document.querySelectorAll('.nav a.internal')).map(
        function(x){x.onclick = selectNavOption;}
    );

    // select the first element and load its content
    document.querySelector('.nav li').classList.add('selected');
    loadContent('content/large_json.html');
};
