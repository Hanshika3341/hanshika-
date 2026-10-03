import fs from 'node:fs'
import path from 'node:path'

// Exposes web-ready files in public/projects/<slug>/ as
// `virtual:project-photos`. Create a folder that matches a project's slug,
// then drop photos into it; no source files are created during dev or build.

const VIRTUAL_ID = 'virtual:project-photos'
const RESOLVED_ID = '\0' + VIRTUAL_ID
const IMAGE_EXT = /\.(jpe?g|png|gif|webp|avif|svg)$/i

export default function projectPhotos() {
  let contentFile
  let photosDir

  const readSlugs = () => {
    const { projects = [] } = JSON.parse(fs.readFileSync(contentFile, 'utf8'))
    return projects.map((project) => project.slug).filter(Boolean)
  }

  // a photo the browser can't display (.heic off an iPhone, a camera raw) is
  // easy to miss otherwise: it just never shows up on the site
  const warnSkipped = (slug, files) => {
    const skipped = files.filter(
      (file) => !IMAGE_EXT.test(file) && !file.startsWith('.'),
    )
    if (skipped.length) {
      console.warn(
        `[project-photos] ${slug}: skipped ${skipped.join(', ')} — not a web image format (convert to jpg/png/webp)`,
      )
    }
  }

  const collectPhotos = () =>
    Object.fromEntries(
      readSlugs().map((slug) => {
        const dir = path.join(photosDir, slug)
        const all = fs.existsSync(dir) ? fs.readdirSync(dir) : []
        warnSkipped(slug, all)
        const files = all
          .filter((file) => IMAGE_EXT.test(file))
          .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }))
        return [slug, files.map((file) => `/projects/${slug}/${file}`)]
      }),
    )

  return {
    name: 'project-photos',

    configResolved(config) {
      contentFile = path.resolve(config.root, 'src/content/content.json')
      photosDir = path.resolve(config.publicDir, 'projects')
    },

    resolveId(id) {
      if (id === VIRTUAL_ID) return RESOLVED_ID
    },

    load(id) {
      if (id === RESOLVED_ID) {
        return `export default ${JSON.stringify(collectPhotos())}`
      }
    },

    configureServer(server) {
      const refresh = (file) => {
        const isContent = file === contentFile
        const isPhoto = file.startsWith(photosDir + path.sep) && IMAGE_EXT.test(file)
        if (!isContent && !isPhoto) return

        const mod = server.moduleGraph.getModuleById(RESOLVED_ID)
        if (mod) server.moduleGraph.invalidateModule(mod)
        server.ws.send({ type: 'full-reload' })
      }

      server.watcher.add(photosDir)
      server.watcher.on('add', refresh)
      server.watcher.on('unlink', refresh)
      server.watcher.on('change', refresh)
    },
  }
}
