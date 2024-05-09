

/*_____________Helper function to validate email, name, and password____________ */

function validateInput(email, name, password) {
// Checking if email is blank
    if (!email ) {
        return 'Cannot Leave the email field blank';
    }

// Checking if email is valid
    if (!email || !/\S+@\S+\.\S+/.test(email)) {
        return 'Invalid email address';
    }
    
// Checking if name is provided
    if (!name) {
        return 'You cannot leave the Name field blank, Atleast 4 characters is needed';
    }

// Checking if name is provided and it contains any non alphanetic character
    if (!name || !/^[^\s][a-zA-Z\s]{3,}$/.test(name)) {
        return 'Name must contain only alphabetic characters';
    }

// Checking if name is provided and it has atleast 4 character length
if (!name || name.length < 4 || name.length > 20) {
    return 'Name must be between 4 and 20 characters';
}
    
// Checking if password meets minimum requirements
    if (!password) {
        return 'You cannot Leave this field blank, Password must be at least 6 characters long';
    }

// Check if password meets minimum length requirements    
    if (!password || password.length < 6) {
        return 'Password must be at least 6 characters long';
    }

// If all checks pass, return null,which means no error__
    return null;
}

module.exports = validateInput