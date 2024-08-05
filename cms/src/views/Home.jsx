import { useEffect, useState } from "react";
import axios from "axios";
import Toastify from "toastify-js";
import { useNavigate } from "react-router-dom";

export default function Home({ url }) {
  const [articles, setArticles] = useState([]);
  const navigate = useNavigate();

  async function fetchArticles() {
    try {
      const { data } = await axios.get(`${url}/articles`, {
        headers: {
          Authorization: `Bearer ${localStorage.access_token}`,
        },
      });
      setArticles(data.data);
    } catch (error) {
      console.log(error);
      Toastify({
        text: error.message,
        duration: 2000,
        newWindow: true,
        close: true,
        gravity: "bottom",
        position: "right",
        stopOnFocus: true,
        style: {
          background: "#EF4C54",
          color: "#17202A",
          boxShadow: "0 5px 10px black",
          fontWeight: "bold",
        },
      }).showToast();
    }
  }

  async function fetchCategory() {
    try {
      const { data } = await axios.get(
        `${url}/apis/branded-things/categories/1`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.access_token}`,
          },
        }
      );
      setProducts(data.data);
      console.log(data);
    } catch (error) {
      console.log(error);
      Toastify({
        text: "error.response.data.error",
        duration: 2000,
        newWindow: true,
        close: true,
        gravity: "bottom",
        position: "right",
        stopOnFocus: true,
        style: {
          background: "#EF4C54",
          color: "#17202A",
          boxShadow: "0 5px 10px black",
          fontWeight: "bold",
        },
      }).showToast();
    }
  }

  async function handleDelete(id) {
    try {
      await axios.delete(`${url}/articles/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.access_token}`,
        },
      });
      Toastify({
        text: "Success delete",
        duration: 2000,
        newWindow: true,
        close: true,
        gravity: "top",
        position: "left",
        stopOnFocus: true,
        style: {
          background: "#00B29F",
          color: "#17202A",
          boxShadow: "0 5px 10px black",
          fontWeight: "bold",
        },
      }).showToast();

      fetchArticles();
    } catch (error) {
      Toastify({
        text: error.response.data.error,
        duration: 2000,
        newWindow: true,
        close: true,
        gravity: "top",
        position: "left",
        stopOnFocus: true,
        style: {
          background: "#EF4C54",
          color: "#17202A",
          boxShadow: "0 5px 10px black",
          fontWeight: "bold",
        },
      }).showToast();
    }
  }

  useEffect(() => {
    fetchArticles();
  }, []);

  return (
    <>
      <div className="mb-8 flex justify-start">
        <div
          className="btn btn-secondary"
          onClick={() => navigate("/articles/add")}
        >
          Add More
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>NO.</th>
              <th>Title</th>
              <th>Description</th>
              <th>User</th>
              <th>Image</th>
              <th className="text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {articles?.map((article, index) => {
              return (
                <tr key={article.id}>
                  <th>{index + 1}</th>
                  <td>{article.title}</td>
                  <td className="text-clip overflow-hidden">
                    {article.content}
                  </td>
                  <td>{article.User.username}</td>
                  <td>{article.imgUrl}</td>
                  <td>
                    <div className="flex gap-3">
                      <div
                        className="btn flex-auto"
                        onClick={(e) =>
                          navigate(`/articles/edit/${article.id}`)
                        }
                      >
                        Edit
                      </div>
                      <div
                        className="btn flex-auto"
                        onClick={(e) =>
                          navigate(`/articles/image/${article.id}`)
                        }
                      >
                        Image
                      </div>
                      <div
                        className="btn flex-auto"
                        onClick={(e) => handleDelete(article.id)}
                      >
                        Delete
                      </div>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
}
