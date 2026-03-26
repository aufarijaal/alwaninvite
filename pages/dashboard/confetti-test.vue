<script setup lang="ts">
definePageMeta({
    layout: 'dashboard',
    middleware: 'auth'
})

if (!import.meta.dev) {
    throw createError({ statusCode: 404, statusMessage: 'Not Found' })
}

// ── Emoji confetti via @tsparticles/confetti ──────────────
// Guarded with import.meta.client so it never runs during SSR.
type ConfettiFn = (options: Record<string, unknown>) => Promise<unknown>
let _confetti: ConfettiFn | null = null

const getConfetti = async (): Promise<ConfettiFn> => {
    if (!import.meta.client) throw new Error('client only')
    if (_confetti) return _confetti
    const mod = await import('@tsparticles/confetti')
    _confetti = mod.confetti as ConfettiFn
    return _confetti
}

// flat: true  → disables tilt/wobble/rotation so particles don't spin
// gravity low → float rather than fall fast
const emojiBase = {
    shapes: ['emoji'],
    shapeOptions: {
        emoji: { value: ['🙏', '❤️'] },
    },
    disableForReducedMotion: false,
    scalar: 2,
    flat: true,
}

// 1 ── Basic Burst
const triggerBasic = async () => {
    const confetti = await getConfetti()
    await confetti({
        count: 200,
        spread: 100,
        startVelocity: 65,
        gravity: 0.25,
        decay: 0.93,
        ticks: 300,
        position: { x: 50, y: 60 },
        ...emojiBase,
    })
}

// 2 ── Dual Cannon
const triggerCannon = async () => {
    const confetti = await getConfetti()
    await confetti({
        count: 100,
        angle: 60,
        spread: 60,
        startVelocity: 70,
        gravity: 0.2,
        decay: 0.93,
        ticks: 300,
        position: { x: 0, y: 65 },
        ...emojiBase,
    })
    await confetti({
        count: 100,
        angle: 120,
        spread: 60,
        startVelocity: 70,
        gravity: 0.2,
        decay: 0.93,
        ticks: 300,
        position: { x: 100, y: 65 },
        ...emojiBase,
    })
}

// 3 ── Emoji Rain
const triggerRain = async () => {
    const confetti = await getConfetti()
    let count = 0
    const interval = setInterval(async () => {
        await confetti({
            count: 70,
            spread: 140,
            startVelocity: 15,
            gravity: 0.35,
            decay: 0.96,
            ticks: 350,
            position: { x: Math.random() * 100, y: 0 },
            ...emojiBase,
        })
        count++
        if (count >= 6) clearInterval(interval)
    }, 250)
}

// 4 ── Fireworks
const triggerFireworks = async () => {
    const confetti = await getConfetti()
    const positions = [
        { x: 25, y: 35 },
        { x: 50, y: 20 },
        { x: 75, y: 35 },
    ]
    for (const [i, position] of positions.entries()) {
        setTimeout(async () => {
            await confetti({
                count: 100,
                spread: 360,
                startVelocity: 45,
                gravity: 0,
                decay: 0.95,
                ticks: 350,
                position,
                ...emojiBase,
            })
        }, i * 350)
    }
}

// 5 ── Float Up  (negative gravity = rise upward)
const triggerFloatUp = async () => {
    const confetti = await getConfetti()
    await confetti({
        count: 180,
        angle: 270,
        spread: 90,
        startVelocity: 55,
        gravity: -0.4,
        decay: 0.97,
        drift: 0.5,
        ticks: 400,
        position: { x: 50, y: 100 },
        ...emojiBase,
    })
}

// 6 ── Wave  (left → right sequential)
const triggerWave = async () => {
    const confetti = await getConfetti()
    const steps = 8
    for (let i = 0; i < steps; i++) {
        setTimeout(async () => {
            await confetti({
                count: 40,
                angle: 90,
                spread: 50,
                startVelocity: 60,
                gravity: 0.15,
                decay: 0.95,
                ticks: 350,
                position: { x: (i / (steps - 1)) * 100, y: 70 },
                ...emojiBase,
            })
        }, i * 120)
    }
}

// 7 ── Storm  (rapid random bursts with sideways drift)
const triggerStorm = async () => {
    const confetti = await getConfetti()
    let count = 0
    const interval = setInterval(async () => {
        const side = count % 2 === 0 ? 1 : -1
        await confetti({
            count: 50,
            spread: 80,
            startVelocity: 75,
            gravity: 0.1,
            drift: side * 1.5,
            decay: 0.94,
            ticks: 300,
            position: { x: Math.random() * 100, y: Math.random() * 50 + 25 },
            ...emojiBase,
        })
        count++
        if (count >= 10) clearInterval(interval)
    }, 150)
}

