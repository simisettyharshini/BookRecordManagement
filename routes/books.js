
//BOOKS:

const express = require("express");
const { books } = require("../data/books.json");
const { users } = require("../data/users.json");
const router = express.Router();

/**
 * Route:/books/:id
 * Method:GET
 * Description :single users by their ids
 * Acess : public 
 * Parameters:Id
 */

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
});
/**
 * Route:/books/:id
 * Method:PUT
 * Description :Updating book by their id
 * Acess : public 
 * Parameters:ID
 */
 router.put("/:id", (req, res) => {
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
});

/**
 * Route:/books
 * Method:GET
 * Description :Get all books
 * Acess : public 
 * Parameters:None
 */

router.get("/",(req,res)=>{
    res.status(200).json({
        sucess:true,
        data: books
    });
});



/**
 * Route:/books
 * Method:POST
 * Description :Creating a new book
 * Acess : public 
 * Parameters:None
 */
router.post("/",(req,res)=>{
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
});
/**
 * Route: /books/issued
 * Method: GET
 * Description: Get all issued books
 * Access: Public
 * Parameters: None
 */
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
});
/**
 * Route: /books/issued
 * Method: 
 * Description: Get all issued books
 * Access: Public
 * Parameters: None
 */



module.exports =router;