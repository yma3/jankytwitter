const express = require('express') 
const sqlite3 = require('sqlite3').verbose() 
var db = new sqlite3.Database('twitter.db') 
const app = express() 

db.run("CREATE TABLE IF NOT EXISTS userTable (username TEXT PRIMARY KEY, password TEXT, first_name TEXT, last_name TEXT, email TEXT, birthday INT, FollowerNum INT, bio TEXT, image TEXT);") 
db.run("CREATE TABLE IF NOT EXISTS postTable (\n" + "postID INTEGER PRIMARY KEY AUTOINCREMENT,\n" + "username TEXT,\n" + "postData TEXT,\n" + "postTime INT,\n" + "likeNum INT\n" + ");") 


app.post('/tweet', function(req, res){
	postData = req.query['postData']
	username = req.query['username']
	postTime = new Date()
	likeNum = 0

	db.get("SELECT * FROM userTable WHERE username='" + username + "';", function(err, row){
		if(err){
			res.json(err) 
			return 
		}
		console.log(row); 

		if(row.length > 0){
			db.run("INSERT INTO postTable(username, postData, postTime, likeNum) VALUES (?,?,?,?);", [username, postData, postTime, likeNum], function(err){
				if(err){
					res.json(err) 
					return
				}
				db.get("SELECT * FROM postTable WHERE username='" + username + "';", function(err, row){
					if(err){
						res.json(err)
						return
					}
					res.json(row)
					console.log(row.length)
				})
			})
		}
	})





})


app.post('/user', function(req, res){

	username = req.query['username']
	password = req.query['password']
	first_name ="" //req.query['firstName']
	last_name = ""  //req.query['lastName']
	email = ""  //req.query['email']
	birthday = new Date() //new Date(req.query['dob'])
	FollowerNum = 0 //0 
	bio = "" 
	image = "" 

	db.run("INSERT INTO userTable(username, password, first_name, last_name, email, birthday, FollowerNum, bio, image) VALUES(?,?,?,?,?,?,?, ?, ? );", [username, password, first_name, last_name, email, birthday, FollowerNum, bio, image], function(err){
		if(err){
			res.json(err) 
			return
		}
		db.get("SELECT * FROM userTable WHERE username='" + username + "';", function(err, row){
			if(err){
				res.json(err) 
				return 
			}
			res.json(row)
			console.log(username +":" + password) 
		}) 
	})
}) 


// function insertPostTable(postID, username, postData, postTime, likeNum){
// 	db.run("INSERT INTO postTable(postID, username, postData, postTime, likeNum) VALUES(?,?,?,?,?)", [postID, username, postData, postTime, likeNum], function(err){
// 		if (err) {
// 			return console.log(err.message) 
// 		}
// 		console.log('A row to post table') 
// 	})
// }

// function selectFromPost(req, res){

// 	db.get("SELECT * FROM userTable WHERE username=" + username + "", function(err, row){
// 		if(err){
// 			res.json(err) 
// 		} 
// 		console.log(row) 
// 		res.json(row)
// 	}) 

// }


// app.get('/', function(req, res){
// 	selectFromPost(req, res)
// }) 



// app.post('/user', function(req, res){
// 	username = req.query['username']
// 	password = req.query['password']
// 	firstName = null //req.query['firstName']
// 	lastName = null //req.query['lastName']
// 	email = null //req.query['email']
// 	dob = null //new Date(req.query['dob'])
// 	numFollow = 0 //0 

// 	insertUserTable(username, password, firstName, lastName, email, dob, numFollow)

// 	// db.get("SELECT * FROM userTable WHERE username=" + username + "", function(err, row){
// 	// 	if(err){
// 	// 		res.json(err) 
// 	// 	} 
// 	// 	console.log(row) 
// 	// 	res.json(row)
// 	// }) 
	
// })

	
app.listen(3000, () => console.log('Example app listening on port 3000!')) 

