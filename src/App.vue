<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import profiles from './data/profiles.json'
import theoryData from './data/theory.json'

type ViewMode = 'home' | 'quiz'

type Profile = {
  name: string
  date: string
  avatar: string
}

type QuizKey = 'height' | 'weight' | 'shoeSize' | 'factor18'

type QuizQuestion = {
  key: QuizKey
  emoji: string
  label: string
  placeholder: string
  unit: string
  ideal: number
}

const currentView = ref<ViewMode>('home')
const attempted = ref(false)

const quizForm = ref<Record<QuizKey, string>>({
  height: '',
  weight: '',
  shoeSize: '',
  factor18: '',
})

const quizQuestions: QuizQuestion[] = [
  {
    key: 'height',
    emoji: '📏',
    label: '你的身高是多少？',
    placeholder: '例如 185',
    unit: 'cm',
    ideal: 185,
  },
  {
    key: 'weight',
    emoji: '⚖️',
    label: '你的体重是多少？',
    placeholder: '例如 90',
    unit: 'kg',
    ideal: 90,
  },
  {
    key: 'shoeSize',
    emoji: '👟',
    label: '你的鞋码是多少？',
    placeholder: '例如 45',
    unit: '码',
    ideal: 45,
  },
  {
    key: 'factor18',
    emoji: '🔮',
    label: '你的 18 因子值是多少？',
    placeholder: '先随便填一个数字占位',
    unit: '',
    ideal: 18,
  },
]

const updateViewFromHash = () => {
  currentView.value = window.location.hash === '#/quiz' ? 'quiz' : 'home'
}

const parseProfileDate = (value: string) => {
  const [datePart = ''] = value.split(' ')
  const normalized = datePart.replace(/\./g, '-')
  return new Date(normalized).getTime()
}

const sortedProfiles = computed(() =>
  [...(profiles as Profile[])].sort((left, right) => parseProfileDate(right.date) - parseProfileDate(left.date)),
)

const numericAnswers = computed<Record<QuizKey, number>>(() => ({
  height: Number(quizForm.value.height || 0),
  weight: Number(quizForm.value.weight || 0),
  shoeSize: Number(quizForm.value.shoeSize || 0),
  factor18: Number(quizForm.value.factor18 || 0),
}))

const matchedDimensions = computed(() => {
  const answers = numericAnswers.value
  return {
    height: answers.height >= 183 && answers.height <= 187,
    weight: answers.weight >= 85 && answers.weight <= 95,
    shoeSize: answers.shoeSize >= 43 && answers.shoeSize <= 46,
    factor18: answers.factor18 >= 18 && answers.factor18 <= 22,
  }
})

const matchedCount = computed(() => Object.values(matchedDimensions.value).filter(Boolean).length)

const getDimensionDescription = (key: QuizKey, value: number) => {
  if (!value) {
    return '该维度还没有录入数值，马户研究院暂不评价。'
  }

  switch (key) {
    case 'height':
      if (value < 175) return '高度维度偏保守，离 338 基线还有可见距离。'
      if (value < 183) return '已经进入观察区，但还没完全贴住 185 基准线。'
      if (value <= 187) return '高度维度命中核心射程，338 雷达已亮。'
      return '高度维度强势超线，出场气势先拿一半。'
    case 'weight':
      if (value < 75) return '质量参数偏轻，整体压迫感不足。'
      if (value < 85) return '质量参数接近目标，但还差一点厚重感。'
      if (value <= 95) return '质量规范基本合格，属于标准 338 区间。'
      return '质量参数超出标准区，属于重量级候选。'
    case 'shoeSize':
      if (value < 42) return '支撑系统规格偏小，暂未达到经典模板。'
      if (value < 43) return '支撑系统开始接近，但还没卡进 45 码带。'
      if (value <= 46) return '支撑系统规格良好，踩在理论甜蜜点上。'
      return '支撑系统火力过猛，属于扩展型底盘。'
    case 'factor18':
      if (value < 18) return '18 因子未觉醒，神秘变量还在潜伏。'
      if (value <= 22) return '18 因子稳定触发，玄学模块开始共振。'
      if (value <= 30) return '18 因子能量偏高，属于强化型异动。'
      return '18 因子读数异常活跃，已进入传说区。'
  }
}

const dimensionResults = computed(() =>
  quizQuestions.map((question) => {
    const value = numericAnswers.value[question.key]
    const ratio = value ? Math.min((value / question.ideal) * 100, 100) : 0

    return {
      ...question,
      value,
      ratio,
      matched: matchedDimensions.value[question.key],
      description: getDimensionDescription(question.key, value),
    }
  }),
)

