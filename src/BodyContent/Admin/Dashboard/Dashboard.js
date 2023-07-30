import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { format } from 'date-fns';
import './Dashboard.scss';

const Dashboard = () => {
  const [monthlyIncome, setMonthlyIncome] = useState(null);
  const [doctors, setDoctors] = useState([]);
  const [customers, setCustomers] = useState(null);
  const [appointments, setAppointments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchDataForCharts = async () => {
    try {
      const incomeResponse = await axios.get('http://localhost:3000/api/transaction/total');
      if (incomeResponse.data && incomeResponse.data.total) {
        setMonthlyIncome(incomeResponse.data.total);
      }

      const doctorsResponse = await axios.get('http://localhost:3000/api/admin/getAllDoctorActive');
      const customersResponse = await axios.get('http://localhost:3000/api/account/customer/index');
      const appointmentsResponse = await axios.get('http://localhost:3000/api/appointment/all');

      setDoctors(doctorsResponse.data.doctors);
      setCustomers(customersResponse.data.customers);
      setAppointments(appointmentsResponse.data);

      const dataMap = {};
      appointmentsResponse.data.appointments.forEach((appointment) => {
        const date = format(new Date(appointment.date), 'dd/MM/yyyy');
        dataMap[date] = (dataMap[date] || 0) + 1;
      });

      setIsLoading(false);
    } catch (error) {
      console.error('Lỗi khi lấy dữ liệu:', error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchDataForCharts();
  }, []);

  const data = appointments.map(appointment => ({
    date: new Date(appointment.createdAt).toISOString().split('T')[0],
    count: 1,
  }));

  const countByDate = data.reduce((acc, curr) => {
    const date = curr.date;
    if (!acc[date]) {
      acc[date] = 0;
    }
    acc[date] += 1;
    return acc;
  }, {});

  const chartData = Object.keys(countByDate).map(date => ({
    date,
    count: countByDate[date],
  }));

  const renderLineChart = () => {
    return (
      <div>
        <h2>Biểu đồ số lượng lịch trong ngày</h2>
        <LineChart width={800} height={400} data={chartData}>
          <XAxis dataKey="date" />
          <YAxis />
          <CartesianGrid strokeDasharray="3 3" />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="count" stroke="#8884d8" activeDot={{ r: 8 }} />
        </LineChart>
      </div>
    );
  };

  const renderCustomerList = () => {
    if (customers === null) {
      return <p>Đang tải danh sách khách hàng...</p>;
    }
    return (
      <>
        Số lượng người dùng hiện tại:  {customers.length}
      </>
    );
  };

  const renderDoctorList = () => {
    if (doctors === null) {
      return <p>Đang tải danh sách bác sĩ...</p>;
    }
    return (
      <>
        Số lượng bác sĩ hiện tại:  {doctors.length}
      </>
    );
  };

  const renderAppointmentList = () => {
    return (
      <div className="appointment-list">
        {/* Render danh sách buổi hẹn */}
      </div>
    );
  };

  return (
    <div className="dashboard-container">
      {isLoading && <div className="loading-container">Đang tải dữ liệu...</div>}
      
      {!isLoading && (
        <>
          {monthlyIncome !== null && <p>Tổng thu nhập trong tháng: {monthlyIncome}</p>}
          <div className="chart-wrapper">
            {renderLineChart()}
          </div>
          <div className="customer-list-wrapper">
            {renderCustomerList()}
          </div>
          <div className="doctor-list-wrapper">
            {renderDoctorList()}
          </div>
          <div className="appointment-list-wrapper">
            {renderAppointmentList()}
          </div>
        </>
      )}
    </div>
  );
};

export default Dashboard;
