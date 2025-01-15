import React, { useEffect, useState } from "react";
import axios from "axios";
import Loader from "../Common/Loader";

const ShowEvents = () => {
  const showEventApi = "http://localhost:3002/api/events";

  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [searchItem, setSearchItem] = useState('')
  const [isLoading] = useState(false);
  const [error] = useState(null);

  useEffect(() => {
    getEvents();
  }, []);

  const getEvents = () => {
    axios
      .get(showEventApi)
      .then((res) => {
        setEvents(res.data.events);
        // update the filteredEvents state
        setFilteredEvents(res.data.events)
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleInputChange = (e) => { 

    const searchTerm = e.target.value;
    setSearchItem(searchTerm);

if(searchTerm){
    const filteredItems = events.filter((event) =>
    event.title.toLowerCase().includes(searchTerm.toLowerCase())
    );


    setFilteredEvents(filteredItems);
  }
  else{
    getEvents();
  
  }

  }

  if (events.length < 0) {
    return <h1>no event found</h1>;
  } else {
    return (
      <div className="mt-5">
        <h1>Events List</h1>
        <input
         className="form-control search"
        type="text"
        value={searchItem}
        onChange={handleInputChange}
        placeholder='Search by title'
      />
    <br></br>
        {isLoading && <Loader />}
        {error && <p>Error: {error}</p>}

        <table className="table table-striped">
          <thead>
            <tr>
              <th>ID</th>
              <th>Title</th>
              <th>Description</th>
              <th>Date</th>
              <th>Category</th>
            </tr>
          </thead>
          <tbody>
            {filteredEvents?.map((item, i) => {
              return (
                <tr key={i + 1}>
                  <td>{i + 1}</td>
                  <td>{item.title}</td>
                  <td>{item.description}</td>
                  <td>{item.date}</td>
                  <td>{item.category}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  }
};

export default ShowEvents;
