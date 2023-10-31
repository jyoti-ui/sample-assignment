import { useEffect } from "react";
import UserDetail from "../UserDetails";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsersListThunk } from "../../redux/thunk/users.thunk";
import { fetchPostsThunk } from "../../redux/thunk/posts.thunk";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";

const UsersList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { usersList } = useSelector((state) => state.users);
  const { posts } = useSelector((state) => state.posts);

  const handleClick = (id) => {
    navigate(`/user-detail/${id}`)
    window.location.reload(true)
  }
  useEffect(() => {
    dispatch(fetchUsersListThunk());
    dispatch(fetchPostsThunk());
  }, [dispatch]);

  return (
    <div>
      <h3>Directory</h3>
      {usersList?.map((user) => {
        const {name, id} = user
       const numberOfPosts = (posts?.filter((post) => post.userId === id )).length
        return (
          <Card sx={{ 
            minWidth: 275,
            width : "50%", 
            margin : "auto",
            cursor : 'pointer',
            borderRadius : "10px",
           }}
           onClick={() => handleClick(id)}
           >
            <CardContent
              sx={{
                display: "flex",
                justifyContent: "space-between",
                background : "lightblue",
                margin : "10px",
                border : "1px solid black",
                borderRadius : "10px"
              }}
            >
              <Typography
                sx={{ 
                  fontSize: 17, 
                  marginRight : "10%", 
                  marginBottom: "10px",
                  fontWeight : "600"
                }}
                color="black"
              >
                Name : {`${name}`}
              </Typography>
              <Typography
                sx={{ 
                  fontSize: 17,
                  marginRight : "10%", 
                  marginBottom: "10px", 
                  fontWeight : "600"
                }}
                color="black"
              >
                Posts : {numberOfPosts}
              </Typography>
            </CardContent>
          </Card>
        );
      })}
      <UserDetail />
    </div>
  );
};

export default UsersList;
