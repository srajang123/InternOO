const otpGenerator = require('otp-generator')
const fs = require('fs');

const generateOtp = (email) => {
    var otp = otpGenerator.generate(6, {
        digits: true,
        lowerCaseAlphabets: false,
        upperCaseAlphabets: false,
        specialChars: false
    });

    var otpData = {
        'otp':otp,
        'email':email,
        'expiry':new Date(new Date().getTime() + 5 * 60000).toJSON()
    }

    var otps = _getOTPJSON();
    otps.push(otpData);
    fs.writeFileSync('/workspaces/InternOO/db/otp-list.json', JSON.stringify(otps), 'utf-8');
    return otpData;
}

const verifyOtp = (email, otp) => {
    var otps = _getOTPJSON();
    var otpForEmail = otps.filter(otpData => {
        return email == otpData.email;
    })[0];
    return !!otpForEmail && otpForEmail.otp==otp && !_isOTPExpired(otpForEmail);
}

const _isOTPExpired = (otpData) => {
    var currentDate = new Date();
    var otpExpiryDate = new Date(otpData.expiry);
    return currentDate>otpExpiryDate;
}

const _getOTPJSON = () => {
    var fileResponse = fs.readFileSync('/workspaces/InternOO/db/otp-list.json', 'utf-8');
    return JSON.parse(fileResponse);
}

module.exports.generateOtp = generateOtp;
module.exports.verifyOtp = verifyOtp;