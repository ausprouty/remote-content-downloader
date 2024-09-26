document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('rcd-tracts-form');
    const lang1Select = document.getElementById('lang1');

    // Fetch data to populate lang1 on page load
    const apiEndpoint = RCDSettings.apiEndpoint;
    const lang1Url = `${apiEndpoint}/tracts/distinct/lang1`;

    fetch(lang1Url)
    .then(response => response.json())
    .then(data => {
        data.forEach(item => {
            const option = new Option(item.lang1, item.lang1);  // Create new option
            lang1Select.appendChild(option);  // Append it to the select
        });
    })
    .catch(error => console.error('Error fetching lang1 data:', error));



});
