<template>
  <div class="game-page">
    <canvas id="game-canvas" ref="canvas"/>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class GamePage extends Vue {}
</script>

<style lang="scss">
.game-page {
  height: 100%;
  overflow: hidden;

  #game-canvas {
    width: 100%;
    height: 100%;
    touch-action: none;
  }
}
</style>