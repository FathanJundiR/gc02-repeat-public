import { useEffect, useState } from "react";
import axios from "axios";
import Toastify from "toastify-js";
import SubmitButton from "./SubmitButton";

export default function ImageForm({ url, handleSubmit, article, nameProp }) {
  const [title, setTitle] = useState("");
  const [imgUrl, setImgUrl] = useState("");
  const [eventImg, setEventImg] = useState({});

  useEffect(() => {
    if (article) {
      setTitle(article.title);
      setImgUrl(article.imgUrl);
    }
  }, [article]);

  function submitImg(e) {
    e.preventDefault();
    handleSubmit(eventImg);
  }

  return (
    <>
      <div className="mb-8 font-semibold text-xl text-fuchsia-600">
        {nameProp}
      </div>
      <div className="flex flex-col items-center gap-4 mt-14">
        <form onSubmit={submitImg}>
          <div>
            <div className="label ">
              <span className="label-text">title: </span>
            </div>
            {title}
          </div>
          {/* <div>
            <div className="label ">
              <span className="label-text">Image URL: </span>
            </div>
            {imgUrl}
          </div> */}
          <div>
            <div className="label ">
              <span className="label-text">Image: </span>
            </div>
            <img src={imgUrl} alt="Image of The Article" className="w-1/2" />
          </div>
          <input
            type="file"
            className="file-input file-input-bordered file-input-md w-full max-w-xs"
            onChange={(e) => {
              setEventImg(e);
            }}
          />
          <div>
            <SubmitButton nameProp={nameProp} />
          </div>
        </form>
      </div>
    </>
  );
}
