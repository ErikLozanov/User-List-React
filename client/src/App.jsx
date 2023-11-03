import Footer from "./components/Footer"
import Header from "./components/Header"
import Search from "./components/SearchComponent"
import Table from "./components/Table"

import { useEffect, useState } from "react";
import * as userService from "./services/userService";
import CreateEdit from "./components/CreateEdit";

function App() {

  const [users,setUsers] = useState([]);
  const [showAddUser, setShowAddUser] = useState(false);

  useEffect(() => {
      userService.getAll()
      .then(res => setUsers(Object.values(res)))
      .catch(err => console.log(err.message));
  },[]);

  const onAddUserHandlerShow = () => {
    setShowAddUser(true);
  }
  const onAddUserHandlerHide = () => {
    setShowAddUser(false);
  }

  return (
    <>
      <Header />
      <main className="main">
      <section className="card users-container">
        {/* <Search /> */}
        <Table users={users} />
        {showAddUser && <CreateEdit hideAddUser={onAddUserHandlerHide}/>}
    <button onClick={onAddUserHandlerShow} className="btn-add btn">Add new user</button>
        </section>
      </main>
      <Footer />
    </>
  )
}

export default App
