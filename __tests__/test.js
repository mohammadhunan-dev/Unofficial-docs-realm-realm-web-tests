import * as Realm from "realm-web";
import randomEmail from "random-email";

const email = randomEmail({ domain: "example.com" });
const password = "Test123!";

const expectedIdentities = [
  'anon-user', 'local-userpass'
];


const app = new Realm.App({ id: "tutsbrawl-qfxxj" });

async function registerNewAccount(email, password) {
    await app.emailPasswordAuth
      .registerUser(email, password)
      .catch((err) =>
        console.log(
          `An error occurred while registering: ${JSON.stringify(err, 2, null)}`
        )
      );
}

async function linkAccounts(user, email, password) {
    const emailPasswordUserCredentials = Realm.Credentials.emailPassword(
      email,
      password
    );
    const linkedAccount = await user.linkCredentials(
      emailPasswordUserCredentials
    );
    console.log(linkedAccount);
    return linkedAccount;
}

describe("identity linking", () => {
    test("test linkAccounts",  async () => { 
        // Create an anonymous credential
        const credentials = Realm.Credentials.anonymous();

        const user = await app.logIn(credentials);
        console.log('user logged in :', user.id);
        await registerNewAccount(email,password)
          .catch((e)=>console.log(`an error occurred while registering a user ${e}`));



        await linkAccounts(user, email, password)
          .catch((e) => console.log(`an error occurred while linking identities: ${e}`))

        const userIdentities = user.profile.identities.map((identityObject) => {
          return identityObject.providerType;
        })


        expect(userIdentities).toStrictEqual(expectedIdentities);


    })
})