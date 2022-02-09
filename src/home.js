import { useContext} from "react";
import DataContext from "./context/datacontext";
import { FaArrowRight, FaPlus, FaThumbsDown, FaThumbsUp } from "react-icons/fa";
import { useNavigate, Link } from "react-router-dom";
import Header from "./header";
import Profile from "./profile";
import {updateDoc, doc } from "firebase/firestore";
import { db } from "./firebase";
import "./home.css";
import Nav from "./nav";
 const Home = () => {
   var navigate = useNavigate();
  const {posts, filteredpost, dislikes, likes, username, navShow} = useContext(DataContext);
 const post = () => {
navigate('/post');
   }

 
return (
    <div className="moveContainer">
    <div className= {navShow ? "home postHide" : "home postShow"}>
        <Header/>
<div className="postsContainer">
{filteredpost.length > 0 ?
filteredpost.map((post) => {
    return ( <div className="postContainer" id={post.postId}>
        <div className="postImage">
            <img src={post.postImage} alt="postImage"/>
        </div>
        <div className="postContent">
        <h2>{post.postTitle}</h2>
        <p>{post.postBody.length > 25 ? post.postBody.slice(0, 30) + '...': post.postBody}</p>
        </div>
        <div className="postinfoContainer">
            <p className="postuser">{post.postAuthor}</p>
            <p className="posttime">{post.postTime}</p>
        </div>
      <button className="viewButton"><Link to = {`/post/${post.postId}`} className="viewLink">View Post</Link><FaArrowRight className="viewArrow"/></button>
    </div>
)}
) : <div className="noPost"><p>No Post to Display</p></div>}
</div>
<div className={navShow ? "toPost hide" : "toPost show"} onClick={() => post()}>
<FaPlus className="toPostIcon"/>
</div>
<Profile/>
        </div>
        <Nav/>
        </div>
    )
}

export default Home;