const globalDescriptions = computed(() => {
  const answers = numericAnswers.value
  const matched = matchedDimensions.value
  const messages: string[] = []

  if (
    answers.height === 185 &&
    answers.weight === 90 &&
    answers.shoeSize === 45 &&
    answers.factor18 === 18
  ) {
    messages.push('👑 四维精确命中 185/90/45/18，属于传说级原生 338 模板。')
  }

  if (matchedCount.value === 4) {
    messages.push('🔥 四个维度全部落入标准区间，马户研究院建议直接重点观察。')
  }

  if (matched.height && matched.weight && matched.shoeSize) {
    messages.push('🚀 身高、体重、鞋码三轴合拍，物理层面的 338 气质已经成形。')
  }

  if (matched.height && matched.weight) {
    messages.push('📡 高度与质量双维共振，基础盘面相当稳。')
  }

  if (matched.shoeSize && matched.factor18) {
    messages.push('🌀 支撑系统与神秘变量同步达标，说明这人多少带点宿命感。')
  }

  if (matchedCount.value === 3) {
    messages.push('✨ 三维达标，距离正式编入 338 图鉴只差最后一脚。')
  }

  if (matchedCount.value === 2) {
    messages.push('🎯 已形成双维联动，属于有潜力继续养成的候选体。')
  }

  if (matchedCount.value <= 1) {
    messages.push('🧪 当前更像 338 旁观席成员，建议先把短板维度补起来。')
  }

  return [...new Set(messages)]
})

const sanitizeAnswer = (key: QuizKey, event: Event) => {
  const target = event.target as HTMLInputElement
  quizForm.value[key] = target.value.replace(/[^\d]/g, '')
}

const submitQuiz = () => {
  attempted.value = true
}

const navigateToQuiz = () => {
  window.location.hash = '/quiz'
}

