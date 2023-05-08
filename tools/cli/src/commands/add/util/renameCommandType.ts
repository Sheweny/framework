export function renameCommandType(type: string): "SLASH_COMMAND" | "CONTEXT_MENU_USER" | "CONTEXT_MENU_MESSAGE" | "MESSAGE_COMMAND" | null {
  if (type === "Slash Command") return "SLASH_COMMAND";
  if (type === "Message Command") return "MESSAGE_COMMAND";
  if (type === "Context Menu User") return "CONTEXT_MENU_USER";
  if (type === "Context Menu Message") return "CONTEXT_MENU_MESSAGE";
  return null;
}
