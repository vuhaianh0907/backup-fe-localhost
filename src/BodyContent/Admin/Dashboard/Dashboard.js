import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts'; // Import thư viện Recharts
import { format } from 'date-fns'; // Import hàm format từ thư viện date-fns
import './Dashboard.scss';

const Dashboard = () => {
  // State để lưu trữ dữ liệu từ các API
  const [monthlyIncome, setMonthlyIncome] = useState(null);
  const [doctors, setDoctors] = useState([]);
  const [customers, setCustomers] = useState(null);
  const [appointments, setAppointments] = useState([]);
  
  

  // Hàm gọi API để lấy dữ liệu và cập nhật state
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

        // Xử lý dữ liệu biểu đồ đường
        const dataMap = {};
        appointmentsResponse.data.appointments.forEach((appointment) => {
          const date = format(new Date(appointment.date), 'dd/MM/yyyy');
          dataMap[date] = (dataMap[date] || 0) + 1;
        });//???

        
      
    } catch (error) {
      console.error('Lỗi khi lấy dữ liệu:', error);
    }
  };
  // Tạo dữ liệu cho biểu đồ
  const data = appointments.map(appointment => ({
    date: new Date(appointment.createdAt).toISOString().split('T')[0], // Lấy ngày (bỏ đi giờ phút giây)
    count: 1, // Mỗi appointment được tính là 1
  }));
  // Tạo mảng chứa thông tin về số lượng lịch trong mỗi ngày
  const countByDate = data.reduce((acc, curr) => {
    const date = curr.date;
    if (!acc[date]) {
      acc[date] = 0;
    }
    acc[date] += 1;
    return acc;
  }, {});

  // Chuyển đổi lại dữ liệu để phù hợp với biểu đồ
  const chartData = Object.keys(countByDate).map(date => ({
    date,
    count: countByDate[date],
  }));

  useEffect(() => {
    fetchDataForCharts();
  }, []);

  // Hàm hiển thị biểu đồ đường
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

  // Hàm hiển thị danh sách khách hàng
  const renderCustomerList = () => {
    // Kiểm tra nếu customers chưa có dữ liệu
    if (customers === null) {
      return <p>Đang tải danh sách khách hàng...</p>;
    }

    // Hiển thị danh sách khách hàng nếu đã có dữ liệu
    return (
      <>
      Số lượng người dùng hiện tại:  {customers.length}
      
      </>
    );
  };
  // Hàm hiển thị danh sách bác s
  const renderDoctorList = () => {
    // Kiểm tra nếu customers chưa có dữ liệu
    if (doctors === null) {
      return <p>Đang tải danh sách ấc...</p>;
    }

    // Hiển thị danh sách****nếu đã có dữ liệu
    return (
      <>
      Số lượng bác sĩ hiện tại:  {doctors.length}
      
      </>
    );
  };

  // Hàm hiển thị danh sách buổi hẹn
  const renderAppointmentList = () => {
    // Hiển thị danh sách buổi hẹn
    return (
      <div className="appointment-list">
    
      </div>
    );
  };

  return (
    <div className="dashboard-container">
      <h1 className="dashboard-title">Bảng điều khiển</h1>
      {monthlyIncome !== null && <p>Tổng thu nhập trong tháng: {monthlyIncome}</p>}

      {/* Line Chart */}
      <div className="chart-wrapper">
        {renderLineChart()}
      </div>

      {/* Customer List */}
      <div className="customer-list-wrapper">
        {renderCustomerList()}
      </div>

      {/* Doctor List */}
      <div className="doctor-list-wrapper">
        {renderDoctorList()}
      </div>

      {/* Appointment List */}
      <div className="appointment-list-wrapper">
        {renderAppointmentList()}
      </div>
    </div>
  );
};

export default Dashboard;
