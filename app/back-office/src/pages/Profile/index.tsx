import Header from "@/components/Navbar";
import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Card,
  CardBody,
  Typography,
  CardFooter,
  Button,
  Input,
  Textarea,
} from "@material-tailwind/react";

const Profile = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [appId, setAppId] = useState("");
  const [clientId, setClientId] = useState("");

  useEffect(() => {
    const storedClientId = localStorage.getItem("id");
    setClientId(storedClientId);

    const fetchUserApplication = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/users/${storedClientId}`
        );
        if (response.ok) {
          const data = await response.json();
          if (data.appData) {
            setAppId(data.appData[0]);
          }
        }
      } catch (error) {
        console.error("Error fetching user application:", error);
      }
    };

    fetchUserApplication();
  }, []);

  const handleSubmit = (event: any) => {
    event.preventDefault();

    if (appId) {
      return;
    }

    const projectData = {
      clientId,
      name,
      description,
    };
    console.log(projectData);
    axios
      .post("http://localhost:3000/createAppId", projectData)
      .then((res) => {
        setAppId(res.data.appId);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <React.Fragment>
      <div className="flex flex-col flex-1 w-full overflow-y-auto">
        <Header />
        <main>
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col">
              {appId ? (
                <Card className="mt-6 w-96 mx-auto">
                  <CardBody>
                    <Typography variant="h5" color="blue-gray" className="mb-2">
                      Récupérer votre appId
                    </Typography>
                    <div>
                      <Input type="text" value={appId} readOnly />
                    </div>
                  </CardBody>
                </Card>
              ) : (
                <Card className="mt-6 w-96 mx-auto">
                  <CardBody>
                    <Typography className="mb-4">Créer votre application</Typography>
                    <Input
                      className="border-1"
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Name"
                    />
                    <Textarea
                      className="border-1 mt-4"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      placeholder="Description"
                    />
                  </CardBody>
                  <CardFooter>
                    <Button type="submit">Create Project</Button>
                  </CardFooter>
                </Card>
              )}
            </div>
          </form>
        </main>
      </div>
    </React.Fragment>
  );
};

export default Profile;
