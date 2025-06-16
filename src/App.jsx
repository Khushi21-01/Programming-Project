import { BrowserRouter, Route, Routes } from 'react-router'
import './App.css'

function App() {
  
  return (
   <>
  <BrowserRouter>
    <Routes>
      <Route path='/' element={<h1>KanBan board</h1>}></Route>
    </Routes>
  </BrowserRouter>
  <div className='Header'>
  <h1>Welcome to the Kanban Board</h1>
  </div>


   </>
  )
}

export default App
