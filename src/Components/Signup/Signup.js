import React, { useState } from 'react';
import { server } from '../../server';
import './Signup.css';
import Loader from '../Loader/Loader'

export default function Signup() {
    const [loader, setLoader] = useState(false)
    const [errors, setErrors] = useState(null)
    const [student, setStudent] = useState({})
    
    const handleChange = e => {
        const newStudent = {...student};
        newStudent[e.target.name]=e.target.value;
        setStudent(newStudent);
    }

    const handleSubmit = e => {
        setLoader(true)
        e.preventDefault();
                    fetch(`${server}/student/signup/`, {
                        method: 'POST',
                        headers: {"Content-Type" : "application/json"},
                        body: JSON.stringify(student),
                        redirect: 'follow',
                    })
                    .then(res => res.json())
                    .then(data => {
                        setLoader(false)
                        if(data.token) {
                            localStorage.setItem('token', data.token);
                            window.location.reload();
                            window.location.replace('/')
                        };
                        if(data.userId){
                            console.log(data);
                            setErrors(null)
                        }else{
                            setLoader(false)
                            console.log(data);
                            setErrors(data)
                        }
                    })
                    .catch(err => console.log(err))
    }
    return (
        <div className = 'signup text-white'>
            <h3 className = 'text-center py-5'>Signup Form</h3>
            <div className = 'row'>
                <div className = "col-lg-6 col-md-6 form-controler mx-auto mb-5">
                    {
                        loader && <Loader />
                    }
                         <form className = 'm-5'>
                        <select name = "user" onClick = {handleChange} className="form-select my-2" aria-label="user">
                            <option disabled selected>Who You Are?</option>
                            <option value="student">Student</option>
                            <option value="teacher">Teacher</option>
                        </select>
                        {
                            errors && errors.user && <p className = 'text-error'> {errors.user} </p>
                        }
                        <input type= 'text'  onChange = {handleChange}  name = 'name' className = 'form-control' placeholder = 'Name' />
                        {
                            errors && errors.name && <p className = 'text-error'> {errors.name} </p>
                        }
                        <input type= 'text'  onChange = {handleChange}  name = 'email' className = 'form-control' placeholder = 'Email' />
                        {
                            errors && errors.email && <p className = 'text-error'> {errors.email} </p>
                        }
                        <input type= 'text'  onChange = {handleChange}  name = 'studentId' className = 'form-control' placeholder = 'Studen ID' />
                        {
                            errors && errors.studentId && <p className = 'text-error'> {errors.studentId} </p>
                        }
                        {/* <input type= 'text'  onChange = {handleChange}  name = 'batch' className = 'form-control' placeholder = 'Batch' /> */}
                        <select onClick = {handleChange} name = "batch" className="form-select my-2" aria-label="batch">
                            <option disabled selected>Batch</option>
                            <option value="1st">1st</option>
                            <option value="2nd">2nd</option>
                            <option value="3rd">3rd</option>
                            <option value="4th">4th</option>
                        </select>
                        {
                            errors && errors.batch && <p className = 'text-error'> {errors.batch} </p>
                        }
                        {/* <input type= 'text'  onChange = {handleChange}  name = 'semester' className = 'form-control' placeholder = 'Semester ' /> */}
                        <select name = "semester" onClick = {handleChange} className="form-select mb-2" aria-label="semester">
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
                            errors && errors.semester && <p className = 'text-error'> {errors.semester} </p>
                        }
                        <input type= 'password'  onChange = {handleChange}  name = 'password' className = 'form-control' placeholder = 'Password' />
                        {
                            errors && errors.password && <p className = 'text-error'> {errors.password} </p>
                        }
                        {
                            errors && errors.emailOrId && <p className = 'text-error'> {errors.emailOrId} </p>
                        }
                        <button type = 'submit' onClick = {handleSubmit} className = 'form-submit'> Signup </button>
                   
                    </form>
                </div>
            </div>
        </div>
    )
}
