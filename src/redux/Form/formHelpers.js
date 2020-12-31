import { firestore } from './../../firebase/utils'

export const handleAddContact = contact => {
    return new Promise((resolve, reject) => {
        firestore
            .collection('contacts')
            .doc()
            .add(contact)
            .then(() => {
                resolve()
            })
            .catch(err => {
                reject(err)
            })
    })
}