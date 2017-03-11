var _n = {};
var _l = {};

var loop = function(){
  var _i =navigator.getGamepads ? navigator.getGamepads() : (navigator.webkitGetGamepads ? navigator.webkitGetGamepads : []);

    for (var g = 0; g < _i.length; g++) {
      if(_i[g]){
        _n[g] = {
          'name':_i[g].id,
          'index':_i[g].index,
          'buttons':{},
          'axes':{}
        };
        for (var b = 0; b < _i[g].buttons.length; b++) {
          _n[g]['buttons'][b] = _i[g].buttons[b].value;
          if(JSON.stringify(_l) !== JSON.stringify({})){
            if(_n[g]['buttons'][b] != _l[g]['buttons'][b]){
              if(_n[g]['buttons'][b] > _l[g]['buttons'][b]){
                var gamepadpressdown = document.createEvent("Event");
                gamepadpressdown.initEvent("gamepadpressdown",false,false);
                gamepadpressdown.which = b;
                gamepadpressdown.gamepad = g;
                gamepadpressdown.difference = _n[g]['buttons'][b] - _l[g]['buttons'][b];
                gamepadpressdown.previousvalue = _l[g]['buttons'][b];
                gamepadpressdown.currentvalue = _i[g].buttons[b].value;
                document.dispatchEvent(gamepadpressdown);
              } else if(_n[g]['buttons'][b] < _l[g]['buttons'][b]){
                var gamepadpressup = document.createEvent("Event");
                gamepadpressup.initEvent("gamepadpressup",false,false);
                gamepadpressup.which = b;
                gamepadpressup.gamepad = g;
                gamepadpressup.difference = _n[g]['buttons'][b] - _l[g]['buttons'][b];
                gamepadpressup.previousvalue = _l[g]['buttons'][b];
                gamepadpressup.currentvalue = _i[g].buttons[b].value;
                document.dispatchEvent(gamepadpressup);
              }
            }                 
          }
        }
        for (var a = 0; a < _i[g].axes.length; a++) {
          _n[g]['axes'][a] = _i[g].axes[a];
          if(JSON.stringify(_l) !== JSON.stringify({})){
            if(_n[g]['axes'][a] != _l[g]['axes'][a]){
              var gamepadaxismove = document.createEvent("Event");
              gamepadaxismove.initEvent("gamepadaxismove",false,false);
              gamepadaxismove.which = a;
              gamepadaxismove.gamepad = g;
              gamepadaxismove.currentvalue = _n[g]['axes'][a];
              gamepadaxismove.previousvalue = _l[g]['axes'][a];
              gamepadaxismove.difference = _n[g]['axes'][a] - _l[g]['axes'][a];
              document.dispatchEvent(gamepadaxismove);
            }
          }
        }
      }
    }

    if(JSON.stringify(_l) !== JSON.stringify(_n)){
      _l = JSON.parse(JSON.stringify(_n));
    }

    window.requestAnimationFrame(loop);
};
window.requestAnimationFrame(loop);


// jQuery


if(typeof jQuery != 'undefined'){
	jQuery.each( ( "gamepadpressdown gamepadpressup gamepadaxismove" ).split( " " ),
		function( i, name ) {

		// Handle event binding
		jQuery.fn[ name ] = function( data, fn ) {
			return arguments.length > 0 ?
				this.on( name, null, data, fn ) :
				this.trigger( name );
		};
	} );				
}