import formTypes from './formTypes'

export const addContactStart = formData => ({
    type: formTypes.ADD_NEW_CONTACT_START,
    payload: formData
})