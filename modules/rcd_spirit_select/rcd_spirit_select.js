document.addEventListener('DOMContentLoaded', function() {
    var form = document.getElementById('spirit-form');
    var select = document.getElementById('spirit-select');
    var container = document.getElementById('resource-container');

    form.addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent form from submitting normally
        
        // Get the selected value
        var selectedValue = select.value;

        // Ensure RCDSettings and apiEndpoint are defined
        if (typeof RCDSettings === 'undefined' || typeof RCDSettings.apiEndpoint === 'undefined') {
            console.error('RCDSettings or apiEndpoint is not defined');
            container.textContent = 'Error: apiEndpoint is not defined';
            return;
        }

        const apiEndpoint = RCDSettings.apiEndpoint;
        console.log(apiEndpoint);
        
        // Update the resource container with selected value
        container.textContent = 'button done';
        var url = apiEndpoint + '/spirit/text/' + selectedValue;
        console.log(url);
        
        // Make the AJAX call
        fetch(url)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                // Handle the response data
                console.log(data);
                // Optionally update the container or other parts of the page with data
                container.innerHTML = data;
            })
            .catch(error => {
                console.error('Error:', error);
                container.textContent = 'Error: ' + error.message;
            });
    });
});
