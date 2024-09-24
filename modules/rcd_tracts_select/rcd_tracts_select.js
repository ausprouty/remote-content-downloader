document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('rcd-tracts-form');

    form.addEventListener('submit', function (event) {
        event.preventDefault();

        const lang1 = document.getElementById('lang1').value;
        const lang2 = document.getElementById('lang2').value;

        // Fetch data from API
        const apiEndpoint = RCDSettings.apiEndpoint;
        const url = `${apiEndpoint}/spirit/text/${lang1}/${lang2}`;  // Adjust the endpoint as necessary

        fetch(url)
            .then(response => response.json())
            .then(data => {
                // Display results in the results div
                const resultsDiv = document.getElementById('rcd-tracts-results');
                resultsDiv.innerHTML = `<p>Fetched Data: ${JSON.stringify(data)}</p>`;
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    });
});
