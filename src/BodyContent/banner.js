import './banner.css';
import { useHistory } from 'react-router-dom';
import React from 'react';
import Appointment from './Doctor';
export default function Banner() {
    return (
        <div className="ct"   >
            <nav className="box">
                <button className="appointment-btn" onClick={Appointment}>Make an Appointment</button>
            </nav>
        </div>
    );
}