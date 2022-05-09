import React, { useState } from 'react';
import { useAsyncDebounce } from 'react-table';

const Filters = (props) => {
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("")

    const handleStartDate = (e) => {
        let date = e.target.value
        console.log("startDate", e.target.value)
        setStartDate(date);
    }

    const handleEndDate = (e) => {
        let date = e.target.value
        console.log("endDate", e.target.value)
        setEndDate(date);
    }

    const autoResetFilter = () => {
        setStartDate("");
        setEndDate("");
    }

    // filter table by startDate and endDate
    const filterByDate = () => {
        console.log("are you filtering")
        if (startDate && endDate) {
            props.setFilter("expectedclose", [startDate, endDate]);
            console.log("what's the issue")
        }
    }

    const applyFilter = () => {
        if (startDate && endDate) {
            filterByDate();
        }
        if (!startDate && endDate || startDate && !endDate || !startDate && !endDate) {
            window.alert("Please select both start date and end date")
        }
    }
  return (
    <div className='filterParameters'>
        <div className='datePicker'>
            <form>
                <label>Start Date:</label>
                <input type="date" name="startDate" id="startDate" value={startDate} onChange={handleStartDate} />

              <label>End Date:</label>
              <input type="date" name="endDate" id="endDate" value={endDate} onChange={handleEndDate} />
            </form>
        </div>

        <div className='resetFilter' onClick={autoResetFilter}>
            <span>Reset</span>
        </div>

        <div className='applyFilter'>
            <button className='applyFilter' onClick={applyFilter}>Filter</button>
        </div>

    </div>
  )
}

export default Filters;
