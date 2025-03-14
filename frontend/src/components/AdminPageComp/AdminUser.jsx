const AdminUser = () => {
  return (
      <div className="admin__user">
              <div className="admin__user__header">
                <h3 className="admin__user__title">User 1</h3>
                <button className="admin__user__edit__button">Edit</button>
              </div>
              <div className="admin__user__rows">
                <div className="admin__user__row">
                  <div className="admin__user__info">
                    <span>ID</span>
                    <span>.....</span>
                  </div>
                  <div className="admin__user__info">
                    <span>Name</span>
                    <span>.....</span>
                  </div>
                  <div className="admin__user__info">
                    <span>Email</span>
                    <span>.....</span>
                  </div>
                  <div className="admin__user__info">
                    <span>Phone Number</span>
                    <span>.....</span>
                  </div>
                </div>
                <div className="admin__user__row">
                  <div className="admin__user__info">
                    <span>Address</span>
                    <span>.....</span>
                  </div>
                  <div className="admin__user__info">
                    <span>Tickets Booked</span>
                    <span>.....</span>
                  </div>
                </div>
                <div className="admin__user__row">
                  <div className="admin__user__info">
                    <span>Created Account On</span>
                    <span>.....</span>
                  </div>
                  <div className="admin__user__info">
                    <span>Profile Picture URL</span>
                    <span>.....</span>
                  </div>
                </div>
                <i className="material-symbols-outlined admin__user__trash">delete</i>
              </div>
            </div>
  )
}

export default AdminUser
