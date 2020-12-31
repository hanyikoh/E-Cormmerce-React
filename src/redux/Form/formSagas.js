import { takeLatest, put, all, call } from 'redux-saga/effects'
import { auth } from './../../firebase/utils'
import {addContactStart} from "./formActions"
import formTypes from './formTypes'
import {handleAddContact} from './formHelpers'

export function* addContact({payload}){
    try{
        console.log(payload)
        const timestamp = new Date();
        yield handleAddContact({
            ...payload,
            productAdminUserUID: auth.currentUser.uid,
            createdDate: timestamp
        })
        // yield put(
        //     setProduct(product)
        // )
    }catch(err){
        console.log(err);
    }
}


export function* onAddContactStart(){
    yield takeLatest(formTypes.ADD_NEW_CONTACT_START, addContact)
}


export default function* formSagas() {
    yield all([
        call(onAddContactStart),
    ])
}