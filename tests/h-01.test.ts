import { expect, test } from "vitest";
import {getUserManager} from "../src/services/UserManager";
import {FirebaseDBService} from "../src/services/FirebaseDBService";

// TODO reimplement with
// TODO integration tests
test('registerUser_ValidInputs_RegisterUser', async () => {
    const name: string = 'Jose',
        email: string = 'fake.jose@notamail.not',
        password: string = 'aS0@28Y?',
        repPassword: string = 'aS0@28Y?'

    // tests methods
    let mail = await getUserManager().register(name, email, password, repPassword)
    expect(mail).toBe(email)

    // delete what is done
    await getUserManager().deleteAccount()
})

test('registerUser_InvalidPassword_ThrowPasswordNotValidException', async () => {
    let name: string = 'Jose',
        email: string = 'jose@gmail.com',
        password: string = 'S438w',
        repPassword: string = 'S438w'

    await expect(() => getUserManager().register(name, email, password, repPassword)).rejects.toThrowError('Password not valid')
})
