const admin = require("firebase-admin");
const serviceAccount = require("./secrets");

export const verifyIdToken = (token) => {
  if (!admin.apps.length) {
    // admin.initializeApp({
    //   credential: admin.credential.cert(serviceAccount),
    // });
  }

  return admin
    .auth()
    .verigyIdToken(token)
    .catch((err) => {
      throw err;
    });
};
