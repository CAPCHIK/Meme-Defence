<template>
  <div class="home-page">
    <div class="blured header">In memes, we trust...</div>
    <div class="main">
      <div class="button" @click="playGame">Play</div>
    </div>
    <div class="blured footer"></div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class HomePage extends Vue {
  public playGame() {
    this.$router.push({ name: 'game' });
  }
}
</script>

<style lang="scss">
.home-page {
  height: 100%;
  color: white;
  font-weight: bold;
  text-align: center;
  font-size: 30pt;

  .button {
    border-radius: 30px;
    width: 200px;
    padding: 10px;
    background-color: #43A047;

    &:hover {
      cursor: pointer;
      background-color: darken(#43A047, 2);
      box-shadow: 0px 0px 9px 2px #43A047;
    }
  }

  .blured {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    height: calc(50% - 15vh);
    background: url(/img/background.jpg)  no-repeat center center fixed;
    background-blend-mode: multiply;
    background-color: rgba(0, 0, 0, 0.4);
    z-index: -10;
  }

  .main {
    height: 30vh;
    background-color: #252121;
    box-shadow: 0px 0px 85px 9px rgba(0,0,0,0.75);
    background-size: cover;

    position: relative;

    display: flex;
    flex-direction: column;

    align-items: center;
    justify-content: center;
  }
}
</style>
