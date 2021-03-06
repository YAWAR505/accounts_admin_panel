import * as types from "./actionTypes";

import { auth, db } from "../firebase";
import {
  signOut,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { addDoc, collection, Timestamp } from "firebase/firestore";

export const signinSuccess = (admin) => ({
  type: types.SIGNIN_SUCCESS,
  payload: admin,
});

export const signinFail = (error) => ({
  type: types.SIGNIN_FAIL,
  payload: error,
});

export const signinInitiate = (email, password) => async (dispatch) => {
  try {
    const user = await signInWithEmailAndPassword(auth, email, password);
    dispatch(signinSuccess(user.user));
  } catch (error) {

    // if(error.message  === 'auth/email-not-found')
    dispatch(signinFail(error.message));
  }
};

export const logoutInitiate = (admin) => (dispatch) => {
  signOut(auth);
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
