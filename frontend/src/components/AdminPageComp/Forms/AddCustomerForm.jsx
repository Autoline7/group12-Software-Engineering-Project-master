import React, { useState } from 'react';
import axios from "axios";
import SimpleAlert from "../../SimpleAlert";
import Selector from '../../Selector';
import PaymentCardInput from './PaymentCardInput';

const AddCustomerForm = () => {
    const [formData, setFormData] = useState({
        address: { city: "", country: "", state: "", street: "", zipCode: "" },
        decryptedPassword: "",
        email: "",
        firstName: "",
        isSubscriber: "",
        lastName: "",
        role: "",
    });
    const [formDataPaymentCards, setFormDataPaymentCards] = useState({
        paymentCards: [{
            billingAddress: { city: "", country: "", state: "", street: "", zipCode: "" },
            decryptedCardNumber: "", 
            decryptedCvv: "", 
            expirationDate: "", 
            lastFourDigits: ""
        }],
    })

    const [showAlert, setShowAlert] = useState(false);
    const roleOptions = ["CUSTOMER", "ADMIN"];
    const statusOptions = ["ACTIVE", "INACTIVE"];
    const subscriberOptions = ["TRUE", "FALSE"];

    const handleAlert = () => {
        setShowAlert(true);
        setTimeout(() => setShowAlert(false), 3000);
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
    
    try {
        // Step 1: Create the customer by sending POST request
        //const createResponse = await axios.post("https://611f89f2-320e-47c4-87f6-ba96954ccc48.mock.pstmn.io", formData);
        // Replace the above URL with your actual endpoint for customer creation
        await axios.post("http://localhost:8080/api/customers", formData);
        
        // Step 2: Fetch the customer by email to get the customer ID
        const email = formData.email;
        const customerResponse = await axios.get(`http://localhost:8080/api/customers/email/${email}`); // Your endpoint to get the customer by email
        
        const customerId = customerResponse.data.userId; // Assuming the response contains the customer ID

        // Step 3: Send the payment card details using the fetched customer ID
        console.log(formDataPaymentCards);
        await axios.post(`http://localhost:8080/api/payment-cards/customer/${customerId}`, formDataPaymentCards);

        // Step 4: Handle success alert
        handleAlert();
        setTimeout(() => window.location.reload(), 3000);
        
    } catch (error) {
        console.error("Error creating customer or processing data:", error);
    }
    };

    return (
        <div className='admin__customer__form'>
            <h2 className="admin__add__customer__title">Add a New Customer</h2>
            <form onSubmit={handleSubmit} className='admin__add__customer__form'>
                <p className="admin__form__required__fields">Note: Required = <span className='red'>*</span></p>

                <label htmlFor="firstName"><span className='red'>*</span> First Name:</label>
                <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} required />

                <label htmlFor="lastName"><span className='red'>*</span> Last Name:</label>
                <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} required />
                
                <label htmlFor="email"><span className='red'>*</span> Email:</label>
                <input type="email" name="email" value={formData.email} onChange={handleChange} required />

                <label htmlFor="decryptedPassword"><span className='red'>*</span> Password:</label>
                <input type="password" name="decryptedPassword" value={formData.decryptedPassword} onChange={handleChange} required />
                
                <label htmlFor="isSubscriber"><span className='red'>*</span> Subscriber?:</label>
                <Selector options={subscriberOptions} selectedValue={formData.isSubscriber} onChange={(value) => setFormData(prevData => ({ ...prevData, isSubscriber: value }))} name="isSubscriber" required={true}/>
                
                <label htmlFor="paymentCards"><span className='red'>*</span> Payment Card(s):</label>
                <PaymentCardInput paymentCards={formDataPaymentCards.paymentCards} setPaymentCards={(newCards) => setFormDataPaymentCards(prev => ({ ...prev, paymentCards: newCards }))} required/>
                
                <label htmlFor="status"><span className='red'>*</span> Subscription Status:</label>
                <Selector options={statusOptions} selectedValue={formData.status} onChange={(value) => setFormData(prevData => ({ ...prevData, status: value }))} name="status" required={true}/>
                
                <label htmlFor="role"><span className='red'>*</span> Role:</label>
                <Selector options={roleOptions} selectedValue={formData.role} onChange={(value) => setFormData(prevData => ({ ...prevData, role: value }))} name="role" required={true}/>
                
                <div className='admin__add__customer__form__button__container'>
                    <button className='admin__add__customer__form__button' type="submit">Create Customer</button>
                </div>

                {showAlert && <SimpleAlert message="Customer Created Successfully!" />}
            </form>
        </div>
    );
};

export default AddCustomerForm;