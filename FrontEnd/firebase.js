import { initializeApp } from "firebase/app";
import "firebase/auth";
import { getAuth } from "firebase/auth";

const app = initializeApp({
    apiKey: "AIzaSyArqB2i0PCGbM8lEQZsbDoRYve45R2g1QA",
    authDomain: "chatbot-76aa5.firebaseapp.com",
    projectId: "chatbot-76aa5",
    storageBucket: "chatbot-76aa5.appspot.com",
    messagingSenderId: "182535340042",
    appId: "1:182535340042:web:b7a3ef739c40ab3c449ff3",
});

export const auth = getAuth(app);
export default app;
