document.addEventListener('DOMContentLoaded', function() {
    document.querySelector('.wp-block-button__link').addEventListener('click', function(event) {
        event.preventDefault();
        // Your custom script code here
        alert('Button clicked! Running custom script.');
        // Add your script logic here
    });
});
