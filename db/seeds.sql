use mosh_db;
-- WARNING THIS IS ONLY FOR AN EMPTY DATABASE, PLEASE UPDATE ID VALUES WHERE APPROPRIATE
-- 5 users
INSERT INTO users (id, email, password, zipcode, firstName, lastName, bio, createdAt, updatedAt)
VALUES (null, "cp@gmail.com", "mosh", 98103, "Chris","P", "Live Your Life", NOW(), NOW());
INSERT INTO users (id, email, password, zipcode, firstName, lastName, bio, createdAt, updatedAt)
VALUES (null, "cp2@gmail.com", "mosh", 98103, "Cris", "G", "Have Fun", NOW(), NOW());
INSERT INTO users (id, email, password, zipcode, firstName, lastName, bio, createdAt, updatedAt) 
VALUES (null, "cp3@gmail.com", "mosh", 98103, "Kris", "H", "Be Free", NOW(), NOW());
INSERT INTO users (id, email, password, zipcode, firstName, lastName, bio, createdAt, updatedAt) 
VALUES (null, "cp5@gmail.com", "mosh", 98103, "Kris", "H", "Do Drugs", NOW(), NOW());
INSERT INTO users (id, email, password, zipcode, firstName, lastName, bio, createdAt, updatedAt)
	VALUES (null, "cp4@gmail.com", "mosh", 98103, "Kriss", "T", "Jam on!", NOW(), NOW());
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