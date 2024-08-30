import { initializeApp } from "firebase/app";
import { getAuth, Auth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyCYyGTCpW_SLYRIPuXbsMi4HYxQ97N-BEM",
    authDomain: "desafio3compass.firebaseapp.com",
    projectId: "desafio3compass",
    storageBucket: "desafio3compass.appspot.com",
    messagingSenderId: "67458841183",
    appId: "1:67458841183:web:c17936e52ebfef4c9579ea"
};

const app = initializeApp(firebaseConfig);
export const auth: Auth = getAuth(app);
