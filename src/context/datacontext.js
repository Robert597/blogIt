import { createContext, useState, useEffect } from "react";
import { db } from "../firebase";
import { collection, getDocs, addDoc, onSnapshot, doc } from "firebase/firestore";
import {updateDoc, deleteDoc, getDoc} from 'firebase/firestore';
import { ref } from 'firebase/storage';
import { storage } from '../firebase';
import { uploadBytesResumable } from 'firebase/storage';
import { getDownloadURL } from 'firebase/storage';
import { useNavigate } from 'react-router-dom';
import { auth } from '../firebase';
import { signOut } from 'firebase/auth';





const DataContext = createContext({});

export const DataProvider = ({children}) => {
    const likesCollectionRef = collection(db, "likes");
    const [filename, setFileName] = useState('Change Image...')
    const postsCollectionRef = collection(db, "posts");
    const usersCollectionRef = collection(db, "users");
    const savedPostCollectionRef = collection(db, "savedPosts");
    const [posts, setPosts] = useState([]);
    const[title, setTitle] = useState('');
    const[body, setBody] = useState('');
    const[searchvalue, setSearchValue] = useState('');
    const[filteredpost, setFilteredPost] = useState([]);
    const [username, setUserName] = useState('');
    const [userimage, setUserImage] = useState('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT8rQTfvDS0mK_Y09wABdP_UOwfxiuQLqWcUQ&usqp=CAU');
    const [likes, setLikes] = useState([]);
    const [navShow, setNavShow] = useState(false);
    const [editLoading, setEditLoading] = useState(false);
    const [editError, seteditError] = useState(false);
    const [editErrorMessage, seteditErrorMessage] = useState("");
    const [savedpost, setSavedPost] = useState([]);
    let navigate = useNavigate();
    const [authUser, setAuthUser] = useState(false);
    

    useEffect(() => {
        const getLikes = async () => {
            onSnapshot(likesCollectionRef, (snapshot) => {
                setLikes(snapshot.docs.map((doc) => ({...doc.data(), docId: doc.id})));
     });
 }
getLikes();
       }, []);
      
     
   
   useEffect(() => {
    const getPosts = async () => {
        onSnapshot(postsCollectionRef, (snapshot) => {
            setPosts(snapshot.docs.map((doc) => ({...doc.data(), id: doc.id})));

        
        });
}
   getPosts();
   }, []);

   useEffect(() => {
    const getPosts = async () => {
        onSnapshot(savedPostCollectionRef, (snapshot) => {
            setSavedPost(snapshot.docs.map((doc) => ({...doc.data(), id: doc.id})));
 });
}
getPosts();
   }, []);

   const deletesavedpost = async (id) => {
       const selected = doc(db, "savedPosts", id);
       await deleteDoc(selected);
   }

   const[hide, setHide] = useState(true);
   const[postDeleteId, setPostDeleteId] = useState('');

   const handlePostDelete = async (id) => {
    const deletedPost = doc(db, "posts", id);
    const postDeleted = await getDoc(deletedPost);
    const deletedData = postDeleted.data();
    const deletedLike = likes.filter(like => like.id === deletedData.postId);
    const deletedlike = doc(db, "likes", deletedLike[0].docId);
    await deleteDoc(deletedPost);
    await deleteDoc(deletedlike);
    navigate('/home');
 }

   const handleSubmit = async (e) => {
       try{
           setEditLoading(true);
    e.preventDefault();
    const file = e.target[1].files[0];
  console.log(file);
//updated(file);
const data = await getDocs(usersCollectionRef);
console.log(data);
let allUsers =  (data.docs.map((doc) => ({...doc.data(), id: doc.id})));

const updateUser =  allUsers.filter((user) => {
if((user.name.toLowerCase()) === (username.toLowerCase())){
return user;
}
});
const postData = await getDocs(postsCollectionRef);
const postDatas = (postData.docs.map((doc) => ({...doc.data(), id: doc.id})));

const updatePost = postDatas.filter((post) => {
    if(((post.postAuthor.toLowerCase()) === (username.toLowerCase()))){
        return post;
    }
});



const selecteduser = doc(db, "users", updateUser[0].id);

if(file !== undefined){
const storageRef = ref(storage, `/images/${file.name}`);
const uploadTask =  await uploadBytesResumable(storageRef, file);
let url = await getDownloadURL(storageRef);
await updateDoc(selecteduser, {name: e.target[0].value, picture: url });
setUserImage(url);
}else {
    let url = userimage;
    await updateDoc(selecteduser, {name: e.target[0].value, picture: url });
setUserImage(url);
}

setUserName(e.target[0].value);
console.log(username);
updatePost.map((post) => { 
    const selectedpost = doc(db, "posts", post.id);
     updateDoc(selectedpost, {...post, postAuthor: e.target[0].value});
})
setHide(true);
setFileName('Change Image');
       } catch(err) {
        seteditError(true);
        seteditErrorMessage(err.message);
       }finally{
setEditLoading(false);
       }
    
}





useEffect(() => {
    const regex = new RegExp(searchvalue, "i", "g");
    const filteredPost = () => {
        const returnedPost = posts.filter((post) => {
            if((post.postTitle).match(regex) || (post.postBody).match(regex)) {
              return post;
            }else{
                return;
            }
        })
        returnedPost.sort(function(a, b) {
            return (b.postId - a.postId);
        })
    setFilteredPost(returnedPost);


       }
       filteredPost();
}, [searchvalue, posts]);


const [classClicked, setClassClicked] = useState(false)

const comeUp = () => {
  setClassClicked(true);
  };
  const [loginuser, setLoginUser] = useState('');
  
  
   
   

/*const[users, setUsers] = useState({ name: "",
picture: ""});
useEffect(() => {
 setUsers({name: username, picture: userimage});
}, [username, userimage]);*/

const logout = async () => {
    setHide(true);
    setAuthUser(false);
    await signOut(auth);
    navigate('/');
}

    return(
        <DataContext.Provider value={{
posts, setPosts, postsCollectionRef, title, setTitle, body, setBody, getDocs,  addDoc, searchvalue, setSearchValue,  filteredpost, username, setUserName, userimage, setUserImage, comeUp, classClicked, setClassClicked, usersCollectionRef, loginuser,setLoginUser, likesCollectionRef, likes, navShow, setNavShow, handleSubmit, hide, setHide, logout, filename, setFileName, editErrorMessage, editError, editLoading, postDeleteId, setPostDeleteId, handlePostDelete, savedpost, deletesavedpost, authUser, setAuthUser
        }}>
            {children}
        </DataContext.Provider>
    )
}
export default DataContext;
