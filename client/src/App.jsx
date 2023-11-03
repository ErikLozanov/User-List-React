import Footer from "./components/Footer"
import Header from "./components/Header"
import Search from "./components/SearchComponent"
import Table from "./components/Table"


function App() {

  return (
    <>
      <Header />
      <main className="main">
      <section className="card users-container">
        {/* <Search /> */}
        <Table />
    <button className="btn-add btn">Add new user</button>
        </section>
      </main>
      <Footer />
    </>
  )
}

export default App
