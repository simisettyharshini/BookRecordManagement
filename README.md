## The Technologies that are used to build this project are :

### 1. NodeJs

### 2. Express Js

### 3.MongoDB

### 4.HTML

### 5.CSS

### 6.TypeScript

This is a Book Record Management API Server/Backend for the library system or the management of records or manuals

Fine System : User: 06/03/2023-06/06/2023

09/06/2023 => 50\*3 = 150

## Subscription Types

3 months(Basic)

6 months(Standard)

12 months(Premium)

if the subscription type is standard && if the subscription date is 06/03/2023
=> then subscription valid till 06/09/2023

within subscription date >> if we miss the renewal >> 50-/ day
subscription date is also been missed >> and also missed the renewal >> 100 + 50-/day

> > book1
> > basic
> > 06/03/2023 => subscription date
> > 07/03/2023 => Borrowed a book from library
> > book1 renewal date is on 21/03/2023
> > 23/03/2023 => we need to pay a fine of 50\*2 = 100-/

> > book2
> > basic
> > 06/03/2023 => subscription
> > 07/03/2023 => Borrowed a book from library
> > book2 renewal date is on 21/03/2023
> > 23/06/2023 => we need to pay a fine of 100 + (no of days)\*50

## SERVER:

> > Storing certain book data

> > User Register

> > Subscriber

## Routes and EndPoints

## /users

POST : Create a new User
GET : Get all the user info here

## /users/(id):

GET : GET a user by id
PUT : update a user by their id
DELETE : Delete the user by that particular id(check that he/she still have issued book and check on the fines to be paid by him /her)

### /users/subscription-details/(id):

GET :Get user subscription details >> Date of Subscription >>vaild till >>Is there any fine

## /books

GET : Get all the books
POST : Create /Add a new book

## /books/{id}:

GET : Get a book by id
PUT: Update a book by id

## /books/issued

GET : Get all the issued books

## /books/issued/withfine

GET : Get all issued books with their fine

#### npm init

#### npm i nodemon --save-dev

### npm i express

#### npm run dev

#### In the Thunder client to check the server we need to send request to the url : localhost:8081/

---

# Mongo DB

## Non-relational DataBases

## Relation => Table

## Rows => Tuples

## Columns => Attributes

Data >> json format

---

MVC ARCH:

> > M: Modal (It depicts the structure of a mongoDb Collection)
> > V : View (wrt to front end (reactjs))
> > C : Controllers(Brain or logical part of a route)
