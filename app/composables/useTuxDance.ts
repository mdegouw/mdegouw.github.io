/**
 * Makes the ASCII penguin in the HTML comment above `<html>` sway.
 *
 * `view-source:` is a static render of the bytes the browser fetched, so the
 * comment can never animate there. The DevTools element inspector shows the
 * live comment *node*, though — rewriting its text is enough to make Tux dance
 * for whoever is actually poking around.
 *
 * Frames are sheared from the art already sitting in the document, so the whole
 * thing costs a few lines of script rather than a second copy of the penguin.
 */

declare global {
  interface Window {
    // Advertised in the comment itself, which puts the hint where its audience
    // already is — and keeps everyone else's console clean.
    tux?: { start: () => void, stop: () => void }
  }
}

const FRAME_MS = 160

// One full sway. Each number is the offset applied to the top row; the feet
// stay put, so the penguin leans rather than sliding across the screen.
const SWAY = [0, 1, 2, 1, 0, -1, -2, -1]

function lean(art: string, offset: number): string {
  const lines = art.split('\n')
  const bottom = lines.length - 1

  return lines
    .map((line, index) => {
      if (!line.trim()) return line

      const shift = Math.round(offset * ((bottom - index) / bottom))
      if (shift >= 0) return ' '.repeat(shift) + line

      // Only ever give back indentation the line can spare, never the art.
      const indent = line.length - line.trimStart().length
      return line.slice(Math.min(-shift, indent))
    })
    .join('\n')
}

function findTuxComment(): Comment | undefined {
  // The comment sits between the doctype and `<html>`, so it is a child of the
  // document itself — not of `<body>`, and not reachable from `document.body`.
  return Array.from(document.childNodes).find(
    (node): node is Comment =>
      node instanceof Comment && node.data.includes('asciiart.website'),
  )
}

export function useTuxDance(): void {
  const reducedMotion = usePreferredReducedMotion()
  const visibility = useDocumentVisibility()

  // What the reader asked for, kept apart from what the environment allows.
  const wanted = shallowRef(true)

  onMounted(() => {
    const comment = findTuxComment()
    if (!comment) return

    // The banner is the art followed by blank-line-separated credits. Only the
    // art moves — the attribution has to stay readable.
    const [art, ...credits] = comment.data.split('\n\n')
    if (!art) return

    const original = comment.data
    const tail = credits.map(part => `\n\n${part}`).join('')
    let frame = 0

    const { pause, resume } = useIntervalFn(
      () => {
        comment.data = lean(art, SWAY[frame % SWAY.length] ?? 0) + tail
        frame += 1
      },
      FRAME_MS,
      { immediate: false },
    )

    window.tux = {
      start: () => { wanted.value = true },
      stop: () => {
        wanted.value = false
        pause()
        comment.data = original
      },
    }

    // Nobody is watching a background tab, and a reader who asked for less
    // motion asked for less of this too.
    const shouldDance = computed(() =>
      wanted.value
      && reducedMotion.value !== 'reduce'
      && visibility.value !== 'hidden',
    )

    // `watch`, not `watchEffect`: `useIntervalFn`'s `resume()` reads its own
    // `isActive` ref, so an effect that called it would track that ref — and
    // then the `pause()` in `stop()` would invalidate the effect, re-run it,
    // and start the dance straight back up. A watch callback does not track.
    watch(shouldDance, (dance) => {
      if (dance) resume()
      else pause()
    }, { immediate: true })
  })
}
