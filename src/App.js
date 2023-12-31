import React, { useEffect, useState } from 'react';

import './App.scss';
import { BrowserRouter as Router, Switch, Route, Link, Routes } from 'react-router-dom';
import Navigation from './Home/header';
import Sidebar from './Home/Sidebar/Sidebar';
import Dashboard from './BodyContent/Admin/Dashboard/Dashboard';

import Banner from './BodyContent/banner/banner.js';
import Login from './BodyContent/accout/login/LoginBar';
import Register from './BodyContent/accout/Register/Register';
import ForgotPassword from './BodyContent/accout/ForgotPassword/ForgotPassword';
import Footer from './Footer/footer';
import ViewTreatmentProfile from './BodyContent/Doctor/ViewTreatmentProfile/ViewTreatmentProfile';
import ViewTreatementList from './BodyContent/Doctor/ViewTreatmentList/ViewTreatementList';
import CreateTreatementIn from './BodyContent/Doctor/CreateTreatementIn/CreateTreatmentIn';
import Doctorviewbooking from './BodyContent/Doctor/Doctorviewbooking/viewBooking';
import DoctorViewPatientProfile from './BodyContent/Doctor/ViewPatientProfile/PatientProfile';
import DoctorTimeSlotPages from './BodyContent/Doctor/TimeSlotsPage/TimeSlotsPage';
import DoctorRebook from './BodyContent/Doctor/RebookAppointment/RebookAppointment';
import CreateDoctor from './BodyContent/Admin/CreateDoctor/CreateDoctor';
import CreateSlot from './BodyContent/Admin/CreateSlot/AdminCreateSlot';
import DoctorList from './BodyContent/Admin/ViewDoctorList/DoctorList';
import DoctorDetail from './BodyContent/Admin/ViewDocDetail/DoctorDetail';
import DoctorUpdate from './BodyContent/Admin/UpdateDoctor/UpdateDoctor';
import Transaction from './BodyContent/Admin/Transaction/Transaction';
import ChangePass from './BodyContent/accout/ChangePass/ChangePass';
import AddAmountPage from './BodyContent/Admin/AddAmountPage/AddAmountPage';
import AmountPage from './BodyContent/Admin/UpdateAmountPage/UpdateAmountPage';
import Cancellation from './BodyContent/Admin/CancellationRequests/CancellationRequests';
import CustomerViewBooking from './BodyContent/customer/CustomerViewBooking/CustomerViewBooking';
import CustomerViewDoctor from './BodyContent/customer/CustomerViewDoctor/CustomerViewDoctor';
import ViewDocDetail from './BodyContent/customer/ViewDocDetail/ViewDocDetail';
import CustomerProfile from './BodyContent/customer/ViewProfile/UserProfile';
import CustomerEditProfile from './BodyContent/customer/EditProfile/EditProfile';
import CustomerViewTreatmentIn from './BodyContent/customer/ViewTreatmentIn/TreatmentProcess';
import CustomerViewProfileTreatment from './BodyContent/customer/ViewProFileTreatment/MedicalRecord';
import CustomerWriteAppointment from './BodyContent/customer/WriteAppointment/AppointmentForm';
import CustormerViewBookingDetail from './BodyContent/customer/ViewBookingDetail/ViewBookingDetail';
import CustormerViewTreatmentProfileList from './BodyContent/customer/treatmentprofilelist/treatmentprofilelist';
import CustormerWallet from './BodyContent/customer/TopUpWallet/TopUpWallet';
import DoctorViewprofile from './BodyContent/Doctor/Viewprofile/Viewprofile';
import DoctorUpdateprofile from './BodyContent/Doctor/UpdateProfile/UpdateProfile';
import ResetPassword from './BodyContent/accout/ForgotPassword/ResetPassword';
import ViewTransaction from './BodyContent/customer/TopUpWallet/ViewTransaction';
import CreateSlot1Doctor from './BodyContent/Admin/CreateSlot1Doctor/CreateSlot1Doctor';
import Wallet from './BodyContent/customer/Wallet/Wallet';

import moment from 'moment-timezone';








// import testthu from './BodyContent/Admin/test/test';


