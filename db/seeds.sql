use mosh_db;
-- WARNING THIS IS ONLY FOR AN EMPTY DATABASE, PLEASE UPDATE ID VALUES WHERE APPROPRIATE
-- 5 users
INSERT INTO users (id, email, password, zipcode, firstName, lastName, bio, createdAt, updatedAt)
	VALUES (null, "cp@gmail.com", "mosh", 98103, "Chris","P", "Live Your Life", NOW(), NOW());
INSERT INTO basicinfos (id, imageUrl, createdAt, updatedAt, UserId)
	VALUES (null, "https://www.fillmurray.com/600/750", NOW(), NOW(), 1);
INSERT INTO users (id, email, password, zipcode, firstName, lastName, bio, createdAt, updatedAt)
	VALUES (null, "cp2@gmail.com", "mosh", 98103, "Cris", "G", "Have Fun", NOW(), NOW());
INSERT INTO basicinfos (id, imageUrl, createdAt, updatedAt, UserId)
	VALUES (null, "https://www.fillmurray.com/600/600", NOW(), NOW(), 2);
INSERT INTO users (id, email, password, zipcode, firstName, lastName, bio, createdAt, updatedAt) 
	VALUES (null, "cp3@gmail.com", "mosh", 98103, "Kris", "H", "Be Free", NOW(), NOW());
INSERT INTO basicinfos (id, imageUrl, createdAt, updatedAt, UserId)
	VALUES (null, "https://www.fillmurray.com/600/850", NOW(), NOW(), 3);
INSERT INTO users (id, email, password, zipcode, firstName, lastName, bio, createdAt, updatedAt) 
	VALUES (null, "cp5@gmail.com", "mosh", 98103, "Kris", "H", "Do Drugs", NOW(), NOW());
INSERT INTO basicinfos (id, imageUrl, createdAt, updatedAt, UserId)
	VALUES (null, "https://www.fillmurray.com/800/750", NOW(), NOW(), 4);
INSERT INTO users (id, email, password, zipcode, firstName, lastName, bio, createdAt, updatedAt)
	VALUES (null, "cp4@gmail.com", "mosh", 98103, "Kriss", "T", "Jam on!", NOW(), NOW());
INSERT INTO basicinfos (id, imageUrl, createdAt, updatedAt, UserId)
	VALUES (null, "https://www.fillmurray.com/600/750", NOW(), NOW(), 5);
INSERT INTO users (id, email, password, zipcode, firstName, lastName, bio, createdAt, updatedAt)
	VALUES (null, "cp7@gmail.com", "mosh", 98103, "Dude", "T.", "Noggin'!", NOW(), NOW());
INSERT INTO basicinfos (id, imageUrl, createdAt, updatedAt, UserId)
	VALUES (null, "https://vignette.wikia.nocookie.net/disney/images/1/19/Profile_-_Crush.jpg/revision/latest?cb=20190715074853", NOW(), NOW(), 6);
INSERT INTO users (id, email, password, zipcode, firstName, lastName, bio, createdAt, updatedAt)
	VALUES (null, "cp6@gmail.com", "mosh", 98103, "Krush", "T.", "Noggin'!", NOW(), NOW());
INSERT INTO basicinfos (id, imageUrl, createdAt, updatedAt, UserId)
	VALUES (null, "https://images-na.ssl-images-amazon.com/images/I/51OEDO2i8JL._SL500_AC_SS350_.jpg", NOW(), NOW(), 7);
    
-- WARNING THIS IS ONLY FOR AN EMPTY DATABASE, PLEASE UPDATE ID VALUES WHERE APPROPRIATE
INSERT INTO swipes (id, swiperId, swipeeId, liked, createdAt, updatedAt) VALUES (null, 1, 3, true, NOW(), NOW());
-- WARNING THIS IS ONLY FOR AN EMPTY DATABASE, PLEASE UPDATE ID VALUES WHERE APPROPRIATE
INSERT INTO swipes (id, swiperId, swipeeId, liked, createdAt, updatedAt) VALUES (null, 3, 1, true, NOW(), NOW());
-- WARNING THIS IS ONLY FOR AN EMPTY DATABASE, PLEASE UPDATE ID VALUES WHERE APPROPRIATE
INSERT INTO swipes (id, swiperId, swipeeId, liked, createdAt, updatedAt) VALUES (null, 1, 2, true, NOW(), NOW());
-- WARNING THIS IS ONLY FOR AN EMPTY DATABASE, PLEASE UPDATE ID VALUES WHERE APPROPRIATE
INSERT INTO swipes (id, swiperId, swipeeId, liked, createdAt, updatedAt) VALUES (null, 2, 1, true, NOW(), NOW());
-- WARNING THIS IS ONLY FOR AN EMPTY DATABASE, PLEASE UPDATE ID VALUES WHERE APPROPRIATE
INSERT INTO swipes (id, swiperId, swipeeId, liked, createdAt, updatedAt) VALUES (null, 4, 1, true, NOW(), NOW());
-- WARNING THIS IS ONLY FOR AN EMPTY DATABASE, PLEASE UPDATE ID VALUES WHERE APPROPRIATE
-- INSERT INTO swipes (id, swiperId, swipeeId, liked, createdAt, updatedAt) VALUES (null, 1, 4, false, NOW(), NOW());
-- WARNING THIS IS ONLY FOR AN EMPTY DATABASE, PLEASE UPDATE ID VALUES WHERE APPROPRIATE

-- SELECT * FROM users JOIN swipes ON swipes.swiperId = users.Id;

-- SELECT * FROM swipes;


-- SELECT Users.Id, Users.email, Users.firstName, Users.lastName, b.ImageUrl
--                 FROM Users
--                 LEFT JOIN Basicinfos b ON b.UserId = Users.id
--                 WHERE Users.Id != 1
--                 AND Users.Id NOT IN (SELECT swipes.swipeeId FROM swipes WHERE swipes.swiperId = 1);