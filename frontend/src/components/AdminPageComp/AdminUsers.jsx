import React from 'react'
import AdminUser from "./AdminUser"
const AdminUsers = () => {
  return (
    <div className="admin__users__container">
            <div className="admin__users">
              <AdminUser />
              <AdminUser />
              <AdminUser />
              <AdminUser />
              <AdminUser />
              <AdminUser />      
            </div>
    </div>
  )
}

export default AdminUsers
