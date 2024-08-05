import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import gearLoad from "../assets/Gear-0.2s-264px.svg";
import failconnect from "../assets/failconnect.png";
import { useState } from "react";

// toast.error(error.message, {
//   position: "top-right",
//   autoClose: 5000,
//   hideProgressBar: false,
//   closeOnClick: true,
//   pauseOnHover: true,
//   draggable: true,
//   progress: undefined,
//   theme: "light",
// });

// <ToastContainer
//   position="top-right"
//   autoClose={5000}
//   hideProgressBar={false}
//   newestOnTop={false}
//   closeOnClick
//   rtl={false}
//   pauseOnFocusLoss
//   draggable
//   pauseOnHover
//   theme="light"
//   transition:Bounce
// />;

export default function Login({ url }) {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  async function handleLogin(event) {
    event.preventDefault();
    try {
      let { data } = await axios.post(`${url}/login`, { email, password });
      console.log(data);
      localStorage.setItem("access_token", data.access_token);
      navigate("/");

      toast.success("🦄 Wow so easy!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
    } catch (error) {
      console.log(error);
      toast.error(error.message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  }

  return (
    <>
      <div className="hero bg-base-200 min-h-screen">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <div className="text-center lg:text-left">
            <h1 className="text-5xl font-bold">Login</h1>
            <p className="py-6">
              Sebelum ente CRUD CRUD KYAHH, harap login dulu yak
            </p>
          </div>
          <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
            <form className="card-body">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  type="email"
                  placeholder="email"
                  className="input input-bordered"
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                  required
                />
                {/* {console.log(email, "<<outside")} */}
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input
                  type="password"
                  placeholder="password"
                  className="input input-bordered"
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                  required
                />
                {console.log(password, "<<outside")}
                <label className="label">
                  <a href="#" className="label-text-alt link link-hover">
                    Forgot password?
                  </a>
                </label>
              </div>
              <div className="form-control mt-6">
                <button className="btn btn-primary" onClick={handleLogin}>
                  Login
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition:Bounce
      />
    </>
  );
}
