 import { Navigate } from 'react-router-dom' 
import { getToken, getUser } from '../utils/helperFunctions'
 
interface Props {
  component: React.ComponentType
  path?: string
 
}

export const PrivateRoute: React.FC<Props> = ({ component: RouteComponent }) => {
 
  if (getToken()) {
    return <RouteComponent />
  } 
  // else {
  //   return <AccessDenied />
  // }

   return <Navigate to={'/'}/>
}
