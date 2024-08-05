import { useNavigate } from "react-router-dom";

export default function Card({ article }) {
  const navigate = useNavigate();

  return (
    <>
      <div className="card card-bordered bg-base-100 w-96 shadow-xl">
        <figure>
          <img src={article.imgUrl} alt="IMAGE OF PRODUCT" />
        </figure>
        <div className="card-body">
          <h2 className="card-title">
            {article.title}
            <div className="badge badge-secondary">NEW</div>
          </h2>
          <p>{article.content}</p>
          <div className="card-actions justify-start">
            <div className="badge badge-outline">
              Category{article.categoryId}
            </div>
          </div>
          <div className="card-actions justify-start font-mono font text-sm">
            by. {article.User.username}
          </div>
          <div className="flex flex-wrap card-actions justify-end">
            <div
              className="btn flex-1"
              onClick={(e) => {
                e.preventDefault;
                navigate(`/articles/${article.id}`);
              }}
            >
              Read More
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