const goHome = () => {
  window.location.hash = ''
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

const scrollToSection = (id: string) => {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

onMounted(() => {
  updateViewFromHash()
  window.addEventListener('hashchange', updateViewFromHash)
})

onBeforeUnmount(() => {
  window.removeEventListener('hashchange', updateViewFromHash)
})
</script>

<template>
  <main v-if="currentView === 'home'" class="snap-shell">
    <section id="hero-panel" class="snap-panel panel-hero">
      <div class="panel-inner hero-layout">
        <div class="hero-copy-block">
          <p class="eyebrow">🧪 338 THEORY ARCHIVE</p>
          <h1>338理论体系</h1>
          <p class="hero-copy">
            一份被重新整理的民间参数档案，用更清晰的结构记录核心标准、理论因子与已知样本。
          </p>
          <div class="hero-actions">
            <button class="primary-button" type="button" @click="navigateToQuiz">
              测测我是不是338
            </button>
            <button class="ghost-button" type="button" @click="scrollToSection('core-panel')">
              向下滑动查看理论
            </button>
          </div>
        </div>
        <div class="hero-orbit">
          <div class="orbit-card orbit-card-main">185</div>
          <div class="orbit-card orbit-card-side">90</div>
          <div class="orbit-card orbit-card-bottom">45 + 18</div>
        </div>
      </div>
    </section>

    <section id="core-panel" class="snap-panel panel-core">
      <div class="panel-inner">
        <div class="panel-heading">
          <p class="panel-kicker">📐 第二页</p>
          <h2>核心标准</h2>
        </div>
        <article class="story-card story-card-featured">
          <h3>{{ theoryData.core.title }}</h3>
          <p>
            由<span class="highlight">{{ theoryData.core.founder }}</span
            >首创的量化择偶体系，基于人体工程学与地域文化特征建立的综合选拔标准。
          </p>
          <a
            class="external-link"
            :href="theoryData.core.link"
            target="_blank"
            rel="noreferrer"
          >
            👀 {{ theoryData.core.linkText }}
          </a>
        </article>
      </div>
    </section>

    <section id="factors-panel" class="snap-panel panel-factors">
      <div class="panel-inner">
        <div class="panel-heading">
          <p class="panel-kicker">🧩 第三页</p>
          <h2>四个因子块</h2>
        </div>
        <div class="factor-grid">
          <article
            v-for="factor in theoryData.factors"
            :key="factor.key"
            class="story-card factor-card"
          >
            <h3>{{ factor.title }}</h3>
            <p v-if="factor.highlight">
              {{ factor.descriptionPrefix }}<span class="highlight">{{ factor.highlight }}</span
              >{{ factor.descriptionSuffix }}
            </p>
            <template v-else-if="factor.speculations?.length">
              <div class="speculation">
                <p>{{ factor.description }}</p>
                <p v-for="speculation in factor.speculations" :key="speculation">
                  • {{ speculation }}
                </p>
              </div>
            </template>
            <p v-else>{{ factor.description }}</p>
          </article>
        </div>
      </div>
    </section>

    <section id="roster-panel" class="snap-panel panel-roster">
      <div class="panel-inner">
        <div class="panel-heading">
          <p class="panel-kicker">🌍 第四页</p>
          <h2>地球上已知的338个体</h2>
        </div>
        <ul class="profile-list">
          <li
            v-for="profile in sortedProfiles"
            :key="profile.name"
            class="profile-item"
          >
            <img :src="profile.avatar" :alt="profile.name" class="avatar" />
            <div class="profile-info">
              <span class="profile-name">{{ profile.name }}</span>
              <span class="profile-date">🗓 {{ profile.date }}</span>
            </div>
          </li>
        </ul>
        <p class="profile-note">📮 持续监测中，发现新个体请立即上报马户研究院。</p>
      </div>
    </section>

    <section id="notes-panel" class="snap-panel panel-notes">
      <div class="panel-inner panel-notes-layout">
        <div class="panel-heading">
          <p class="panel-kicker">📜 第五页</p>
          <h2>执行条款与附记</h2>
        </div>
        <section class="story-card footnote-card">
          <h3>🔖 执行条款</h3>
          <p>▶ 达标者自动进入「马户人才池」，需参加季度选拔大会。</p>
          <p>▶ 未成年人依《未保法》享参赛豁免权，但需<span class="highlight">服马户役</span>（详见附件3.3.8）。</p>
        </section>
        <p class="legal">
          * 本理论体系已通过 ISO 338 认证
          <br />
          最终解释权归马户研究院所有 ©2025
        </p>
      </div>
    </section>
  </main>

  <main v-else class="quiz-shell">
    <section class="quiz-panel">
      <div class="quiz-topbar">
        <button class="back-button" type="button" @click="goHome">← 返回理论页面</button>
      </div>

      <div class="quiz-hero">
        <p class="eyebrow">📝 338 TESTER</p>
        <h1 class="quiz-title">测测我是不是338</h1>
        <p class="quiz-copy">
          回答下面四个问题，所有输入都只能是数字。测完之后，系统会把你的参数映射到四个维度里进行对比。
        </p>
      </div>

      <div class="quiz-grid">
        <label
          v-for="question in quizQuestions"
          :key="question.key"
          class="quiz-card"
        >
          <span class="quiz-card-title">{{ question.emoji }} {{ question.label }}</span>
          <span class="quiz-card-hint">目标值：{{ question.ideal }}{{ question.unit }}</span>
          <input
            :value="quizForm[question.key]"
            class="quiz-input"
            inputmode="numeric"
            pattern="[0-9]*"
            :placeholder="question.placeholder"
            @input="sanitizeAnswer(question.key, $event)"
          />
        </label>
      </div>

      <button class="primary-button primary-button-wide" type="button" @click="submitQuiz">
        测一测
      </button>

      <section v-if="attempted" class="result-panel">
        <div class="panel-heading">
          <p class="panel-kicker">📊 测试结果</p>
          <h2>你的338对比报告</h2>
        </div>

        <div class="result-grid">
          <article
            v-for="result in dimensionResults"
            :key="result.key"
            class="result-card"
          >
            <div class="result-card-head">
              <h3>{{ result.emoji }} {{ result.label }}</h3>
              <span class="result-value">
                {{ result.value || '--' }}{{ result.unit }}
              </span>
            </div>
            <div class="result-bar">
              <span class="result-bar-fill" :style="{ width: `${result.ratio}%` }" />
            </div>
            <p class="result-meta">理论参考值：{{ result.ideal }}{{ result.unit }}</p>
            <p class="result-description">{{ result.description }}</p>
          </article>
        </div>

        <article class="global-result-card">
          <h3>🌐 全局结论</h3>
          <p
            v-for="message in globalDescriptions"
            :key="message"
            class="global-result-line"
          >
            {{ message }}
          </p>
        </article>
      </section>
    </section>
  </main>
</template>
