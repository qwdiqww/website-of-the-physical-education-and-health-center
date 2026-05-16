const form = document.getElementById('reg');
const massage = document.getElementById('responseMassage');
form.addEventListener('submit', function(event) {
    event.preventDefault();
    massage.classList.add('show');
    setTimeout(()=> {
        massage.classList.remove('show');},3000
    );
});