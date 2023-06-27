import React from "react";
import Header from "@/components/Navbar";
import axios from "axios";
import { set } from "zod";
import { useNavigate } from "react-router-dom";
import {
  Button,
  Card,
  Input,
  List,
  ListItem,
  Typography,
} from "@material-tailwind/react";

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
        navigate("/tags", { replace: true });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <React.Fragment>
      <Header />
      <div className="flex justify-around items-start">
        <Card className="w-96 my-4">
          <Typography className="text-center my-2 font-bold">
            Créé un tags
          </Typography>
          <div>
            <form
              onSubmit={handleSubmit}
              className="mt-8 mb-2 w-full max-w-screen-lg sm:w-96"
            >
              <div className="mb-3 mx-3">
                <label htmlFor="name" className="mb-2">
                  Nom du tags
                </label>
                <Input type="text" name="name" id="name" />
              </div>
              <Button type="submit" className="mx-3">
                Créé
              </Button>
            </form>
          </div>
        </Card>
        <div>
          <Card className="w-96 my-4">
            <Typography
              color="blue-gray"
              className="text-center my-2 font-bold"
            >
              Liste des tags
            </Typography>
            <List>
              {tags.length ? (
                tags.map((tag: any) => (
                  <ListItem key={tag._id} className="d-flex justify-between mb-2">
                    {tag.name}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-6 h-6"
                      onClick={() => {
                        axios
                          .delete(`http://localhost:3000/tags/${tag._id}`)
                          .then((res) => {
                            alert("Le tag a bien été supprimé");
                            navigate("/tags", { replace: true });
                          })
                          .catch((err) => {
                            console.log(err);
                          });
                      }}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                      />
                    </svg>
                  </ListItem>
                ))
              ) : (
                <Typography className="text-center">Vous n'avez pas encore de tags</Typography>
              )}
            </List>
          </Card>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Tags;
