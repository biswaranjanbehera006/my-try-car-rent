import React from 'react';

import { useEffect, useState } from "react";
import { getCars } from "../services/api";

const Cars = () => {
  const [cars, setCars] = useState([]);

  useEffect(() => {
    const fetch = async () => {
      const res = await getCars();
      setCars(res.data);
    };
    fetch();
  }, []);

  return (
    <div className="p-4 grid grid-cols-1 md:grid-cols-3 gap-4">
      {cars.map((car) => (
        <div key={car._id} className="p-4 border rounded shadow">
          <h3 className="text-xl font-bold">{car.name}</h3>
          <p>{car.description}</p>
          <p className="font-semibold text-green-600">₹{car.price}/day</p>
        </div>
      ))}
    </div>
  );
};

export default Cars;
