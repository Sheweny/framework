#!/usr/bin/env  node

import("../build/cli.js").then((i) => i.cli(process.argv));
