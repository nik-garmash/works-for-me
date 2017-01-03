const {
  WORD_LEXEME,
  TOOL_TITLE_CONTEXT,
  TOOL_LINK_CONTEXT
} = require('../../../lib/constants');

module.exports = [
  {
    type: TOOL_TITLE_CONTEXT,
    content: [
      { type: WORD_LEXEME, content: 'some' },
      { type: WORD_LEXEME, content: 'awesome' },
      { type: WORD_LEXEME, content: 'tool' }
    ]
  },
  {
    type: TOOL_LINK_CONTEXT,
    content: [
      { type: WORD_LEXEME, content: 'https://link.to/awesomeness' }
    ]
  }
];