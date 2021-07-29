import React, { useState, useEffect } from "react";
import TopBar from "../../components/topBar";
// import banner from "../../server/banners/index.get.json"
import Carousel from "react-material-ui-carousel";
import { Paper, Button, Typography, Grid, makeStyles } from "@material-ui/core";
// import image from "../../static/images/offers/offer1.jpg"
// import { GET } from "../helper";
import axios from "axios";

const useStyles = makeStyles((theme) => ({
  categoryGrid: {
    height: 500,
    alignItems: "center",
    boxShadow: "0 1px 4px rgb(0 0 0 / 30%)",
    padding: "0px 100px",
  },
  categoryImage: {
    width: "100%",
  },
  categoryName: {
    fontWeight: 600,
    marginBottom: 10,
  },
  categoryButton: {
    textTransform: "capitalize",
    backgroundColor: "#bf2957",
    color: "white",
    borderRadius: 0,
  },
  categoryButtonGrid: {
    display: "flex !important",
    justifyContent: "center",
    marginTop: 10,
  },
}));

const Home = () => {
  const classes = useStyles();
  // const banners  =  GET("banners");
  const [data, setData] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/banners`)
      .then((response) => {
        console.log("allah", response?.data);
        setData(response?.data);
      })
      .catch((error) => {
        console.log(error);
      });
    axios
      .get("http://localhost:5000/categories")
      .then((response) => {
        setCategories(response?.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div>
      <TopBar />
      <Grid style={{ margin: "130px 0px 20px 0px" }}>
        <Carousel>
          {data?.map((item, i) => (
            <Item key={i} item={item} />
          ))}
        </Carousel>
      </Grid>

      {categories?.map((item, index) => (
        <Grid container className={classes.categoryGrid}>
          <Grid item xs={6}>
            <img
              src={item?.imageUrl}
              alt={item?.imageUrl}
              className={classes.categoryImage}
            />
          </Grid>
          <Grid item xs={6}>
            <Typography
              variant="h5"
              align="center"
              className={classes.categoryName}
            >
              {item?.name}
            </Typography>
            <Typography variant="h6" align="center">
              {item?.description}
            </Typography>
            <div className={classes.categoryButtonGrid}>
              <Button variant="contained" className={classes.categoryButton}>
                Explore {item?.key}
              </Button>
            </div>
          </Grid>
        </Grid>
      ))}
    </div>
  );
};

function Item(props) {
  return (
    <Paper style={{ padding: "0px 100px" }} elevation={0}>
      <img src={props?.item?.bannerImageUrl} alt="logo" />
    </Paper>
  );
}

export default Home;
