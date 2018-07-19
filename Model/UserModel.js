const AbstractModel = require( "./AbstractModel" );
const Users = require('../DbModels').Users;
const msg = require("../messages/errors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

class UserModel extends AbstractModel {
  /**
   * Stub method
   * @param {string} title
   * @param {string} text
   * @returns {Promise}
   */
  async save( email, password, fullname ) {
    var user = await Promise.resolve(Users.findOne({
      where: {
        email: email
      }
    }));
    if(user){      
      return await Promise.reject({message: msg.USER_ALREAY_EXISTS});
    } else {
      var hashedPassword = await Promise.resolve(bcrypt.hash(password, 10));
      if(hashedPassword){
        var created = await Promise.resolve(Users.create({            
          fullName: fullname,
          email: email,
          password: hashedPassword,
          isVerified: true
        }));
        if(created){
          //mail will be sent to the user for verification
          // sendMail(user.id, user.email);
          console.log(created);
          return await Promise.resolve(created);
        } else {
          return await Promise.reject({message: msg.USER_CREATION_ERROR});
        }
      }

    }      
  }  

  /**
   * Stub method
   * @param {number} id
   * @returns {Promise}
   */
  async get( id ) {
    return await Promise.resolve( `Content of new entry ${id}` );
  }

  /**
   * Stub method
   * @param {string} email
   * @param {string} password
   * @returns {Promise}
   */
  async authenticate( email, password ) {
    // if(email=="admin" && password=="admin"){
    //   return await Promise.resolve({"auth_token": "d80asdu0ajd0dja"});
    // } else{
    //   return await Promise.reject({"auth_token": "d80asdu0ajd0dja"});
    // }
    var user = await Promise.resolve(Users.findOne({
      where: {
        email: email
      }
    }));    
    if (!user) {      
      return await Promise.reject({
        message: msg.INVALID_USER
      });      
    } else {
      var passwordCompare = await Promise.resolve(bcrypt.compare(password, user.password));
      console.log(user);
      if (passwordCompare) {
        const token = jwt.sign({
            email: user.email,
            fullName: user.fullName,
            pictureUrl: user.pictureUrl,
            contactNo: user.contactNo,
            bio: user.bio,
            aboutMe: user.aboutMe,
            roleId: user.roleId
          },
          process.env.TOKEN_SECRET_KEY
        );        
        return await Promise.resolve({
          token: token
        });          
      } else {        
        return await Promise.reject({
          message: msg.INVALID_PASSWORD
        });          
      }
    }    
  }
}

module.exports = UserModel;