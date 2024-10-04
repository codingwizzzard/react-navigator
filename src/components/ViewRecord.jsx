import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Bounce, ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function ViewRecord() {

    let [users, setUsers] = useState([])
    let navigator = useNavigate()

    useEffect(() => {
        fetchRecord()
    }, [])

    let fetchRecord = () => {
        fetch('http://localhost:3000/user', {
            method: 'GET'
        }).then((res) => res.json()
        ).then((data) => {
            setUsers(data)
            console.log(data)
        }).catch((err) => {
            console.log(err)
        })
    }

    let handleDelete = (id) => {
        fetch(`http://localhost:3000/user/${id}`, {
            method: 'DELETE'
        }).then(() => {
            toast.success('Data removed..', {
                position: "bottom-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
                transition: Bounce
            });
            fetchRecord()
        }).catch((err) => {
            toast.error('Something went wrong!', {
                position: "bottom-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
                transition: Bounce,
            });
        })
    }

    let handleEdit = (id) => {
        navigator(`/edit/${id}`)
    }

    return (
        <>
            <div className="header d-flex justify-content-end">
                <Link id="registerBtn" className="btns btn" to="/">Add Record</Link>
            </div>

            <div className="form-container">
                <div id="listSection">
                    <h2 className='text-center mb-4'>User Records</h2>
                    <table id='userTable' className='table table-dark table-striped table-hover align-middle text-center'>
                        <thead>
                            <tr>
                                <th>Username</th>
                                <th>Email</th>
                                <th>Password</th>
                                <th>Gender</th>
                                <th>Hobby</th>
                                <th>City</th>
                                <th>Address</th>
                                <th colSpan={2}>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                users.length > 0 ?
                                    users.map((user, idx) => (
                                        <tr key={idx}>
                                            <td>{user.username}</td>
                                            <td>{user.email}</td>
                                            <td>{user.password}</td>
                                            <td>{user.gender}</td>
                                            <td>{user.hobby.toString()}</td>
                                            <td>{user.city}</td>
                                            <td>{user.address}</td>
                                            <td className='text-center'>
                                                <button
                                                    className='btn btn-primary border-0 me-2 '
                                                    onClick={() => handleEdit(user.id)}
                                                >
                                                    Edit
                                                </button>
                                                <button
                                                    className='btn btn-danger border-0'
                                                    
                                                    onClick={() => handleDelete(user.id)}
                                                >
                                                    Delete
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                    :
                                    <tr>
                                        <td colSpan={9} align='center'>No Data Found.</td>
                                    </tr>
                            }
                        </tbody>
                    </table>
                </div>
            </div>

            <ToastContainer
                position="bottom-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark"
                transition:Bounce
            />
        </>
    )
}

export default ViewRecord