function App() {
  const [vietnamTime, setVietnamTime] = useState('');

  useEffect(() => {
    async function fetchVietnamTime() {
      try {
        const response = await fetch('http://worldtimeapi.org/api/timezone/Asia/Ho_Chi_Minh');
        if (!response.ok) {
          throw new Error('Failed to fetch time from WorldTimeAPI');
        }
        const data = await response.json();
        const vietnamTime = moment(data.utc_datetime).tz('Asia/Ho_Chi_Minh').format('ddd MMM DD YYYY HH:mm:ss ');
        setVietnamTime(vietnamTime);
        
      } catch (error) {
        console.error(error);
        setVietnamTime('Error fetching time');
      }
    }

    // Fetch thời gian từ API và cập nhật state
    fetchVietnamTime();

    // Để tiết kiệm tài nguyên, bạn có thể đặt một khoảng thời gian cụ thể để cập nhật lại thời gian
    const interval = setInterval(() => {
      fetchVietnamTime();
    }, 60000); // Cập nhật lại sau mỗi 1 phút (60.000 miliseconds)

    // Khi component bị unmount, hủy bỏ việc cập nhật thời gian
    return () => clearInterval(interval);
  }, []);
  
  
  
  const storedUserString = sessionStorage.getItem('token');
  const user = JSON.parse(storedUserString);

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [isDisplayHeader, setIsDisplayHeader] = useState(true);

  const handleLogout = () => {
    setIsLoggedIn(false);
    // Thực hiện các hành động cần thiết khi logout
  };

  return (

    <div className='app-root'>
      {
        (user && (user.role === 'admin' || user.role === 'doctor')) ?
          <div className='app-sidebar'>
            <Sidebar />
          </div> :
          <Navigation isLoggedIn={isLoggedIn} handleLogout={handleLogout} />
      }
      <main className={"mt-4 " + ((user && (user.role === 'admin' || user.role === 'doctor')) ? 'main-small' : '')}>
        <content>
          <Routes>

            {/* trang detail bs sẽ xem đc bằng cả guest và cust, id ko nên đc hiện trên đường dẫn*/}

            <Route path='/Login' element={<Login />} />
            <Route path='/register' element={<Register />} />
            <Route path='/forgot-password' element={<ForgotPassword />} />
            <Route path='/reset-password' element={<ResetPassword />} />
            <Route path='/' exact element={<Banner />} />
            <Route path='/changepass' element={<ChangePass />} />

            {/* admin */}
            <Route path='/admin/createdoctor' element={<CreateDoctor />} />
            <Route path='/admin/createslot' element={<CreateSlot />} />
            <Route path='/admin/doctorlist' element={<DoctorList />} />
            <Route path='/admin/doctordetail/:doctorId' element={<DoctorDetail />} />
            <Route path='/admin/doctor/update/:doctorId' element={<DoctorUpdate />} />
            <Route path='/admin/doctor/addslot/:doctorId' element={<CreateSlot1Doctor />} />

            <Route path='/admin/cancellation' element={<Cancellation />} />
            <Route path='/admin/transaction' element={<Transaction />} />
            <Route path='/admin/addamount' element={<AddAmountPage />} />
            <Route path='/admin/amount' element={<AmountPage />} />
            <Route path='/admin/dashboard' element={<Dashboard />} />


            {/* custormer */}
            <Route path='/customer/profile/:id' element={<CustomerProfile />} />
            <Route path='/customer/profile/edit/:id' element={<CustomerEditProfile />} />
            <Route path='/customer/treatmentprofile/treatment' element={<CustomerViewTreatmentIn />} />
            <Route path='/customer/treatmentprofile/:id' element={<CustomerViewProfileTreatment />} />
            <Route path='/customer/treatmentprofilelist/:id' element={<CustormerViewTreatmentProfileList />} />
            <Route path='/customer/slot/appointment/:id' element={<CustomerWriteAppointment />} />
            <Route path='/customer/booking/:id' element={<CustomerViewBooking />} />
            <Route path='/customer/booking/detail/:id' element={<CustormerViewBookingDetail />} />
            <Route path='/customer/listdoctor' element={<CustomerViewDoctor />} />
            <Route path='/customer/doctordetail/:id' element={<ViewDocDetail />} />
            <Route path='/customer/topupwallet/:id' element={<CustormerWallet />} />
            <Route path='/customer/transaction/:id' element={<ViewTransaction />} />
            <Route path='/customer/wallet/:id' element={<Wallet />} />




            <Route path='/doctor/viewTreatmentProfile/:id' element={<ViewTreatmentProfile />} />
            {/* doc/treatment/detail */}
            <Route path='/doctor/treatmentlist' element={<ViewTreatementList />} />
            <Route path='/doctor/writetreatmentin/:id' element={<CreateTreatementIn />} />
            <Route path='/doctor/profile/:id' element={<DoctorViewprofile />} />
            <Route path='/doctor/updateprofile/:id' element={<DoctorUpdateprofile />} />
            <Route path='/Doctorviewbooking/:id' element={<Doctorviewbooking />} />
            <Route path='/Doctor/viewpatientprofile/:id' element={<DoctorViewPatientProfile />} />
            <Route path='/Doctor/doctorbook' element={<DoctorTimeSlotPages />} />
            <Route path='/Doctor/rebook/:id' element={<DoctorRebook />} />



            {/* customer */}



          </Routes>
        </content>
        <Footer />
      </main>
    </div>

  );
}

export default App;
