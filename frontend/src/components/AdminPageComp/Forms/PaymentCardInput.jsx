import React, { useEffect } from "react";

const PaymentCardInput = ({ paymentCards, setPaymentCards }) => {
  useEffect(() => {
    if (paymentCards.length === 0) {
      setPaymentCards([
        {
          billingAddress: {
            addressId: "",
            city: "",
            country: "",
            state: "",
            street: "",
            zipCode: "",
          },
          decryptedCardNumber: "",
          decryptedCvv: "",
          expirationDate: "",
          lastFourDigits: "",
        },
      ]);
    }
  }, [paymentCards, setPaymentCards]);

  const handleAddCard = () => {
    setPaymentCards([
      ...paymentCards,
      {
        billingAddress: {
          addressId: "",
          city: "",
          country: "",
          state: "",
          street: "",
          zipCode: "",
        },
        decryptedCardNumber: "",
        decryptedCvv: "",
        expirationDate: "",
        lastFourDigits: "",
      },
    ]);
  };

  const handleRemoveCard = (index) => {
    if (paymentCards.length > 1) {
      const updatedCards = [...paymentCards];
      updatedCards.splice(index, 1);
      setPaymentCards(updatedCards);
    }
  };

  const handleChange = (index, field, value, nestedField = null) => {
    const updatedCards = [...paymentCards];
  
    if (nestedField) {
      updatedCards[index][field][nestedField] = value;
    } else {
      updatedCards[index][field] = value;
  
      if (field === "decryptedCardNumber") {
        updatedCards[index].lastFourDigits = value.slice(-4);
      }
    }
  
    setPaymentCards(updatedCards);
  };
  

  return (
    <div>
      {paymentCards.map((card, index) => (
        <div className="admin__form__review__att" key={index}>
          <label>Billing Address</label>
          <div className="admin__form__review__att__rating__addy">
            <label>Street:</label>
            <input
              type="text"
              placeholder="Enter Street Name"
              value={card.billingAddress.street}
              onChange={(e) => handleChange(index, "billingAddress", e.target.value, "street")}
              required
            />

            <label>City:</label>
            <input
              type="text"
              placeholder="Enter City Name"
              value={card.billingAddress.city}
              onChange={(e) => handleChange(index, "billingAddress", e.target.value, "city")}
              required
            />

            <label>State:</label>
            <input
              type="text"
              placeholder="Enter State Name"
              value={card.billingAddress.state}
              onChange={(e) => handleChange(index, "billingAddress", e.target.value, "state")}
              required
            />

            <label>Zip Code:</label>
            <input
              type="text"
              placeholder="Enter Zip Code"
              value={card.billingAddress.zipCode}
              onChange={(e) => handleChange(index, "billingAddress", e.target.value, "zipCode")}
              required
            />

            <label>Country:</label>
            <input
              type="text"
              placeholder="Enter Country"
              value={card.billingAddress.country}
              onChange={(e) => handleChange(index, "billingAddress", e.target.value, "country")}
              required
            />
          </div>
          <br/>
            <label>Card Details: (16 digits)</label>
            <div className="admin__form__review__att__rating__addy">
              <label>Card Number:</label>
              <input
                type="text"
                placeholder="Enter Card Number"
                value={card.decryptedCardNumber}
                onChange={(e) => {
                  const newValue = e.target.value.replace(/\D/g, ""); // Remove non-numeric characters
                  if (newValue.length <= 16) {
                    handleChange(index, "decryptedCardNumber", newValue);
                  }
                }}
                required
                pattern="\d{16}" // Ensure exactly 16 digits
                maxLength={16} // Limit input to 16 characters
                inputMode="numeric" // Suggest numeric keyboard on mobile
              />


            <label>CVV: (3 digits)</label>
            <input
              type="text"
              placeholder="Enter CVV"
              value={card.decryptedCvv}
              onChange={(e) => {
                const newValue = e.target.value.replace(/\D/g, ""); // Remove non-numeric characters
                if (newValue.length <= 3) {
                  handleChange(index, "decryptedCvv", newValue);
                }
              }}
              required
              pattern="\d{3}" // Ensure exactly 3 digits for form validation
              maxLength={3} // Prevent input longer than 3 digits
              inputMode="numeric" // Optimize keyboard for mobile users
            />


            <label>Expiration Date:</label>
            <input
              type="date"
              value={card.expirationDate}
              onChange={(e) => handleChange(index, "expirationDate", e.target.value)}
              required
            />

          </div>
          

          <div className="admin__form__review__center">
            {paymentCards.length > 1 && (
              <button
                type="button"
                className="admin__form__remove__review__button"
                onClick={() => handleRemoveCard(index)}
              >
                Remove Card
              </button>
            )}
          </div>
        </div>
      ))}
      <br />
      <button type="button" className="admin__form__add__review__button" onClick={handleAddCard}>
        Add New Card
      </button>
    </div>
  );
};

export default PaymentCardInput;