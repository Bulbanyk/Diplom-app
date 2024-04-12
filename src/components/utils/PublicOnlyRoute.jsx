import { Navigate } from 'react-router-dom'
import useStore from "../../store.js";


const PublicOnlyRoute = ({Component}) => {
    const { isLoggedIn} = useStore()
    return isLoggedIn ? <Navigate to="/boards" replace /> : <Component />;
};

export default PublicOnlyRoute;