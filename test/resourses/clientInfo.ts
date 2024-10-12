import {faker} from "@faker-js/faker";

export interface IClientInfo {
    firstName: string;
    lastName: string;
    address: string;
    city: string;
    state: string;
    zipCode: string;
    phone: string;
    ssn: string;
    userName: string;
    userPassword: string;
}

export const ClientInfo: IClientInfo = {
    firstName: faker.person.firstName(),
        lastName: faker.person.lastName(),
        address: faker.location.streetAddress(),
        city: faker.location.city(),
        state: faker.location.state(),
        zipCode: faker.location.zipCode(),
        phone: faker.phone.number(),
        ssn: faker.string.numeric(9),
        userName: faker.person.firstName() + faker.string.alpha(3) + '@test.com',
        userPassword: faker.internet.password()
}