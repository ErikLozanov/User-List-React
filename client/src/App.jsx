import {v4} from 'uuid';

import Footer from "./components/Footer"
import Header from "./components/Header"
import Search from "./components/SearchComponent"
import Table from "./components/Table"

import { useEffect, useState } from "react";
import * as userService from "./services/userService";
import Create from "./components/Create";
import UserDetails from "./components/UserDetails";
import Edit from "./components/Edit";

function App() {

  const [users,setUsers] = useState([]);
  const [showAddUser, setShowAddUser] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [userId, setUserId] = useState('');

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
};
  const onEditSubmitForm = async (e,userInfo) => {
    e.preventDefault();
    console.log(userInfo._id);
    const body = {
      _id: v4(),
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
    
  const editedUser = await userService.editUser(userInfo._id, body);
  console.log(editedUser);
  setUsers(state => state.map(user => user._id === editedUser._id ? editedUser : user));
    hideEditModal();
  }

  const onAddUserHandlerShow = () => {
    setShowAddUser(true);
  };
  const onAddUserHandlerHide = () => {
    setShowAddUser(false);
    setShowDetails(false);
  };
  const onShowDetails = async (userId) => {
    setShowDetails(true);
    const result = await userService.getOne(userId);
    console.log(result);
    setUser(result);
  };
  const onHideDetails = () => {
    setShowDetails(false);
  };
  const showEditModal = async (userId) => {
    setShowEdit(true);
    setUserId(userId);
    };
  const hideEditModal = () => {
    setShowEdit(false);
  }



  return (
    <>
      <Header />
      <main className="main">
      <section className="card users-container">
        {/* <Search /> */}
        <Table showEdit={showEditModal} showDetails={onShowDetails} users={users} />
        {showAddUser && <Create onSubmitForm={onSubmitForm} hideAddUser={onAddUserHandlerHide}/>}
        {showDetails && <UserDetails user={user} hideDetails={onHideDetails} />}
        {showEdit && <Edit userId={userId} hideAddUser={hideEditModal} onSubmitForm={onEditSubmitForm}/>}
    <button onClick={onAddUserHandlerShow} className="btn-add btn">Add new user</button>
        </section>
      </main>
      <Footer />
    </>
  )
  }
  
  export default App
