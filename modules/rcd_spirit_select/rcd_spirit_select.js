document.addEventListener('DOMContentLoaded', function() {
    document.querySelector('.wp-block-button__link').addEventListener('click', function(event) {
        event.preventDefault();
        var container = document.getElementById('resource-container');
        // Check if the element exists
        if (container) {
            // Set the text content of the <div>
            container.textContent = 'button done';
        }
    });
});
