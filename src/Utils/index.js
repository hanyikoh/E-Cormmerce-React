export const checkUserIsAdmin = currentUser => {
    if(!currentUser || !Array.isArray(currentUser.userRoles)) return false;
    const {userRoles} = currentUser;
    console.log(userRoles)
    if(userRoles.includes('admin')){
        console.log("HELLO")
        return true
    }
    console.log("HELLO WRONG")
    return false;
}