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

export function validateLogInInfo(email : string, password : string): string | null {
    if (!email || !password)
        return "Fill all fields"
    if (password.length < 8 || !validatePassword(password))
        return "Password not valid"
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

export function validateVehicleInfo(matricula: string, nombre: string, tipoMotor: string, consumo100Km: number): string | null {
    if (!matricula || !nombre || !tipoMotor || !consumo100Km ) return "Fill all fields"
    if (matricula.length != 7 || !validateMatriculaEsp(matricula)) return "Instroduzca una matricula válida"
    if (tipoMotor != "combustión" && tipoMotor != "eléctrico") return "El tipo de motor debe ser 'combustión' o 'eléctrico'.";
    if (consumo100Km < 0 || consumo100Km > 1000) return "El consumo a los 100 km debe estar entre 0 y 1000.";
    return null
}

export function validateMatriculaEsp(matricula: string): boolean {
    const regexMatriculaEsp = /^[0-9]{4}[A-Z]{3}$/;
    return regexMatriculaEsp.test(matricula);
}
