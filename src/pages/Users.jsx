import React, { useEffect, useState } from 'react';
import useAxiosSecure from '../hooks/useAxiosSecure';

const Users = () => {
    const axiosSecure=useAxiosSecure()
    const [users,setUsers]=useState([])
    useEffect(()=>{
        axiosSecure.get('/users')
        .then(res=>setUsers(res.data))
    },[axiosSecure])
    console.log(users);
    return (
        <div>
            <h1>Users</h1>
        </div>
    );
};

export default Users;