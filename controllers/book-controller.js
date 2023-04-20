const {UserModal,BookModal}  = require("../modals/index");
const issuedBook = require("../dtos/book-dtos.js");

exports.getAllBooks = async(req,res) =>{
    const books = await BookModal.find();

    if(books.length === 0){
        return res.status(404).json({
           success: false,
           message:"No Book Found"
        })
    }
    res.status(200).json({
        success: true,
        data: books,
    }); 
};

exports.getSingleBookById= async(req,res) =>{

    const {id} = req.params;
    const book = await BookModal.findById(id);
    if(!book){
    return res.status(404).json({
        sucess:false,
        message:"Book doesn't exists" 
    });
  }
  return res.status(200).json({
    sucess:true,
    message:"Book Found",
    data:book,
  });
};

exports.getAllIssuedBooks = async(req,res) =>{
   const  users = await UserModal.find({
    issuedBook: {$exists: true}
   }).populate("issuedBook");

   //  DTO : Data TRansfer Object
  const issuedBooks = user.map((each)=> new issuedBook(each));

  if (issuedBooks.length === 0) {
    return res.status(404).json({
      success: false,
      message: "No Book Have Been Issued Yet..",
    });
  }
  return res.status(200).json({
    success: true,
    message: "Users With The Issued Books...",
    data: issuedBooks,
  });
}

exports.addNewBook = async(req,res) => {
     const {data} = req.body;
     if(!data){
       return res.status(404).json({
         success:false,
         message:"No Data To add a Book",
       });
     }
     
     await BookModal.create(data);
     const allBooks = await BookModal.find()
     
    return res.status(201).json({
        sucess:true,
        message: "Book added sucessfully",
        data: allBooks,
    });
}  
exports.updateBookById = async(req,res) =>{
    const { id } = req.params;
    const { data } = req.body;
    

    const updatedbook = await BookModal.findOneAndUpdate(
      {
      _id:id,
      },
      data,
      {
      new:true,
      }
  );
  return res.status(200).json({
    success: true,
    message: "book Updated !!",
    data: updatedbook,
  });
};

//module.exports = {getAllBooks,getSingleBookById};