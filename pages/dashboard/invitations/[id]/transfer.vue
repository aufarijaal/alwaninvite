<script setup lang="ts">
import { ArrowLeftRight, ArrowLeft, AlertTriangle, CheckCircle2, Mail, User, Search } from 'lucide-vue-next'
import type { Database } from '~/types/database.types'

definePageMeta({
    middleware: 'auth',
    layout: 'dashboard'
})

const { t } = useI18n()
const supabase = useSupabaseClient<Database>()
const user = useSupabaseUser()
const router = useRouter()
const route = useRoute()

const invitationId = computed(() => route.params.id as string)

// Page state
const loading = ref(true)
const transferring = ref(false)
const invitation = ref<Database['public']['Tables']['weddings']['Row'] | null>(null)
const fetchError = ref<string | null>(null)

// Form state
const targetEmail = ref('')
const emailError = ref('')
const step = ref<'form' | 'confirm' | 'success'>('form')
const transferResult = ref<{ email: string; name: string | null } | null>(null)

// Fetch invitation to display details
const fetchInvitation = async () => {
    loading.value = true
    fetchError.value = null
    try {
        const { data, error } = await supabase
            .from('weddings')
            .select('id, title, slug, bride_callname, groom_callname, created_at, published')
            .eq('id', parseInt(invitationId.value))
            .eq('user_id', user.value?.id ?? user.value?.sub ?? '')
            .single()

        if (error || !data) {
            fetchError.value = t('transferOwnership.errors.notFound')
            return
        }
        invitation.value = data as any
    } catch (err: any) {
        fetchError.value = err.message
    } finally {
        loading.value = false
    }
}

// Validate email field
const validateEmail = (): boolean => {
    emailError.value = ''
    const email = targetEmail.value.trim()
    if (!email) {
        emailError.value = t('transferOwnership.errors.emailRequired')
        return false
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        emailError.value = t('transferOwnership.errors.emailInvalid')
        return false
    }
    if (email.toLowerCase() === user.value?.email?.toLowerCase()) {
        emailError.value = t('transferOwnership.errors.sameUser')
        return false
    }
    return true
}

const goToConfirm = () => {
    if (validateEmail()) {
        step.value = 'confirm'
    }
}

const confirmTransfer = async () => {
    if (!validateEmail()) {
        step.value = 'form'
        return
    }

    transferring.value = true
    try {
        const result = await $fetch<{ success: boolean; transferredTo: { email: string; name: string | null } }>(
            `/api/invitations/${invitationId.value}/transfer`,
            {
                method: 'POST',
                body: { email: targetEmail.value.trim().toLowerCase() },
            }
        )
        transferResult.value = result.transferredTo
        step.value = 'success'
    } catch (err: any) {
        const message = err?.data?.statusMessage || err?.message || t('error.generic')
        emailError.value = message
        step.value = 'form'
    } finally {
        transferring.value = false
    }
}

const goBackToInvitations = () => {
    router.push('/dashboard/invitations')
}

onMounted(() => {
    fetchInvitation()
})

useHead({ title: `${t('transferOwnership.pageTitle')} – Alwan Invite` })
</script>

