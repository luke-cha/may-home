import { readdir, writeFile, mkdir } from 'node:fs/promises'
import path from 'node:path'

const root = path.resolve('contents')
const output = path.resolve('src/data/content-manifest.json')
const media = new Set(['.jpg', '.jpeg', '.png', '.webp', '.mp4', '.mov'])
const ignored = new Set(['.DS_Store', 'Thumbs.db'])

async function walk(directory) {
  const entries = await readdir(directory, { withFileTypes: true })
  const result = []
  for (const entry of entries.sort((a, b) => a.name.localeCompare(b.name, 'ko'))) {
    if (ignored.has(entry.name) || entry.name.includes('_ADMIN_')) continue
    const absolute = path.join(directory, entry.name)
    if (entry.isDirectory()) result.push(...await walk(absolute))
    else if (media.has(path.extname(entry.name).toLowerCase())) {
      result.push(path.relative(root, absolute).split(path.sep).join('/'))
    }
  }
  return result
}

const files = await walk(root)
await mkdir(path.dirname(output), { recursive: true })
await writeFile(output, JSON.stringify({ generatedAt: new Date().toISOString(), files }, null, 2) + '\n')
console.log(`Generated ${path.relative(process.cwd(), output)} with ${files.length} media files`)
