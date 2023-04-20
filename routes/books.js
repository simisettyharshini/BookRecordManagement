
const express = require("express");
const { 
  getAllBooks,
  getSingleBookById ,
  getAllIssuedBooks,
  addNewBook,
  updateBookById
} = require("../controllers/book-controller");

const { books } = require("../data/books.json");
const { users } = require("../data/users.json");

const {UserModal,BookModal}  = require("../modals/index");

const router = express.Router();

/**
 // 2 
 * Route:/books/:id
 * Method:GET
 * Description :single users by their ids
 * Acess : public 
 * Parameters:Id
 */
//DataBase Approach:
router.get("/:id",getSingleBookById);

/* 
 //JSON Approach
 router.get("/:id",(req,res)=>{
  const {id} = req.params;
  const book = books.find((each)=>each.id === id);
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
}); */


/**
 //4
 * Route:/books/:id
 * Method:PUT
 * Description :Updating book by their id
 * Acess : public 
 * Parameters:ID
 */
// JSON APPROACH
 /* router.put("/:id", (req, res) => {
  const { id } = req.params;
  const { data } = req.body;

  const book = books.find((each) => each.id === id);
  if (!book) {
    return res.status(404).json({
      success: false,
      message: "book Doesn't Exist !!",
    });
  }
  const updateBookData = books.map((each) => {
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
    message: "book Updated !!",
    data: updateBookData,
  });
}); */
//DataBase Approach:
router.put("/:id",updateBookById );
/**
 // 1
 * Route:/books
 * Method:GET
 * Description :Get all books
 * Acess : public 
 * Parameters:None
 */

/* 
//Json Approach
router.get("/",(req,res)=>{
    res.status(200).json({
        sucess:true,
        data: books
    });
}); */

// DataBase Approach
router.get("/",getAllBooks);


/**
 //3
 * Route:/books
 * Method:POST
 * Description :Creating a new book
 * Acess : public 
 * Parameters:None
 */

// JSON APPROACH
/* router.post("/",(req,res)=>{
    const {id,name,author,genre,price,publisher} = req.body
    const book =books.find((each)=>each.id===id);

    if(book){
        return res.status(404).json({
            sucess:false,
            message: "book with the Id exists",
        });
    }
   books.push({
        id,
        name,
        author,
        genre,
        price,
        publisher,
    });
    return res.status(201).json({
        sucess:true,
        message: "Book added sucessfully",
        data: books,
    });
}); */
// DataBase Approach
router.post("/",addNewBook);
/**
 //5
 * Route: /books/issued
 * Method: GET
 * Description: Get all issued books
 * Access: Public
 * Parameters: None
 */
/* 
// JSON APPROACH

router.get("/issued/by-user", (req, res) => {
  const usersWithTheIssuedBook = users.filter((each) => {
    if (each.issuedBook) return each;
  });
  const issuedBooks = [];

  usersWithTheIssuedBook.forEach((each) => {
    const book = books.find((book) => book.id === each.issuedBook);

    book.issuedBy = each.name;
    book.issuedDate = each.issuedDate;
    book.returnDate = each.returnDate;

    issuedBooks.push(book);
  });
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
}); */
//DataBase Approach
router.get("/issued/by-user", getAllIssuedBooks);




module.exports =router;