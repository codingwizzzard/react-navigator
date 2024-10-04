import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { ToastContainer, toast, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function EditRecord() {

    let [data, setData] = useState({})
    let [hobby, setHobby] = useState([])
    let [error, setError] = useState({})
    let { id } = useParams()
    let navigator = useNavigate()

    useEffect(() => {
        fetchUserRecord(id)
    }, [])

    let handleInput = (e) => {
        let { name, value } = e.target

        let ho = [...hobby]

        if (name == 'hobby') {
            if (e.target.checked) {
                ho.push(value)
            } else {
                let pos = ho.findIndex((v, i) => value == v)
                ho.splice(pos, 1)
            }
            value = ho
            console.log(ho)
        }
        setHobby(ho)
        let newData = { ...data, [name]: value }
        setData(newData)
        setError({})
    }

    let validationData = () => {
        let tempError = {}

        if (!data.username) tempError.username = "*Username required"
        if (!data.email) tempError.email = "*Email required"
        if (!data.password) tempError.password = "*Password required"
        if (!data.hobby || data.hobby.length == 0) tempError.hobby = "*Hobby required"
        if (!data.gender) tempError.gender = "*Gender required"
        if (!data.city) tempError.city = "*City required"
        if (!data.address) tempError.address = "*Address required"

        setError(tempError)
        return Object.keys(tempError).length == 0
    }

    let handleSubmit = (e) => {
        e.preventDefault()

        if (!validationData()) return false

        fetch(`http://localhost:3000/user/${id}`, {
            method: 'PUT',
            body: JSON.stringify(data)
        }).then((res) => res.json()
        ).then(() => {
            toast.success('Data updated successfully..', {
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
            setTimeout(() => {
                navigator('/view')
            }, 2000)

        }).catch((err) => {
            toast.error('Data is not being submitted', {
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

        setData({})
        setHobby([])
    }

    let fetchUserRecord = (id) => {
        fetch(`http://localhost:3000/user/${id}`, {
            method: "GET"
        }).then((res) => res.json()
        ).then((user) => {
            setData(user)
            setHobby(user.hobby || [])
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

    return (
        <>

            <div className="container">
                <div className="row justify-content-center align-items-center">
                    <div className="card form-container">
                        <div className="card-body px-4">
                            <h3 className="mb-4 pb-2 pb-md-0 mb-md-5 text-center text-light">Update User Record</h3>
                            <form onSubmit={handleSubmit} method="post" className="form-group">
                                <div className="row">
                                    <div className="col-md-6">
                                        <div className="mb-4 form-floating">
                                            <input
                                                type="text"
                                                placeholder='Enter your username'
                                                name="username"
                                                onChange={handleInput}
                                                value={data.username || ""}
                                                className='form-control form-control-lg'
                                            />
                                            <label className="form-label" htmlFor='username'>
                                                <b>Username</b>
                                            </label>
                                            <div className="formerror" id="nameError">{error.username}</div>
                                        </div>
                                        <div className="mb-4 form-floating">
                                            <input
                                                type="text"
                                                placeholder='Enter your email'
                                                name="email"
                                                onChange={handleInput}
                                                value={data.email || ""}
                                                className='form-control form-control-lg'
                                            />
                                            <label className="form-label">
                                                <b>Email</b>
                                            </label>
                                            <div className="formerror" id="nameError">{error.email}</div>
                                        </div>
                                        <div className="mb-4 form-floating">
                                            <input
                                                type="password"
                                                name="password"
                                                placeholder='Enter your password'
                                                onChange={handleInput}
                                                value={data.password || ""}
                                                className='form-control form-control-lg'
                                            />
                                            <label className="form-label">
                                                <b>Password</b>
                                            </label>
                                            <div className="formerror" id="nameError">  {error.password}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="mb-4">
                                            <h6 className="me-4 d-inline-block"><b>Hobby : </b></h6>
                                            <input
                                                className="form-check-input me-2"
                                                type="checkbox"
                                                name="hobby"
                                                value='Dance'
                                                onChange={handleInput}
                                                checked={hobby.includes('Dance') ? "checked" : ""}
                                            /> Dance
                                            <input
                                                className="form-check-input ms-3 me-2"
                                                type="checkbox"
                                                name="hobby"
                                                value='Writing'
                                                onChange={handleInput}
                                                checked={hobby.includes('Writing') ? "checked" : ""}
                                            /> Writing
                                            <div className="formerror" id="nameError">{error.hobby}</div>
                                        </div>
                                        <div className="mb-4">
                                            <h6 className="d-inline-block me-4"><b>Gender :</b></h6>
                                            <div className="form-check form-check-inline">
                                                <input
                                                    type="radio"
                                                    className="form-check-input"
                                                    name="gender"
                                                    value="male"
                                                    onChange={handleInput}
                                                    checked={data.gender === "male"}
                                                    id="genderMale"
                                                />
                                                <label className="form-check-label" htmlFor="genderMale">Male</label>
                                            </div>
                                            <div className="form-check form-check-inline">
                                                <input
                                                    type="radio"
                                                    className="form-check-input"
                                                    name="gender"
                                                    value="female"
                                                    onChange={handleInput}
                                                    checked={data.gender === "female"}
                                                    id="genderFemale"
                                                />
                                                <label className="form-check-label" htmlFor="genderFemale">Female</label>
                                            </div>
                                            <div className="formerror" id="nameError">{error.gender}</div>
                                        </div>
                                        <div className="mb-4">
                                            <label className="form-label"><b>Address : </b></label>
                                            <textarea
                                                name="address"
                                                onChange={handleInput}
                                                value={data.address || ""}
                                                style={{ resize: "none" }}
                                                className='form-control form-control-lg'
                                            />
                                            <div className="formerror" id="nameError">{error.address}</div>
                                        </div>
                                    </div>
                                    <div className="mb-4">
                                        <label htmlFor="subjectSelect" className="form-label"><b>Choose City : </b></label>
                                        <select
                                            name="city"
                                            onChange={handleInput}
                                            className="form-select form-select-lg"
                                            value={data.city || ""}
                                        >
                                            <option value="" disabled selected>--select-city--</option>
                                            <option value="surat">surat</option>
                                            <option value="pune">pune</option>
                                        </select>
                                        <div className="formerror" id="nameError">{error.city}</div>
                                    </div>
                                </div>

                                <div className="text-center mb-4">
                                    <button className="btn btn-outline-primary btn-lg w-100">Submit</button>
                                </div>
                            </form>
                        </div>
                    </div>
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

export default EditRecord