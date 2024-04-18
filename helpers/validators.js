

const isValidEmail = (email) =>{

    //return emailValidator.validate(email);

    if(typeof email !== 'string'){
        return false;
    }
    const atIndex = email.indexOf('@');
    if (atIndex == -1){
        return false;  //if @ not found in the email
    }
    if (atIndex === 0 || atIndex === email.length-1){
        return false;  //if email begins with @ or ends with @
    }
    
    const afterAt= email.substring(atIndex+1);
    const dotIndex = afterAt.indexOf('.');

    if (dotIndex == -1){
        return false;  //if . not found in the email after @
    }
    if (dotIndex === 0 || dotIndex === afterAt.length - 1){
        return false;  //if . is at begining or end at remaining part
    }
    return true;
};

const isValidPhoneNumber = (phoneNumber) => {
    // Regular expression to match a valid phone number
    const phoneRegex = /^\+\d{1,3}\s?\(\d{3}\)\s?\d{3}-\d{4}$/;
    return phoneRegex.test(phoneNumber);
};


module.exports = {
    isValidEmail,
    isValidPhoneNumber
};