import * as types from "./actionTypes";

import { auth, db } from "../firebase";
import {
  signOut,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { addDoc, collection, Timestamp } from "firebase/firestore";
console.log(auth.currentUser, "auth.currentUser");

const signinSuccess = (admin) => ({
  type: types.SIGNIN_SUCCESS,
  payload: admin,
});

const signinFail = (error) => ({
  type: types.SIGNIN_FAIL,
  payload: error,
});

export const signinInitiate = (email, password) => async (dispatch) => {
  const user = await signInWithEmailAndPassword(auth, email, password);
  const { accessToken } = user.user;

  localStorage.setItem("token", JSON.stringify(accessToken));
  try {
    dispatch(signinSuccess(user));
  } catch (error) {
    dispatch(signinFail(error.message));
  }
};

export const logoutInitiate = (admin) => async (dispatch) => {
  await signOut(auth);
  dispatch({
    type: types.LOGOUT_END,
    payload: admin,
  });
};

export const hanldSignup = (email, password, values) => async (dispatch) => {
  const data = await createUserWithEmailAndPassword(auth, email, password);
  const { uid } = data.user;
  await addDoc(collection(db, "Users"), {
    ...values,
    uid: uid,
    timestamp: Timestamp.now(),
  });

  dispatch({
    type: types.SIGNUP_SUCCESS,
    payload: data,
  });
};
