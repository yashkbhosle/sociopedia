import User from "../models/User.js";

//read
export const getUser = async(req,res) =>{
    try{
       const {id} = req.params;
       const user = User.findById(id);
       res.status(202).json(user);
    } catch(error){
        res.status(404).json({message:error.message});
    }
}

export const getUserFriends = async(req,res) =>{
    try{
        const {id} = req.params;
        const user = User.findById(id);
        const friends = Promise.all(
         user.friends.map((id)=>User.findById(id))
        );
        const formattedFriends = friends.map((_id,firstName,lastName,occupation,location,picturePath)=>{
            return {_id,firstName,lastName,occupation,location,picturePath};
        });
        res.status(202).json(formattedFriends);
    } catch(error){
        res.status(404).json({message:error.message});
    }
    
}


//update
export const addRemoveFriend = async(req,res)=>{
    try{
      const {id,friendId} = req.params;
      const user = User.findById(id);
      const friend = User.findById(friendId);
      if(user.friends.includes(friendId)){
        user.friends = user.friends.filter((id)=>id!==friendId);
        friend.friends = friend.friends.filter((id)=>id!==id);
      } else{
        user.friends.push(friendId);
        friend.friends.push(id);
      }
      await user.save();
      await friend.save(); 
      const friends = Promise.all(
        user.friends.map((id)=>User.findById(id))
       );
       const formattedFriends = friends.map((_id,firstName,lastName,occupation,location,picturePath)=>{
           return {_id,firstName,lastName,occupation,location,picturePath};
       });
       res.status(202).json(formattedFriends);
     } catch(error){
        res.status(404).json({message:error.message});
    }
}