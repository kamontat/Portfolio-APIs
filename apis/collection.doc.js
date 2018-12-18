/**
 * @apiDefine CollectionParameters
 *
 * @apiParam {string=net,prang} [user="net"] username to query
 * @apiParam {string=master,dev} [branch="master"] branch to query data
 * @apiParam {string=educations,interests,languages,projects,references,skills,volunteers,works} [type="projects"] type of the dataset
 *
 */

/**
 * @apiDefine Headers
 *
 * @apiHeader {String} [authorization] Authorization value.
 */

/**
 * @apiDefine SuccessText
 *
 * @apiSuccess {Object} response This result of personal information, you will find the schema at https://github.com/kcnt-info/website on static folder, and personal information section in json file
 */

/**
 * @api {get} /collection/:user/:type Collection of information
 * @apiDescription Query the collection of information. be aware this api might take very long if you query to many information
 * `NOTE: :type can be multiple path, see in the example (warn: this may slow)`
 *
 *
 * @apiName GetCollection
 * @apiGroup Collection
 *
 * @apiUse Headers
 * @apiUse CollectionParameters
 *
 * @apiExample {curl} Example with path:
 *     curl -i /collection/net/languages or
 *     curl -i /collection/languages/net
 * @apiExample {curl} Example with parameter:
 *     curl -i /collection?type=projects&user=prang
 * @apiExample {curl} Example with mix:
 *     curl -i /collection/skills?user=prang
 * @apiExample {curl} Example multiple type:
 *     curl -i /collection/skills/projects/languages?user=prang
 *
 * @apiUse SuccessText
 * @apiSuccessExample Example query languages:
 *    HTTP/1.1 200 OK
 *    {
 *      "languages":[
 *        {
 *          "language":"English",
 *          "fluency":3
 *        },
 *        {
 *          "language":"Chinese",
 *          "fluency":2
 *        },
 *        {
 *          "language":"Thai",
 *          "fluency":1
 *        }
 *      ]
 *    }
 * @apiSuccessExample Example general results:
 *    HTTP/1.1 200 OK
 *    {"key": [{"value": "object"}]}
 */
