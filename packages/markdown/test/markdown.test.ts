import { describe, test, expect } from 'vitest';

import { MarkdownBuild, MarkdownParser, MarkdownEscaper } from '../src';

describe('Markdown', () => {
  test('build', () => {
    expect(MarkdownBuild.bold('Bold build')).toBe('**Bold build**');
    expect(MarkdownBuild.italic('Italic build')).toBe('*Italic build*');
    expect(MarkdownBuild.underline('Underline build')).toBe('__Underline build__');
    expect(MarkdownBuild.quote('Quote build')).toBe('> Quote build');
    expect(MarkdownBuild.quoteBlock('Quoteblock build')).toBe('>>> Quoteblock build');
    expect(MarkdownBuild.code('Code build')).toBe('`Code build`');
    expect(MarkdownBuild.codeBlock('Codeblock build', 'js')).toBe('```js\nCodeblock build\n```');
    expect(MarkdownBuild.spoiler('Spoiler build')).toBe('||Spoiler build||');
    expect(MarkdownBuild.strikethrough('Strikethrough build')).toBe('~~Strikethrough build~~');
  });

  test('escape', () => {
    expect(MarkdownEscaper.bold('**Bold escaped**')).toBe('\\*\\*Bold escaped\\*\\*');
    expect(MarkdownEscaper.italic('*Italic escaped*')).toBe('\\*Italic escaped\\*');
    expect(MarkdownEscaper.underline('__Underline escaped__')).toBe('\\_\\_Underline escaped\\_\\_');
    expect(MarkdownEscaper.quote('> Quote escaped')).toBe('\\> Quote escaped');
    expect(MarkdownEscaper.quoteBlock('>>> Quoteblock escaped')).toBe('\\>\\>\\> Quoteblock escaped');
    expect(MarkdownEscaper.code('`Code escaped`')).toBe('\\`Code escaped\\`');
    expect(MarkdownEscaper.codeBlock('```Codeblock escaped```')).toBe('\\`\\`\\`Codeblock escaped\\`\\`\\`');
    expect(MarkdownEscaper.spoiler('||Spoiler escaped||')).toBe('\\|\\|Spoiler escaped\\|\\|');
    expect(MarkdownEscaper.strikethrough('~~Strikethrough escaped~~')).toBe('\\~\\~Strikethrough escaped\\~\\~');
  });

  test('parse (user, emoji, role, channel)', () => {
    expect(MarkdownParser.emoji('<:emoji:0000000000000>')).toEqual([{ id: '0000000000000', string: '<:emoji:0000000000000>' }]);
    expect(MarkdownParser.role('<@&0000000000000>')).toEqual([{ id: '0000000000000', string: '<@&0000000000000>' }]);
    expect(MarkdownParser.channel('<#0000000000000>')).toEqual([{ id: '0000000000000', string: '<#0000000000000>' }]);
    expect(MarkdownParser.userNickname('<@!0000000000000>')).toEqual([{ id: '0000000000000', string: '<@!0000000000000>' }]);
  });
});