// 8 ── Fountain  (continuous upward spray from bottom-center)
const triggerFountain = async () => {
    const confetti = await getConfetti()
    let count = 0
    const interval = setInterval(async () => {
        await confetti({
            count: 30,
            angle: 270 + (Math.random() - 0.5) * 30,
            spread: 25,
            startVelocity: 80,
            gravity: -0.2,
            decay: 0.97,
            ticks: 450,
            position: { x: 50, y: 100 },
            ...emojiBase,
        })
        count++
        if (count >= 12) clearInterval(interval)
    }, 100)
}

useHead({ title: 'Confetti Test – Alwan Invite' })
</script>

<template>
    <div class="p-6 space-y-8 max-w-3xl">
        <!-- Header -->
        <div>
            <h1 class="text-2xl font-bold">Confetti Test Page</h1>
            <p class="text-base-content/60 mt-1 text-sm">
                Testing
                <code class="badge badge-ghost badge-sm">@tsparticles/confetti</code>
                with 🙏 and ❤️ emoji particles via
                <code class="badge badge-ghost badge-sm">@tsparticles/vue3</code>.
            </p>
        </div>

        <!-- Trigger buttons -->
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div class="card bg-base-100 border border-base-300 shadow-sm">
                <div class="card-body gap-2">
                    <h2 class="card-title text-base">Basic Burst</h2>
                    <p class="text-sm text-base-content/60">Single fast burst from the center.</p>
                    <div class="card-actions justify-end mt-2">
                        <button class="btn btn-primary btn-sm" @click="triggerBasic">🎉 Fire!</button>
                    </div>
                </div>
            </div>

            <div class="card bg-base-100 border border-base-300 shadow-sm">
                <div class="card-body gap-2">
                    <h2 class="card-title text-base">Dual Cannon</h2>
                    <p class="text-sm text-base-content/60">Two fast cannons from both sides.</p>
                    <div class="card-actions justify-end mt-2">
                        <button class="btn btn-secondary btn-sm" @click="triggerCannon">💥 Cannon!</button>
                    </div>
                </div>
            </div>

            <div class="card bg-base-100 border border-base-300 shadow-sm">
                <div class="card-body gap-2">
                    <h2 class="card-title text-base">Emoji Rain</h2>
                    <p class="text-sm text-base-content/60">Particles drift down from the top in waves.</p>
                    <div class="card-actions justify-end mt-2">
                        <button class="btn btn-accent btn-sm" @click="triggerRain">🌧️ Rain!</button>
                    </div>
                </div>
            </div>

            <div class="card bg-base-100 border border-base-300 shadow-sm">
                <div class="card-body gap-2">
                    <h2 class="card-title text-base">Fireworks</h2>
                    <p class="text-sm text-base-content/60">Three radial explosions — zero gravity float.</p>
                    <div class="card-actions justify-end mt-2">
                        <button class="btn btn-warning btn-sm" @click="triggerFireworks">🎆 Fireworks!</button>
                    </div>
                </div>
            </div>

            <div class="card bg-base-100 border border-base-300 shadow-sm">
                <div class="card-body gap-2">
                    <h2 class="card-title text-base">Float Up</h2>
                    <p class="text-sm text-base-content/60">Particles rise upward from the bottom with a gentle drift.
                    </p>
                    <div class="card-actions justify-end mt-2">
                        <button class="btn btn-info btn-sm" @click="triggerFloatUp">🕊️ Float!</button>
                    </div>
                </div>
            </div>

            <div class="card bg-base-100 border border-base-300 shadow-sm">
                <div class="card-body gap-2">
                    <h2 class="card-title text-base">Wave</h2>
                    <p class="text-sm text-base-content/60">Sequential bursts sweep left to right across the screen.</p>
                    <div class="card-actions justify-end mt-2">
                        <button class="btn btn-success btn-sm" @click="triggerWave">🌊 Wave!</button>
                    </div>
                </div>
            </div>

            <div class="card bg-base-100 border border-base-300 shadow-sm">
                <div class="card-body gap-2">
                    <h2 class="card-title text-base">Storm</h2>
                    <p class="text-sm text-base-content/60">Rapid random bursts with strong sideways drift.</p>
                    <div class="card-actions justify-end mt-2">
                        <button class="btn btn-error btn-sm" @click="triggerStorm">⛈️ Storm!</button>
                    </div>
                </div>
            </div>

            <div class="card bg-base-100 border border-base-300 shadow-sm">
                <div class="card-body gap-2">
                    <h2 class="card-title text-base">Fountain</h2>
                    <p class="text-sm text-base-content/60">Continuous spray rising from the bottom center.</p>
                    <div class="card-actions justify-end mt-2">
                        <button class="btn btn-neutral btn-sm" @click="triggerFountain">⛲ Fountain!</button>
                    </div>
                </div>
            </div>
        </div>

        <div class="alert text-sm">
            <span>All particles use <strong>🙏</strong> and <strong>❤️</strong> only · <strong>flat mode</strong> on (no
                spinning) · low gravity for floating movement.</span>
        </div>
    </div>
</template>
