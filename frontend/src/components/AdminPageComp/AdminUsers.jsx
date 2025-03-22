import React, { useEffect, useState } from 'react'
import axios from 'axios';
import AddCustomerForm from './Forms/AddCustomerForm'
import AdminCustomer from './AdminCustomer';
const AdminUsers = ({addCustomerForm}) => {
  const [customers, setCustomers] = useState([]);

  async function fetchCustomers() {  
    const {data} = await axios.get("http://localhost:8080/api/customers");
    console.log(data);
    setCustomers(data);
  }

  useEffect(() =>{
    fetchCustomers();
  },[]);


  return (
            <div className="admin__users__container">
              <div className="admin__users">
                {customers.length > 0 && customers.map((customer, index) => <AdminCustomer customer={customer} key={index} /> )}     
              </div>
              {addCustomerForm && <AddCustomerForm />}
            </div>
  )
  
}

export default AdminUsers
