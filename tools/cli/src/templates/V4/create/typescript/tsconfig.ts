export default () => {
  return [
    `{
  "version": "2.4.2",
  "compilerOptions": {
    "lib": ["ES2021"],
    "esModuleInterop": true,
    "emitDecoratorMetadata": true,
    "experimentalDecorators": true,
    "module": "CommonJS",
    "moduleResolution": "Node",
    "noEmitOnError": true,
    "noImplicitAny": true,
    "noUnusedLocals": true,
    "noUnusedParameters": false,
    "outDir": "./dist",
    "removeComments": false,
    "sourceMap": false,
    "strict": true,
    "target": "ES2021",
    "skipLibCheck": false,
    "resolveJsonModule": true
  },
  "include": ["src"],
  "exclude": ["node_modules", "cli-config.ts"]
}
`,
    "tsconfig.json",
  ];
};
