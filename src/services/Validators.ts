export function validateRegistrationInfo(name: string, email: string, password: string, repPassword: string): string | null {
    if (!name || !email || !password || !repPassword)
        throw new Error("Fill all fields")
    if (password != repPassword)
        throw new Error("Passwords must match")
    if (password.length < 8 || !validatePassword(password))
        throw new Error("Password not valid")
    return null
} // TODO validate mail is not implemented

export function validateLogInInfo(email : string, password : string) {
    if (!email || !password)
        throw new Error("Fill all fields")
    if (password.length < 8 || !validatePassword(password))
        throw new Error("Password not valid")
    return null
}

export function validatePassword(password: string): boolean  {
    const regexMayuscula = /[A-Z]/,
        regexMinuscula = /[a-z]/,
        regexNumero = /[0-9]/,
        regexEspecial = /[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]/;

    return regexMayuscula.test(password) &&
        regexMinuscula.test(password) &&
        regexNumero.test(password) &&
        regexEspecial.test(password);
}