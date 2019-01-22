<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<style>
@font-face {
  font-family: "Satisfy";
  src: url("/font/Satisfy-Regular.ttf") format('truetype');
}

html, body {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
  height: 100%;
}

#app {
  height: 100%;
  font-family: 'Satisfy';
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>
