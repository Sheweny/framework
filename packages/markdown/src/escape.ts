class MarkdownEscaper {

	static bold(text: string) {
		let i = 0;
		return text.replace(/\*\*(\*)?/g, (_, match) => {
			if (match) return ++i % 2 ? `${match}\\*\\*` : `\\*\\*${match}`;
			return '\\*\\*';
		});
	}
	static italic(text: string) {
		let i = 0;
		text = text.replace(/(?<=^|[^*])\*([^*]|\*\*|$)/g, (_, match) => {
			if (match === '**') return ++i % 2 ? `\\*${match}` : `${match}\\*`;
			return `\\*${match}`;
		});
		i = 0;
		return text.replace(/(?<=^|[^_])_([^_]|__|$)/g, (_, match) => {
			if (match === '__') return ++i % 2 ? `\\_${match}` : `${match}\\_`;
			return `\\_${match}`;
		});
	}
	static underline(text: string) {
		let i = 0;
		return text.replace(/__(_)?/g, (_, match) => {
			if (match) return ++i % 2 ? `${match}\\_\\_` : `\\_\\_${match}`;
			return '\\_\\_';
		});
	}

	static spoiler(text: string) {
		return text.replace(/\|\|/g, '\\|\\|');
	}
	static codeBlock(text: string) {
		return text.replace(/```/g, '\\`\\`\\`');
	}
	static inlineCode(text: string) {
		return text.replace(/(?<=^|[^`])`(?=[^`]|$)/g, '\\`');
	}
	static strikethrough(text: string) {
		return text.replace(/~~/g, '\\~\\~');
	}
}

export { MarkdownEscaper };