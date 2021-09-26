# prune-sourcemaps

Recursively deletes sourcemap files and sourcemap comments under a directory

## Usage

```bash
npx prune-sourcemaps <directory>
```

## Install for programmatic use

```bash
pnpm add prune-sourcemaps
```

```ts
import { pruneSourcemaps } from 'prune-sourcemaps'

const pruned /* : Set<string> */ = await pruneSourcemaps('/path/to/directory')
```
