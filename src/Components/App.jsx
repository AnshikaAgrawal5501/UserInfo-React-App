import React, {useState} from 'react';
import Navigationbar from './NavBar';
import Main from './Main';
import Users from './Users';
import { usePromiseTracker } from "react-promise-tracker";
import { trackPromise } from 'react-promise-tracker'
import Loader from 'react-loader-spinner';

function App() {

    const [users, setUsers] = useState([]);

    function getData() {
        trackPromise(
            fetch('https://reqres.in/api/users?page=1#')
                .then(async function(userDetails) {
                    const users=await userDetails.json();
                    setUsers(users.data);
                })
        )
    }

    const LoadingIndicator = props => {
           const { promiseInProgress } = usePromiseTracker();
        
           return (
             promiseInProgress && 
                 <div
                   style={{
                     width: "100%",
                     height: "100",
                     display: "flex",
                     justifyContent: "center",
                     alignItems: "center"
                   }}
                 >
                   <Loader type="ThreeDots" color="#dc3545" height="100" width="100" />
                 </div>
          );  
         }

    return (
        <>
            <Navigationbar getUsers={getData} />
            {users.length>0 ? 
            <>
                <LoadingIndicator/>
                <Users users={users} />
            </> : <Main />}
        </>
    );
}

export default App;