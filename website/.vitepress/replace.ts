export default function boldify(md) {
  md.core.ruler.before('inline', 'find-and-replace', state => {
    const tokens = state.tokens;
    for (const token of tokens) {
      if (token.type === 'inline') {
        if (token.type === 'inline') {
          token.content = token.content.replace(
            /\[String\]/g,
            '[String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)',
          );
          token.content = token.content.replace(
            /\[Number\]/g,
            '[Number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)',
          );
          token.content = token.content.replace(
            /\[Boolean\]/g,
            '[Boolean](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean)',
          );
          token.content = token.content.replace(
            /\[Array\]/g,
            '[Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)',
          );
          token.content = token.content.replace(
            /\[Object\]/g,
            '[Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)',
          );
          token.content = token.content.replace(
            /\[Function\]/g,
            '[Function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function)',
          );
          token.content = token.content.replace(
            /\[Promise\]/g,
            '[Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)',
          );
          token.content = token.content.replace(
            /\[BigInt\]/g,
            '[BigInt](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/BigInt)',
          );
          token.content = token.content.replace(
            /\[Symbol\]/g,
            '[Symbol](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol)',
          );
          token.content = token.content.replace(
            /\[Map\]/g,
            '[Map](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map)',
          );
          token.content = token.content.replace(
            /\[Set\]/g,
            '[Set](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set)',
          );
          //Null
          token.content = token.content.replace(
            /\[Null\]/g,
            '[Null](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/null)',
          );
          // RegExp
          token.content = token.content.replace(
            /\[RegExp\]/g,
            '[RegExp](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp)',
          );
          // Number
        }
      }
    }
  });
}
