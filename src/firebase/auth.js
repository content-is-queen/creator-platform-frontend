/* eslint-disable max-len */
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "./firebase";

export const doCreateUserWithEmailAndPassword = async (email, password) =>
    createUserWithEmailAndPassword(auth, email, password);
export const doSignInWithEmailAndPassword = async (email, password) =>
    signInWithEmailAndPassword(auth, email, password);

export const doSignOut = () => auth.signOut();
