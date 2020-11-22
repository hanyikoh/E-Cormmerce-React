import {all, call} from 'redux-saga/effects'

import userSagas from './User/userSagas'
import productsSagas from './Products/productsSagas'

export default function* rootSaga(){
    yield all([
        call(userSagas),
        call(productsSagas)
    ]);
}