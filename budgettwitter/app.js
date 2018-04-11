#!/usr/bin/env node
const express = require('express') 
const sqlite3 = require('sqlite3').verbose() 
var db = new sqlite3.Database('twitter.db') 
const app = express() 

db.run("CREATE TABLE IF NOT EXISTS userTable (username TEXT PRIMARY KEY, password TEXT, first_name TEXT, last_name TEXT, email TEXT, birthday INT, FollowerNum INT, bio TEXT, image TEXT);") 
db.run("CREATE TABLE IF NOT EXISTS postTable (\n" + "postID INTEGER PRIMARY KEY AUTOINCREMENT,\n" + "username TEXT,\n" + "postData TEXT,\n" + "postTime INT,\n" + "likeNum INT\n" + ");") 


root_dir = "C:/Users/Bean/IdeaProjects/jankytwitter/budgettwitter/frontend/app/"

app.get('/', function(req, res){
	res.sendFile(root_dir + "index.html"); 
})

app.get('/dashboard.html', function(req, res){
	res.sendFile(root_dir + 'dashboard.html')
})

app.get('/signin.html', function(req, res){
	res.sendFile(root_dir + "signin.html"); 
})

app.get('/signup.html', function(req, res){
	res.sendFile(root_dir + "signup.html");
})

app.get('/profile', function(req, res){
	console.log(req.query)
	username = req.query['username']

	db.get("SELECT * FROM userTable WHERE username='" + username + "';", function(err, row){
		if(err){
			res.json(err)
			return
		}
		console.log(row)
		res.json(row)
	})
})

app.get('/getUserPosts', function(req, res){
	username = req.query['username']
	db.get("SELECT COUNT(*) AS num FROM userTable WHERE username='" + username + "';", function(err, row){
		if(err){
			res.json(err) 
			return 
		}
		console.log(row); 

		if(row.num > 0){
			db.all("SELECT * FROM postTable WHERE username='" + username + "';", function(err, posts){
				if(err){
					res.json(err)
					return
				}
				res.json(posts)
				console.log(posts)
			})
		}
	})
})

app.get('/tweet', function(req, res){
	postData = req.query['postData']
	username = req.query['username']
	postTime = new Date()
	likeNum = 0

	db.get("SELECT COUNT(*) AS num FROM userTable WHERE username='" + username + "';", function(err, row){
		if(err){
			res.json(err) 
			return 
		}
		console.log(row); 

		if(row.num > 0){
			db.run("INSERT INTO postTable(username, postData, postTime, likeNum) VALUES (?,?,?,?);", [username, postData, postTime, likeNum], function(err){
				if(err){
					res.json(err) 
					return
				}
				db.all("SELECT * FROM postTable WHERE username='" + username + "';", function(err, posts){
					if(err){
						res.json(err)
						return
					}
					res.json(posts)
					console.log(posts)
				})
			})
		}
	})
})


app.get('/register', function(req, res){

	username = req.query['username']
	password = req.query['password']
	first_name ="" //req.query['firstName']
	last_name = ""  //req.query['lastName']
	email = ""  //req.query['email']
	birthday = new Date() //new Date(req.query['dob'])
	FollowerNum = 0 //0 
	bio = "Default bio" 
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
			res.json({success: true}); 
			console.log(username +":" + password) 
		}) 
	})
}) 
	
app.listen(3000, 'localhost',  () => console.log('Example app listening on port 3000!')) 

