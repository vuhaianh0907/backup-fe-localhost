import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



function CreateSlot1Doctor() {
    const { doctorId } = useParams();
    console.log(doctorId);

    const [selectedDoctor, setSelectedDoctor] = useState(null);
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [selectedShifts, setSelectedShifts] = useState([]);
    const [isScheduleCreated, setIsScheduleCreated] = useState(false);
    const [scheduleList, setScheduleList] = useState([]);

    const [isLoading, setIsLoading] = useState(false);

    const fetchDoctor = async () => {
        try {
            const response = await axios.get(`http://localhost:3000/api/account/doctor/details?id=${doctorId}`);
            setSelectedDoctor(response.data.doctor);

        } catch (error) {
            console.error('Error fetching doctors by name:', error);
        }
    };
    const storedUserString = sessionStorage.getItem('token');
  const user = JSON.parse(storedUserString);
  useEffect(() => {
    if (user === null) {

      window.location.href = '/';

    }
    else {
      if (user.role !== 'admin') {
        window.location.href = '/';
      }
    }
  })


    useEffect(() => {
        
        fetchDoctor();
    }, []);


    console.log(selectedDoctor);



    const handleSelectStartDate = (e) => {
        setStartDate(e.target.value);
    };

    const handleSelectEndDate = (e) => {
        setEndDate(e.target.value);
    };

    const handleSelectShift = (shift) => {
        const updatedShifts = [...selectedShifts];
        if (updatedShifts.includes(shift)) {
            updatedShifts.splice(updatedShifts.indexOf(shift), 1);
        } else {
            updatedShifts.push(shift);
        }
        setSelectedShifts(updatedShifts);
    };
    const getMinDate = () => {
        const today = new Date();
        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, '0');
        const day = String(today.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
      };

    const handleSaveSchedule = () => {
        if (selectedDoctor && startDate && endDate && selectedShifts.length > 0) {
            const newSchedule = {
                doctor: selectedDoctor,
                startDate: startDate,
                endDate: endDate,
                shifts: selectedShifts,
            };

            setIsLoading(true);

            axios
                .post('http://localhost:3000/api/slot/create', newSchedule)
                .then((response) => {
                    setScheduleList([...scheduleList, newSchedule]);
                    setIsScheduleCreated(true);
                    toast.success('Lưu thành công!');
                    window.location.href = `/admin/doctordetail/${doctorId}`;
                })
                .catch((error) => {
                    console.error('Error creating schedule:', error);
                    toast.error('Lưu thất bại!');
                })
                .finally(() => {
                    setIsLoading(false);
                });
        } else {
            toast.error('Vui lòng nhập đầy đủ thông tin.');
        }
    };
    return (
        <div className="page-container">
            <div className="admin-create-slot__container">
                {selectedDoctor && (

                    <div>
                        <div className='admin-view-handled-doctor-info' >
                            {/* selected doctor info */}
                            <h4>
                                Tên bác sĩ: {selectedDoctor.fullname}
                            </h4>
                            <h4>
                                ID bác sĩ: {selectedDoctor.idCard}
                            </h4>
                        </div>
                        <h3>Chọn khoảng thời gian</h3>
                        <div className='row'>
                            <div className='col-sm-6'>
                                <label htmlFor="startDate">Ngày bắt đầu: </label>
                                <input
                                    className='form-control'
                                    type="date"
                                    id="startDate"
                                    min={getMinDate()} 
                                    value={startDate}
                                    onChange={handleSelectStartDate}
                                />
                            </div>
                            <div className='col-sm-6'>
                                <label htmlFor="endDate">Ngày kết thúc: </label>
                                <input
                                    className='form-control'
                                    type="date"
                                    id="endDate"
                                    min={getMinDate()} 
                                    value={endDate}
                                    onChange={handleSelectEndDate}
                                />
                            </div>
                        </div>
                    </div>
                )}

                {selectedDoctor && startDate && endDate && (
                    <div className='mt-4'>
                        <h3>Chọn ca làm việc</h3>
                        <div>
                            <div className="form-check">
                                <input
                                    className="form-check-input"
                                    type="checkbox"
                                    id="shift1"
                                    checked={selectedShifts.includes('Ca sáng')}
                                    onChange={() => handleSelectShift('Ca sáng')}
                                />
                                <label className="form-check-label" for="shift1">
                                    Ca sáng
                                </label>
                            </div>
                        </div>
                        <div>
                            <div className="form-check">
                                <input
                                    className="form-check-input"
                                    type="checkbox"
                                    id="shift1"
                                    checked={selectedShifts.includes('Ca chiều')}
                                    onChange={() => handleSelectShift('Ca chiều')}
                                />
                                <label className="form-check-label" for="shift1">
                                    Ca chiều
                                </label>
                            </div>
                        </div>
                    </div>
                )}

                {selectedDoctor && startDate && endDate && selectedShifts.length > 0 && (
                    <div className='mt-4'>
                        <button onClick={handleSaveSchedule} disabled={isLoading} type="button" className="btn btn-success">
                            {isLoading ? 'Đang lưu...' : 'Lưu'}
                        </button>
                    </div>
                )}

                {isScheduleCreated && (
                    <div>
                        <h3>Lịch đã tạo</h3>
                        <p>Bác sĩ: {selectedDoctor.fullname}</p>
                        <p>Ngày bắt đầu: {startDate}</p>
                        <p>Ngàykết thúc: {endDate}</p>
                        <p>Ca làm việc: {selectedShifts.join(', ')}</p>
                    </div>
                )}
                {scheduleList.length > 0 && (
                    <div>
                        <table>
                            <thead>
                                <tr>
                                    <th>Bác sĩ</th>
                                    <th>Ngày</th>
                                    <th>Ca làm việc</th>
                                </tr>
                            </thead>
                            <tbody>
                                {scheduleList.map((schedule, index) => (
                                    <tr key={index}>
                                        <td>{schedule.doctor.fullname}</td>
                                        <td>{schedule.startDate} - {schedule.endDate}</td>
                                        <td>{schedule.shifts.join(', ')}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}

            </div>
            <ToastContainer />
        </div>
    );
}

export default CreateSlot1Doctor;
