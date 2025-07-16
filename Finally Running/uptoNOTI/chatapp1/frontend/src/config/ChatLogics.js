export const getSender=(loggedUser,users)=>{
 //   console.log("Users array1:", users[0].name);
    if (!loggedUser || !users || users.length < 2) return '';
    return users[0]._id===loggedUser._id?users[1].name:users[0].name;
}



export const getSenderFull=(loggedUser,users)=>{
    // console.log("Users array:", users);
    if (!users || users.length < 2) {
        // Handle error case (e.g., return an empty object or null)
        return '';
      }
    
    return users[0]._id===loggedUser._id?users[1]:users[0];
};

export const isSameSender=(messages,m,i,userId)=>{
  return(
    //means i does not proceed array length and jo current message ha uska sender and last message ka sender same to nhi and current message is from another user and message is not undefienes
    i<messages.length-1 && (messages[i+1].sender._id!==m.sender._id || messages[i+1].sender._id===undefined)&&messages[i].sender._id!==userId
  );
};


//logic is leave logged in and return other one
export const isLastMessage=(messages,m,i,userId)=>{
  return(
    //means i does not proceed array length and jo current message ha uska sender and last message ka sender same to nhi and current message is from another user and message is not undefienes
    i===messages.length-1 && messages[messages.length-1].sender._id !==userId&& messages[messages.length-1].sender._id
  );
};

export const isSameSenderMargin=(messages,m,i,userId)=>{
  if(
    (i<messages.length-1 && messages[i+1].sender._id !==m.sender._id && messages[i].sender._id && messages[i].sender._id!==userId)||(i===messages.length-1 && messages[i].sender._id!==userId)
    //messages[i].sender._id && messages[i].sender._id !== userId: Ensures the current message sender is defined and is not the current user.
  )
     return 14;
  
     //messages[i].sender._id && messages[i].sender._id !== userId: Ensures the current message sender is defined and is not the current user.
  else if(
    (i<messages.length-1 && messages[i+1].sender._id !==m.sender._id && messages[i].sender._id !==userId)||(i===messages.length-1 && messages[i].sender._id!==userId)
  )
  return 0;

  else return "auto";

};

export const isSameUser=(messages,m,i)=>{
  return i>0&& messages[i-1].sender._id===m.sender._id;
}
