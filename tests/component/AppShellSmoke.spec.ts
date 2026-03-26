import { beforeEach, describe, expect, it } from 'vitest';
import { mount } from '@vue/test-utils';
import { nextTick } from 'vue';
import AppShell from '@/app/AppShell.vue';
import router from '@/app/router';

describe('AppShell', () => {
  beforeEach(async () => {
    await router.push('/practice');
    await router.isReady();
  });

  it('可在三個主要路由之間切換並顯示標題', async () => {
    const wrapper = mount(AppShell, {
      global: {
        plugins: [router]
      }
    });

    expect(wrapper.text()).toContain('50音');

    await router.push('/grammar');
    await nextTick();
    expect(wrapper.text()).toContain('變化規則');

    await router.push('/vocabulary');
    await nextTick();
    expect(wrapper.text()).toContain('單字練習');
  });
});
