<script setup lang="ts">
import { computed } from 'vue'
import { coreMembers } from '../../../authors'
import { VPTeamMembers } from 'vitepress/theme'
import { useData } from 'vitepress'

const { lang, theme } = useData()
const members = computed(() => coreMembers.map(member => ({ ...member, name: member.name[lang.value] })))
</script>

<template>
  <div class="DocsTeam">
    <h1 v-if="theme.teamSectionTitle" class="title">{{ theme.teamSectionTitle }}</h1>
    <VPTeamMembers size="small" :members="members" />
  </div>
</template>

<style scoped>
.DocsTeam {
  padding: 20px 24px 0;
  text-align: center;
}

.title {
  letter-spacing: -0.4px;
  font-size: 18px;
  font-weight: 700;
  white-space: pre-wrap;
  margin-bottom: 20px;
}

@media (min-width: 640px) {
  .DocsTeam {
    padding-top: 40px;
  }

  .title {
    font-size: 24px;
    margin-bottom: 40px;
  }
}

@media (min-width: 960px) {
  .DocsTeam {
    padding-top: 60px;
  }

  .title {
    font-size: 32px;
    margin-bottom: 60px;
  }
}

@media (min-width: 1200px) {
  .DocsTeam {
    padding-inline: 0;
  }
}
</style>
