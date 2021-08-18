import type { EmojiIdentifierResolvable } from "discord.js";
import { Button as Btn } from "../../structures/Button";
export interface IButtonMeta {
    description?: string;
    style: "PRIMARY" | "SECONDARY" | "SUCCESS" | "DANGER" | "LINK";
    disabled?: boolean;
    emoji?: EmojiIdentifierResolvable;
    label?: string;
}
export interface Button extends Btn {
    before: Function;
    execute: Function;
}
