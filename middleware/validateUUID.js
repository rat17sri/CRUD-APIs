/**
 * * method to validate userId to be a valid uuid.
 * @param userId
 */
const validateUUID = (userId) => {

    /* Regular expression to check if string is a valid UUID */
    const regexExp = /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/gi;

    const valid = regexExp.test(userId);

    return valid;
}

module.exports = validateUUID;