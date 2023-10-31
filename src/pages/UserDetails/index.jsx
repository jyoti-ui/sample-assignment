import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import {
  Button,
  Card,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";
import { fetchUsersListThunk } from "../../redux/thunk/users.thunk";
import { fetchPostsThunk } from "../../redux/thunk/posts.thunk";
import {
  fetchCountriesListThunk,
  fetchCountryTimeThunk,
} from "../../redux/thunk/countries.thunk";
import Clock from "../../components/clock";
import "./styles.css";

const UserDetail = () => {
  const params = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { usersList } = useSelector((state) => state.users);
  const { posts } = useSelector((state) => state.posts);
  const { countries } = useSelector((state) => state.countries);
  const [country, setCountry] = useState("");
  const userId = params.pathname.slice(-1);

  const handleChange = (e) => {
    setCountry(e.target.value);
    let countryIndex = e.target.value;
    let country = countries
      ?.filter((country, index) => index === countryIndex)
      .join("");
    let splitCountryName = country.split("/") 
    let area = splitCountryName[0];
    let location = splitCountryName[1];
    let region =  splitCountryName[2] ? splitCountryName[2] : ''
    dispatch(
      fetchCountryTimeThunk({
        data: {
          area,
          location,
          region
        },
      })
    );
  };

  const handleBack = () => {
    navigate("/");
  };

  useEffect(() => {
    dispatch(fetchUsersListThunk());
    dispatch(fetchPostsThunk());
    dispatch(fetchCountriesListThunk());
  }, [dispatch]);

  return (
    <div style={{ margin: "30px" }}>
      <div
        style={{
          width: "80%",
          margin: "auto",
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <Button
          sx={{
            background: "lightBlue",
            color: "black",
            height: "10%",
            // marginTop: "17px",
            fontWeight: 600,
            padding: "14px",
          }}
          onClick={() => handleBack()}
        >
          Back
        </Button>
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            marginLeft: "10px",
          }}
        >
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">
              Select Country
            </InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-sel ect"
              placeholder="Select Country"
              value={country}
              label="Age"
              onChange={handleChange}
              style={{ width: "250px", height: "50px", padding: "30px" }}
            >
              {countries?.map((country, index) => {
                return <MenuItem value={index}>{country}</MenuItem>;
              })}
            </Select>
          </FormControl>

          <Clock />
        </div>
      </div>
      <div>
        <h3>Profile Page</h3>

        {usersList
          ?.filter((user) => user.id == userId)
          ?.map((user) => {
            return (
              <Card>
                <CardContent
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    background: "#e6e2d3",
                    margin: "10px",
                    border: "1px solid black",
                    borderRadius: "10px",
                  }}
                >
                  <Typography
                    sx={{
                      fontSize: 17,
                      marginRight: "10%",
                      marginBottom: "10px",
                      fontWeight: "600",
                      textAlign: "left",
                    }}
                    color="black"
                  >
                    Name : {user.name} <br />
                    Username : {user.username} | Catch Phrase : "
                    {user.company.catchPhrase}"
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: 17,
                      marginRight: "10%",
                      marginBottom: "10px",
                      fontWeight: "600",
                    }}
                    color="black"
                  >
                    Address : {user.address.suite} , {user.address.street}{" "}
                    <br />
                    {user.address.city}, {user.address.zipcode} <br />
                    Email : {user.email} <br />
                    Phone : {user.phone}
                  </Typography>
                </CardContent>
              </Card>
            );
          })}
        <div
          className="card-container"
          style={{ display: "flex", flexWrap: "wrap" }}
        >
          {posts
            ?.filter((post) => post.userId == userId)
            .map((post) => {
              return (
                <Card
                  className="card-container"
                  sx={{
                    width: "50%",
                    flexDirection: "row",
                    flexBasis: "33.33%",
                  }}
                >
                  <CardContent
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "space-between",
                      background: "#618685",
                      margin: "10px",
                      border: "1px solid black",
                      borderRadius: "10px",
                      height: "345px",
                    }}
                  >
                    <Typography
                      sx={{
                        fontSize: 17,
                        marginRight: "10%",
                        marginBottom: "10px",
                        fontWeight: "600",
                        textAlign: "left",
                      }}
                      color="black"
                    >
                      Post Title : <br /> {post.title} <br />
                      <hr />
                      Post Content : <br /> {post.body}
                    </Typography>
                  </CardContent>
                </Card>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default UserDetail;
