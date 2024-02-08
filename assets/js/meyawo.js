
// smooth scroll
$(document).ready(function(){
    $("#msgdv").hide();    
    $("#liveproj").hide();    
    $("#KRIproj").hide();
    $("#RSproj").hide();
    
    $(".navbar .nav-link").on('click', function(event) {

        if (this.hash !== "") {

            event.preventDefault();

            var hash = this.hash;

            $('html, body').animate({
                scrollTop: $(hash).offset().top
            }, 700, function(){
                window.location.hash = hash;
            });
        } 
    });
    const urlParams = new URLSearchParams(window.location.search);
            const myParam = urlParams.get('PROJ');
            if(myParam==='RES'){                
                $("#RSproj").show();
            }else if(myParam==='live'){
                $("#liveproj").show();
            }else if(myParam==='KRI'){
                $("#KRIproj").show();
            }

});

// navbar toggle
$('#nav-toggle').click(function(){
    $(this).toggleClass('is-active')
    $('ul.nav').toggleClass('show');
});

function SaveMsg(){
    
const dbName = "MyPortfolioDB";
const dbVersion = 1;
const storeName = "UsersMsg";

// Open (or create) a database
const request = indexedDB.open(dbName, 1);
const nme = document.getElementById('nm').value;
const em = document.getElementById('eml').value;
const mess = document.getElementById('comment').value;

// Handle database upgrade (create object store)
request.onupgradeneeded = function(event) {
    const db = event.target.result;
    const objectStore = db.createObjectStore(storeName, { keyPath: 'id', autoIncrement: true });
};

// Handle successful database opening
request.onsuccess = function(event) {
    const db = event.target.result;
    const transaction = db.transaction([storeName], 'readwrite');
    const objectStore = transaction.objectStore(storeName);

    // Add data
    objectStore.add({ name: nme, email: em, Msg:mess});
    $("#msgdv").show();
    document.getElementById('nm').value="";
    document.getElementById('eml').value="";
    document.getElementById('comment').value="";
    $("#msgdv").fadeOut(3000);
    // Get data
    // const getRequest = objectStore.get(1);
    // getRequest.onsuccess = function(event) {
    //     const user = event.target.result;
    //     console.log(user.name); // Output: John Doe
    //     console.log(user.email); // Output: john@example.com
    // };
};

// Handle errors
request.onerror = function(event) {
    console.error("Database error: " + event.target.errorCode);
};

}