export default () => {
  return [
    `import { Event } from "sheweny";
import type { ShewenyClient } from "sheweny";

export class ReadyEvent extends Event {
  constructor(client: ShewenyClient) {
    super(client, "ready", {
      description: "Client is logged in",
      once: true,
    });
  }

  execute() {
    console.log(\`\${this.client.user!.tag} is logged in\`)
  }
};
`,
    "ready.ts",
  ];
};
