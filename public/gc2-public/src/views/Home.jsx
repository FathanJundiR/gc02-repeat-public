import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { localUrl, gcpUrl } from "../utils/baseUrl";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Card from "../components/Card";
import gearLoad from "../assets/Gear-0.2s-264px.svg";
import failconnect from "../assets/failconnect.png";

export default function Home({ url }) {
  const [articles, setArticles] = useState({});
  const [categories, setCategories] = useState([]);
  const [searching, setSearching] = useState([]);
  const [sort, setSort] = useState("title");
  const [filter, setFilter] = useState(0);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [page, setPage] = useState(1);
  const navigate = useNavigate();
  //failconnect.png
  async function fetchArticles() {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `${localUrl}/pub/articles?search=${searching}&limit=8&page[size]=8&page[number]=${page}&sort=${sort}&filter=${
          filter !== 0 ? filter : ""
        }`
      );
      setArticles(data);
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
      setErrorMessage(error.message);
    } finally {
      setLoading(false);
    }
  }

  async function fetchCategories() {
    try {
      const { data } = await axios.get(`${localUrl}/pub/categories`);
      setCategories(data.categories);
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
    }
  }

  useEffect(() => {
    fetchArticles();
    fetchCategories();
  }, [sort, filter, searching, page]);

  return (
    <>
      {errorMessage === "Network Error" ? (
        <div className="mt-32 flex justify-center items-center">
          <img src={failconnect} />
        </div>
      ) : (
        ""
      )}

      <form
        action=""
        method="get"
        className=" flex justify-center mb-5 flex-grow"
      >
        <input
          type="text"
          placeholder="Search"
          className="input input-bordered w-auto"
          onChange={(e) => setSearching(e.target.value)}
        />
      </form>

      <div className="home-query justify-item-center  flex flex-1 h-16 gap-5 justify-center ">
        <details className="dropdown">
          <summary className="btn btn-neutral">Filter By</summary>
          <ul className="menu dropdown-content bg-base-100 rounded-box z-[1] w-52 p-2 shadow">
            <li>
              <a onClick={() => setFilter("")}>Show All</a>
            </li>
            {categories.map((category) => {
              return (
                <li key={category.id}>
                  <a onClick={() => setFilter(category.id)}>{category.name}</a>
                </li>
              );
            })}
          </ul>
        </details>
        <details className="dropdown">
          <summary className="btn btn-neutral">Short By</summary>
          <ul className="menu dropdown-content bg-base-100 rounded-box z-[1] w-52 p-2 shadow">
            <li>
              <a onClick={() => setSort("title")}>Ascending</a>
            </li>
            <li>
              <a onClick={() => setSort("-title")}>Descending</a>
            </li>
          </ul>
        </details>
      </div>

      {loading ? (
        <div className="mt-32 flex justify-center items-center">
          <img src={gearLoad} />
        </div>
      ) : (
        <>
          <div className="home-content flex flex-wrap justify-center gap-4">
            {articles.data?.map((article) => {
              return (
                <Card
                  article={article}
                  articleId={article.id}
                  key={article.id}
                  // setDetail={setDetail}
                ></Card>
              );
            })}
          </div>
          <div className="flex justify-center mt-10">
            <div className="join">
              {(() => {
                const arr = [];
                for (let i = 1; i <= articles.totalPage; i++) {
                  let selected =
                    i === articles.page
                      ? "join-item btn btn-active"
                      : "join-item btn";
                  arr.push(
                    <button
                      className={selected}
                      key={i}
                      onClick={() => setPage(i)}
                    >
                      {i}
                    </button>
                  );
                }
                return arr;
              })()}
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
      )}
    </>
  );
}
