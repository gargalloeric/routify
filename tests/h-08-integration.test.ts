import {afterAll, expect, test, vi} from "vitest";
import {getUserManager} from "../src/services/UserManager";
import {Coordinates} from "../src/model/Coordinates";
import {UserInfo} from "../src/model/UserInfo";
import {Place} from "../src/model/Place";

vi.mock('../src/services/FirebaseAuthService.ts', () => {
    const FirebaseAuthService = vi.fn()
    FirebaseAuthService.prototype.logIn = vi.fn().mockImplementation((email, password) => {
        return new UserInfo("1", email, "Jose")});
    return { FirebaseAuthService }
});

vi.mock('../src/services/FirebaseDBService.ts', () => {
    const FirebaseDBService = vi.fn()
    FirebaseDBService.prototype.saveUserInfo = vi.fn().mockResolvedValue(true)
    FirebaseDBService.prototype.fetchUserInfo = vi.fn().mockImplementation((userInfo : UserInfo) => {
        userInfo.places["Castellón de la Plana"] = new Place(
            "Castellón de la Plana",
            new Coordinates(39.992715699677966, -0.06730591306542232)
        );
        userInfo.places["Escola Superior de Tecnologia i Ciències Experimentals"] = new Place(
            "Escola Superior de Tecnologia i Ciències Experimentals",
            new Coordinates(39.992715699677966, -0.06730591306542232)
        );
    });
    return { FirebaseDBService }
});

afterAll(() => {
    vi.clearAllMocks()
    vi.resetAllMocks()
});

// E01 - Válido
// Given: el usuario {nombre:”Jose”, email:”edu.jose@gmail.com”, password:”aS0@28Y?”} está logueado y existen lugares de interés almacenados [{“latitude” : ”39.987142”, “longitude” : “-0.037787
//“place_name”: “Castellón de la Plana”}, {“latitude” : ”39.994391421789956”, “longitude” : “-0.06987714539675184”, “place_name”: “Universidad Jaume I”}].
// When: se intenta eliminar el lugar de interés “Castellón de la Plana”.
// Then: se elimina de los lugares de interés {“latitude” : ”39.994391421789956”, “longitude” : “-0.06987714539675184”, “place_name”: “Castellón de la Plana”}.

test('deletePlace_UserRegisteredDBAvailablePlaceApiAvailableValidInputs_deletePlace', async () => {
    const email: string = 'edu.jose@gmail.com',
        password: string = 'aS0@28Y?';

    // tests methods
    const userManager = getUserManager();
    await userManager.logIn(email, password);

    expect(() => getUserManager().deletePlace("Castellón de la Plana")).not.toThrowError('Place not found');
    vi.doUnmock('../src/services/FirebaseDBService.ts');
});

// E02 - Inválido
// Given: el usuario {nombre:”Jose”, email:”edu.jose@gmail.com”, password:”aS0@28Y?”} está logueado y no existen lugares de interés almacenados.
// When: se intenta eliminar el lugar de interés “Castellón de la Plana”.
// Then: se lanza la excepción “InterestPlaceNotFoundException”.


test('deletePlace_UserRegisteredDBAvailablePlaceApiAvailableNoPlacesOnDB_ThrowPlaceNotFoundException', async () => {

    const email: string = 'edu.jose@gmail.com',
        password: string = 'aS0@28Y?';

    // tests methods
    const userManager = getUserManager();
    await userManager.logIn(email, password);

    expect(() => getUserManager().deletePlace("Ckhjguityr")).rejects.toThrowError('Place not found');

});

