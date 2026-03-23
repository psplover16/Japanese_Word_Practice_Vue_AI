<script setup lang="ts">
import { onBeforeUnmount, ref, watch } from 'vue';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import BaseButton from '@/shared/components/BaseButton.vue';
import type { ExamQuestionCard } from '@/modules/exam/types/exam';

const props = defineProps<{
  open: boolean;
  question: ExamQuestionCard | null;
  currentIndex: number;
  totalQuestions: number;
}>();

const emit = defineEmits<{ next: []; unknown: []; confirmClose: [] }>();

const previousBodyOverflow = ref('');

function requestClose(): void {
  if (window.confirm('確定要結束練習嗎？')) {
    emit('confirmClose');
  }
}

watch(
  () => props.open,
  (isOpen) => {
    if (typeof document === 'undefined') {
      return;
    }

    if (isOpen) {
      previousBodyOverflow.value = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return;
    }

    document.body.style.overflow = previousBodyOverflow.value;
  },
  { immediate: true }
);

onBeforeUnmount(() => {
  if (typeof document !== 'undefined') {
    document.body.style.overflow = previousBodyOverflow.value;
  }
});
</script>

<template>
  <Teleport to="body">
    <div
      v-if="props.open"
      class="fixed inset-0 z-[100] flex h-dvh w-screen items-center justify-center bg-ink/45 px-3 py-4"
    >
      <section
        class="surface-card flex h-[300px] w-full max-w-[360px] flex-col overflow-hidden"
        aria-modal="true"
        role="dialog"
      >
        <div class="flex h-[48px] items-center justify-between border-b border-clay/10 px-4">
          <p class="text-sm font-semibold text-ink">
            {{ props.totalQuestions === 0 ? 0 : props.currentIndex + 1 }} / {{ props.totalQuestions }}
          </p>
          <button
            type="button"
            class="text-lg text-ink/70 hover:text-ink"
            aria-label="關閉練習"
            @click="requestClose"
          >
            <FontAwesomeIcon :icon="faXmark" />
          </button>
        </div>

        <div class="flex-1 border-b border-clay/10 px-4 py-3">
          <div class="flex h-full flex-col items-center justify-center gap-2 text-center">
            <p class="text-4xl font-bold text-clay">{{ props.question?.promptText ?? '-' }}</p>
            <p class="min-h-[28px] text-lg font-semibold text-ink">
              {{ props.question?.answerRevealed ? props.question.answerText : '' }}
            </p>
            <p class="text-sm text-ink/65">
              {{
                props.question?.answerRevealed
                  ? '已顯示答案，請決定是否標記為我不清楚'
                  : '請先自行作答，再決定是否按下我不清楚'
              }}
            </p>
          </div>
        </div>

        <div data-testid="exam-actions" class="flex h-[56px] items-center justify-between px-4">
          <BaseButton data-testid="exam-unknown-button" variant="danger" @click="emit('unknown')">
            我不清楚
          </BaseButton>
          <BaseButton data-testid="exam-next-button" variant="ghost" @click="emit('next')">
            下一步
          </BaseButton>
        </div>
      </section>
    </div>
  </Teleport>
</template>
