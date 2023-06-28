import React from "react";
import Header from "@/components/Navbar";
import axios from "axios";
import { Card, ListItem, List } from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";

const Tunnels = () => {
  const [tunnel, setTunnel] = React.useState([]);
  const [userAppData, setUserAppData] = React.useState([]);
  const [tags, setTags] = React.useState([]);
  const [userData, setUserData] = React.useState([]);
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

  React.useEffect(() => {
    axios
      .get(`http://localhost:3000/tunnels/${userData}`)
      .then((res) => {
        setTunnel(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [userId]);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    const tunnelName = e.target.name.value;
    const selectedTags = Array.from(e.target.querySelectorAll('input[type="checkbox"]:checked')).map((checkbox: any) => checkbox.value);
    const data = {
      name: tunnelName,
      tags: selectedTags,
      appData: userAppData,
    };
    
    axios
      .post("http://localhost:3000/tunnels", data)
      .then((res) => {
        setTunnel([...tunnel, res.data]);
        navigate("/tunnels");
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
          <h2>Créé un tunnel</h2>
          <div>
            <form onSubmit={handleSubmit}>
              <label htmlFor="name">Nom du tunnel</label>
              <input type="text" name="name" id="name" />
              <Card className="w-96">
                <List>
                  {tags.length ? (
                    tags.map((tag: any, index) => (
                      <ListItem className="d-flex justify-between" key={index}>
                        {tag.name} <input type="checkbox" value={tag._id} />
                      </ListItem>
                    ))
                  ) : (
                    <h2>Vous n'avez pas encore de tags</h2>
                  )}
                </List>
              </Card>
              <button type="submit">Créé</button>
            </form>
          </div>
        </div>
        <div>
          <h2>Liste des tunnels créé</h2>
          <div>
            {tunnel.length ? (
              tunnel.map((tag: any) => (
                <div key={tag._id}>
                  <h2>{tag.name}</h2>
                </div>
              ))
            ) : (
              <h2>Vous n'avez pas encore de tunnels</h2>
            )}
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Tunnels;
