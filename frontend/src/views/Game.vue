<template>
  <div class="game-page">
    <iframe id="game-frame" :src="clientUrl" frameborder="0"></iframe>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class GamePage extends Vue {
  public get clientUrl(): string {
    return process.env.VUE_APP_CLIENT_URL;
  }
}
</script>

<style lang="scss">
.game-page {
  height: 100%;
  overflow: hidden;

  #game-frame {
    width: 100%;
    height: 100%;
    touch-action: none;
  }
}
</style>