<template>
    <div class="max-w-2xl mx-auto space-y-6">
        <!-- Back link -->
        <div>
            <NuxtLink to="/dashboard/invitations" class="btn btn-ghost btn-sm gap-2">
                <ArrowLeft :size="16" />
                {{ t('common.back') }}
            </NuxtLink>
        </div>

        <!-- Page Header -->
        <div class="flex items-center gap-3">
            <div class="p-3 rounded-xl bg-warning/10">
                <ArrowLeftRight :size="24" class="text-warning" />
            </div>
            <div>
                <h1 class="text-2xl font-bold">{{ t('transferOwnership.pageTitle') }}</h1>
                <p class="text-base-content/60 text-sm mt-0.5">{{ t('transferOwnership.pageSubtitle') }}</p>
            </div>
        </div>

        <!-- Loading -->
        <div v-if="loading" class="flex justify-center py-20">
            <span class="loading loading-spinner loading-lg"></span>
        </div>

        <!-- Fetch error -->
        <div v-else-if="fetchError" class="alert alert-error">
            <AlertTriangle :size="18" />
            <span>{{ fetchError }}</span>
        </div>

        <template v-else-if="invitation">
            <!-- Invitation Info Card -->
            <div class="card bg-base-100 shadow border border-base-300">
                <div class="card-body py-4">
                    <p class="text-xs text-base-content/50 uppercase font-semibold tracking-wider mb-1">
                        {{ t('transferOwnership.invitationLabel') }}
                    </p>
                    <div class="flex items-center gap-3">
                        <div class="avatar placeholder">
                            <div class="bg-primary/10 text-primary rounded-lg w-10 h-10">
                                <span class="text-lg">💍</span>
                            </div>
                        </div>
                        <div>
                            <p class="font-semibold">
                                {{ invitation.title || `${invitation.bride_callname} & ${invitation.groom_callname}` }}
                            </p>
                            <p class="text-sm font-mono text-base-content/50">/invite/{{ invitation.slug }}</p>
                        </div>
                        <div class="ml-auto">
                            <span :class="['badge badge-sm', invitation.published ? 'badge-success' : 'badge-ghost']">
                                {{ invitation.published ? t('invitation.status.active') : t('invitation.status.draft') }}
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Warning Banner -->
            <div class="alert alert-warning">
                <AlertTriangle :size="18" class="flex-shrink-0" />
                <div>
                    <p class="font-semibold">{{ t('transferOwnership.warningTitle') }}</p>
                    <p class="text-sm mt-0.5">{{ t('transferOwnership.warningBody') }}</p>
                </div>
            </div>

            <!-- Step: Form -->
            <div v-if="step === 'form'" class="card bg-base-100 shadow border border-base-300">
                <div class="card-body space-y-4">
                    <h2 class="card-title text-lg">{{ t('transferOwnership.formTitle') }}</h2>

                    <div class="form-control w-full">
                        <label class="label">
                            <span class="label-text font-medium">{{ t('transferOwnership.emailLabel') }}</span>
                        </label>
                        <div class="relative">
                            <span class="absolute left-3 top-1/2 -translate-y-1/2 text-base-content/40">
                                <Mail :size="16" />
                            </span>
                            <input
                                v-model="targetEmail"
                                type="email"
                                :placeholder="t('transferOwnership.emailPlaceholder')"
                                :class="['input input-bordered w-full pl-9', emailError ? 'input-error' : '']"
                                @keyup.enter="goToConfirm"
                            />
                        </div>
                        <label v-if="emailError" class="label">
                            <span class="label-text-alt text-error">{{ emailError }}</span>
                        </label>
                        <label v-else class="label">
                            <span class="label-text-alt text-base-content/50">{{ t('transferOwnership.emailHint') }}</span>
                        </label>
                    </div>

                    <div class="card-actions justify-end pt-2">
                        <NuxtLink to="/dashboard/invitations" class="btn btn-ghost">
                            {{ t('common.cancel') }}
                        </NuxtLink>
                        <button class="btn btn-warning gap-2" @click="goToConfirm">
                            <Search :size="16" />
                            {{ t('transferOwnership.continueBtn') }}
                        </button>
                    </div>
                </div>
            </div>

            <!-- Step: Confirm -->
            <div v-if="step === 'confirm'" class="card bg-base-100 shadow border border-warning">
                <div class="card-body space-y-4">
                    <h2 class="card-title text-lg">{{ t('transferOwnership.confirmTitle') }}</h2>

                    <div class="bg-base-200 rounded-xl p-4 space-y-3">
                        <div class="flex items-center gap-3">
                            <User :size="16" class="text-base-content/50 flex-shrink-0" />
                            <div>
                                <p class="text-xs text-base-content/50">{{ t('transferOwnership.currentOwner') }}</p>
                                <p class="font-medium">{{ user?.email }}</p>
                            </div>
                        </div>
                        <div class="divider my-1 text-xs text-base-content/40">↓ {{ t('transferOwnership.transferTo') }}</div>
                        <div class="flex items-center gap-3">
                            <Mail :size="16" class="text-warning flex-shrink-0" />
                            <div>
                                <p class="text-xs text-base-content/50">{{ t('transferOwnership.newOwner') }}</p>
                                <p class="font-medium text-warning">{{ targetEmail }}</p>
                            </div>
                        </div>
                    </div>

                    <p class="text-sm text-base-content/60">{{ t('transferOwnership.confirmWarning') }}</p>

                    <div class="card-actions justify-end pt-2">
                        <button class="btn btn-ghost" @click="step = 'form'" :disabled="transferring">
                            {{ t('common.back') }}
                        </button>
                        <button
                            class="btn btn-warning gap-2"
                            @click="confirmTransfer"
                            :disabled="transferring"
                        >
                            <span v-if="transferring" class="loading loading-spinner loading-sm"></span>
                            <ArrowLeftRight v-else :size="16" />
                            {{ transferring ? t('transferOwnership.transferring') : t('transferOwnership.confirmBtn') }}
                        </button>
                    </div>
                </div>
            </div>

            <!-- Step: Success -->
            <div v-if="step === 'success'" class="card bg-base-100 shadow border border-success">
                <div class="card-body items-center text-center space-y-4 py-10">
                    <CheckCircle2 :size="56" class="text-success" />
                    <div>
                        <h2 class="text-xl font-bold">{{ t('transferOwnership.successTitle') }}</h2>
                        <p class="text-base-content/60 mt-1">
                            {{ t('transferOwnership.successBody', { email: transferResult?.email }) }}
                        </p>
                        <p v-if="transferResult?.name" class="text-sm text-base-content/50 mt-1">
                            {{ transferResult.name }}
                        </p>
                    </div>
                    <button class="btn btn-primary mt-2" @click="goBackToInvitations">
                        {{ t('transferOwnership.backToInvitations') }}
                    </button>
                </div>
            </div>
        </template>
    </div>
</template>
