const { initializeApp, getApps, cert } = require("firebase-admin/app");
const { getFirestore } = require("firebase-admin/firestore");

// 👇 učitava JSON file iz root foldera (gdje je package.json)
const serviceAccount = require("../../firebase-admin.json");

export const initFirebaseAdmin = () => {
  // Provjerava da Firebase Admin ne bude inicijaliziran više puta
  if (getApps().length < 1) {
    initializeApp({
      credential: cert(serviceAccount),
      projectId: serviceAccount.project_id, // koristi project_id iz JSON-a
    });
  }

  return getFirestore();
};
