class MarkdownParser {
	static emoji(text: string): any[] | null {
		if (!text.includes(':')) return null;
		const m = text.match(new RegExp('<a?:([a-z]|_){2,32}:[0-9]{1,20}>', 'gi'));
		if (!m) return null;
		const total: any[] = [];
		if (m && m.length) m.forEach((c) => total.push({ id: c.replace(/^<a?:[a-z]{1,20}:|>$/g, ''), string: c }))
		if (total && total.length) return total;
		return null;
	}
	static channel(text: string): any[] | null {
		if (!text.includes('#') || !text.includes('<') || !text.includes('>')) return null;
		const m = text.match(new RegExp("<#[0-9]{1,20}>", "g"));
		const total: any[] = [];
		if (m && m.length) m.forEach((c) => total.push({ id: c.replace(/^<#|>$/g, ''), string: c }))
		if (total && total.length) return total;
		return null;
	}
	static role(text: string): any[] | null {
		if (!text.includes('&') || !text.includes('<') || !text.includes('>')) return null;
		const m = text.match(new RegExp("<@&[0-9]{1,20}>", "g"));
		const total: any[] = [];
		if (m && m.length) m.forEach((c) => total.push({ id: c.replace(/^<@&|>$/g, ''), string: c }))
		if (total && total.length) return total;
		return null;
	}
	// static guildEmoji(text: string):any[]|null {
	// 	if (!text.includes(':') || !text.includes('<') || !text.includes('>')) return null;
	// 	const m = text.match(new RegExp("<a?:([a-z]|_){2,32}:[0-9]{1,20}>", "gi"));
	// 	const total = [];
	// 	if (m && m.length) m.forEach((c) => total.push({ id: c.replace(/^<a?:([a-z]|_){2,32}:|>$/g, ''), string: c }))
	// }
	static user(text: string): any[] | null {
		if (!text.includes('@') || !text.includes('<') || !text.includes('>')) return null;
		const m = text.match(new RegExp("<@[0-9]{1,20}>", "g"));
		const total: any[] = [];
		if (m && m.length) m.forEach((c) => total.push({ id: c.replace(/^<@|>$/g, ''), string: c }))
		if (total && total.length) return total;
		return null;
	}
	static userNickname(text: string): any[] | null {
		if (!text.includes('@') || !text.includes('!') || !text.includes('<') || !text.includes('>')) return null;
		const m = text.match(new RegExp("<@![0-9]{1,20}>", "g"));
		const total: any[] = [];
		if (m && m.length) m.forEach((c) => total.push({ id: c.replace(/^<@!|>$/g, ''), string: c }))
		if (total && total.length) return total;
		return null;
	}
}

export { MarkdownParser };