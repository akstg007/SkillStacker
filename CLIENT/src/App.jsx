
// import { BrowserRouter, Routes, Route } from "react-router-dom";
// import Generate from "./pages/Roadmap";
// import Signup from "./pages/auth/Signup";
// import Onboarding from "./pages/auth/Onboarding";
// import Login from "./pages/auth/Login";

// function App() {
//   return (
//     <BrowserRouter>
//       <Routes>
//         <Route path="/" element={<Signup />} />
//         <Route path="/signup" element={<Signup />} />
//         <Route path="/onboarding" element={<Onboarding />} />
//         <Route path="/generate" element={<Generate />} />
//         <Route path="/login" element={<Login />} />
//       </Routes>
//     </BrowserRouter>
//   );
// }

// export default App;



import { BrowserRouter, Routes, Route } from "react-router-dom";

import Signup from "./pages/auth/Signup";
import Login from "./pages/auth/Login";
import Onboarding from "./pages/Onboarding";

import Dashboard from "./pages/Dashboard";
import Roadmap from "./pages/Roadmap";
import Resources from "./pages/Resources";
import NextActions from "./pages/NextActions";
import SeniorAdvice from "./pages/SeniorAdvice";
import { Navigate }
from "react-router-dom";
const ProtectedRoute = ({ children }) => {

  const token =
    localStorage.getItem("token");

  return token
    ? children
    : <Navigate to="/login" />;
};
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/onboarding" element={<Onboarding />} />

        {/* <Route path="/dashboard" element={<Dashboard />} /> */}
        <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute> }/>
        <Route path="/roadmap" element={<Roadmap />} />
        <Route path="/resources" element={<Resources />} />
        <Route path="/next-actions" element={<NextActions />} />
        <Route path="/senior-advice" element={<SeniorAdvice />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
