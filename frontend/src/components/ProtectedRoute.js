import { Route, Redirect } from 'react-router-dom';


export default function ProtectedRoute({ isLoggedIn, children, ...props }) {
    return (
        <Route {...props}>{isLoggedIn ? children : <Redirect to='/login' />}</Route>
    );
};

