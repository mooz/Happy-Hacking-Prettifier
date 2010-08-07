/**
 * @fileOverview
 * @name prettifier.js
 * @author mooz <stillpedant@gmail.com>
 * @license The MIT Lipcense
 * @requires tokenizer.js
 */

// ============================================================ //
// Prettifier
// ============================================================ //

var Prettifier = {};

Prettifier.TOKEN2CLASS = {
    Blank             : "",
    MultiLineComment  : "comment",
    SingleLineComment : "comment",
    Reserved          : "reserved",
    RegExp            : "regexp",
    Identifier        : "identifier",
    IdentifierSpecial : "identifier-special",
    Integer           : "number",
    Float             : "number",
    String            : "string",
    Punctuator        : ""
};

Prettifier.tokenizeString = function tokenizeString(str) {
    var tokenizer = new Tokenizer(str);

    while (tokenizer.hasNext)
        tokenizer.next();

    return tokenizer.tokens;
};

Prettifier.createSpan = function createSpan(textNode, klass, name) {
    var span = document.createElement("span");
    span.setAttribute("class", klass);
    span.setAttribute("title", name || klass);
    span.appendChild(textNode);

    return span;
};

Prettifier.nodeFromToken = function nodeFromToken(token) {
    var textNode = document.createTextNode(token.str);
    var klass    = Prettifier.TOKEN2CLASS[token.type];

    return klass ? Prettifier.createSpan(textNode, klass, token.type) : textNode;
};

Prettifier.prettify = function prettify(text) {
    var fragment = document.createDocumentFragment();

    var tokens = Prettifier.tokenizeString(text);

    for (var i = 0; i < tokens.length; ++i) {
        var token = tokens[i];
        fragment.appendChild(Prettifier.nodeFromToken(token));
    }

    return fragment;
};
