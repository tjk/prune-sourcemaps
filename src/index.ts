import fs from 'fs'
import path from 'path'

export type Pruned = Set<string>

async function visit(dirPath: string, name: string, pruned: Pruned): Promise<void> {
  const curPath = path.join(dirPath, name)
  if ((await fs.promises.stat(curPath)).isDirectory()) {
    await walk(curPath, pruned)
    return
  }
  if (name.endsWith('.map')) {
    await fs.promises.unlink(curPath)
    pruned.add(curPath)
    return
  }
  if (name.endsWith('.js')) {
    const data = await fs.promises.readFile(curPath, 'utf8')
    const newData = data.replace(/\/\/[#@] sourceMappingURL=[^\s]+$/gm, '')
    await fs.promises.writeFile(curPath, newData)
  }
}

async function walk(dirPath: string, pruned: Pruned): Promise<void> {
  const paths = await fs.promises.readdir(dirPath)
  await Promise.all(paths.map(name => visit(dirPath, name, pruned)))
}

// XXX resolve dirPath or just use as is?
export async function pruneSourcemaps(dirPath: string): Promise<Pruned> {
  const pruned = new Set<string>()
  await walk(dirPath, pruned)
  return pruned
}
