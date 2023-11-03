import Footer from "./components/Footer"
import Header from "./components/Header"
import Search from "./components/SearchComponent"
import Table from "./components/Table"

import { useEffect, useState } from "react";
import * as userService from "./services/userService";
import CreateEdit from "./components/CreateEdit";
import UserDetails from "./components/UserDetails";

function App() {

  const [users,setUsers] = useState([]);
  const [showAddUser, setShowAddUser] = useState(false);
  const [showUserDetails, setshowUserDetails] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

  useEffect(() => {
      userService.getAll()
      .then(res => setUsers(Object.values(res)))
      .catch(err => console.log(err.message));
  },[]);

  const  onSubmitForm = async (e, userInfo) => {
    e.preventDefault();

    const body = {
      firstName: userInfo.firstName,
      lastName: userInfo.lastName,
      email: userInfo.email,
      phoneNumber: userInfo.phoneNumber,
      createdAt: new Date(),
      updatedAt: new Date(),
      imageUrl: userInfo.imageUrl,
      address: {
          country: userInfo.country,
          city: userInfo.city,
          street: userInfo.street,
          streetNumber: userInfo.streetNumber,
      }
  }
    
  const newUser = await userService.create(body);
  console.log(newUser);
  setUsers(state => ([...state, newUser]));
    onAddUserHandlerHide();
}

  const onAddUserHandlerShow = () => {
    setShowAddUser(true);
  };
  const onAddUserHandlerHide = () => {
    setShowAddUser(false);
    setShowDetails(false);
  };
  const onShowDetails = () => {
    setShowDetails(true);
  }
  const onHideDetails = () => {
    setShowDetails(false);
  }

  return (
    <>
      <Header />
      <main className="main">
      <section className="card users-container">
        {/* <Search /> */}
        <Table showDetails={onShowDetails} users={users} />
        {showAddUser && <CreateEdit onSubmitForm={onSubmitForm} hideAddUser={onAddUserHandlerHide}/>}
        {showDetails && <UserDetails hideDetails={onHideDetails} />}
    <button onClick={onAddUserHandlerShow} className="btn-add btn">Add new user</button>
        </section>
      </main>
      <Footer />
    </>
  )
}

export default App
