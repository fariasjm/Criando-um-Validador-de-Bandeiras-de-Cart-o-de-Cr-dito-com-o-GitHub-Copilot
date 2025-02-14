function validateCreditCard(number) {
    const cardPatterns = {
        visa: /^4[0-9]{12}(?:[0-9]{3})?$/,
        mastercard: /^5[1-5][0-9]{14}$/,
        amex: /^3[47][0-9]{13}$/,
        discover: /^6(?:011|5[0-9]{2})[0-9]{12}$/,
        diners: /^3(?:0[0-5]|[68][0-9])[0-9]{11}$/,
        jcb: /^(?:2131|1800|35\d{3})\d{11}$/
    };

    let bandeira = null;

    for (const [issuer, pattern] of Object.entries(cardPatterns)) {
        if (pattern.test(number)) {
            bandeira = issuer;
            break;
        }
    }

    const isValid = luhnCheck(number);

    return {
        isValid,
        bandeira
    };
}

function luhnCheck(number) {
    let sum = 0;
    let shouldDouble = false;

    for (let i = number.length - 1; i >= 0; i--) {
        let digit = parseInt(number.charAt(i));

        if (shouldDouble) {
            digit *= 2;
            if (digit > 9) {
                digit -= 9;
            }
        }

        sum += digit;
        shouldDouble = !shouldDouble;
    }

    return sum % 10 === 0;
}

// Example usage:
const cardNumber = '4111111111111111';
const result = validateCreditCard(cardNumber);
console.log(result); // { isValid: true, bandeira: 'visa' }