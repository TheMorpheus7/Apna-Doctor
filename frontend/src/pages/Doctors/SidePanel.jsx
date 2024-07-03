import { useState } from 'react';
import { toast } from 'react-toastify';
import { BASE_URL, token } from '../../config';
import convertTime from '../../utils/convertTime';
import CheckoutSuccess from '../CheckoutSuccess';

const SidePanel = ({ doctorId, ticketPrice, timeSlots }) => {
    const [isCheckoutSuccess, setIsCheckoutSuccess] = useState(false);

    const bookingHandler = async () => {
        try {
            const res = await fetch(`${BASE_URL}/bookings/checkout-session/${doctorId}`, {
                method: 'post',
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            const data = await res.json();
            if (!res.ok) {
                throw new Error('Booking Success');
            }
            if (data.session.url) {
                window.location.href = data.session.url;
            }
        } catch (err) {
            toast.error(err.message);
        }
    };

    const handleBookAppointment = () => {
        setIsCheckoutSuccess(true); // Set the state to indicate booking success
    };

    return (
        <div className='shadow-panelShadow p-3 lg:p-5 rounded-md'>
            <div className="flex items-center justify-between">
                <p className="text__para mt-0 font-semibold">Ticket Price</p>
                <span className='text-[16px] leading-7 lg:text-[22px] lg:leading-8 text-headingColor font-bold'>{ticketPrice} RS</span>
            </div>

            <div className="mt-[30px]">
                <p className="text__para mt-0 font-semibold text-headingColor">Available Time Slots:</p>

                <ul className="mt-3">
                    {timeSlots?.map((item, index) => (
                        <li key={index} className="flex items-center justify-between mb-2">
                            <p className="text-[15px] leading-6 text-textColor font-semibold">{item.day.charAt(0).toUpperCase() + item.day.slice(1)}</p>
                            <p className="text-[15px] leading-6 text-textColor font-semibold">{convertTime(item.startingTime)} - {convertTime(item.endingTime)}</p>
                        </li>
                    ))}
                </ul>
            </div>

            {/* Render CheckoutSuccess component when isCheckoutSuccess is true */}
            {isCheckoutSuccess && <CheckoutSuccess />}

            {/* Use CheckoutSuccess directly in onClick */}
            <button onClick={handleBookAppointment} className='btn px-2 w-full rounded-md'>Book Appointment</button>
        </div>
    );
};

export default SidePanel;
