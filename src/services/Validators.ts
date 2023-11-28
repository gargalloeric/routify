export function validateRegistrationInfo(name: string, email: string, password: string, repPassword: string): string | null {
    if (!name || !email || !password || !repPassword)
        return "Fill all fields"
    if (password != repPassword)
        return "Passwords must match"
    if (password.length < 8 || !validatePassword(password))
        return "Password not valid"
    if (!validateMail(email))
        return "Mail not valid"
    return null
}

export function validateMail(mail: string): boolean {
    const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;

    return regex.test(mail);
}

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