# Website APIs

This is a `kcnt` website public APIs. You will find more information at https://apis.kcnt.info.

## Technical information

I use [Netlify function](https://www.netlify.com/docs/functions/) which base on [AWS lambda](https://aws.amazon.com/lambda). I also use [@octokit/rest](http://octokit.github.io/rest.js) to query data from Github APIs (only in collection APIs). You might need to have Github token in order to query a information on collection APIs. And about generating apidoc, I use [apidoc](http://apidocjs.com) format to easier generate document website for this APIs.

## License

`MIT`
