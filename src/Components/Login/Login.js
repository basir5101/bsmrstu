import React, { useState } from 'react';
import { server } from '../../server';
import Loader from '../Loader/Loader';

export default function Login() {
    const [loader, setLoader] = useState(false)
    const [errors, setErrors] = useState({})
    const [student, setStudent] = useState({
        user: 'student',
    })
    
    const handleChange = e => {
        const newStudent = {...student};
        newStudent[e.target.name]=e.target.value;
        setStudent(newStudent);
    }

    const handleSubmit = e => {
        setLoader(true)
        e.preventDefault();
            fetch(`${server}/student/login/`, {
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
                    console.log(data.errors);
                    setLoader(false)
                    setErrors(data.errors)
                }
            })
            .catch(err => console.log(err))
        }
    return (
        <div className = 'signup text-white'>
            <h3 className = 'text-center py-5'>Login Form</h3>
            <div className = 'row'>
                <div className = "col-lg-6 col-md-6 form-controler mx-auto mb-5">
                    {
                        loader && <Loader />
                    }
                    <form className = 'm-5'>
                        <input type= 'text'  onChange = {handleChange}  name = 'email' className = 'form-control' placeholder = 'Email' />
                        {
                            errors && errors.emailOrId && <p className = 'text-error'> {errors.emailOrId} </p>
                        }
                        <input type= 'password'  onChange = {handleChange}  name = 'password' className = 'form-control' placeholder = 'Password' />
                        {
                            errors && errors.password && <p className = 'text-error'> {errors.password} </p>
                        }
                        <button type = 'submit' onClick = {handleSubmit} className = 'form-submit'> Log In </button>
                   
                    </form>
                </div>
            </div>
        </div>
    )
}
