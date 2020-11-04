import * as Realm from "realm-web";
// eslint-disable-next-line  @typescript-eslint/no-var-requires
const randomEmail = require("random-email"); // needs to be require statement because there is no @types/random-email

const email = randomEmail({ domain: "example.com" });
const password = "Test123!";

const expectedIdentities = ["anon-user", "local-userpass"];

const app = new Realm.App({ id: "tutsbrawl-qfxxj" });

async function registerNewAccount(email: string, password: string) {
  await app.emailPasswordAuth
    .registerUser(email, password)
    .catch((err) =>
      console.error(
        `An error occurred while registering: ${JSON.stringify(err)}`
      )
    );
}

async function linkAccounts(user: Realm.User, email: string, password: string) {
  const emailPasswordUserCredentials = Realm.Credentials.emailPassword(
    email,
    password
  );
  await user.linkCredentials(emailPasswordUserCredentials);
}

describe("identity linking", () => {
  test("test linkAccounts", async () => {
    // Create an anonymous credential
    const credentials = Realm.Credentials.anonymous();

    const user = await app.logIn(credentials);
    await registerNewAccount(email, password).catch((e) =>
      console.error(`an error occurred while registering a user ${e}`)
    );

    await linkAccounts(user, email, password).catch((e) =>
      console.error(`an error occurred while linking identities: ${e}`)
    );

    // in realm-web for typescript it is user.identities not user.profile.identities
    const userIdentities = user.identities.map((identityObject) => {
      return identityObject.providerType;
    });

    expect(userIdentities).toStrictEqual(expectedIdentities);
  });
});
