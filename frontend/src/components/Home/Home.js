import React, { useState } from 'react'
import axios from 'axios'

import { useNavigate } from 'react-router-dom'

export default function Home() {
    const [form, setForm] = useState({
        name: '',
        phone: '',
        email: '',
        isAdult: false,
    })

    const [submitDisabled, setSubmitDisabled] = useState(true)

    const handleChange = (e) => {
        let id = e.target.id
        let value = (id === "isAdult") ? e.target.checked : e.target.value

        if (id === "phone") {
            // Updating Enable/Disable submit button
            const disableButton = value.length !== 10
            setSubmitDisabled(disableButton)

            // Validating Phone Number
            const isValidPhoneNumber = /^[1-9]\d*$/.test(value)
            if (!isValidPhoneNumber) {
                alert("Please enter a valid 10 digits phone number")
                return
            }

            value = parseInt(value)
        }

        // Updating input value
        setForm({
            ...form,
            [id]: value,
        })
    }

    const navigate = useNavigate();
    const goToLoginPage = (gameId) => navigate(`/success?gameId=${gameId}`);

    const handleSubmit = (e) => {
        e.preventDefault()

        axios.post('/webapi/game', { ...form })
            .then(res => {
                console.log(res)
                console.log(res.data)

                setForm({
                    name: '',
                    phone: '',
                    email: '',
                    isAdult: false,
                })

                goToLoginPage(res.data.slug)
            })
            .catch((err) => console.log(err));
    }

    return (
        <div className="container w-50 my-5">
            <h3>Let's get you started 🤠</h3>

            <form className="mt-5" autoComplete="off">
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input type="text" className="form-control" id="name" placeholder="your name" value={form.name} onChange={handleChange} />
                </div>
                <div className="mb-3">
                    <label htmlFor="phone" className="form-label">Phone Number (required)</label>
                    <input type="text" className="form-control" id="phone" placeholder="10 digit number" value={form.phone} onChange={handleChange} />
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="email" placeholder="example@domain" aria-describedby="emailHelp" value={form.email} onChange={handleChange} />
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3 form-check">
                    <input type="checkbox" className="form-check-input" id="isAdult" checked={form.isAdult} onChange={handleChange} />
                    <label className="form-check-label" htmlFor="isAdult">include 18+ questions</label>
                </div>

                <button type="submit" className="btn btn-primary" onClick={handleSubmit} disabled={submitDisabled}>Create new Game</button>
            </form>
        </div>
    )
}
