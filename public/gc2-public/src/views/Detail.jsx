import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { localUrl, gcpUrl } from "../utils/baseUrl";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import gearLoad from "../assets/Gear-0.2s-264px.svg";

export default function Detail() {
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [articleDetail, setArticleDetail] = useState({});
  const navigate = useNavigate();

  async function fetchArticleDetail() {
    try {
      setLoading(true);
      const { data } = await axios.get(`${localUrl}/pub/articles/${id}`);
      setArticleDetail(data.article);
      console.log(data);
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.error, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchArticleDetail();
  }, []);

  return (
    <>
      {loading ? (
        <div className="mt-32 flex justify-center items-center">
          <img src={gearLoad} />
        </div>
      ) : (
        <>
          <div className="card card-side bg-base-100 shadow-xl">
            <figure className="object-scale-down">
              <img src={articleDetail.imgUrl} alt="Movie" />
            </figure>
            <div className="card-body">
              <h2 className="card-title">{articleDetail.title}</h2>
              <p>Description : {articleDetail.content}</p>
              <div className="card-actions justify-end">
                <button
                  className="btn btn-primary"
                  onClick={() => navigate("/")}
                >
                  Back
                </button>
                <button className="btn btn-primary">Buy</button>
              </div>
            </div>
          </div>
        </>
      )}
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
