import {UserInfo} from "../model/UserInfo.ts";
import {firebaseAuth, createUserWithEmailAndPassword} from "./FirebaseUtils.ts";

export class UserManager { // Singleton

    userInfo : UserInfo | null;

    constructor() {
        this.userInfo = null  // maybe change on login¿?
    }

    validarContrasena(contrasena) {
        // Al menos una letra mayúscula
        var regexMayuscula = /[A-Z]/;

        // Al menos una letra minúscula
        var regexMinuscula = /[a-z]/;

        // Al menos un carácter numérico
        var regexNumero = /[0-9]/;

        // Al menos un carácter especial
        var regexEspecial = /[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]/;

        // Verificar todas las condiciones en un solo if
        if (regexMayuscula.test(contrasena) &&
            regexMinuscula.test(contrasena) &&
            regexNumero.test(contrasena) &&
            regexEspecial.test(contrasena)) {
            return true; // La contraseña cumple con todas las condiciones
        } else {
            return false; // La contraseña no cumple con alguna de las condiciones
        }
    }

async register(name: string, email: string, password: string, repPassword: string): Promise<string> { // returns the mail of the user
        // validate values
        if (!name || !email || !password || !repPassword)
            throw new Error("Not Implemented")
        if (password != repPassword)
            throw new Error("Not Implemented")
        if (password.length < 8 || !this.validarContrasena(password))
            throw new Error("Password not valid")
        // create user (in auth + bbdd)
        // assign values to userInfo
        const userCredential = await createUserWithEmailAndPassword(firebaseAuth, email, password)
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(`ERROR [UserManager] Code: ${errorCode}, Message: ${errorMessage}`)
                throw new Error("Not Implemented") // User is already registered or invalid password
            });
        this.userInfo = new UserInfo(userCredential.user, name)
        if (this.userInfo.mail) return this.userInfo.mail
        else return "No mail¿?"
    }
}

let instance: UserManager;

export function getUserManager(): UserManager {
    if (!instance) instance = new UserManager()
    return instance;
}