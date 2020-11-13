import {useEffect} from 'react'
import {useSelector} from 'react-redux'
//to map the states that we dont store in redux store

const mapState = ({user}) => ({
    currentUser : user.currentUser
})

//Write custom hooks
const useAuth = props => {
    const {currentUser} = useSelector(mapState);
    
    useEffect(() => {
        if(!currentUser){
            props.history.push('/login')
        }
    }, [currentUser])
    
    return currentUser
}

export default useAuth;