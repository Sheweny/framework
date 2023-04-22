
class MarkdownBuild {

	static bold(str: string) {
		return `**${str}**`;
	}
	static italic(str: string) {
		return `*${str}*`;
	}
	static underline(str: string) {
		return `*${str}*`;
	}
	static strikethrough(str: string) {
		return `~~${str}~~`;
	}
	static code(str: string) {
		return `\`${str}\``;
	}
	static codeBlock(str: string, lang: string) {
		return `\`\`\`${lang ? lang : ''}${str}\`\`\``;
	}
	static quote(str: string) {
		return `> ${str}`;
	}
	static quoteBlock(str: string) {
		return `>>> ${str}`;
	}
	static spoiler(str: string) {
		return `||${str}||`;
	}
}

export { MarkdownBuild };