document.addEventListener('DOMContentLoaded', function() {
    
    const us_options =  [
        "AL", "AK", "AZ", "AR", "CA", "CO", "CT", "DE", "FL", "GA", 
        "HI", "ID", "IL", "IN", "IA", "KS", "KY", "LA", "ME", "MD", 
        "MA", "MI", "MN", "MS", "MO", "MT", "NE", "NV", "NH", "NJ", 
        "NM", "NY", "NC", "ND", "OH", "OK", "OR", "PA", "RI", "SC", 
        "SD", "TN", "TX", "UT", "VT", "VA", "WA", "WV", "WI", "WY"
    ];
    const au_options = [
        "NSW", "QLD", "SA", "TAS", "VIC", "WA", "ACT", "NT"
    ];
    function updateStateOptions() {
        const country = document.getElementById('country').value;
        const stateContainer = document.getElementById('state-container');
        const stateSelect = document.getElementById('state');
        const stateLabel = document.getElementById('state-label');
        
        stateSelect.style.display = 'none';
        stateLabel.style.display = 'none';
        stateSelect.innerHTML = '';
        
        if (country === 'Australia' || country === 'United States') {
            stateContainer.style.visibility = 'visible';
            stateLabel.style.display = 'block';
            stateSelect.style.display = 'block';
    
            if (country === 'Australia') {
                options = au_options;
            } else if (country === 'United States') {
                options = us_options;
            }

            // Add the default "SELECT STATE:" option
            const defaultOption = document.createElement('option');
            defaultOption.value = "";
            defaultOption.text = "SELECT STATE:";
            stateSelect.add(defaultOption);
            
            options.forEach(function(option) {
                const opt = document.createElement('option');
                opt.value = option;
                opt.text = option;
                stateSelect.add(opt);
            });
        }
    }
    
    document.getElementById('country').addEventListener('change', updateStateOptions);
});
