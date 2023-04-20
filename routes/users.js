//USER:
const express = require("express");
const {users} = require("../data/users.json");
const {getAllUsers,
getSingleUserById,
createNewUser,
updateUserData,
deleteUser,
getSubscriptionDetailsById} = require("../controllers/user-controller");
const {UserModal,BookModal}  = require("../modals/index");
const router = express.Router();

/**
 * Route:/users
 * Method:GET
 * Description :Get all users
 * Acess : public 
 * Parameters:None
 */
//JSON APPROACH:
/* router.get("/",(req,res)=>{
    res.status(200).json({
        sucess:true,
        data: users
    })
}) */
//DataBase Approach
router.get("/",getAllUsers);


/**
 * Route:/users/:id
 * Method:GET
 * Description :single users by their ids
 * Acess : public 
 * Parameters:Id
 */
//JSON APPROACH
/* router.get('/:id',(req,res)=>{
    const {id} = req.params;
    const user = users.find((each)=>each.id === id);
    if(!user){
        return res.status(404).json({
            sucess:false,
            message: "User Doesn't Exist !!",
        });
    }
    return res.status(200).json({
        sucess:true,
        message: "User Found",
        data: user,
    });
}); */
//DataBase Approach
router.get('/:id',getSingleUserById);
/**
 * Route:/users
 * Method:POST
 * Description :Creating a new user
 * Acess : public 
 * Parameters:None
 */
//JSON APPROACH:
/* router.post("/",(req,res)=>{
    const {id,name,surname,email,subscriptionType,subscriptionDate} = req.body
    const user =users.find((each)=>each.id===id);

    if(user){
        return res.status(404).json({
            sucess:false,
            message: "User with the Id exists",
        });
    }
    users.push({
        id,
        name,
        surname,
        email,
        subscriptionType,
        subscriptionDate,
    });
    return res.status(201).json({
        sucess:true,
        message: "User added sucessfully",
        data: users,
    })
}) */
//DataBase Approach:
router.post("/",createNewUser);

/**
 * Route:/users/:id
 * Method:PUT
 * Description :Updating user by their id
 * Acess : public 
 * Parameters:ID
 */
//JSON APPOROACH:
 /* router.put("/:id", (req, res) => {
  const { id } = req.params;
  const { data } = req.body;

  const user = users.find((each) => each.id === id);
  if (!user) {
    return res.status(404).json({
      success: false,
      message: "User Doesn't Exist !!",
    });
  }
  const updateUserData = users.map((each) => {
    if (each.id === id) {
      return {
        ...each,
        ...data,
      };
    }
    return each;
  });
  return res.status(200).json({
    success: true,
    message: "User Updated !!",
    data: updateUserData,
  });
}); */
//DataBase Approach:
router.put("/:id",updateUserData );
/**
 * Route:/users/:id
 * Method:DELETE
 * Description :Deleting user by their id
 * Acess : public 
 * Parameters:ID
 */
/* router.delete("/:id",(req,res)=>{
    const {id} = req.params;
    const user = users.find((each)=>each.id===id);
    if(!user){
        return res.status(404).json({
            sucess:false,
            message: "User Doesn't Exists !!",
        });
    }
    const index =users.indexOf(user);
    users.splice(index,1)

    return res.status(200).json({
        sucess:true,
        message:"Deleted User....",
        data: users,
    })
}) */
//DataBase Approach:
router.delete("/:id",deleteUser)
/**
 * Route:/users/subscription-details/:id
 * Method:GET
 * Description :GET all user subscription details
 * Acess : public 
 * Parameters:ID
 */

/* router.get("/subscription-details/:id", (req, res) => {
  const { id } = req.params;
  const user = users.find((each) => each.id === id);

  if (!user) {
    return res.status(404).json({
      success: false,
      message: "User With The ID Didnt Exist",
    });
  }

  const getDateInDays = (data = "") => {
    let date;
    if (data === "") {
      date = new Date();
    } else {
      date = new Date(data);
    }
    let days = Math.floor(date / (1000 * 60 * 60 * 24));
    return days;
  };

  const subscriptionType = (date) => {
    if (user.subscriptionType === "Basic") {
      date = date + 90;
    } else if (user.subscriptionType === "Standard") {
      date = date + 180;
    } else if (user.subscriptionType === "Premium") {
      date = date + 365;
    }
    return date;
  };

  // Jan 1 1970 UTC
  let returnDateInDays = getDateInDays(user.returnDate);
  let currentDate = getDateInDays();
  let subscriptionDate = getDateInDays(user.subscriptionDate);
  let subscriptionExpiration = subscriptionType(subscriptionDate);

  // console.log("returnDate ", returnDate);
  //   console.log("currentDate ", currentDate);
  //     console.log("subscriptionDate ", subscriptionDate);
  //       console.log("subscriptionExpiration ", subscriptionExpiration);

  const data = {
    ...user,
    isSubscriptionExpired: subscriptionExpiration < currentDate,
    daysLeftForExpiration:
      subscriptionExpiration <= currentDate
        ? 0
        : subscriptionExpiration - currentDate,
    fine:
      returnDateInDays < currentDate
        ? subscriptionExpiration <= currentDate
          ? 100
          : 50
        : 0,
  };
  return res.status(200).json({
    success: true,
    message: "Subscription detail for the user is: ",
    data,
  });
});
 */
//DataBase Approach:
router.get("/subscription-details/:id", getSubscriptionDetailsById)

module.exports = router;