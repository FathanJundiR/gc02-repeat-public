import { useState } from "react";
import axios from "axios";
import Toastify from "toastify-js";
import { useEffect } from "react";

export default function Categories({ url }) {
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

  useEffect(() => {
    fetchCategory();
  }, []);

  return (
    <>
      {console.log(categories)}
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>NO.</th>
              <th>Category Name</th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            {categories.map((category, index) => (
              <tr key={category.id}>
                <th>{index + 1}</th>
                <td>{category.name}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
