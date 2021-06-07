import React, { useEffect, useState } from 'react';
import { server } from '../../server';
import Loader from '../Loader/Loader';
import SearchStudentById from './SearchStudentById';
import './User.css';

export default function User() {
    const [loader, setLoader] = useState(false);
    const [users, setUsers ] = useState(null);
    const [filter, setFilter ] = useState({})

    useEffect(() => {
        setLoader(true)
        fetch(`${server}/student/`, {
            method: "POST",
            headers: {"Content-Type":"application/json"},
            body: JSON.stringify(filter)
        })
        .then(response => response.json())
        .then(result => {
            setLoader(false)
            if(result.users){
                setUsers(result.users)
            }
        })
        .catch(error => console.log('error', error));
    }, [filter])

    const handleChange = e => {
        const newFilter = {...filter};
        newFilter[e.target.name]=e.target.value;
        setFilter(newFilter);
    }
    return (
        <div className = 'signup text-white p-5'>            
             <SearchStudentById />
             <h3 className = 'text-center py-5'>All Students</h3>
            <h4>Filter by</h4>
            <select onChange = {handleChange} name = "batch" className="form-select my-2" aria-label="batch">
                <option disabled selected>Batch</option>
                <option value="1st">1st</option>
                <option value="2nd">2nd</option>
                <option value="3rd">3rd</option>
                <option value="4th">4th</option>
            </select>
            <select name = "semester" onChange = {handleChange} className="form-select mb-2" aria-label="semester">
                <option disabled selected>Semester</option>
                <option value="1st">1st</option>
                <option value="2nd">2nd</option>
                <option value="3rd">3rd</option>
                <option value="4th">4th</option>
                <option value="5th">5th</option>
                <option value="6th">6th</option>
                <option value="7th">7th</option>
                <option value="8th">8th</option>
            </select>
            {
                loader ? <Loader /> :
                <div>
               
            <div className = 'row'>
                        
            {
                users && users.map(user => {
                    return  <div key = {user._id} className = "col-lg-4 col-md-6 ">
                                <div className = 'p-4 form-controler my-3'>
                                    <p> <strong>Name: </strong> {user.name} </p>
                                    <p> <strong>Student Id: </strong> {user.studentId} </p>
                                    <p> <strong>Email: </strong> {user.email} </p>
                                    <p> <strong>Batch: </strong> {user.batch} </p>
                                    <p> <strong>Semester: </strong> {user.semester} </p>
                                </div>
                            </div>
                   
                })
                
            }
             </div>
             </div>
            }
        </div>
    )
}
