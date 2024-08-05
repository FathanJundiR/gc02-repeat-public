import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  return (
    <>
      <div className="navbar bg-base-300 mb-16 rounded ">
        <div className="flex-1">
          <a className="btn btn-ghost text-xl" onClick={() => navigate("/")}>
            Chaude
          </a>
        </div>
      </div>
    </>
  );
}
