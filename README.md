This solo mini project was created on a REACT framework, and was aimed towards cloning of instagram frontend, and some of its backend. 


DATABASE DETAILS:

mySQL database
#--------------------------------------------------------------------#

login info:
CREATE TABLE login_info(
    username VARCHAR(16),
    password VARCHAR(20),
    PRIMARY KEY(username)
);

#--------------------------------------------------------------------#

post_info:
CREATE TABLE post_info(
    post_id INT AUTO_INCREMENT,
    picture_url VARCHAR(1000),
    caption VARCHAR(2200),
    likes INT,
    user_id VARCHAR(20)
    prof_pic VARCHAR(1000)
    created_at TIMESTAMP
    PRIMARY KEY (post_id)
);

#---------------------------------------------------------------------#

comment_info:
CREATE TABLE comments(
    comment_id INT AUTO_INCREMENT,
    post_id INT,
    user_id VARCHAR(16),
    comment_text VARCHAR(2200),
    comment_date DATE,
    PRIMARY KEY(comment_id),
    FOREIGN KEY (post_id) REFERENCES post_info(post_id) ON DELETE CASCADE
);

#------------------------------------------------------------------------#
