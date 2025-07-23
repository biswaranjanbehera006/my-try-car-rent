import React from 'react';

import { useEffect, useState } from "react";
import { getBookings } from "../services/api";

const Bookings = () => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const fetch = async () => {
      const res = await getBookings();
      setBookings(res.data);
    };
    fetch();
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">My Bookings</h2>
      <ul>
        {bookings.map((b) => (
          <li key={b._id} className="mb-2 p-2 border rounded">
            <strong>Car:</strong> {b.carName} | <strong>Date:</strong> {b.date}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Bookings;
