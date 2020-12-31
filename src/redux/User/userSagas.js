import { takeLatest, call, all, put } from 'redux-saga/effects'
import { auth, handleUserProfile, getCurrentUser, GoogleProvider } from './../../firebase/utils'
import userTypes from './userTypes'
import { signInSuccess, signOutUserSuccess, resetPasswordSuccess, userError, checkUserSession } from './userActions'
import { handleResetPasswordAPI } from './userHelpers'

export function* getSnapshotFromUserAuth(user, additionalData = {}) {
  try {
    // auth.onAuthStateChanged(async userAuth => {
    //from onAuthStateChanged, firebase will return a function that's why authListrener is 
    //declared as function here 
    // if (userAuth) {
    const userRef = yield call(handleUserProfile, { userAuth: user, additionalData })
    const snapshot = yield userRef.get();

    yield put(
      signInSuccess({
        id: snapshot.id,
        ...snapshot.data()
      })
    )

    // userRef.onSnapshot(snapshot => {
    // dispatch(setCurrentUser({
    //   id: snapshot.id,
    //   ...snapshot.data()
    // }))
    // })
    // };

    //If use click logout then the page will reload and run this function againb
    //then this dispatch will again be called and return null
    // dispatch(setCurrentUser(userAuth)) //this will return null
    // });
  } catch (error) {
    console.log(error)
  }
}

export function* emailSignIn({ payload: { email, password } }) {
  try {
    const { user } = yield auth.signInWithEmailAndPassword(email, password)
    yield getSnapshotFromUserAuth(user)
    // yield put{
    //  signInSuccess()
    //}
  } catch (err) {
    console.log(err)
  }
}

export function* onEmailSignInStart() {
  yield takeLatest(userTypes.EMAIL_SIGN_IN_START, emailSignIn)
}
//when onEmailSignInStart is called, it will call the emailSignIn function

export function* isUserAuthenticated() {
  try {
    const userAuth = yield getCurrentUser();
    if (!userAuth) return;
    yield getSnapshotFromUserAuth(userAuth);

  } catch (error) {

  }
}

export function* onCheckUserSession() {
  yield takeLatest(userTypes.CHECK_USER_SESSION, isUserAuthenticated)
}

export function* signOutUser() {
  try {
    yield auth.signOut();
    yield put(
      signOutUserSuccess()
      //update reducer
    )
  } catch (error) {
    console.log(error)
  }
}

export function* onSignOutUserStart() {
  yield takeLatest(userTypes.SIGN_OUT_USER_START, signOutUser)
}

export function* signUpUser({
  payload: {
    displayName,
    email,
    password,
    confirmPassword
  }
}) {
  if (password !== confirmPassword) {
    const err = ['Password Don\'t match']
    yield put(
      userError(err)
    )
    return;
  }

  try {
    const { user } = yield auth.createUserWithEmailAndPassword(email, password)
    const additionalData = { displayName }
    yield getSnapshotFromUserAuth(user, additionalData)
    // yield call(handleUserProfile({userAuth: user, additionalData: {displayName}}))

  } catch (error) {
    console.log("saga Error", error)
  }
}

export function* onSignUpUserStart() {
  yield takeLatest(userTypes.SIGN_UP_USER_START, signUpUser)
}

export function* resetPassword({ payload: { email } }) {
  try {
    yield call(handleResetPasswordAPI, email)
    //yield will wait for our function to resolve
    yield put(
      resetPasswordSuccess()
    )

  } catch (error) {
    yield put(
      userError(error)
    )
  }
}

export function* onResetPasswordStart() {
  yield takeLatest(userTypes.RESET_PASSWORD_START, resetPassword)
}

export function* googleSignIn() {
  try {
    const {user} = yield auth.signInWithPopup(GoogleProvider)
    yield getSnapshotFromUserAuth(user)
  } catch (err) {

  }
}

export function* onGoogleSignInStart() {
  yield takeLatest(userTypes.GOOGLE_SIGN_IN_START, googleSignIn)
}

export default function* userSagas() {
  yield all([
    call(onEmailSignInStart),
    call(checkUserSession),
    call(onSignOutUserStart),
    call(onSignUpUserStart),
    call(onResetPasswordStart),
    call(onGoogleSignInStart)
  ])
}
