import React, { useState } from 'react';
import axios from 'axios';

const DatePickerRange = ({ onRoomAvailability }) => {
  const today = new Date();
  const tomorrow = new Date();
  tomorrow.setDate(today.getDate() + 1); // Mengatur tanggal besok

  const todayFormatted = today.toISOString().substr(0, 10);
  const tomorrowFormatted = tomorrow.toISOString().substr(0, 10);

  const [startDate, setStartDate] = useState(todayFormatted);
  const [endDate, setEndDate] = useState(tomorrowFormatted);

  const handleStartDateChange = (e) => {
    setStartDate(e.target.value);
  };

  const handleEndDateChange = (e) => {
    setEndDate(e.target.value);
  };

  const handleSubmit = () => {
    if (startDate && endDate) {
      axios.post('http://localhost:8000/kamar/getKamarAvaible', 
        { startDate, endDate }) // Permintaan POST dengan Axios
        .then(response => {
          // Data kamar yang tersedia telah diterima dari server
          console.log('Kamar yang Tersedia:', response.data);
          // Panggil fungsi onRoomAvailability dengan data kamar yang diterima
          onRoomAvailability(response.data);
        })
        .catch(error => {
          console.error('Error:', error);
        });
    } else {
      alert('Pilih rentang tanggal terlebih dahulu.');
    }
  };

  return (
    <div className="flex items-center space-x-4 p-4 bg-gray-100 rounded-lg">
      <input
        type="date"
        id="startDate"
        className="border rounded p-2"
        value={startDate}
        onChange={handleStartDateChange}
      />
      <span className="text-gray-500">to</span>
      <input
        type="date"
        id="endDate"
        className="border rounded p-2"
        value={endDate}
        onChange={handleEndDateChange}
      />
      <button
        onClick={handleSubmit}
        className="bg-teal-950 text-white px-4 py-2 rounded transition duration-300 ease-in-out"
      >
        Submit
      </button>
    </div>
  );
};

export default DatePickerRange;
