

/*_____________Helper function to validate email, name, and password____________ */

function validateInput(email, name, password) {
// Check if email is blank
    if (!email ) {
        return 'Cannot Leave the email field blank';
    }

// Check if email is valid
    if (!email || !/\S+@\S+\.\S+/.test(email)) {
        return 'Invalid email address';
    }
    
// Check if name is provided
    if (!name) {
        return 'You cannot leave the Name field blank, Atleast 4 characters is needed';
    }

// Check if name is provided and it contains any non alphanetic character
    if (!name || !/^[^\s][a-zA-Z\s]{3,}$/.test(name)) {
        return 'Name must contain only alphabetic characters';
    }

// Check if name is provided and it has atleast 4 character length
if (!name || name.length < 4 || name.length > 20) {
    return 'Name must be between 4 and 20 characters';
}
    
// Check if password meets minimum requirements
    if (!password) {
        return 'You cannot Leave this field blank, Password must be at least 6 characters long';
    }
    
    if (!password || password.length < 6) {
        return 'Password must be at least 6 characters long';
    }

// If all checks pass, return null, means no error
    return null;
}

module.exports = validateInput