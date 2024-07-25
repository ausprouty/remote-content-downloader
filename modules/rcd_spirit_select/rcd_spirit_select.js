document.addEventListener('DOMContentLoaded', function() {
    var form = document.getElementById('spirit-form');
    var select = document.getElementById('spirit-select');
    var container = document.getElementById('resource-container');
    form.addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent form from submitting normally
        
        // Get the selected value
        var selectedValue = select.value;
        
        // Update the resource container with selected value
        container.textContent = 'button done';
        var url = API_ENDPOINT + '/spirit/text/' + selectedValue;
        console.log (url)
        // Make the AJAX call
        fetch(url)
            .then(response => response.json())
            .then(data => {
                // Handle the response data
                console.log(data);
                // Optionally update the container or other parts of the page with data
                container.textContent = `Response: ${JSON.stringify(data)}`;
            })
            .catch(error => {
                console.error('Error:', error);
            });
    });
});
