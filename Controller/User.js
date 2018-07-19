const AbstractController = require( "./AbstractController" ),
      InvalidArgumentException = require( "../Exception/InvalidArgument" );
      

/**
 * @apiDefine Authentications endpoints
 */

class User extends AbstractController {

  /**
   *
   * @param {AbstractModel} model
   */
  constructor( model ) {
    super();
    this.model = model;
  }

  /**
   *
   * @api {post} /register Add a login entry
   * @apiVersion 0.0.1
   * @apiName Sign up new User
   * @apiGroup AuthGroup
   *
   * @apiParam {string} email
   * @apiParam {string} password
   * @apiParam {string} fullname   
   *
   * @apiExample Example usage:
   * curl -X POST http://127.0.0.1:9002/login \
   *   -H 'content-type: multipart/form-data' \
   *   -F 'email=some email address' \
   *   -F 'password=some password' \
   *   -F 'fullname=some full name'
   *
   * @apiError InvalidArgument  Required parameters missing
   * @apiError NotFound   The login entry was not found.
   *
   * @apiErrorExample Response (example):
   *     HTTP/1.1 400 Not Found
   *     {
   *       "message": "Required parameters email address, password and fullname are missing or empty"
   *     }
   *
   **/

  /**
   * Add a Login entry
   * @param {IncomingMessage} req
   * @param {ServerResponse} res
   * @param {function} [next]
   */
  async postEntryAction(req, res) {
    const { email, password, fullname } = req.body;    
    if ( !email || !password || !fullname ) {
      throw new InvalidArgumentException( "Required parameters email address, password and fullname are missing or empty" );
    }
    try {
      var json = await this.model.save(email, password, fullname);
      return res.json(json);    
    } catch (error){
      return res.status(401).json(error);    
    }
  }
}

module.exports = User;