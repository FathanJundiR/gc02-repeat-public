import { useEffect, useState } from "react";
import axios from "axios";
import Toastify from "toastify-js";
import SubmitButton from "./SubmitButton";

export default function UserForm({ url, handleSubmit, nameProp }) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");

  return (
    <>
      <div className="mb-8 font-semibold text-xl text-fuchsia-600">
        {nameProp}
      </div>
      <div className="flex flex-col items-center gap-4 mt-14">
        <form
          onSubmit={(e) => {
            const dataUser = {
              username,
              email,
              password,
              phoneNumber,
              address,
            };
            handleSubmit(e, dataUser);
          }}
        >
          <div>
            <div className="label ">
              <span className="label-text">Username: </span>
            </div>
            <input
              type="text"
              placeholder="username"
              className="input input-secondary w-full"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div>
            <div className="label ">
              <span className="label-text">Email: </span>
            </div>
            <input
              type="text"
              placeholder="Email"
              className="input input-secondary w-full"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <div className="label ">
              <span className="label-text">Password: </span>
            </div>
            <input
              type="password"
              placeholder="Password"
              className="input input-secondary w-full"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div>
            <div className="label ">
              <span className="label-text">Phone Number: </span>
            </div>
            <input
              type="text"
              placeholder="Phone Number"
              className="input input-secondary w-full"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
          </div>
          <div>
            <div className="label ">
              <span className="label-text">Address: </span>
            </div>
            <input
              type="text"
              placeholder="Address"
              className="input input-secondary w-full"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>
          <div>
            {/* <button type="submit" className="w-full btn btn-accent mt-10">{nameProp}</button> */}
            <SubmitButton nameProp={nameProp} />
          </div>
        </form>
      </div>
    </>
  );
}
