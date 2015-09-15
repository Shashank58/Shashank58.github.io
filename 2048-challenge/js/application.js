// Wait till the browser is ready to render the game (avoids glitches)
window.requestAnimationFrame(function () {
  var myGame = new GameManager(4, KeyboardInputManager, HTMLActuator, LocalStorageManager);

  window.MyGame = {

  };

  MyGame.restart = function() {
  	myGame.restart();
  };
});
