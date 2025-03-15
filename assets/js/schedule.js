document.addEventListener('DOMContentLoaded', function() {
    const termsCheck = document.getElementById('termsCheck');
    const pickDayTimeBtn = document.getElementById('pickDayTimeBtn');
    const errorMessage = document.getElementById('error-message');

    // Initially disable the button
    pickDayTimeBtn.disabled = true;

    // Add event listener to the checkbox
    termsCheck.addEventListener('change', function() {
        pickDayTimeBtn.disabled = !this.checked;
    });

    // Add event listener to the button
    pickDayTimeBtn.addEventListener('click', function(event) {
        event.preventDefault();
        
        // Check if all input fields are filled
        const inputs = document.querySelectorAll('.form-control');
        let allFilled = true;
        inputs.forEach(input => {
            if (input.value.trim() === '') {
                allFilled = false;
            }
        });

        errorMessage.style.display = 'none';

        if (!allFilled) {
            errorMessage.style.display = 'block';
            return;
        }

        errorMessage.style.display = 'none';

        if (!pickDayTimeBtn.disabled) {
            window.location.href = 'Discovery.html';
        }
    });
});