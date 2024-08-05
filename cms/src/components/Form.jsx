import { useEffect, useState } from "react";
import axios from "axios";
import Toastify from "toastify-js";
import SubmitButton from "./SubmitButton";

export default function Form({ url, handleSubmit, article, nameProp }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [imgUrl, setImgUrl] = useState("");
  const [categoryId, setCategoryId] = useState(0);
  const [categories, setCategories] = useState([]);

  async function fetchCategory() {
    try {
      const { data } = await axios.get(`${url}/categories`, {
        headers: {
          Authorization: `Bearer ${localStorage.access_token}`,
        },
      });
      setCategories(data.categories);
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

  useEffect(() => {
    fetchCategory();
  }, []);

  useEffect(() => {
    if (article) {
      setTitle(article.title);
      setContent(article.content);
      setImgUrl(article.imgUrl);
      setCategoryId(article.categoryId);
    }
  }, [article]);

  return (
    <>
      <div className="mb-8 font-semibold text-xl text-fuchsia-600">
        {nameProp}
      </div>
      <div className="flex flex-col items-center gap-4 mt-14">
        <form
          onSubmit={(e) => {
            const dataArticle = {
              title,
              content,
              imgUrl,
              categoryId,
            };
            handleSubmit(e, dataArticle);
          }}
        >
          <div>
            <div className="label ">
              <span className="label-text">Title: </span>
            </div>
            <input
              type="text"
              placeholder="Article Title"
              className="input input-secondary w-full"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div>
            <div className="label ">
              <span className="label-text">Category: </span>
            </div>
            <select
              className="select select-secondary w-full max-w-xs"
              onChange={(e) => setCategoryId(e.target.value)}
            >
              <option disabled>Category</option>
              {categories.map((category) => {
                return (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                );
              })}
            </select>
          </div>
          <div>
            <div className="label ">
              <span className="label-text">Image URL: </span>
            </div>
            <input
              type="text"
              placeholder="Image"
              className="input input-secondary w-full max-w-xs"
              onChange={(e) => setImgUrl(e.target.value)}
              value={imgUrl}
            />
          </div>
          <div>
            <div className="label ">
              <span className="label-text">Content: </span>
            </div>
            <textarea
              placeholder="Content"
              className="input input-secondary w-full max-w-xs"
              onChange={(e) => setContent(e.target.value)}
              value={content}
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
