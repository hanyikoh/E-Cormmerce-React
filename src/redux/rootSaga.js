import {all, call} from 'redux-saga/effects'

import userSagas from './User/userSagas'
import productsSagas from './Products/productsSagas'
import formSagas from './Form/formSagas'

export default function* rootSaga(){
    yield all([
        call(userSagas),
        call(productsSagas),
        call(formSagas)
    ]);
}