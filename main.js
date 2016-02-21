var selectNavOption = function(event) {
    event.preventDefault();

    document.querySelector('.selected').classList.remove('selected');
    event.currentTarget.parentElement.classList.add('selected');

    var xhr = new XMLHttpRequest();
    xhr.addEventListener("load", function(){
        document.getElementById('main').innerHTML = this.responseText;
    });
    xhr.open('GET', event.currentTarget.getAttribute('data-content-url'));
    xhr.send();
};

// get all the links in the navbar with the internal class - we'll want those to trigger our single page app loading shenanigans. The external links we can just ignore
Array.prototype.slice.call(document.querySelectorAll('.nav a.internal')).map(
    function(x){
        x.onclick = selectNavOption;
});



// select the first element
document.querySelector('.nav li').classList.add('selected');
