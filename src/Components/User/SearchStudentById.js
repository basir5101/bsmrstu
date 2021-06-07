import React, { useEffect, useState } from 'react'
import './User.css';
import {server} from '../../server';
import Loader from '../Loader/Loader';

export default function SearchStudentById() {
const [loader, setLoader ] = useState(false)
const [searchText, setSearchText] = useState({});
const [user, setUser] = useState(null)
const [error, setError] = useState(null)
const handleChange = e => {
    const newText = {...searchText};
        newText[e.target.name]=e.target.value;
        setSearchText(newText);
}
const handleSubmit = e => {
    setLoader(true)
    e.preventDefault()
    fetch(`${server}/student/${searchText.search}`, {
        headers: {"Content-Type" : "application/json"},
        redirect: 'follow',
    })
        .then(response => response.json())
        .then(result => {
            console.log(result);
            setLoader(false)
            if(result.user){
                setUser(result.user)
            } else{
                setError('No User Found')
            }
        })
}
console.log(user);
    return (
        <div>
            <form className="form-inline search-form my-5">
                <input onChange = {handleChange} name = 'search' className="form-control w-75" type="search" placeholder="Student ID" aria-label="Search" />
                <button onClick = {handleSubmit} className="btn w-25" type="submit">Search</button>
            </form>
            { loader&& <Loader /> }
            {
                user && user.length > 0 && user.map(student => { 
                return <div key = {user._id} className = "row ">
                        <div className = 'p-4 form-controler my-3'>
                            <p> <strong>Name: </strong> {student.name} </p>
                            <p> <strong>Student Id: </strong> {student.studentId} </p>
                            <p> <strong>Email: </strong> {student.email} </p>
                            <p> <strong>Batch: </strong> {student.batch} </p>
                            <p> <strong>Semester: </strong> {student.semester} </p>
                        </div>
                    </div>
                }) 
            }
            {user && user.length === 0 && <h6 className = 'text-center'>No User Found</h6> }
        </div>
    )
}
