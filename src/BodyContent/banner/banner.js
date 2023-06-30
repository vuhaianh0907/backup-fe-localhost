import './banner.css';
import { useHistory } from 'react-router-dom';
import React from 'react';
import AppointmentForm from '../customer/WriteAppointment/AppointmentForm';
export default function Banner() {
    return (
        <div className="ct"   >
            <nav className="box">
                <button className="appointment-btn" onClick={<AppointmentForm/>}>Make an Appointment</button>
            </nav>
        </div>
    );
}