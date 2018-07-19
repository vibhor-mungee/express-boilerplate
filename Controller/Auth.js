const AbstractController = require( "./AbstractController" ),
      InvalidArgumentException = require( "../Exception/InvalidArgument" );
      

/**
 * @apiDefine Authentications endpoints
 */

class Auth extends AbstractController {

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
   * @api {post} /login Add a login entry
   * @apiVersion 0.0.1
   * @apiName Login User
   * @apiGroup AuthGroup
   *
   * @apiParam {string} email
   * @apiParam {string} password
   *
   * @apiExample Example usage:
   * curl -X POST http://127.0.0.1:9002/login \
   *   -H 'content-type: multipart/form-data' \
   *   -F 'email=some email address' \
   *   -F 'password=some password'
   *
   * @apiError InvalidArgument  Required parameters missing
   * @apiError NotFound   The login entry was not found.
   *
   * @apiErrorExample Response (example):
   *     HTTP/1.1 400 Not Found
   *     {
   *       "message": "Required parameters title and text are missing or empty"
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
    const { email, password } = req.body;    
    if ( !email || !password ) {
      throw new InvalidArgumentException( "Required parameters email and password are missing or empty" );
    }
    try {
      var json = await this.model.authenticate(email, password);
      return res.json(json);    
    } catch (error){
      return res.status(201).json(error);    
    }
  }
}

module.exports = Auth;