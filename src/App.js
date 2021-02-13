import Header from "./components/Header";
import SignInButton from "./components/SignInButton";
import SignOutButton from "./components/SignOutButton";
import Profile from "./components/Profile";
import './App.css';


function App() {
  return (
    <div className="">
      {/* <Header/> */}
      <SignInButton/>
      <SignOutButton/>
      <Profile/>
    </div>
  );
}

export default App;
