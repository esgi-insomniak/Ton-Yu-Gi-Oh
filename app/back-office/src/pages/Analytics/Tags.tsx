import React from "react";
import Header from "@/components/Navbar";
import axios from "axios";
import { set } from "zod";
import { useNavigate } from "react-router-dom";

const Tags = () => {
  const [tags, setTags] = React.useState([]);
  const [userData, setUserData] = React.useState([]);
  const [userAppData, setUserAppData] = React.useState([]);
  const navigate = useNavigate();

  const userId = localStorage.getItem("id");

  React.useEffect(() => {
    axios
      .get(`http://localhost:3000/users/${userId}`)
      .then((res) => {
        setUserData(res.data.appData[0]);
        setUserAppData(res.data.appData);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [userId]);

  React.useEffect(() => {
    axios
      .get(`http://localhost:3000/tags/${userData}`)
      .then((res) => {
        setTags(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [userData]);


  const handleSubmit = (e: any) => {
    e.preventDefault();
    const name = e.target.name.value;
    const appData = userAppData;
    axios
      .post("http://localhost:3000/tags", {
        name,
        appData,
      })
      .then((res) => {
        e.target.reset();
        navigate("/tags", { replace: true })
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <React.Fragment>
      <Header />
      <div className="flex justify-around items-start">
        <div>
          <h2>Créé un tags</h2>
          <div>
            <form onSubmit={handleSubmit}>
              <label htmlFor="name">Nom du tag</label>
              <input type="text" name="name" id="name" />
              <button type="submit">Créé</button>
            </form>
          </div>
        </div>
        <div>
          <h2>Liste des tags créé</h2>
          <div>
            {tags.length ? (
              tags.map((tag: any) => (
                <div key={tag._id}>
                  <h2>{tag.name}</h2>
                </div>
              ))
            ) : (
              <h2>Vous n'avez pas encore de tags</h2>
            )}
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Tags;
