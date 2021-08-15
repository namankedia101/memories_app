import React from "react";
import { Container } from "@material-ui/core";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";

import PostDetails from "./components/PostDetails/PostDetails";
import Home from "./components/Home/Home";
import Navbar from "./components/Navbar/Navbar";
import SignUp from "./components/Auth/Auth";

const App = () => {
  const user = JSON.parse(localStorage.getItem("profile"));
  
  return (
    <BrowserRouter>
    <Container maxWidth="xl">
    <Navbar />
    <Switch>
      <Route path={["/", "/posts", "/posts/search"]} exact component={Home} />
      <Route path="/posts/:id" exact component={PostDetails} />
      <Route path="/auth" exact component={() => (!user ? <SignUp /> : <Redirect to="/posts" />)} />
    </Switch> 
    </Container>
    </BrowserRouter>
  );
};

export default App;
