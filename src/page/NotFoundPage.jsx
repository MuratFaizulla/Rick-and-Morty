import { Link } from "react-router-dom";
import notFoundImage from "../context/morty.png";

function NotFoundPage() {
  return (
    <div className="">
      <div className="not-found">
        <img src={notFoundImage} alt="Not Found" className="not-found-img" />
        <h2 className="not-found-title">
          Ничего не найдено! Перейти на <Link to="/">главную</Link>
        </h2>
      </div>
    </div>
  );
}

export default NotFoundPage;