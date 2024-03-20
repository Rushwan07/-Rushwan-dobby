import React, { useEffect, useState } from "react";
import { useAuthContext } from "../hooks/useAuthContext";

const Home = ({ searchData }) => {
  const { user } = useAuthContext();
  const [delimage, setDelImage] = useState("");
  const [images, setImages] = useState([]);

  const handleClick = async (id) => {
    console.log(id);
    const response = await fetch("/api/image/" + id, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${user.token}` },
    });
    const json = await response.json();
    if (response.ok) {
      setDelImage("Student deleted successfully");
    }
  };

  useEffect(() => {
    const fetchImages = async () => {
      const response = await fetch("/api/image/", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      });
      const json = await response.json();

      if (response.ok) {
        setImages(json);
      }
    };

    fetchImages();
  }, []);

  return (
    <div
      className="container d-flex flex-wrap mt-5 justify-content-center"
      style={{ gap: "5px" }}
    >
      {searchData && searchData.length > 0 ? (
        searchData.map((image) => (
          <>
          <h1>Search Resurlts:  </h1>
          <div className="card mb-3" style={{ width: "740px" }} key={image._id}>
            <div className="row no-gutters">
              <div className="col-md-4">
                <img
                  style={{ height: "50vh", width: "50vh", objectFit: "cover" }}
                  src={image.image}
                  alt={image.name}
                />
              </div>
              <div className="col-md-8 ">
                <div className="card-body ml-5">
                  <h5 className="card-title">{image.name}</h5>
                  <p className="card-text">{image.desc}</p>
                  <button
                    onClick={() => handleClick(image._id)}
                    className="btn btn-danger"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
          </>
        ))
      ) : (
        <>
          {images.length === 0 && (
            <h1 className="text-center">Zero cards added yet!!</h1>
          )}
          {images.map((image) => (
            <div
              className="card mb-3"
              style={{ width: "740px" }}
              key={image._id}
            >
              <div className="row no-gutters">
                <div className="col-md-4">
                  <img
                    style={{
                      height: "50vh",
                      width: "50vh",
                      objectFit: "cover",
                    }}
                    src={image.image}
                    alt={image.name}
                  />
                </div>
                <div className="col-md-8 ">
                  <div className="card-body ml-5">
                    <h5 className="card-title">{image.name}</h5>
                    <p className="card-text">{image.desc}</p>
                    <button
                      onClick={() => handleClick(image._id)}
                      className="btn btn-danger"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </>
      )}
    </div>
  );
};

export default Home;
