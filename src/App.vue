<script setup lang="ts">
import profiles from './data/profiles.json'
import theoryData from './data/theory.json'
</script>

<template>
  <main class="page-shell">
    <section class="container">
      <h1>338理论体系</h1>

      <article class="theory-item">
        <h2>{{ theoryData.core.title }}</h2>
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
          {{ theoryData.core.linkText }}
        </a>
      </article>

      <article
        v-for="factor in theoryData.factors"
        :key="factor.key"
        class="theory-item"
      >
        <h2>{{ factor.title }}</h2>
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

      <article class="theory-item">
        <h2>🌍 地球上已知的标准338个体</h2>
        <ul class="profile-list">
          <li
            v-for="profile in profiles"
            :key="profile.name"
            class="profile-item"
          >
            <img :src="profile.avatar" :alt="profile.name" class="avatar" />
            <div class="profile-info">
              <span class="profile-name">{{ profile.name }}</span>
              <span class="profile-date">{{ profile.date }}</span>
            </div>
          </li>
        </ul>
        <p class="profile-note">* 持续监测中，发现新个体请立即上报马户研究院</p>
      </article>

      <hr />

      <section class="footnote">
        <h2>🔖 执行条款</h2>
        <p>▶ 达标者自动进入「马户人才池」，需参加季度选拔大会</p>
        <p>
          ▶ 未成年人依《未保法》享参赛豁免权，但需<span class="highlight">服马户役</span>（详见附件3.3.8）
        </p>
      </section>

      <p class="legal">
        * 本理论体系已通过ISO 338认证
        <br />
        最终解释权归马户研究院所有 ©2025
      </p>
    </section>
  </main>
</template>
