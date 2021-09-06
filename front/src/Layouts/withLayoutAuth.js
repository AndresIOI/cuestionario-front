import Login from '../components/admin/Login'

import {useAuth} from '../providers/auth'

function withLayoutAuth(Wrapped) {
    return function () {   
        const { isAuthenticated, isLoading, user } = useAuth();
        if (isLoading || !isAuthenticated){
            return <Login />
        }else{
            return (
                        <Wrapped />
            )
        }   
    }
}

export default withLayoutAuth
