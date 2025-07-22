import { Route, Routes, Navigate } from "react-router-dom"; // Added Navigate
import LoginPage from "./pages/LoginPage";
import SignUpForm from "./components/Signup";

function App() {


  return (
    <Routes>
      <Route path="/" element={<LoginPage/>} />
      <Route path="/sign-up" element={<SignUpForm/>} />
    </Routes>
  )
}

export default App
