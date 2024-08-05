import axios from "axios";
import Toastify from "toastify-js";
import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import ImageForm from "../components/ImageForm";

export default function EditImage({ url }) {
  const navigate = useNavigate();
  const { id } = useParams();
  const [article, setArticle] = useState({});

  async function fetchArticle() {
    try {
      const { data } = await axios.get(`${url}/articles/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.access_token}`,
        },
      });
      setArticle(data.article);
    } catch (error) {
      Toastify({
        text: error.message,
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
    fetchArticle();
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      // console.log(typeof e.target.files[0]);

      let dataImg = new FormData();
      dataImg.append("ImgUrl", e.target.files[0]);
      const data = await axios.put(`${url}/articles/${id}`, dataImg, {
        headers: {
          Authorization: `Bearer ${localStorage.access_token}`,
        },
      });

      Toastify({
        text: "Success add new data",
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

      navigate("/");
    } catch (error) {
      console.log(error);

      Toastify({
        text: error,
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

  return (
    <>
      <ImageForm
        url={url}
        handleSubmit={handleSubmit}
        article={article}
        nameProp={"Edit Image"}
      />
    </>
  );
}
