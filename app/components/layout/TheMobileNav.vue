<script setup lang="ts">
interface Props {
  activeSectionId: string
}

const { activeSectionId } = defineProps<Props>()

/**
 * A native `<dialog>` opened with `showModal()` gives focus trapping, an
 * inert background and Escape-to-close from the platform, and returns focus to
 * the trigger on close. Hand-rolling all four is how focus traps get shipped
 * broken.
 */
const dialog = ref<HTMLDialogElement | null>(null)
const isOpen = ref(false)

function open() {
  dialog.value?.showModal()
  isOpen.value = true
}

function close() {
  dialog.value?.close()
}
</script>

<template>
  <div>
    <button
      type="button"
      class="flex size-11 items-center justify-center rounded-sm text-ink-muted transition-colors duration-(--duration-fast) hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
      aria-label="Open navigation"
      :aria-expanded="isOpen"
      @click="open"
    >
      <Icon
        name="lucide:menu"
        class="size-5"
        aria-hidden="true"
      />
    </button>

    <dialog
      ref="dialog"
      aria-label="Sections"
      class="m-0 size-full max-h-none max-w-none bg-ground text-ink backdrop:bg-ground"
      @close="isOpen = false"
    >
      <div class="flex h-full flex-col">
        <div class="flex h-16 shrink-0 items-center justify-between px-6">
          <span class="font-mono text-sm text-ink-subtle">~/mathijs</span>
          <button
            type="button"
            class="flex size-11 items-center justify-center rounded-sm text-ink-muted transition-colors duration-(--duration-fast) hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
            aria-label="Close navigation"
            @click="close"
          >
            <Icon
              name="lucide:x"
              class="size-5"
              aria-hidden="true"
            />
          </button>
        </div>

        <nav class="flex-1 overflow-y-auto px-6 py-8">
          <ul class="flex flex-col gap-2">
            <li
              v-for="section in siteSections"
              :key="section.id"
            >
              <a
                :href="`#${section.id}`"
                :aria-current="activeSectionId === section.id ? 'true' : undefined"
                class="block rounded-sm py-3 font-mono text-2xl transition-colors duration-(--duration-fast) focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
                :class="activeSectionId === section.id ? 'text-accent' : 'text-ink'"
                @click="close"
              >
                {{ section.label }}
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </dialog>
  </div>
</template>
