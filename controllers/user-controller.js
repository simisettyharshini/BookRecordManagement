const {UserModal,BookModal}  = require("../modals");

exports.getAllUsers = async (req,res) =>{
    const users = await UserModal.find();

    if(users.length === 0){
        return res.status(404).json({
            sucess:false,
            message:"No Users Found in the DB",
        });
    }
    res.status(200).json({
        success:true,
        message:"These are the user info",
        data:users,
    });
};

exports.getSingleUserById = async (req,res) => {
    const {id} = req.params;
    const user = await UserModal.findById(id);
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
};

exports.createNewUser = async (req,res) =>{
    const {id,name,surname,email,subscriptionType,subscriptionDate} = req.body;
    
    const newUser = await UserModal.create({
        name,
        surname,
        email,
        subscriptionType,
        subscriptionDate
    });
    return res.status(201).json({
        sucess:true,
        message: "User added sucessfully",
        data: newUser,
    });
};

exports.updateUserData =async (req,res) =>{
    const { id } = req.params;
    const { data } = req.body;
const updateUserData = await UserModal.findOneAndUpdate(
    {_id :id},
    {
        $set: {
            ...data,
        },
    },
    {new:true}
);
return res.status(200).json({
    success: true,
    message: "User Updated !!",
    data: updateUserData,
  });

};

exports.deleteUser = async (req, res) => {
  const { id } = req.params;
  const user = await UserModal.deleteOne({ _id: id });
  if (!user) {
    return res.status(404).json({
      success: false,
      message: "User Doesn't Exist !!",
    });
  }
  return res
    .status(200)
    .json({ success: true, message: "Deleted User..", data: UserModal });
};


exports.getSubscriptionDetailsById = async (req, res)=>{
  const { id } = req.params;
  // find({_id:id})
  const user = await UserModal.findById(id);

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
  let returnDate = getDateInDays(user.returnDate);
  let currentDate = getDateInDays();
  let subscriptionDate = getDateInDays(user.subscriptionDate);
  let subscriptionExpiration = subscriptionType(subscriptionDate);

    const data = {
      ...user,
      isSubscriptionExpired: subscriptionExpiration < currentDate,
      daysLeftForExpiration:
        subscriptionExpiration <= currentDate
          ? 0
          : subscriptionExpiration - currentDate,
      fine:
        returnDate < currentDate
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
}