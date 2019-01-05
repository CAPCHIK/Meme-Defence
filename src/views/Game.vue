<template>
  <div class="game-page">
    <canvas id="game-canvas" ref="canvas"/>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

import { Game } from '@/game/game.ts';

@Component
export default class GamePage extends Vue {
  private game?: Game;

  public mounted() {
    const canvas = this.$refs.canvas as HTMLCanvasElement;

    if (canvas != null) {
      this.game = new Game(canvas);

      this.game.init();
      this.game.run();
    }
  }
}
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