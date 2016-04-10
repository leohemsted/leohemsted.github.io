window.onload = function(){
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

    var selectNavOption = function(event) {
        event.preventDefault();

        // update selection
        currentlySelected = document.querySelector('.selected');
        if(currentlySelected) {
            currentlySelected.classList.remove('selected');
        }
        event.currentTarget.parentElement.classList.add('selected');

        // loadContent(event.currentTarget.getAttribute('data-content-url'));
        workspace.navigate(event.currentTarget.getAttribute('data-content-url'), {trigger:true});
    };
    var Workspace = Backbone.Router.extend({
        routes: {
            ":file": "load"
        },

        load: function(file) {
            loadContent('content/'+file);
        },
    });
    var workspace = new Workspace();
    Backbone.history.start();

    // get all the links in the navbar with the internal class - we'll want those to trigger our single page app loading shenanigans. The external links we can just ignore
    Array.prototype.slice.call(document.querySelectorAll('.nav a.internal')).map(
        function(x){x.onclick = selectNavOption;}
    );

    if(!Backbone.history.location.hash) {
        workspace.navigate('index.html', {trigger:true});
    }
};
