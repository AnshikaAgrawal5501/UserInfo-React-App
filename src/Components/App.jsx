import React, {useState} from 'react';
import Navigationbar from './NavBar';
import Main from './Main';
import Users from './Users';
import { trackPromise } from 'react-promise-tracker'
import Loader from 'react-loader-spinner';

function App() {

    const [users, setUsers] = useState([]);
    const [isLoading, loaded] = useState(true);

    function getData() {

        trackPromise(
            fetch('https://reqres.in/api/users?page=1#')
                .then(async function(userDetails) {
                    const users=await userDetails.json();
                    setUsers(users.data);
                })
        )

        setTimeout(function() {
            loaded(false);
        },750);
    }

    function LoadingIndicator () {
    
        return (
                <div
                style={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    marginTop:"30vh"
                }}
                >
                <Loader type="ThreeDots" color="#dc3545" height="150" width="150" />
                </div>
        );  
    }

    return (
        <>
            <Navigationbar getUsers={getData} />
            {
                users.length>0 ? 
                    (isLoading ? 
                        <LoadingIndicator/> : <Users users={users} />
                    ) : <Main />
            }
        </>
    );
}

export default App;