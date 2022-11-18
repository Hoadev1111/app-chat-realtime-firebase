import React, {useContext, useState} from 'react';
import { collection, query, where, getDoc, getDocs, setDoc, doc, updateDoc, serverTimestamp  } from "firebase/firestore";
import {db} from '../firebase'
import {AuthContext} from '../context/AuthContext'

function Search(props) {

  const [username, setUserName] = useState('');
  const [user, setUser] = useState(null);
  const [err, setErr] = useState(false);

  const {currentUser} = useContext(AuthContext);

  const handleSearch = async () => {
    const q = query(collection(db, 'users'), where("displayName", "==", username));

    try {
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        console.log('doc.data(): ', doc.data());
        setUser(doc.data());
      });
    } catch (error) {
      setErr(true);
    }
    
  }

  const handleKey = (e) => {
    e.code === "Enter" && handleSearch();
  }

  const handleSelect = async () => {
    // check wether the group(chat in firebase) exits, it not create
    const combinedId = currentUser.uid > user.uid 
      ? currentUser.uid + user.uid
      : user.uid + currentUser.uid;
    try {
      const res = await getDoc(doc(db, 'chats', combinedId));
      if(!res.exists()){
        // create a chat in chats collection
        await setDoc(doc(db, 'chats', combinedId), {message: []});

        // create user chats
        await updateDoc(doc(db, "userChats", currentUser.uid), {
          [combinedId+".userInfo"]: {
            uid: user.uid,
            displayName: user.displayName,
            photoURL: user.photoURL,
          }, 
          [combinedId+".date"]: serverTimestamp(),
        });

        await updateDoc(doc(db, "userChats", user.uid), {
          [combinedId+".userInfo"]: {
            uid: currentUser.uid,
            displayName: currentUser.displayName,
            photoURL: currentUser.photoURL,
          }, 
          [combinedId+".date"]: serverTimestamp(),
        });
      }
    } catch (error) {
      console.log('Error Message: ', error.message);
    }
    setUser(null);
    setUserName('');
  }

  return (
    <div className='search'>
      <div className='searchForm'>
        <input 
          type="text" 
          placeholder="Find a user..." 
          onChange={(e) => setUserName(e.target.value)}
          onKeyDown={handleKey}
          value={username}
        />
      </div>
      {err && <span>User Not Found!</span>}
      {user && <div className='userChat' onClick={handleSelect}>
        <img src={user.photoURL} alt="" />
        <div className='userChatInfo'>
          <span>{user.displayName}</span>
        </div>
      </div>}
    </div>
  );
}

export default Search;