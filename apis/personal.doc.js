/**
 * @apiDefine Parameters
 *
 * @apiParam {string=net,prang} [user="net"] username to query
 * @apiParam {string=master,dev} [branch="master"] branch to query data
 * @apiParam {string=information,social} [type="information"] type of the dataset
 *
 */

/**
 * @apiDefine SuccessText
 *
 * @apiSuccess {Object} response This result of personal information, you will find the schema at https://github.com/kcnt-info/website on static folder, and personal information section in json file
 */

/**
 * @api {get} /personal/:user/:type Personal Information
 * @apiDescription This will fetch personal data with custom type. `NOTE: you can query with /:type/:user too`.
 * You can omit :user and :type, with this way it will query default value of each param
 *
 * @apiName GetPersonal
 * @apiGroup Personal
 *
 * @apiUse Parameters
 *
 * @apiExample {curl} Example with path:
 *     curl -i /personal/net/information
 * @apiExample {curl} Example with parameter:
 *     curl -i /personal?user=net&type=information
 * @apiExample {curl} Example with mix:
 *     curl -i /personal/net?type=information
 *
 * @apiUse SuccessText
 * @apiSuccessExample Information query example:
 *    HTTP/1.1 200 OK
 *    {
 *      "abbreviation":"kc",
 *      "picture":"/resources/images/base0137-small.jpg",
 *      "name":{
 *        "firstName":"Kamontat",
 *        "lastName":"Chantrachirathumrong"
 *      },
 *      "nickname":"net",
 *      "email":"kamontat_c@hotmail.com",
 *      "birthday":"08-Nov-1996",
 *      "location":{
 *        "address":"8/32 Soi Phahon Yothin 34 Yaek 2",
 *        "city":"Chatuchak",
 *        "postalCode":"10900",
 *        "country":"Thailand"
 *      },
 *      "phone":"0851811177"
 *    }
 * @apiSuccessExample Social query example:
 *    HTTP/1.1 200 OK
 *    {
 *      "facebook":"kamontatc",
 *      "twitter":"kamontatc",
 *      "linkedin":"kamontat",
 *      "github":"kamontat",
 *      "website":"https://kcnt.info"
 *    }
 */
