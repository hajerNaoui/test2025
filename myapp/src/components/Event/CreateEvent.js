import React, { useState } from 'react'
import { useNavigate } from "react-router-dom"
import Loader from '../Common/Loader'
import './Event.css';
const CreateEvent = () => {
    const navigate = useNavigate();
    const createEventApi = "http://localhost:3002/api/events"
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [eventData, setEvent] = useState({
        title: "",
        description: "",
        date: "",
        category: ""
    })

    const handelInput = (event) => {
        event.preventDefault();
        const { name, value } = event.target;
        setEvent({ ...eventData, [name]: value });
    }

    const handelSubmit = async (event) => {
        event.preventDefault();
        console.log("event", eventData)
        try {
            setIsLoading(true);
            const response = await fetch(createEventApi, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(eventData),
            });
            if (response.ok) {
                console.log('Form submitted successfully!');
                setEvent({ title: "", description: "", date: "", category: "" })
                navigate('/');
            } else {
                console.error('Form submission failed!');
            }

        } catch (error) {
            setError(error.message);
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div className='event-form'>
            <div className='heading'>
                {isLoading && <Loader />}
                {error && <p>Error: {error}</p>}
                <p>Event Form</p>
            </div>
            <form onSubmit={handelSubmit}>
                <div className="mb-3">
                    <label for="title" className="form-label">Title</label>
                    <input type="text" className="form-control" id="title" name="title" value={eventData.title} onChange={handelInput} required />
                </div>
                <div className="mb-3">
                    <label for="description" className="form-label">Description</label>
                    <textarea className="form-control" id="description" name="description" value={eventData.description} onChange={handelInput} />
                </div>
                <div className="mb-3">
                    <label for="date" className="form-label">Date</label>
                    <input type="date" className="form-control" id="date" name="date" value={eventData.date} onChange={handelInput} />
                </div>
                <div>
                    <label for="category" className="form-label">category: </label>
                    <select name="category" id="category" className="form-control customDropdown" onChange={handelInput}>
                        <option value="category1" >category1</option>
                        <option value="category2">category2</option>
                        <option value="category3">category3</option>
                    </select>
                </div>

                <button type="submit" className="btn btn-primary submit-btn">Submit</button>
            </form>
        </div>
    )
}

export default CreateEvent