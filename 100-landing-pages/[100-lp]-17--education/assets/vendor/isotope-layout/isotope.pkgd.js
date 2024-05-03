/*!
 * Isotope PACKAGED v3.0.6
 *
 * Licensed GPLv3 for open source use
 * or Isotope Commercial License for commercial use
 *
 * https://isotope.metafizzy.co
 * Copyright 2010-2018 Metafizzy
 */

/**
 * Bridget makes jQuery widgets
 * v2.0.1
 * MIT license
 */

/* jshint browser: true, strict: true, undef: true, unused: true */

( function( window, factory ) {
  // universal module definition
  /*jshint strict: false */ /* globals define, module, require */
  if ( typeof define == 'function' && define.amd ) {
    // AMD
    define( 'jquery-bridget/jquery-bridget',[ 'jquery' ], function( jQuery ) {
      return factory( window, jQuery );
    });
  } else if ( typeof module == 'object' && module.exports ) {
    // CommonJS
    module.exports = factory(
      window,
      require('jquery')
    );
  } else {
    // browser global
    window.jQueryBridget = factory(
      window,
      window.jQuery
    );
  }

}( window, function factory( window, jQuery ) {
'use strict';

// ----- utils ----- //

var arraySlice = Array.prototype.slice;

// helper function for logging errors
// $.error breaks jQuery chaining
var console = window.console;
var logError = typeof console == 'undefined' ? function() {} :
  function( message ) {
    console.error( message );
  };

// ----- jQueryBridget ----- //

function jQueryBridget( namespace, PluginClass, $ ) {
  $ = $ || jQuery || window.jQuery;
  if ( !$ ) {
    return;
  }

  // add option method -> $().plugin('option', {...})
  if ( !PluginClass.prototype.option ) {
    // option setter
    PluginClass.prototype.option = function( opts ) {
      // bail out if not an object
      if ( !$.isPlainObject( opts ) ){
        return;
      }
      this.options = $.extend( true, this.options, opts );
    };
  }

  // make jQuery plugin
  $.fn[ namespace ] = function( arg0 /*, arg1 */ ) {
    if ( typeof arg0 == 'string' ) {
      // method call $().plugin( 'methodName', { options } )
      // shift arguments by 1
      var args = arraySlice.call( arguments, 1 );
      return methodCall( this, arg0, args );
    }
    // just $().plugin({ options })
    plainCall( this, arg0 );
    return this;
  };

  // $().plugin('methodName')
  function methodCall( $elems, methodName, args ) {
    var returnValue;
    var pluginMethodStr = '$().' + namespace + '("' + methodName + '")';

    $elems.each( function( i, elem ) {
      // get instance
      var instance = $.data( elem, namespace );
      if ( !instance ) {
        logError( namespace + ' not initialized. Cannot call methods, i.e. ' +
          pluginMethodStr );
        return;
      }

      var method = instance[ methodName ];
      if ( !method || methodName.charAt(0) == '_' ) {
        logError( pluginMethodStr + ' is not a valid method' );
        return;
      }

      // apply method, get return value
      var value = method.apply( instance, args );
      // set return value if value is returned, use only first value
      returnValue = returnValue === undefined ? value : returnValue;
    });

    return returnValue !== undefined ? returnValue : $elems;
  }

  function plainCall( $elems, options ) {
    $elems.each( function( i, elem ) {
      var instance = $.data( elem, namespace );
      if ( instance ) {
        // set options & init
        instance.option( options );
        instance._init();
      } else {
        // initialize new instance
        instance = new PluginClass( elem, options );
        $.data( elem, namespace, instance );
      }
    });
  }

  updateJQuery( $ );

}

// ----- updateJQuery ----- //

// set $.bridget for v1 backwards compatibility
function updateJQuery( $ ) {
  if ( !$ || ( $ && $.bridget ) ) {
    return;
  }
  $.bridget = jQueryBridget;
}

updateJQuery( jQuery || window.jQuery );

// -----  ----- //

return jQueryBridget;

}));

/**
 * EvEmitter v1.1.0
 * Lil' event emitter
 * MIT License
 */

/* jshint unused: true, undef: true, strict: true */

( function( global, factory ) {
  // universal module definition
  /* jshint strict: false */ /* globals define, module, window */
  if ( typeof define == 'function' && define.amd ) {
    // AMD - RequireJS
    define( 'ev-emitter/ev-emitter',factory );
  } else if ( typeof module == 'object' && module.exports ) {
    // CommonJS - Browserify, Webpack
    module.exports = factory();
  } else {
    // Browser globals
    global.EvEmitter = factory();
  }

}( typeof window != 'undefined' ? window : this, function() {



function EvEmitter() {}

var proto = EvEmitter.prototype;

proto.on = function( eventName, listener ) {
  if ( !eventName || !listener ) {
    return;
  }
  // set events hash
  var events = this._events = this._events || {};
  // set listeners array
  var listeners = events[ eventName ] = events[ eventName ] || [];
  // only add once
  if ( listeners.indexOf( listener ) == -1 ) {
    listeners.push( listener );
  }

  return this;
};

proto.once = function( eventName, listener ) {
  if ( !eventName || !listener ) {
    return;
  }
  // add event
  this.on( eventName, listener );
  // set once flag
  // set onceEvents hash
  var onceEvents = this._onceEvents = this._onceEvents || {};
  // set onceListeners object
  var onceListeners = onceEvents[ eventName ] = onceEvents[ eventName ] || {};
  // set flag
  onceListeners[ listener ] = true;

  return this;
};

proto.off = function( eventName, listener ) {
  var listeners = this._events && this._events[ eventName ];
  if ( !listeners || !listeners.length ) {
    return;
  }
  var index = listeners.indexOf( listener );
  if ( index != -1 ) {
    listeners.splice( index, 1 );
  }

  return this;
};

proto.emitEvent = function( eventName, args ) {
  var listeners = this._events && this._events[ eventName ];
  if ( !listeners || !listeners.length ) {
    return;
  }
  // copy over to avoid interference if .off() in listener
  listeners = listeners.slice(0);
  args = args || [];
  // once stuff
  var onceListeners = this._onceEvents && this._onceEvents[ eventName ];

  for ( var i=0; i < listeners.length; i++ ) {
    var listener = listeners[i]
    var isOnce = onceListeners && onceListeners[ listener ];
    if ( isOnce ) {
      // remove listener
      // remove before trigger to prevent recursion
      this.off( eventName, listener );
      // unset once flag
      delete onceListeners[ listener ];
    }
    // trigger listener
    listener.apply( this, args );
  }

  return this;
};

proto.allOff = function() {
  delete this._events;
  delete this._onceEvents;
};

return EvEmitter;

}));

/*!
 * getSize v2.0.3
 * measure size of elements
 * MIT license
 */

/* jshint browser: true, strict: true, undef: true, unused: true */
/* globals console: false */

( function( window, factory ) {
  /* jshint strict: false */ /* globals define, module */
  if ( typeof define == 'function' && define.amd ) {
    // AMD
    define( 'get-size/get-size',factory );
  } else if ( typeof module == 'object' && module.exports ) {
    // CommonJS
    module.exports = factory();
  } else {
    // browser global
    window.getSize = factory();
  }

})( window, function factory() {
'use strict';

// -------------------------- helpers -------------------------- //

// get a number from a string, not a percentage
function getStyleSize( value ) {
  var num = parseFloat( value );
  // not a percent like '100%', and a number
  var isValid = value.indexOf('%') == -1 && !isNaN( num );
  return isValid && num;
}

function noop() {}

var logError = typeof console == 'undefined' ? noop :
  function( message ) {
    console.error( message );
  };

// -------------------------- measurements -------------------------- //

var measurements = [
  'paddingLeft',
  'paddingRight',
  'paddingTop',
  'paddingBottom',
  'marginLeft',
  'marginRight',
  'marginTop',
  'marginBottom',
  'borderLeftWidth',
  'borderRightWidth',
  'borderTopWidth',
  'borderBottomWidth'
];

var measurementsLength = measurements.length;

function getZeroSize() {
  var size = {
    width: 0,
    height: 0,
    innerWidth: 0,
    innerHeight: 0,
    outerWidth: 0,
    outerHeight: 0
  };
  for ( var i=0; i < measurementsLength; i++ ) {
    var measurement = measurements[i];
    size[ measurement ] = 0;
  }
  return size;
}

// -------------------------- getStyle -------------------------- //

/**
 * getStyle, get style of element, check for Firefox bug
 * https://bugzilla.mozilla.org/show_bug.cgi?id=548397
 */
function getStyle( elem ) {
  var style = getComputedStyle( elem );
  if ( !style ) {
    logError( 'Style returned ' + style +
      '. Are you running this code in a hidden iframe on Firefox? ' +
      'See https://bit.ly/getsizebug1' );
  }
  return style;
}

// -------------------------- setup -------------------------- //

var isSetup = false;

var isBoxSizeOuter;

/**
 * setup
 * check isBoxSizerOuter
 * do on first getSize() rather than on page load for Firefox bug
 */
function setup() {
  // setup once
  if ( isSetup ) {
    return;
  }
  isSetup = true;

  // -------------------------- box sizing -------------------------- //

  /**
   * Chrome & Safari measure the outer-width on style.width on border-box elems
   * IE11 & Firefox<29 measures the inner-width
   */
  var div = document.createElement('div');
  div.style.width = '200px';
  div.style.padding = '1px 2px 3px 4px';
  div.style.borderStyle = 'solid';
  div.style.borderWidth = '1px 2px 3px 4px';
  div.style.boxSizing = 'border-box';

  var body = document.body || document.documentElement;
  body.appendChild( div );
  var style = getStyle( div );
  // round value for browser zoom. desandro/masonry#928
  isBoxSizeOuter = Math.round( getStyleSize( style.width ) ) == 200;
  getSize.isBoxSizeOuter = isBoxSizeOuter;

  body.removeChild( div );
}

// -------------------------- getSize -------------------------- //

function getSize( elem ) {
  setup();

  // use querySeletor if elem is string
  if ( typeof elem == 'string' ) {
    elem = document.querySelector( elem );
  }

  // do not proceed on non-objects
  if ( !elem || typeof elem != 'object' || !elem.nodeType ) {
    return;
  }

  var style = getStyle( elem );

  // if hidden, everything is 0
  if ( style.display == 'none' ) {
    return getZeroSize();
  }

  var size = {};
  size.width = elem.offsetWidth;
  size.height = elem.offsetHeight;

  var isBorderBox = size.isBorderBox = style.boxSizing == 'border-box';

  // get all measurements
  for ( var i=0; i < measurementsLength; i++ ) {
    var measurement = measurements[i];
    var value = style[ measurement ];
    var num = parseFloat( value );
    // any 'auto', 'medium' value will be 0
    size[ measurement ] = !isNaN( num ) ? num : 0;
  }

  var paddingWidth = size.paddingLeft + size.paddingRight;
  var paddingHeight = size.paddingTop + size.paddingBottom;
  var marginWidth = size.marginLeft + size.marginRight;
  var marginHeight = size.marginTop + size.marginBottom;
  var borderWidth = size.borderLeftWidth + size.borderRightWidth;
  var borderHeight = size.borderTopWidth + size.borderBottomWidth;

  var isBorderBoxSizeOuter = isBorderBox && isBoxSizeOuter;

  // overwrite width and height if we can get it from style
  var styleWidth = getStyleSize( style.width );
  if ( styleWidth !== false ) {
    size.width = styleWidth +
      // add padding and border unless it's already including it
      ( isBorderBoxSizeOuter ? 0 : paddingWidth + borderWidth );
  }

  var styleHeight = getStyleSize( style.height );
  if ( styleHeight !== false ) {
    size.height = styleHeight +
      // add padding and border unless it's already including it
      ( isBorderBoxSizeOuter ? 0 : paddingHeight + borderHeight );
  }

  size.innerWidth = size.width - ( paddingWidth + borderWidth );
  size.innerHeight = size.height - ( paddingHeight + borderHeight );

  size.outerWidth = size.width + marginWidth;
  size.outerHeight = size.height + marginHeight;

  return size;
}

return getSize;

});

/**
 * matchesSelector v2.0.2
 * matchesSelector( element, '.selector' )
 * MIT license
 */

/*jshint browser: true, strict: true, undef: true, unused: true */

( function( window, factory ) {
  /*global define: false, module: false */
  'use strict';
  // universal module definition
  if ( typeof define == 'function' && define.amd ) {
    // AMD
    define( 'desandro-matches-selector/matches-selector',factory );
  } else if ( typeof module == 'object' && module.exports ) {
    // CommonJS
    module.exports = factory();
  } else {
    // browser global
    window.matchesSelector = factory();
  }

}( window, function factory() {
  'use strict';

  var matchesMethod = ( function() {
    var ElemProto = window.Element.prototype;
    // check for the standard method name first
    if ( ElemProto.matches ) {
      return 'matches';
    }
    // check un-prefixed
    if ( ElemProto.matchesSelector ) {
      return 'matchesSelector';
    }
    // check vendor prefixes
    var prefixes = [ 'webkit', 'moz', 'ms', 'o' ];

    for ( var i=0; i < prefixes.length; i++ ) {
      var prefix = prefixes[i];
      var method = prefix + 'MatchesSelector';
      if ( ElemProto[ method ] ) {
        return method;
      }
    }
  })();

  return function matchesSelector( elem, selector ) {
    return elem[ matchesMethod ]( selector );
  };

}));

/**
 * Fizzy UI utils v2.0.7
 * MIT license
 */

/*jshint browser: true, undef: true, unused: true, strict: true */

( function( window, factory ) {
  // universal module definition
  /*jshint strict: false */ /*globals define, module, require */

  if ( typeof define == 'function' && define.amd ) {
    // AMD
    define( 'fizzy-ui-utils/utils',[
      'desandro-matches-selector/matches-selector'
    ], function( matchesSelector ) {
      return factory( window, matchesSelector );
    });
  } else if ( typeof module == 'object' && module.exports ) {
    // CommonJS
    module.exports = factory(
      window,
      require('desandro-matches-selector')
    );
  } else {
    // browser global
    window.fizzyUIUtils = factory(
      window,
      window.matchesSelector
    );
  }

}( window, function factory( window, matchesSelector ) {



var utils = {};

// ----- extend ----- //

// extends objects
utils.extend = function( a, b ) {
  for ( var prop in b ) {
    a[ prop ] = b[ prop ];
  }
  return a;
};

// ----- modulo ----- //

utils.modulo = function( num, div ) {
  return ( ( num % div ) + div ) % div;
};

// ----- makeArray ----- //

var arraySlice = Array.prototype.slice;

// turn element or nodeList into an array
utils.makeArray = function( obj ) {
  if ( Array.isArray( obj ) ) {
    // use object if already an array
    return obj;
  }
  // return empty array if undefined or null. #6
  if ( obj === null || obj === undefined ) {
    return [];
  }

  var isArrayLike = typeof obj == 'object' && typeof obj.length == 'number';
  if ( isArrayLike ) {
    // convert nodeList to array
    return arraySlice.call( obj );
  }

  // array of single index
  return [ obj ];
};

// ----- removeFrom ----- //

utils.removeFrom = function( ary, obj ) {
  var index = ary.indexOf( obj );
  if ( index != -1 ) {
    ary.splice( index, 1 );
  }
};

// ----- getParent ----- //

utils.getParent = function( elem, selector ) {
  while ( elem.parentNode && elem != document.body ) {
    elem = elem.parentNode;
    if ( matchesSelector( elem, selector ) ) {
      return elem;
    }
  }
};

// ----- getQueryElement ----- //

// use element as selector string
utils.getQueryElement = function( elem ) {
  if ( typeof elem == 'string' ) {
    return document.querySelector( elem );
  }
  return elem;
};

// ----- handleEvent ----- //

// enable .ontype to trigger from .addEventListener( elem, 'type' )
utils.handleEvent = function( event ) {
  var method = 'on' + event.type;
  if ( this[ method ] ) {
    this[ method ]( event );
  }
};

// ----- filterFindElements ----- //

utils.filterFindElements = function( elems, selector ) {
  // make array of elems
  elems = utils.makeArray( elems );
  var ffElems = [];

  elems.forEach( function( elem ) {
    // check that elem is an actual element
    if ( !( elem instanceof HTMLElement ) ) {
      return;
    }
    // add elem if no selector
    if ( !selector ) {
      ffElems.push( elem );
      return;
    }
    // filter & find items if we have a selector
    // filter
    if ( matchesSelector( elem, selector ) ) {
      ffElems.push( elem );
    }
    // find children
    var childElems = elem.querySelectorAll( selector );
    // concat childElems to filterFound array
    for ( var i=0; i < childElems.length; i++ ) {
      ffElems.push( childElems[i] );
    }
  });

  return ffElems;
};

// ----- debounceMethod ----- //

utils.debounceMethod = function( _class, methodName, threshold ) {
  threshold = threshold || 100;
  // original method
  var method = _class.prototype[ methodName ];
  var timeoutName = methodName + 'Timeout';

  _class.prototype[ methodName ] = function() {
    var timeout = this[ timeoutName ];
    clearTimeout( timeout );

    var args = arguments;
    var _this = this;
    this[ timeoutName ] = setTimeout( function() {
      method.apply( _this, args );
      delete _this[ timeoutName ];
    }, threshold );
  };
};

// ----- docReady ----- //

utils.docReady = function( callback ) {
  var readyState = document.readyState;
  if ( readyState == 'complete' || readyState == 'interactive' ) {
    // do async to allow for other scripts to run. metafizzy/flickity#441
    setTimeout( callback );
  } else {
    document.addEventListener( 'DOMContentLoaded', callback );
  }
};

// ----- htmlInit ----- //

// http://jamesroberts.name/blog/2010/02/22/string-functions-for-javascript-trim-to-camel-case-to-dashed-and-to-underscore/
utils.toDashed = function( str ) {
  return str.replace( /(.)([A-Z])/g, function( match, $1, $2 ) {
    return $1 + '-' + $2;
  }).toLowerCase();
};

var console = window.console;
/**
 * allow user to initialize classes via [data-namespace] or .js-namespace class
 * htmlInit( Widget, 'widgetName' )
 * options are parsed from data-namespace-options
 */
utils.htmlInit = function( WidgetClass, namespace ) {
  utils.docReady( function() {
    var dashedNamespace = utils.toDashed( namespace );
    var dataAttr = 'data-' + dashedNamespace;
    var dataAttrElems = document.querySelectorAll( '[' + dataAttr + ']' );
    var jsDashElems = document.querySelectorAll( '.js-' + dashedNamespace );
    var elems = utils.makeArray( dataAttrElems )
      .concat( utils.makeArray( jsDashElems ) );
    var dataOptionsAttr = dataAttr + '-options';
    var jQuery = window.jQuery;

    elems.forEach( function( elem ) {
      var attr = elem.getAttribute( dataAttr ) ||
        elem.getAttribute( dataOptionsAttr );
      var options;
      try {
        options = attr && JSON.parse( attr );
      } catch ( error ) {
        // log error, do not initialize
        if ( console ) {
          console.error( 'Error parsing ' + dataAttr + ' on ' + elem.className +
          ': ' + error );
        }
        return;
      }
      // initialize
      var instance = new WidgetClass( elem, options );
      // make available via $().data('namespace')
      if ( jQuery ) {
        jQuery.data( elem, namespace, instance );
      }
    });

  });
};

// -----  ----- //

return utils;

}));

/**
 * Outlayer Item
 */

( function( window, factory ) {
  // universal module definition
  /* jshint strict: false */ /* globals define, module, require */
  if ( typeof define == 'function' && define.amd ) {
    // AMD - RequireJS
    define( 'outlayer/item',[
        'ev-emitter/ev-emitter',
        'get-size/get-size'
      ],
      factory
    );
  } else if ( typeof module == 'object' && module.exports ) {
    // CommonJS - Browserify, Webpack
    module.exports = factory(
      require('ev-emitter'),
      require('get-size')
    );
  } else {
    // browser global
    window.Outlayer = {};
    window.Outlayer.Item = factory(
      window.EvEmitter,
      window.getSize
    );
  }

}( window, function factory( EvEmitter, getSize ) {
'use strict';

// ----- helpers ----- //

function isEmptyObj( obj ) {
  for ( var prop in obj ) {
    return false;
  }
  prop = null;
  return true;
}

// -------------------------- CSS3 support -------------------------- //


var docElemStyle = document.documentElement.style;

var transitionProperty = typeof docElemStyle.transition == 'string' ?
  'transition' : 'WebkitTransition';
var transformProperty = typeof docElemStyle.transform == 'string' ?
  'transform' : 'WebkitTransform';

var transitionEndEvent = {
  WebkitTransition: 'webkitTransitionEnd',
  transition: 'transitionend'
}[ transitionProperty ];

// cache all vendor properties that could have vendor prefix
var vendorProperties = {
  transform: transformProperty,
  transition: transitionProperty,
  transitionDuration: transitionProperty + 'Duration',
  transitionProperty: transitionProperty + 'Property',
  transitionDelay: transitionProperty + 'Delay'
};

// -------------------------- Item -------------------------- //

function Item( element, layout ) {
  if ( !element ) {
    return;
  }

  this.element = element;
  // parent layout class, i.e. Masonry, Isotope, or Packery
  this.layout = layout;
  this.position = {
    x: 0,
    y: 0
  };

  this._create();
}

// inherit EvEmitter
var proto = Item.prototype = Object.create( EvEmitter.prototype );
proto.constructor = Item;

proto._create = function() {
  // transition objects
  this._transn = {
    ingProperties: {},
    clean: {},
    onEnd: {}
  };

  this.css({
    position: 'absolute'
  });
};

// trigger specified handler for event type
proto.handleEvent = function( event ) {
  var method = 'on' + event.type;
  if ( this[ method ] ) {
    this[ method ]( event );
  }
};

proto.getSize = function() {
  this.size = getSize( this.element );
};

/**
 * apply CSS styles to element
 * @param {Object} style
 */
proto.css = function( style ) {
  var elemStyle = this.element.style;

  for ( var prop in style ) {
    // use vendor property if available
    var supportedProp = vendorProperties[ prop ] || prop;
    elemStyle[ supportedProp ] = style[ prop ];
  }
};

 // measure position, and sets it
proto.getPosition = function() {
  var style = getComputedStyle( this.element );
  var isOriginLeft = this.layout._getOption('originLeft');
  var isOriginTop = this.layout._getOption('originTop');
  var xValue = style[ isOriginLeft ? 'left' : 'right' ];
  var yValue = style[ isOriginTop ? 'top' : 'bottom' ];
  var x = parseFloat( xValue );
  var y = parseFloat( yValue );
  // convert percent to pixels
  var layoutSize = this.layout.size;
  if ( xValue.indexOf('%') != -1 ) {
    x = ( x / 100 ) * layoutSize.width;
  }
  if ( yValue.indexOf('%') != -1 ) {
    y = ( y / 100 ) * layoutSize.height;
  }
  // clean up 'auto' or other non-integer values
  x = isNaN( x ) ? 0 : x;
  y = isNaN( y ) ? 0 : y;
  // remove padding from measurement
  x -= isOriginLeft ? layoutSize.paddingLeft : layoutSize.paddingRight;
  y -= isOriginTop ? layoutSize.paddingTop : layoutSize.paddingBottom;

  this.position.x = x;
  this.position.y = y;
};

// set settled position, apply padding
proto.layoutPosition = function() {
  var layoutSize = this.layout.size;
  var style = {};
  var isOriginLeft = this.layout._getOption('originLeft');
  var isOriginTop = this.layout._getOption('originTop');

  // x
  var xPadding = isOriginLeft ? 'paddingLeft' : 'paddingRight';
  var xProperty = isOriginLeft ? 'left' : 'right';
  var xResetProperty = isOriginLeft ? 'right' : 'left';

  var x = this.position.x + layoutSize[ xPadding ];
  // set in percentage or pixels
  style[ xProperty ] = this.getXValue( x );
  // reset other property
  style[ xResetProperty ] = '';

  // y
  var yPadding = isOriginTop ? 'paddingTop' : 'paddingBottom';
  var yProperty = isOriginTop ? 'top' : 'bottom';
  var yResetProperty = isOriginTop ? 'bottom' : 'top';

  var y = this.position.y + layoutSize[ yPadding ];
  // set in percentage or pixels
  style[ yProperty ] = this.getYValue( y );
  // reset other property
  style[ yResetProperty ] = '';

  this.css( style );
  this.emitEvent( 'layout', [ this ] );
};

proto.getXValue = function( x ) {
  var isHorizontal = this.layout._getOption('horizontal');
  return this.layout.options.percentPosition && !isHorizontal ?
    ( ( x / this.layout.size.width ) * 100 ) + '%' : x + 'px';
};

proto.getYValue = function( y ) {
  var isHorizontal = this.layout._getOption('horizontal');
  return this.layout.options.percentPosition && isHorizontal ?
    ( ( y / this.layout.size.height ) * 100 ) + '%' : y + 'px';
};

proto._transitionTo = function( x, y ) {
  this.getPosition();
  // get current x & y from top/left
  var curX = this.position.x;
  var curY = this.position.y;

  var didNotMove = x == this.position.x && y == this.position.y;

  // save end position
  this.setPosition( x, y );

  // if did not move and not transitioning, just go to layout
  if ( didNotMove && !this.isTransitioning ) {
    this.layoutPosition();
    return;
  }

  var transX = x - curX;
  var transY = y - curY;
  var transitionStyle = {};
  transitionStyle.transform = this.getTranslate( transX, transY );

  this.transition({
    to: transitionStyle,
    onTransitionEnd: {
      transform: this.layoutPosition
    },
    isCleaning: true
  });
};

proto.getTranslate = function( x, y ) {
  // flip cooridinates if origin on right or bottom
  var isOriginLeft = this.layout._getOption('originLeft');
  var isOriginTop = this.layout._getOption('originTop');
  x = isOriginLeft ? x : -x;
  y = isOriginTop ? y : -y;
  return 'translate3d(' + x + 'px, ' + y + 'px, 0)';
};

// non transition + transform support
proto.goTo = function( x, y ) {
  this.setPosition( x, y );
  this.layoutPosition();
};

proto.moveTo = proto._transitionTo;

proto.setPosition = function( x, y ) {
  this.position.x = parseFloat( x );
  this.position.y = parseFloat( y );
};

// ----- transition ----- //

/**
 * @param {Object} style - CSS
 * @param {Function} onTransitionEnd
 */

// non transition, just trigger callback
proto._nonTransition = function( args ) {
  this.css( args.to );
  if ( args.isCleaning ) {
    this._removeStyles( args.to );
  }
  for ( var prop in args.onTransitionEnd ) {
    args.onTransitionEnd[ prop ].call( this );
  }
};

/**
 * proper transition
 * @param {Object} args - arguments
 *   @param {Object} to - style to transition to
 *   @param {Object} from - style to start transition from
 *   @param {Boolean} isCleaning - removes transition styles after transition
 *   @param {Function} onTransitionEnd - callback
 */
proto.transition = function( args ) {
  // redirect to nonTransition if no transition duration
  if ( !parseFloat( this.layout.options.transitionDuration ) ) {
    this._nonTransition( args );
    return;
  }

  var _transition = this._transn;
  // keep track of onTransitionEnd callback by css property
  for ( var prop in args.onTransitionEnd ) {
    _transition.onEnd[ prop ] = args.onTransitionEnd[ prop ];
  }
  // keep track of properties that are transitioning
  for ( prop in args.to ) {
    _transition.ingProperties[ prop ] = true;
    // keep track of properties to clean up when transition is done
    if ( args.isCleaning ) {
      _transition.clean[ prop ] = true;
    }
  }

  // set from styles
  if ( args.from ) {
    this.css( args.from );
    // force redraw. http://blog.alexmaccaw.com/css-transitions
    var h = this.element.offsetHeight;
    // hack for JSHint to hush about unused var
    h = null;
  }
  // enable transition
  this.enableTransition( args.to );
  // set styles that are transitioning
  this.css( args.to );

  this.isTransitioning = true;

};

// dash before all cap letters, including first for
// WebkitTransform => -webkit-transform
function toDashedAll( str ) {
  return str.replace( /([A-Z])/g, function( $1 ) {
    return '-' + $1.toLowerCase();
  });
}

var transitionProps = 'opacity,' + toDashedAll( transformProperty );

proto.enableTransition = function(/* style */) {
  // HACK changing transitionProperty during a transition
  // will cause transition to jump
  if ( this.isTransitioning ) {
    return;
  }

  // make `transition: foo, bar, baz` from style object
  // HACK un-comment this when enableTransition can work
  // while a transition is happening
  // var transitionValues = [];
  // for ( var prop in style ) {
  //   // dash-ify camelCased properties like WebkitTransition
  //   prop = vendorProperties[ prop ] || prop;
  //   transitionValues.push( toDashedAll( prop ) );
  // }
  // munge number to millisecond, to match stagger
  var duration = this.layout.options.transitionDuration;
  duration = typeof duration == 'number' ? duration + 'ms' : duration;
  // enable transition styles
  this.css({
    transitionProperty: transitionProps,
    transitionDuration: duration,
    transitionDelay: this.staggerDelay || 0
  });
  // listen for transition end event
  this.element.addEventListener( transitionEndEvent, this, false );
};

// ----- events ----- //

proto.onwebkitTransitionEnd = function( event ) {
  this.ontransitionend( event );
};

proto.onotransitionend = function( event ) {
  this.ontransitionend( event );
};

// properties that I munge to make my life easier
var dashedVendorProperties = {
  '-webkit-transform': 'transform'
};

proto.ontransitionend = function( event ) {
  // disregard bubbled events from children
  if ( event.target !== this.element ) {
    return;
  }
  var _transition = this._transn;
  // get property name of transitioned property, convert to prefix-free
  var propertyName = dashedVendorProperties[ event.propertyName ] || event.propertyName;

  // remove property that has completed transitioning
  delete _transition.ingProperties[ propertyName ];
  // check if any properties are still transitioning
  if ( isEmptyObj( _transition.ingProperties ) ) {
    // all properties have completed transitioning
    this.disableTransition();
  }
  // clean style
  if ( propertyName in _transition.clean ) {
    // clean up style
    this.element.style[ event.propertyName ] = '';
    delete _transition.clean[ propertyName ];
  }
  // trigger onTransitionEnd callback
  if ( propertyName in _transition.onEnd ) {
    var onTransitionEnd = _transition.onEnd[ propertyName ];
    onTransitionEnd.call( this );
    delete _transition.onEnd[ propertyName ];
  }

  this.emitEvent( 'transitionEnd', [ this ] );
};

proto.disableTransition = function() {
  this.removeTransitionStyles();
  this.element.removeEventListener( transitionEndEvent, this, false );
  this.isTransitioning = false;
};

/**
 * removes style property from element
 * @param {Object} style
**/
proto._removeStyles = function( style ) {
  // clean up transition styles
  var cleanStyle = {};
  for ( var prop in style ) {
    cleanStyle[ prop ] = '';
  }
  this.css( cleanStyle );
};

var cleanTransitionStyle = {
  transitionProperty: '',
  transitionDuration: '',
  transitionDelay: ''
};

proto.removeTransitionStyles = function() {
  // remove transition
  this.css( cleanTransitionStyle );
};

// ----- stagger ----- //

proto.stagger = function( delay ) {
  delay = isNaN( delay ) ? 0 : delay;
  this.staggerDelay = delay + 'ms';
};

// ----- show/hide/remove ----- //

// remove element from DOM
proto.removeElem = function() {
  this.element.parentNode.removeChild( this.element );
  // remove display: none
  this.css({ display: '' });
  this.emitEvent( 'remove', [ this ] );
};

proto.remove = function() {
  // just remove element if no transition support or no transition
  if ( !transitionProperty || !parseFloat( this.layout.options.transitionDuration ) ) {
    this.removeElem();
    return;
  }

  // start transition
  this.once( 'transitionEnd', function() {
    this.removeElem();
  });
  this.hide();
};

proto.reveal = function() {
  delete this.isHidden;
  // remove display: none
  this.css({ display: '' });

  var options = this.layout.options;

  var onTransitionEnd = {};
  var transitionEndProperty = this.getHideRevealTransitionEndProperty('visibleStyle');
  onTransitionEnd[ transitionEndProperty ] = this.onRevealTransitionEnd;

  this.transition({
    from: options.hiddenStyle,
    to: options.visibleStyle,
    isCleaning: true,
    onTransitionEnd: onTransitionEnd
  });
};

proto.onRevealTransitionEnd = function() {
  // check if still visible
  // during transition, item may have been hidden
  if ( !this.isHidden ) {
    this.emitEvent('reveal');
  }
};

/**
 * get style property use for hide/reveal transition end
 * @param {String} styleProperty - hiddenStyle/visibleStyle
 * @returns {String}
 */
proto.getHideRevealTransitionEndProperty = function( styleProperty ) {
  var optionStyle = this.layout.options[ styleProperty ];
  // use opacity
  if ( optionStyle.opacity ) {
    return 'opacity';
  }
  // get first property
  for ( var prop in optionStyle ) {
    return prop;
  }
};

proto.hide = function() {
  // set flag
  this.isHidden = true;
  // remove display: none
  this.css({ display: '' });

  var options = this.layout.options;

  var onTransitionEnd = {};
  var transitionEndProperty = this.getHideRevealTransitionEndProperty('hiddenStyle');
  onTransitionEnd[ transitionEndProperty ] = this.onHideTransitionEnd;

  this.transition({
    from: options.visibleStyle,
    to: options.hiddenStyle,
    // keep hidden stuff hidden
    isCleaning: true,
    onTransitionEnd: onTransitionEnd
  });
};

proto.onHideTransitionEnd = function() {
  // check if still hidden
  // during transition, item may have been un-hidden
  if ( this.isHidden ) {
    this.css({ display: 'none' });
    this.emitEvent('hide');
  }
};

proto.destroy = function() {
  this.css({
    position: '',
    left: '',
    right: '',
    top: '',
    bottom: '',
    transition: '',
    transform: ''
  });
};

return Item;

}));

/*!
 * Outlayer v2.1.1
 * the brains and guts of a layout library
 * MIT license
 */

( function( window, factory ) {
  'use strict';
  // universal module definition
  /* jshint strict: false */ /* globals define, module, require */
  if ( typeof define == 'function' && define.amd ) {
    // AMD - RequireJS
    define( 'outlayer/outlayer',[
        'ev-emitter/ev-emitter',
        'get-size/get-size',
        'fizzy-ui-utils/utils',
        './item'
      ],
      function( EvEmitter, getSize, utils, Item ) {
        return factory( window, EvEmitter, getSize, utils, Item);
      }
    );
  } else if ( typeof module == 'object' && module.exports ) {
    // CommonJS - Browserify, Webpack
    module.exports = factory(
      window,
      require('ev-emitter'),
      require('get-size'),
      require('fizzy-ui-utils'),
      require('./item')
    );
  } else {
    // browser global
    window.Outlayer = factory(
      window,
      window.EvEmitter,
      window.getSize,
      window.fizzyUIUtils,
      window.Outlayer.Item
    );
  }

}( window, function factory( window, EvEmitter, getSize, utils, Item ) {
'use strict';

// ----- vars ----- //

var console = window.console;
var jQuery = window.jQuery;
var noop = function() {};

// -------------------------- Outlayer -------------------------- //

// globally unique identifiers
var GUID = 0;
// internal store of all Outlayer intances
var instances = {};


/**
 * @param {Element, String} element
 * @param {Object} options
 * @constructor
 */
function Outlayer( element, options ) {
  var queryElement = utils.getQueryElement( element );
  if ( !queryElement ) {
    if ( console ) {
      console.error( 'Bad element for ' + this.constructor.namespace +
        ': ' + ( queryElement || element ) );
    }
    return;
  }
  this.element = queryElement;
  // add jQuery
  if ( jQuery ) {
    this.$element = jQuery( this.element );
  }

  // options
  this.options = utils.extend( {}, this.constructor.defaults );
  this.option( options );

  // add id for Outlayer.getFromElement
  var id = ++GUID;
  this.element.outlayerGUID = id; // expando
  instances[ id ] = this; // associate via id

  // kick it off
  this._create();

  var isInitLayout = this._getOption('initLayout');
  if ( isInitLayout ) {
    this.layout();
  }
}

// settings are for internal use only
Outlayer.namespace = 'outlayer';
Outlayer.Item = Item;

// default options
Outlayer.defaults = {
  containerStyle: {
    position: 'relative'
  },
  initLayout: true,
  originLeft: true,
  originTop: true,
  resize: true,
  resizeContainer: true,
  // item options
  transitionDuration: '0.4s',
  hiddenStyle: {
    opacity: 0,
    transform: 'scale(0.001)'
  },
  visibleStyle: {
    opacity: 1,
    transform: 'scale(1)'
  }
};

var proto = Outlayer.prototype;
// inherit EvEmitter
utils.extend( proto, EvEmitter.prototype );

/**
 * set options
 * @param {Object} opts
 */
proto.option = function( opts ) {
  utils.extend( this.options, opts );
};

/**
 * get backwards compatible option value, check old name
 */
proto._getOption = function( option ) {
  var oldOption = this.constructor.compatOptions[ option ];
  return oldOption && this.options[ oldOption ] !== undefined ?
    this.options[ oldOption ] : this.options[ option ];
};

Outlayer.compatOptions = {
  // currentName: oldName
  initLayout: 'isInitLayout',
  horizontal: 'isHorizontal',
  layoutInstant: 'isLayoutInstant',
  originLeft: 'isOriginLeft',
  originTop: 'isOriginTop',
  resize: 'isResizeBound',
  resizeContainer: 'isResizingContainer'
};

proto._create = function() {
  // get items from children
  this.reloadItems();
  // elements that affect layout, but are not laid out
  this.stamps = [];
  this.stamp( this.options.stamp );
  // set container style
  utils.extend( this.element.style, this.options.containerStyle );

  // bind resize method
  var canBindResize = this._getOption('resize');
  if ( canBindResize ) {
    this.bindResize();
  }
};

// goes through all children again and gets bricks in proper order
proto.reloadItems = function() {
  // collection of item elements
  this.items = this._itemize( this.element.children );
};


/**
 * turn elements into Outlayer.Items to be used in layout
 * @param {Array or NodeList or HTMLElement} elems
 * @returns {Array} items - collection of new Outlayer Items
 */
proto._itemize = function( elems ) {

  var itemElems = this._filterFindItemElements( elems );
  var Item = this.constructor.Item;

  // create new Outlayer Items for collection
  var items = [];
  for ( var i=0; i < itemElems.length; i++ ) {
    var elem = itemElems[i];
    var item = new Item( elem, this );
    items.push( item );
  }

  return items;
};

/**
 * get item elements to be used in layout
 * @param {Array or NodeList or HTMLElement} elems
 * @returns {Array} items - item elements
 */
proto._filterFindItemElements = function( elems ) {
  return utils.filterFindElements( elems, this.options.itemSelector );
};

/**
 * getter method for getting item elements
 * @returns {Array} elems - collection of item elements
 */
proto.getItemElements = function() {
  return this.items.map( function( item ) {
    return item.element;
  });
};

// ----- init & layout ----- //

/**
 * lays out all items
 */
proto.layout = function() {
  this._resetLayout();
  this._manageStamps();

  // don't animate first layout
  var layoutInstant = this._getOption('layoutInstant');
  var isInstant = layoutInstant !== undefined ?
    layoutInstant : !this._isLayoutInited;
  this.layoutItems( this.items, isInstant );

  // flag for initalized
  this._isLayoutInited = true;
};

// _init is alias for layout
proto._init = proto.layout;

/**
 * logic before any new layout
 */
proto._resetLayout = function() {
  this.getSize();
};


proto.getSize = function() {
  this.size = getSize( this.element );
};

/**
 * get measurement from option, for columnWidth, rowHeight, gutter
 * if option is String -> get element from selector string, & get size of element
 * if option is Element -> get size of element
 * else use option as a number
 *
 * @param {String} measurement
 * @param {String} size - width or height
 * @private
 */
proto._getMeasurement = function( measurement, size ) {
  var option = this.options[ measurement ];
  var elem;
  if ( !option ) {
    // default to 0
    this[ measurement ] = 0;
  } else {
    // use option as an element
    if ( typeof option == 'string' ) {
      elem = this.element.querySelector( option );
    } else if ( option instanceof HTMLElement ) {
      elem = option;
    }
    // use size of element, if element
    this[ measurement ] = elem ? getSize( elem )[ size ] : option;
  }
};

/**
 * layout a collection of item elements
 * @api public
 */
proto.layoutItems = function( items, isInstant ) {
  items = this._getItemsForLayout( items );

  this._layoutItems( items, isInstant );

  this._postLayout();
};

/**
 * get the items to be laid out
 * you may want to skip over some items
 * @param {Array} items
 * @returns {Array} items
 */
proto._getItemsForLayout = function( items ) {
  return items.filter( function( item ) {
    return !item.isIgnored;
  });
};

/**
 * layout items
 * @param {Array} items
 * @param {Boolean} isInstant
 */
proto._layoutItems = function( items, isInstant ) {
  this._emitCompleteOnItems( 'layout', items );

  if ( !items || !items.length ) {
    // no items, emit event with empty array
    return;
  }

  var queue = [];

  items.forEach( function( item ) {
    // get x/y object from method
    var position = this._getItemLayoutPosition( item );
    // enqueue
    position.item = item;
    position.isInstant = isInstant || item.isLayoutInstant;
    queue.push( position );
  }, this );

  this._processLayoutQueue( queue );
};

/**
 * get item layout position
 * @param {Outlayer.Item} item
 * @returns {Object} x and y position
 */
proto._getItemLayoutPosition = function( /* item */ ) {
  return {
    x: 0,
    y: 0
  };
};

/**
 * iterate over array and position each item
 * Reason being - separating this logic prevents 'layout invalidation'
 * thx @paul_irish
 * @param {Array} queue
 */
proto._processLayoutQueue = function( queue ) {
  this.updateStagger();
  queue.forEach( function( obj, i ) {
    this._positionItem( obj.item, obj.x, obj.y, obj.isInstant, i );
  }, this );
};

// set stagger from option in milliseconds number
proto.updateStagger = function() {
  var stagger = this.options.stagger;
  if ( stagger === null || stagger === undefined ) {
    this.stagger = 0;
    return;
  }
  this.stagger = getMilliseconds( stagger );
  return this.stagger;
};

/**
 * Sets position of item in DOM
 * @param {Outlayer.Item} item
 * @param {Number} x - horizontal position
 * @param {Number} y - vertical position
 * @param {Boolean} isInstant - disables transitions
 */
proto._positionItem = function( item, x, y, isInstant, i ) {
  if ( isInstant ) {
    // if not transition, just set CSS
    item.goTo( x, y );
  } else {
    item.stagger( i * this.stagger );
    item.moveTo( x, y );
  }
};

/**
 * Any logic you want to do after each layout,
 * i.e. size the container
 */
proto._postLayout = function() {
  this.resizeContainer();
};

proto.resizeContainer = function() {
  var isResizingContainer = this._getOption('resizeContainer');
  if ( !isResizingContainer ) {
    return;
  }
  var size = this._getContainerSize();
  if ( size ) {
    this._setContainerMeasure( size.width, true );
    this._setContainerMeasure( size.height, false );
  }
};

/**
 * Sets width or height of container if returned
 * @returns {Object} size
 *   @param {Number} width
 *   @param {Number} height
 */
proto._getContainerSize = noop;

/**
 * @param {Number} measure - size of width or height
 * @param {Boolean} isWidth
 */
proto._setContainerMeasure = function( measure, isWidth ) {
  if ( measure === undefined ) {
    return;
  }

  var elemSize = this.size;
  // add padding and border width if border box
  if ( elemSize.isBorderBox ) {
    measure += isWidth ? elemSize.paddingLeft + elemSize.paddingRight +
      elemSize.borderLeftWidth + elemSize.borderRightWidth :
      elemSize.paddingBottom + elemSize.paddingTop +
      elemSize.borderTopWidth + elemSize.borderBottomWidth;
  }

  measure = Math.max( measure, 0 );
  this.element.style[ isWidth ? 'width' : 'height' ] = measure + 'px';
};

/**
 * emit eventComplete on a collection of items events
 * @param {String} eventName
 * @param {Array} items - Outlayer.Items
 */
proto._emitCompleteOnItems = function( eventName, items ) {
  var _this = this;
  function onComplete() {
    _this.dispatchEvent( eventName + 'Complete', null, [ items ] );
  }

  var count = items.length;
  if ( !items || !count ) {
    onComplete();
    return;
  }

  var doneCount = 0;
  function tick() {
    doneCount++;
    if ( doneCount == count ) {
      onComplete();
    }
  }

  // bind callback
  items.forEach( function( item ) {
    item.once( eventName, tick );
  });
};

/**
 * emits events via EvEmitter and jQuery events
 * @param {String} type - name of event
 * @param {Event} event - original event
 * @param {Array} args - extra arguments
 */
proto.dispatchEvent = function( type, event, args ) {
  // add original event to arguments
  var emitArgs = event ? [ event ].concat( args ) : args;
  this.emitEvent( type, emitArgs );

  if ( jQuery ) {
    // set this.$element
    this.$element = this.$element || jQuery( this.element );
    if ( event ) {
      // create jQuery event
      var $event = jQuery.Event( event );
      $event.type = type;
      this.$element.trigger( $event, args );
    } else {
      // just trigger with type if no event available
      this.$element.trigger( type, args );
    }
  }
};

// -------------------------- ignore & stamps -------------------------- //


/**
 * keep item in collection, but do not lay it out
 * ignored items do not get skipped in layout
 * @param {Element} elem
 */
proto.ignore = function( elem ) {
  var item = this.getItem( elem );
  if ( item ) {
    item.isIgnored = true;
  }
};

/**
 * return item to layout collection
 * @param {Element} elem
 */
proto.unignore = function( elem ) {
  var item = this.getItem( elem );
  if ( item ) {
    delete item.isIgnored;
  }
};

/**
 * adds elements to stamps
 * @param {NodeList, Array, Element, or String} elems
 */
proto.stamp = function( elems ) {
  elems = this._find( elems );
  if ( !elems ) {
    return;
  }

  this.stamps = this.stamps.concat( elems );
  // ignore
  elems.forEach( this.ignore, this );
};

/**
 * removes elements to stamps
 * @param {NodeList, Array, or Element} elems
 */
proto.unstamp = function( elems ) {
  elems = this._find( elems );
  if ( !elems ){
    return;
  }

  elems.forEach( function( elem ) {
    // filter out removed stamp elements
    utils.removeFrom( this.stamps, elem );
    this.unignore( elem );
  }, this );
};

/**
 * finds child elements
 * @param {NodeList, Array, Element, or String} elems
 * @returns {Array} elems
 */
proto._find = function( elems ) {
  if ( !elems ) {
    return;
  }
  // if string, use argument as selector string
  if ( typeof elems == 'string' ) {
    elems = this.element.querySelectorAll( elems );
  }
  elems = utils.makeArray( elems );
  return elems;
};

proto._manageStamps = function() {
  if ( !this.stamps || !this.stamps.length ) {
    return;
  }

  this._getBoundingRect();

  this.stamps.forEach( this._manageStamp, this );
};

// update boundingLeft / Top
proto._getBoundingRect = function() {
  // get bounding rect for container element
  var boundingRect = this.element.getBoundingClientRect();
  var size = this.size;
  this._boundingRect = {
    left: boundingRect.left + size.paddingLeft + size.borderLeftWidth,
    top: boundingRect.top + size.paddingTop + size.borderTopWidth,
    right: boundingRect.right - ( size.paddingRight + size.borderRightWidth ),
    bottom: boundingRect.bottom - ( size.paddingBottom + size.borderBottomWidth )
  };
};

/**
 * @param {Element} stamp
**/
proto._manageStamp = noop;

/**
 * get x/y position of element relative to container element
 * @param {Element} elem
 * @returns {Object} offset - has left, top, right, bottom
 */
proto._getElementOffset = function( elem ) {
  var boundingRect = elem.getBoundingClientRect();
  var thisRect = this._boundingRect;
  var size = getSize( elem );
  var offset = {
    left: boundingRect.left - thisRect.left - size.marginLeft,
    top: boundingRect.top - thisRect.top - size.marginTop,
    right: thisRect.right - boundingRect.right - size.marginRight,
    bottom: thisRect.bottom - boundingRect.bottom - size.marginBottom
  };
  return offset;
};

// -------------------------- resize -------------------------- //

// enable event handlers for listeners
// i.e. resize -> onresize
proto.handleEvent = utils.handleEvent;

/**
 * Bind layout to window resizing
 */
proto.bindResize = function() {
  window.addEventListener( 'resize', this );
  this.isResizeBound = true;
};

/**
 * Unbind layout to window resizing
 */
proto.unbindResize = function() {
  window.removeEventListener( 'resize', this );
  this.isResizeBound = false;
};

proto.onresize = function() {
  this.resize();
};

utils.debounceMethod( Outlayer, 'onresize', 100 );

proto.resize = function() {
  // don't trigger if size did not change
  // or if resize was unbound. See #9
  if ( !this.isResizeBound || !this.needsResizeLayout() ) {
    return;
  }

  this.layout();
};

/**
 * check if layout is needed post layout
 * @returns Boolean
 */
proto.needsResizeLayout = function() {
  var size = getSize( this.element );
  // check that this.size and size are there
  // IE8 triggers resize on body size change, so they might not be
  var hasSizes = this.size && size;
  return hasSizes && size.innerWidth !== this.size.innerWidth;
};

// -------------------------- methods -------------------------- //

/**
 * add items to Outlayer instance
 * @param {Array or NodeList or Element} elems
 * @returns {Array} items - Outlayer.Items
**/
proto.addItems = function( elems ) {
  var items = this._itemize( elems );
  // add items to collection
  if ( items.length ) {
    this.items = this.items.concat( items );
  }
  return items;
};

/**
 * Layout newly-appended item elements
 * @param {Array or NodeList or Element} elems
 */
proto.appended = function( elems ) {
  var items = this.addItems( elems );
  if ( !items.length ) {
    return;
  }
  // layout and reveal just the new items
  this.layoutItems( items, true );
  this.reveal( items );
};

/**
 * Layout prepended elements
 * @param {Array or NodeList or Element} elems
 */
proto.prepended = function( elems ) {
  var items = this._itemize( elems );
  if ( !items.length ) {
    return;
  }
  // add items to beginning of collection
  var previousItems = this.items.slice(0);
  this.items = items.concat( previousItems );
  // start new layout
  this._resetLayout();
  this._manageStamps();
  // layout new stuff without transition
  this.layoutItems( items, true );
  this.reveal( items );
  // layout previous items
  this.layoutItems( previousItems );
};

/**
 * reveal a collection of items
 * @param {Array of Outlayer.Items} items
 */
proto.reveal = function( items ) {
  this._emitCompleteOnItems( 'reveal', items );
  if ( !items || !items.length ) {
    return;
  }
  var stagger = this.updateStagger();
  items.forEach( function( item, i ) {
    item.stagger( i * stagger );
    item.reveal();
  });
};

/**
 * hide a collection of items
 * @param {Array of Outlayer.Items} items
 */
proto.hide = function( items ) {
  this._emitCompleteOnItems( 'hide', items );
  if ( !items || !items.length ) {
    return;
  }
  var stagger = this.updateStagger();
  items.forEach( function( item, i ) {
    item.stagger( i * stagger );
    item.hide();
  });
};

/**
 * reveal item elements
 * @param {Array}, {Element}, {NodeList} items
 */
proto.revealItemElements = function( elems ) {
  var items = this.getItems( elems );
  this.reveal( items );
};

/**
 * hide item elements
 * @param {Array}, {Element}, {NodeList} items
 */
proto.hideItemElements = function( elems ) {
  var items = this.getItems( elems );
  this.hide( items );
};

/**
 * get Outlayer.Item, given an Element
 * @param {Element} elem
 * @param {Function} callback
 * @returns {Outlayer.Item} item
 */
proto.getItem = function( elem ) {
  // loop through items to get the one that matches
  for ( var i=0; i < this.items.length; i++ ) {
    var item = this.items[i];
    if ( item.element == elem ) {
      // return item
      return item;
    }
  }
};

/**
 * get collection of Outlayer.Items, given Elements
 * @param {Array} elems
 * @returns {Array} items - Outlayer.Items
 */
proto.getItems = function( elems ) {
  elems = utils.makeArray( elems );
  var items = [];
  elems.forEach( function( elem ) {
    var item = this.getItem( elem );
    if ( item ) {
      items.push( item );
    }
  }, this );

  return items;
};

/**
 * remove element(s) from instance and DOM
 * @param {Array or NodeList or Element} elems
 */
proto.remove = function( elems ) {
  var removeItems = this.getItems( elems );

  this._emitCompleteOnItems( 'remove', removeItems );

  // bail if no items to remove
  if ( !removeItems || !removeItems.length ) {
    return;
  }

  removeItems.forEach( function( item ) {
    item.remove();
    // remove item from collection
    utils.removeFrom( this.items, item );
  }, this );
};

// ----- destroy ----- //

// remove and disable Outlayer instance
proto.destroy = function() {
  // clean up dynamic styles
  var style = this.element.style;
  style.height = '';
  style.position = '';
  style.width = '';
  // destroy items
  this.items.forEach( function( item ) {
    item.destroy();
  });

  this.unbindResize();

  var id = this.element.outlayerGUID;
  delete instances[ id ]; // remove reference to instance by id
  delete this.element.outlayerGUID;
  // remove data for jQuery
  if ( jQuery ) {
    jQuery.removeData( this.element, this.constructor.namespace );
  }

};

// -------------------------- data -------------------------- //

/**
 * get Outlayer instance from element
 * @param {Element} elem
 * @returns {Outlayer}
 */
Outlayer.data = function( elem ) {
  elem = utils.getQueryElement( elem );
  var id = elem && elem.outlayerGUID;
  return id && instances[ id ];
};


// -------------------------- create Outlayer class -------------------------- //

/**
 * create a layout class
 * @param {String} namespace
 */
Outlayer.create = function( namespace, options ) {
  // sub-class Outlayer
  var Layout = subclass( Outlayer );
  // apply new options and compatOptions
  Layout.defaults = utils.extend( {}, Outlayer.defaults );
  utils.extend( Layout.defaults, options );
  Layout.compatOptions = utils.extend( {}, Outlayer.compatOptions  );

  Layout.namespace = namespace;

  Layout.data = Outlayer.data;

  // sub-class Item
  Layout.Item = subclass( Item );

  // -------------------------- declarative -------------------------- //

  utils.htmlInit( Layout, namespace );

  // -------------------------- jQuery bridge -------------------------- //

  // make into jQuery plugin
  if ( jQuery && jQuery.bridget ) {
    jQuery.bridget( namespace, Layout );
  }

  return Layout;
};

function subclass( Parent ) {
  function SubClass() {
    Parent.apply( this, arguments );
  }

  SubClass.prototype = Object.create( Parent.prototype );
  SubClass.prototype.constructor = SubClass;

  return SubClass;
}

// ----- helpers ----- //

// how many milliseconds are in each unit
var msUnits = {
  ms: 1,
  s: 1000
};

// munge time-like parameter into millisecond number
// '0.4s' -> 40
function getMilliseconds( time ) {
  if ( typeof time == 'number' ) {
    return time;
  }
  var matches = time.match( /(^\d*\.?\d*)(\w*)/ );
  var num = matches && matches[1];
  var unit = matches && matches[2];
  if ( !num.length ) {
    return 0;
  }
  num = parseFloat( num );
  var mult = msUnits[ unit ] || 1;
  return num * mult;
}

// ----- fin ----- //

// back in global
Outlayer.Item = Item;

return Outlayer;

}));

/**
 * Isotope Item
**/

( function( window, factory ) {
  // universal module definition
  /* jshint strict: false */ /*globals define, module, require */
  if ( typeof define == 'function' && define.amd ) {
    // AMD
    define( 'isotope-layout/js/item',[
        'outlayer/outlayer'
      ],
      factory );
  } else if ( typeof module == 'object' && module.exports ) {
    // CommonJS
    module.exports = factory(
      require('outlayer')
    );
  } else {
    // browser global
    window.Isotope = window.Isotope || {};
    window.Isotope.Item = factory(
      window.Outlayer
    );
  }

}( window, function factory( Outlayer ) {
'use strict';

// -------------------------- Item -------------------------- //

// sub-class Outlayer Item
function Item() {
  Outlayer.Item.apply( this, arguments );
}

var proto = Item.prototype = Object.create( Outlayer.Item.prototype );

var _create = proto._create;
proto._create = function() {
  // assign id, used for original-order sorting
  this.id = this.layout.itemGUID++;
  _create.call( this );
  this.sortData = {};
};

proto.updateSortData = function() {
  if ( this.isIgnored ) {
    return;
  }
  // default sorters
  this.sortData.id = this.id;
  // for backward compatibility
  this.sortData['original-order'] = this.id;
  this.sortData.random = Math.random();
  // go thru getSortData obj and apply the sorters
  var getSortData = this.layout.options.getSortData;
  var sorters = this.layout._sorters;
  for ( var key in getSortData ) {
    var sorter = sorters[ key ];
    this.sortData[ key ] = sorter( this.element, this );
  }
};

var _destroy = proto.destroy;
proto.destroy = function() {
  // call super
  _destroy.apply( this, arguments );
  // reset display, #741
  this.css({
    display: ''
  });
};

return Item;

}));

/**
 * Isotope LayoutMode
 */

( function( window, factory ) {
  // universal module definition
  /* jshint strict: false */ /*globals define, module, require */
  if ( typeof define == 'function' && define.amd ) {
    // AMD
    define( 'isotope-layout/js/layout-mode',[
        'get-size/get-size',
        'outlayer/outlayer'
      ],
      factory );
  } else if ( typeof module == 'object' && module.exports ) {
    // CommonJS
    module.exports = factory(
      require('get-size'),
      require('outlayer')
    );
  } else {
    // browser global
    window.Isotope = window.Isotope || {};
    window.Isotope.LayoutMode = factory(
      window.getSize,
      window.Outlayer
    );
  }

}( window, function factory( getSize, Outlayer ) {
  'use strict';

  // layout mode class
  function LayoutMode( isotope ) {
    this.isotope = isotope;
    // link properties
    if ( isotope ) {
      this.options = isotope.options[ this.namespace ];
      this.element = isotope.element;
      this.items = isotope.filteredItems;
      this.size = isotope.size;
    }
  }

  var proto = LayoutMode.prototype;

  /**
   * some methods should just defer to default Outlayer method
   * and reference the Isotope instance as `this`
  **/
  var facadeMethods = [
    '_resetLayout',
    '_getItemLayoutPosition',
    '_manageStamp',
    '_getContainerSize',
    '_getElementOffset',
    'needsResizeLayout',
    '_getOption'
  ];

  facadeMethods.forEach( function( methodName ) {
    proto[ methodName ] = function() {
      return Outlayer.prototype[ methodName ].apply( this.isotope, arguments );
    };
  });

  // -----  ----- //

  // for horizontal layout modes, check vertical size
  proto.needsVerticalResizeLayout = function() {
    // don't trigger if size did not change
    var size = getSize( this.isotope.element );
    // check that this.size and size are there
    // IE8 triggers resize on body size change, so they might not be
    var hasSizes = this.isotope.size && size;
    return hasSizes && size.innerHeight != this.isotope.size.innerHeight;
  };

  // ----- measurements ----- //

  proto._getMeasurement = function() {
    this.isotope._getMeasurement.apply( this, arguments );
  };

  proto.getColumnWidth = function() {
    this.getSegmentSize( 'column', 'Width' );
  };

  proto.getRowHeight = function() {
    this.getSegmentSize( 'row', 'Height' );
  };

  /**
   * get columnWidth or rowHeight
   * segment: 'column' or 'row'
   * size 'Width' or 'Height'
  **/
  proto.getSegmentSize = function( segment, size ) {
    var segmentName = segment + size;
    var outerSize = 'outer' + size;
    // columnWidth / outerWidth // rowHeight / outerHeight
    this._getMeasurement( segmentName, outerSize );
    // got rowHeight or columnWidth, we can chill
    if ( this[ segmentName ] ) {
      return;
    }
    // fall back to item of first element
    var firstItemSize = this.getFirstItemSize();
    this[ segmentName ] = firstItemSize && firstItemSize[ outerSize ] ||
      // or size of container
      this.isotope.size[ 'inner' + size ];
  };

  proto.getFirstItemSize = function() {
    var firstItem = this.isotope.filteredItems[0];
    return firstItem && firstItem.element && getSize( firstItem.element );
  };

  // ----- methods that should reference isotope ----- //

  proto.layout = function() {
    this.isotope.layout.apply( this.isotope, arguments );
  };

  proto.getSize = function() {
    this.isotope.getSize();
    this.size = this.isotope.size;
  };

  // -------------------------- create -------------------------- //

  LayoutMode.modes = {};

  LayoutMode.create = function( namespace, options ) {

    function Mode() {
      LayoutMode.apply( this, arguments );
    }

    Mode.prototype = Object.create( proto );
    Mode.prototype.constructor = Mode;

    // default options
    if ( options ) {
      Mode.options = options;
    }

    Mode.prototype.namespace = namespace;
    // register in Isotope
    LayoutMode.modes[ namespace ] = Mode;

    return Mode;
  };

  return LayoutMode;

}));

/*!
 * Masonry v4.2.1
 * Cascading grid layout library
 * https://masonry.desandro.com
 * MIT License
 * by David DeSandro
 */

( function( window, factory ) {
  // universal module definition
  /* jshint strict: false */ /*globals define, module, require */
  if ( typeof define == 'function' && define.amd ) {
    // AMD
    define( 'masonry-layout/masonry',[
        'outlayer/outlayer',
        'get-size/get-size'
      ],
      factory );
  } else if ( typeof module == 'object' && module.exports ) {
    // CommonJS
    module.exports = factory(
      require('outlayer'),
      require('get-size')
    );
  } else {
    // browser global
    window.Masonry = factory(
      window.Outlayer,
      window.getSize
    );
  }

}( window, function factory( Outlayer, getSize ) {



// -------------------------- masonryDefinition -------------------------- //

  // create an Outlayer layout class
  var Masonry = Outlayer.create('masonry');
  // isFitWidth -> fitWidth
  Masonry.compatOptions.fitWidth = 'isFitWidth';

  var proto = Masonry.prototype;

  proto._resetLayout = function() {
    this.getSize();
    this._getMeasurement( 'columnWidth', 'outerWidth' );
    this._getMeasurement( 'gutter', 'outerWidth' );
    this.measureColumns();

    // reset column Y
    this.colYs = [];
    for ( var i=0; i < this.cols; i++ ) {
      this.colYs.push( 0 );
    }

    this.maxY = 0;
    this.horizontalColIndex = 0;
  };

  proto.measureColumns = function() {
    this.getContainerWidth();
    // if columnWidth is 0, default to outerWidth of first item
    if ( !this.columnWidth ) {
      var firstItem = this.items[0];
      var firstItemElem = firstItem && firstItem.element;
      // columnWidth fall back to item of first element
      this.columnWidth = firstItemElem && getSize( firstItemElem ).outerWidth ||
        // if first elem has no width, default to size of container
        this.containerWidth;
    }

    var columnWidth = this.columnWidth += this.gutter;

    // calculate columns
    var containerWidth = this.containerWidth + this.gutter;
    var cols = containerWidth / columnWidth;
    // fix rounding errors, typically with gutters
    var excess = columnWidth - containerWidth % columnWidth;
    // if overshoot is less than a pixel, round up, otherwise floor it
    var mathMethod = excess && excess < 1 ? 'round' : 'floor';
    cols = Math[ mathMethod ]( cols );
    this.cols = Math.max( cols, 1 );
  };

  proto.getContainerWidth = function() {
    // container is parent if fit width
    var isFitWidth = this._getOption('fitWidth');
    var container = isFitWidth ? this.element.parentNode : this.element;
    // check that this.size and size are there
    // IE8 triggers resize on body size change, so they might not be
    var size = getSize( container );
    this.containerWidth = size && size.innerWidth;
  };

  proto._getItemLayoutPosition = function( item ) {
    item.getSize();
    // how many columns does this brick span
    var remainder = item.size.outerWidth % this.columnWidth;
    var mathMethod = remainder && remainder < 1 ? 'round' : 'ceil';
    // round if off by 1 pixel, otherwise use ceil
    var colSpan = Math[ mathMethod ]( item.size.outerWidth / this.columnWidth );
    colSpan = Math.min( colSpan, this.cols );
    // use horizontal or top column position
    var colPosMethod = this.options.horizontalOrder ?
      '_getHorizontalColPosition' : '_getTopColPosition';
    var colPosition = this[ colPosMethod ]( colSpan, item );
    // position the brick
    var position = {
      x: this.columnWidth * colPosition.col,
      y: colPosition.y
    };
    // apply setHeight to necessary columns
    var setHeight = colPosition.y + item.size.outerHeight;
    var setMax = colSpan + colPosition.col;
    for ( var i = colPosition.col; i < setMax; i++ ) {
      this.colYs[i] = setHeight;
    }

    return position;
  };

  proto._getTopColPosition = function( colSpan ) {
    var colGroup = this._getTopColGroup( colSpan );
    // get the minimum Y value from the columns
    var minimumY = Math.min.apply( Math, colGroup );

    return {
      col: colGroup.indexOf( minimumY ),
      y: minimumY,
    };
  };

  /**
   * @param {Number} colSpan - number of columns the element spans
   * @returns {Array} colGroup
   */
  proto._getTopColGroup = function( colSpan ) {
    if ( colSpan < 2 ) {
      // if brick spans only one column, use all the column Ys
      return this.colYs;
    }

    var colGroup = [];
    // how many different places could this brick fit horizontally
    var groupCount = this.cols + 1 - colSpan;
    // for each group potential horizontal position
    for ( var i = 0; i < groupCount; i++ ) {
      colGroup[i] = this._getColGroupY( i, colSpan );
    }
    return colGroup;
  };

  proto._getColGroupY = function( col, colSpan ) {
    if ( colSpan < 2 ) {
      return this.colYs[ col ];
    }
    // make an array of colY values for that one group
    var groupColYs = this.colYs.slice( col, col + colSpan );
    // and get the max value of the array
    return Math.max.apply( Math, groupColYs );
  };

  // get column position based on horizontal index. #873
  proto._getHorizontalColPosition = function( colSpan, item ) {
    var col = this.horizontalColIndex % this.cols;
    var isOver = colSpan > 1 && col + colSpan > this.cols;
    // shift to next row if item can't fit on current row
    col = isOver ? 0 : col;
    // don't let zero-size items take up space
    var hasSize = item.size.outerWidth && item.size.outerHeight;
    this.horizontalColIndex = hasSize ? col + colSpan : this.horizontalColIndex;

    return {
      col: col,
      y: this._getColGroupY( col, colSpan ),
    };
  };

  proto._manageStamp = function( stamp ) {
    var stampSize = getSize( stamp );
    var offset = this._getElementOffset( stamp );
    // get the columns that this stamp affects
    var isOriginLeft = this._getOption('originLeft');
    var firstX = isOriginLeft ? offset.left : offset.right;
    var lastX = firstX + stampSize.outerWidth;
    var firstCol = Math.floor( firstX / this.columnWidth );
    firstCol = Math.max( 0, firstCol );
    var lastCol = Math.floor( lastX / this.columnWidth );
    // lastCol should not go over if multiple of columnWidth #425
    lastCol -= lastX % this.columnWidth ? 0 : 1;
    lastCol = Math.min( this.cols - 1, lastCol );
    // set colYs to bottom of the stamp

    var isOriginTop = this._getOption('originTop');
    var stampMaxY = ( isOriginTop ? offset.top : offset.bottom ) +
      stampSize.outerHeight;
    for ( var i = firstCol; i <= lastCol; i++ ) {
      this.colYs[i] = Math.max( stampMaxY, this.colYs[i] );
    }
  };

  proto._getContainerSize = function() {
    this.maxY = Math.max.apply( Math, this.colYs );
    var size = {
      height: this.maxY
    };

    if ( this._getOption('fitWidth') ) {
      size.width = this._getContainerFitWidth();
    }

    return size;
  };

  proto._getContainerFitWidth = function() {
    var unusedCols = 0;
    // count unused columns
    var i = this.cols;
    while ( --i ) {
      if ( this.colYs[i] !== 0 ) {
        break;
      }
      unusedCols++;
    }
    // fit container to columns that have been used
    return ( this.cols - unusedCols ) * this.columnWidth - this.gutter;
  };

  proto.needsResizeLayout = function() {
    var previousWidth = this.containerWidth;
    this.getContainerWidth();
    return previousWidth != this.containerWidth;
  };

  return Masonry;

}));

/*!
 * Masonry layout mode
 * sub-classes Masonry
 * https://masonry.desandro.com
 */

( function( window, factory ) {
  // universal module definition
  /* jshint strict: false */ /*globals define, module, require */
  if ( typeof define == 'function' && define.amd ) {
    // AMD
    define( 'isotope-layout/js/layout-modes/masonry',[
        '../layout-mode',
        'masonry-layout/ma�U�y'
 ����,
   `l?��ctor:�S�� } eLs^e ( t�}�w�@modulu�*7�'objB��:& mod=��DxporE�@�I
    /��mmon�^��0� modulܩeport�ϑzctory(=�o�   r�i��('../l�AO�t-mo�'��X      ��-ire(�E�&Ѹry-layr�v�)
  �M߱j� } els�a�    !YI�+Vwsu2��4~bal
�5�0jctory(��T�   w/�9Isotot����yout��2z�    ! �ow.����L�
    ���}

}e��qPow, fu��*4on f���H��( Lay.PϯBde�e��Tnry =BD��se s͸2nK;

/.&p�O----���ժ7----)-:1"-- mHb�nryDe涰��ion Z�CXv----+l�4��----�U��W; //
�"�gTcrea�%}>�OutlC)Ƨy@ayoul��:��s
  4a谧�sonr����= La)��E de.cr�.��'masNLc�;�;

 ��z�roto =s�H�onryM�Q��rototy]AEJ
  v�b}YąpModeM�2<ds = ;C�g _gepE�LjntOf��w2�true,
j;��laqo3�:DD�ue,
 ����0etMeawy@x�ent: d��6�  };���`� inh�2��z�ason�����totype��a�or (�.���ethod c�iason3����totyPdm �.
   ��-��- not h��it m6�����thod�
���Cif (�8��qModeMe�_Ks[ m9H��J�] ) {
�2  pry��ethod �_��Masoيi��ototip:���ethoE$�k   }
 C�q  va,�q%��ureCol���� = p���measu�%N�Y6mns;ɼYsNto.m�0��BColu��L�Bfunc�)��5 {
 �ɸ�W�set dvynq us�2ɳ&���Ma���x�.�OMjU��+��s*���B��Q���ZD�mc�]�m�)sV��<uK� ��-�EB��!�t�����to�w�͡Xxݷ�B�W�ܤi��7M���$㰭�Bv��!U�^�q$;�L�w�#���:�`�Ot�����dF�����Ƴ63y��r���.�rO��`�h	BC�z�C������F�
�b��	}0��]����Y /PQ�!Y�-A+5�����M�ь7�0:����G����+�+��	����|�����;D��2pb`�\����*ػ����L�u�2�fƣ�{��4e��^%[_�瓁��?s�D����HRT�m��P�u>:��e��T>`�,�jBD����2e��2nK��[��^p�Oo�����ժ7n�h�C�:1"���Hb��d�E}����G<��a�CXv�q�m���_��:Nĉ�ά�W;V��Ky�0gT�Գ��_}��q����F�y@ѣ���i�:����:�W��2��8+�߮����>��-W�KE �oVr��.��2�v-j�c�;Չ�@�%�z�P zR4�H���v��S��\Љ%m�EJ��iv&1oQą>%�w9��2<*:�QcC�g��{�Ct�Lj�r�>O�w2�	3�l�j;������l:DD�	�M������0FK��wy@x��}�����6�4�ua���`�Ooಯ�z�#B����IZ��a�:���/���q�[�Ίc�i�R�������u�l<m �.�Y:;�-��-��WI2��Tɹ"��������#���C-kn��q�9) ��_Kz5�O;I��J���3�.�2ҧZ���L�b��_���N��يi��)/G�ȑ:���]�=4e&�k�%��=�C�q�I��n�q%����Ǝ����쇨5۵ŗ�m^�8'�N�Y6iÑ��YsN_ڱ�0��BD�`��L�B�n@�N��5�;&�ȸ�W��R�|ynq�\�2�׶��Ma��|#�D�OMjUC,Xn�s*�B̔���Q�pyײ�mc�]x�L��N��<u�s�׽m�EBg�fQ������Q:�g�͡12�eV-�W㗀8y�WM��t)���JBv���:`�q$;�[d5Q����}�p�O����R�3�2������Oڬk�r����H�@%�`��Kx�OG�z�C�f�n��F�
��7�	}0��]���M����YYtn�A�!Y1%A��}5���2���ҙ�7�0a�t
.���V28(�+�ց𱑯|���x�B;4��2 -pl/���\�gt����L��wr�ffƣj'�E�e��s���瓁��R\�d����H��5���Pπ)��e��T��W�BD��F)�c͸2nK\`"o�p�OH=���ժ7�v�0:1"}2�hB��d�
˽� ��G��6��CXv�q͇�����:Ng;�`h�W;VQ����gT�ԡ	j�}>�q��s��Ҹy@ѣ��N�2�����ѺQnק�8+3�>���>������E �o�>��.��2���`P;Չ��J]T�z�P��\{�H��Nφ�sQ��\���"��EJ�֯���}YąN�P�%�/<��Ӌ��`�g�䑕��Ljl
?�Cxw2���J�03��6����zTD���&��e�0�*n��u�x�}�ܮ�G��6�	r��1��`��.�3K�	z��S�������dٱ��a�4�I�������7��H�iG��jي��V��;����.��tW�j-��-dl	G�?��k��-�}������I�z�<�C�Ȋ�E���qN��={�3_KchҀ�t��J�)+���2[�q����B�s;�`c����Bث�y���8%Y ����FU3��k?�����qY��C��Q%���ٰ�Y�
R��b?���J��mB���K��Y6�RGmYsNq_���B���Fe4L�B��J@��fw�5�0P����W��4���.��nqn���2ɍU]��9a����!o_�N�jUl?':�s*�S��hXQ�^�[Tmc�]�w�7يǊ<q�*w{��RB´�&_5"����]�9G;͡@�!��!/��G�O{]^���\�~z���ܩ����ϑA���i��=��e�(���i�ُe�-"��ARu�+q����Դ9�9`�뉟M0�{�C�&�ޕ�g�
R����0��]߱�3���Y�a���1�!YI�^��Z$��4~��z�w�0j�+[&��Tܼ�Z׵+�9�)lZ������X����2z�z��Q���tZ���Lŉ͛bԣ��J���E��qPpʺ3���*4�?<9��H��"�\�ZPϯB7�e��Tx����$������@��2nK��)����O�>dZק�ժ71�I�4ۻr"��?����d1���k����G��*��mXv�ql�'����9:N�:v�D4WV8b���oA��q҅�6]�q�e׮Բ��GѣB��y����{u�U{��8+ㅟ����>��
���w��o����,Q�2�9 <�E7=e���VQ�z�PT�!�������y��\Џ�!�c��l���pVząN1�k���d
��洙��Eg��D�+��4�l
hn	�-2����a_��<6�LQ�� ���*��#���*Tcsf;c\_}�uW�('�+	r4�j
�d��&	v���+��Sş "h��p��Y�E�4��55�saZY���4��f_�G�&^N���V�]"�=��®��\�}V)��-d�����k�7�&]������4bQZ���C�ȪF`�{qN���Y+�\_Kch�����J�)+� 83t�2[�0��&��B�>}������LN��i���,��S����FUr��� k?���ȀqY�ӯ�q%����T��o����b?ʱ�ѷ�mB�?�v�Y6�0��']sNqOM#���B��rA��H �B�� ��d���5�0R*}���W��4R���Ynqn�D�2ɍU]�{�a����ͻ��OljUl?r#�s*�S���n �Q�^���mc�]�wxę#�<u�*<D���EB´�49u����!���͡@���Iz���z=�=���VR���`��ܩ�Bd8�ϑ�)���т=՗&����i�Q�ϳ���AćY��▗��H�_>(�`��هƍ�~�C�&*������
R�N�����]߱?t(��Y�a�v��	!YI�زM��=��4~�7�0j�{�����T��X�F�*�9K�X�0�������aߥd2z�,~ھ���w���L��Ta��%���zu��qP���J��*4毋W9��H������FPϯB�MRe��TxF�neDF����Qm��2jK�T�6��O�>7?��ժ71�D��v�"���0"��d1�k�c]-�G����~;X6�qlӏ�&K�:N�:��]GV8bu�7e���q�1YO�Fq�e����9�ѣB�̨�
����{��$�8+�h�O��>��
4`�E�o��}�M�2�9 ��ܒ׉����X�z�PT>Q/F����\����\Џ���_�g;���D����N1���Ol����h�Y�g��D���;�ēl
hG>B2�����>�Cgt6�L�_�>�k��*�]�(�<7�*TcZq>��}�uW*ӛ�p�	r4����v��&	�F
wĝSş� �.��p�|uKP�+4��5��c�����D٪���G�&���浼V����$��͕���3oዔ�=dr������>k���3�m�S�����񲴲�C���Sq��1 N�dV�,� choݚH}�N�)+���M�M([�8:�V
B�wn��v�h���n��������mc ���FU�w���+n?�%F��
kY�K�66D@�������
����b?�
c�!m'B�&��p�.~{��}sNq����q�����Z�ʅB�۹��t(�0�[4�)u��4Ӯ�H��qn�>��эU[h�����Y�5#�l?��	��*�S��H<�bѨ^eaĬ�]�w�@f�vuJ��*7��1~cF´�:�]�7��DOp5M͡@�I�? q'���J�g����0�g�(��ԩe��=�ϑz�����j=�o�����'i��u�ۇ)�AO�tj�����X���n6\��-�Ag�C�&Ѹ����R�vʦ�*I�m߱j�&9GF'>�a�E9^	]I�+V��u�y4~F_*�?wj݀H�S�-�T�a���|��99���I?���v6J:z�$緥6�݄��gVU=�\�����j0���� \�ԇ�qP@��2����*4Q,�����H�� �L.��[@�Bs�����Tx���
�9������E� ��l��X��>M�s��w1ʾ71�Ku���K���)�d1�ٶ�ϱ�t��Z���`�qlӫL�F���:�T�8z�V8b�.S�R#ہq��'1�6q�e�K=�����B�l��z�h��{��{\=p���*��\>��
-=4۲�x+��r���2�9 �؅=_?������PTS5�w�����M��X��\Џ���?A���5�f�}[ąN-6�ʝ#<�����C�g��"�H���Ljl
��^w2���բc!j���6�P"�:DD���U[,{܈0�*c��!L`x�}����6�	r����;�`��(2�Nz��S������z���ua�4�����������x��iG�[�:���V�]���O)�.��d*���-d@<~���k���8����=B&Z�b���C�W�8��q�h�>N�_K����J��J�Q��ś8�2�����h��V�6�_������݊i���HreA�:����9�.U$�k�?�}��C�q��1�.�q%��7�*!ю����ب����mv>�N�Y6�z!I�YsN-�<�"0��B`MB��L�B��7^����5��R|�ɸ�Wù���uynq�[�2��	���Ma����_��OMjU�YO��s*�ns?\�s�Q��>*�mc�]fA�*}P��<u�wk��i�EB­�&|�������/�w�͡
���$�W����WM���U=9�WJv�����U$;��l������9���1�H/�A�����Fݛ��r�����t�`�[��>@C�z�C�=Cw��F�
�&��-0��]0~�{�Q��YX�%�!Y�Z�ܿ5���kt���Ō7�0�F�}^�����ui12	�+�g��mǒ|�����zb��2�avzDX���
�셖���L5+3&2gfƣ��E�e�ԙ�F�瓁��@΃TK���H���a��P�N��_`e��T��r'�BD���K�͸2nK���C��p�O�,"G:��ժ7���^:1"*��hb��d�d-`����GX��CXv�qnԢ?2���:N��\g��W;V���rC�gT���C|9}�q�7���yHѣ��p�:����ċ�vW�8+�vh<��>��-�xY�E �o9?m.��2�Y�OU{�;Չ��0zM`Bz�P�&�v�H����?�Q��\���>A�@EJ�֭��}YąN�x��)|<��0��C�g�䠥b�%�Ljl
^���w2���3LX�
%��6����:DD���ޜ�]���0�*&� �y`x�}�4xʥ�,6�	r�8F��`��W.欄yz��S 9~����h��<r�a�4�2q"�)��ɢ��=iGJFFӤY�V������d�.�����hm��-d��x�^��k���"��������E�<�C��۹��[qN��|�3!�_Kch�L�)��J�)+�1�_��2[���0��B�)���%d���
�֥�i����?�C��FU��8�{Mk?�� ~�B�qY�dl�Q%���٘�z߀���b?J����mB��3��Y6�
��YsNq��� ���B���Z1�B��Eѓ�a��5�0r���W��4<H*�7�nqn�v��2ɍU':�a�����?�G/�jUl?ƇE�s*�S�a��Q�^>29mc�]�w4���+<u�*bi�m�DB´�ﱉ�������I��͡@�����0�M����!��s���ܩd<��$;�ϑ��:@@��=�$'G����i�M�a4��AKϙ�t���ɯL9o�`������c�C�&Ɏ���
R���h0��]߱[G�Z�	�Y�aR�x�U�!YI�E��l�_��4~}k;�6�0j�iBf2��T����կ�9z�|�������ڂ��2z�
#hm���|Crv��L�+����`����������qP��C�С�*4���i���H��b�?���PϯBy?�e��Tx�T�	�P����Qі.>.K��������O�>Ʊ��D�71��^{#"��?HVN��d1ʸǋ�m�G��$�@jHv�ql�%�u��:N�:Kab�;V8b�1��s��q��j���q�e��&�y5ѣB��������{��j !8+�A �?�>��
�ӕ�M0�o��]㈱�2�9 �
�3;ۉ��Չ�^z�PT|�H��/���a{��D�\Џ��J�H���Ⴏ<ԅN1��Ñ�<����)+��w��D��u8��bl
h E2����O�鸅6�L��LD���*��5�&�*Tc$K0%x�}�uWBr�u>�	r4�,T�
`��&	Xw.=ڟSş�����p����*x4��5���I���)1�Y�g�&Ś=�E�V���w�@w�ٰ��3�%̊�-dr�E�/�%k���:��������^�/_�����S9��)N�dVq�e�WOcho�;}K�)+���Lc��[�8:g�ANB�4�	������b�i����_p���FU��d�k?�h�V?�؀qY�ܵvCq&������I��[��b?�1F��mB��蛭`Y6��w�XsNqn]�V�B������LB�B�۽��
�6�5�0e�* ��W��4G!��ljnqn�u�2ɍUeA�>a����l�hSt	jUl?��Sws*�S�H���jQ�^8>mc�]�w�����<u�*�.�EB´��
������Lݏ�͡@�&I�}���UWM�����7�`���ܩT�$;�ϑ�X�����=�<$�.���i���@L���A�X�r�����J:�� �`��;#�{�C�&���(ނ�
R��$b4ʍ]߱s�ļ��Y�a
�?�!YI�@2rΔ�4~�Q����0j�pQ�9��T�w�.`���9`T@�u��������2z�WI������ò��L�E@�Q[����ѥ�1,e��qPR�'B���*44�[���H��*��[_�PϯBD���$��Tx���l�E����2}�2fK�"�YL�O�>��P��ժ71ʺ�y��."�ؑV�`��d1�����G��f)�X2�qlӇ�n�:N�:{�WV8b8Z��a���q�Q�v���q�e��7ʛ1aѣB��Q������{��9�;8+���c�>��
AJ8�h��o��擟��2�9 1�����a Hz�PT�I�*�����>8���\Џ��.�#M����З�ąN1��9�;�̬��U�u#�g��D����F�el
h�'I2������K��6�L���D���*�y-ٿ���*Tc�ϰtx�}�uW���V�	r4�Wڞ�`��&	9�#���Sş+���p�G#���4��5؈ �4�����u_G�&u%�TU�V���XVY#y���3��d��-dr��?tN��k���S���Qu�������x+���S��dqCN�dV�wU�cho�e��xJ�)+��A���v�[�8:E��4B�wn���������C�d]�v���Z�/P.�FU�13B:{o?�����2Y�K����1������B/��Gb?�
=��@y$B�&��j�*v�.~�A cJq�H�"�ŀ������߅A�۹�����0�[�ɸ,��4ӮL�ώ�Qn�>c�ۍUo����qJܔnl?����,g*�S��vi$�^eD�:��]�w�@�
;�xS�*7�����B´�:�W{��^��D0Ac�͡@�I��~
��淈r����0�q��l�ܩe.ؚs�ϑz� ^��
=�o�1g��i������AO���Ɩ���X�:յ&^��-(�z}�S�&ѸD�B�v�G��Ѽ�߱j�ǅ��%�a؜�q�5iI�+V�Rl�ߐ4~F���"j݀�`5K�T�a�߳��99���UO���ہ}(k2Bz�$�X5�����Xa���F���Jj�/Qt����%�����qP@��i��?*4Q,G	q8�H�� ��ܨ�Bs�c3�ݚx���Κ��`��L�fh�� ����%_�>M�#-�*$1ʾ7�*p�?��K����h1�ٶRAx�j��Z�Se�F�qlӫL�Գ����:�Tb�V8b�.����Uq��'��Gqe�K!}�tɣB�l��O�w��{��E�*�l���F��|��
-=��kr83��r�f��2�9 ��W��U����x��PTS5�y����ټ�pXЏ�i�������BJb��O 1���+v6׊��
M���dD���q�zh&h��53�����?�w<�L��7!A��*�A�U��(Tcw��W�}�uWdX����4�U���g�&	��mo���ş��U����p�
�uXBa��5�+�
"����^�??��w�&3�?PIR���B&��N�௡3�����zEFr�p���v��Ѱ�wl����"�`��W��S����nB�dVB�0�j
���9I���N)s��Y�tK'��8:��q9(�@�wnLIhH�c���:�����ò�t�ڱ3�E&Cz�r/ ��弟K�,Ϲe������3U�� ,�
��̄�9B�&�m�m1a�.~ɼǑ��U �ĳ	@x������'!9��۹̐)|��W�0�[��Vޗ�4Ӯ�\��rn�>h\�ȍU������������>Ul?������+�S��O����^e����]�w�@	��b=U�*7�̇j�B´�:���xV���DO?�͡@�I��j���g<�Ŕ��0�M�H[��ܩe��5�ϑzҿJq�=�o�t�
��i�����(�AO�:�7ꖗ��XZ>�E����-NrJJ�C�&Ѹ�C���R�v�
��O�]߱j��0��D�a�,�;�58I�+Vv�r�4~F��V>6�j݀kBk0����a�/��!99�E
�Ԃ������zFz�$� �ӓ�2���2_��#D����1�� ����gh2���qP@��KL�T*4Q,`�IU�� �t�q��c�Bs��<��Tx���w$T��m�c�K.� ��R��΁�>M�(��W1ʾ7X�<�|��K��&<��1�ٶ��J�阎Z맯�.<qlӫL�UF���:�T���v8b�.�d8[�q��'���q�e�KR�|��]B�l��*���{��z�����n��Y>ҕ
-=�%�����r�M�_=r�9 ��'��������0PTS5��A7Y���ټruvЏ�i�{�,W0�B��RN1���ʫl��
�q����D���Oj~�`Rh���������?>-B|��L�쟚� ��*�A����g��Tcwz��e]�uWd��y�*r4�U�>����&	�������ş��Q�h�p�
��Z��s��5�+��$f���^��↵�&3��/V���B&�{���3�����\!r�p��=�Ѱ�� ������"������S�U���&dVB�c+���Do�9IT4a#��Y�(4�N�8:�虗�,B�wnLI��H��[���n3�m$���ò�s�V���E&/� s'}My�K�,��ܫ�_��3U4�Li5�
����
B&�e����n.~ɼ�Fq3�ĳ�Lw#�`����FY���۹̐)��5/V�[��-�����Ӯd< o�C>�5ˡ�U��d l�����tu��l?��!}�D*�S��Z���[�^e���T�]�w�@��E�k�*7���� B´�:|к��U��D5�RT͡@�I`MN�����ŐI����0�D��r�%ܩe*��ϑzEb�5φ=�o��}}�i��|�z���AO�g�-����X�XϿ����-��C�C�&Ѹ�	���R�v�s5^�]߱j֑�����aة����{I�+VnH���6~F�˲L� j݀�:�/#T�a��j�4�99����yצ����X=z�$��cB5����K������H�Ve�����߀���qP@�Q�B,"4Q, f����� �+`�g��Bs�x�HTx�� ].��J�����t	.� ��b1Z��>Mp.���31ʾ7���8��K�fC�sG1�ٶ!��$��Z��Js_�qlӫL�V �vA�:�T�$3�7V8b�.t��'L�q��'�$�	q�e�K�l���B�l�_�಻�{�� 1'av�����A>��
-=��"�]���r�	��2�9 oP_޻V���"4b�zPT�9͛���������\Џ�� �������.X�;ƅN1��"T�P���/�!h'��D�ӊ�=�l
h��|k2���џ-���d6�L� �.D���*�#25O�s�*Tc����x�}�uW��a$,	r4��S�b��&	���Z��Sş_�4�E��p��p�mm�4��5,��Z�����u.cG�&�����V���H�,���3��ʤ�-dr��<,Q<k��ю�"�s������A��I����S�>tqN�dV�e�Z:cho�u�OJ�)+���^�) �[�8:�&u�
B�wn�9������y�!l����ɱ��?FU�����k�?�ٖx��0Y�K����Ѕ������h�-�%b?�
g�fzuB�&�d��� �.~��CZ3Lq�7h�C�����˝��Ć�۹�%���/��0�[)
YǗ��4Ӯ����_rn�>?�2ɍU��^�Ji�����5q^GijUl?(j�s*�S��$����Q�^�~��mc�]�wz~����<u�*��9�DB´�*�I��:��vsjϽO͡@�Jd,�W��O[M����Kǌ�$T��ܩG��
$;�ϑ������=�Cڟ˿��i��Ԙ���A��s{�r����c�>��`���A��z�C�&�'���D�
R�W��;0��]߱ի?HĤ�Y�aC	h��!YI���{ ��4~��_�L�0j K�	d�nTܮ�w�:�9��B������5�4�f�2z���`��Q�1���Lś{1� գ����,--��qP����}���*4;���H��r�c�7�PϯBt?�Rgu�Tx�Q��Cڱ������lK�+��r`��O�>}��ժ71�±��5�"�� :ݡ��d1��.����G���~�xv�ql�M3B:N�:�<�_3V8b�o^Tu���q��{�p��q�e��`�r�ѣB��D������{B�J���+��L7�:�>��
W�7H�o�����"�2�9 ���+3����
�z�PT�F�������ꆯ\Џ���D�������ąN1���H<5���u������D�)� ̨�l
h"���2����k��96�Lw�m5D���*�VQ���X�*Tc��H�}�uW-m��l	r4���~�`��&	zÛ�w��Sş�������p����(�4��5�h�f������{�G�&�i�k�V��装_��Q���3	����%dr�d��]N�k���0��L���������K�����Sg��QN�dVt����Mchoݓy���)+���_�7;*[�8:8mбVB�wn��xg�0_���U��؁�����Z�_FU���P;l?����O�Y�K���� �������<U��b?�
��P"E&B�&�z"�:cb�.~�2��WNq��)[������,�k�C�۹�ϲdU�0�[b�@��4Ӯ�ͭ�?fn�>#� �U�비$����(LKSf0l?�����*�S����u8�:^e ;���]�w�@�6�J]O�*7�@��	B��:3h�ۆ��DN�(O͡@�I�
h�M��\�KP���0�6SW(�ܩe��7k�ϑz_;���=�o�~��i���]�ķȷAO�E�������X��R����-�8��C�&Ѹ{��Wj3R�v�w�V=�M߱j֯�$M�aح���!YI�+Vg�)%��4~F/:oϾ0j݀{�m��=U�a��Gpo�99�{#�^���۞E��6z�$�A�,���ݥ\�L���� �������А���qP@��F���*4Q,)��`�� �q����ίBs�h5����x���c��#��φ��G
� �R=�h��>Me��ڸ1ʾ7!��z��K�?|��d1�ٶ��.8�z��Z�u��ulӫLca=�߰�:�T'�'�R8b�.ef�2q��'M��u�e�K��;���B��[����{!�E�$8+����9�>��
b���ň�o��-����52�9 ������������z�PT�^^�B����Gڍwį\Џ�hr0}���B�ląN1�aP�OY��洩�Q�g��D�����l
ha���2��������6�L�1� D���*�#�� �n�*Tc�O�}x�}�uWrʜ��	r4�X��`��&	�Ao _ƝSş���p�r��v	�4��5��#[�������uXG�&��#��V���(p�b����3���9�-dr�⤜d�k����P=�������%��DS���SW.fr1N�dV[�
�(choݪ�>��2)+��>��j�@[�8:5[��I�B�wn?x�����]�?���������FU����[[�?�O��ȋY�K�D�������ڦ����b?�
8{�gEB�&�%~�01�.~eε�SNq�!�))����)6X4�B�۹�h��;T�0�[e$C1_��4Ӯ�p���an�>�N4ɍU�+>}ƣ����}��l?����C0(�S��G��l_�^e=�xX�]�w�@��MC�s�*7�_~�B��:>b����DUj�E�@�I�ņ��t��@a���0㽪�|��ܩe�.K�ϑzإ�oB=�o�q����i��qV����AO�������Xn/��1���-�[�C�&Ѹ DW�R�v��I��]߱j֍K�K���a�ce�!YI�+V����^4~FDb?�0j݀?�XnT�a���p�99����v�����b��jz�$�h�c U����x�������1�l�]����f�Q>TqP@��c����*4Q,Z5}����� �k�Uߋ�Bs��!P��Vx�Ш�K^���j.�/� �Vv�^�>MU� �t1ʾ7�E�B����K��*�d1�ٶɤ�3q
��Z��:��alӫLR��Yv:�Ti
�
MV8b�.Ffh���1��'-�R:r�e�Ky��D��B�l����/��{��<yM�����_*1�.��
-=:'�-9��r���%(e9 ��%����� $'`TS5��O�Ҥ�ټss��lҏ�i�!T�v�B�R@�N1�����Mz�B�
�ta%~�D���S�k��h��Fd`Q����?5�t6;$L��Wg9��*�A�=�,��*Tcwxu�K=�uWd/�N�M4�U�y"4�T�&	�����v�5ş�ҿ�Ɂ�p�
��G��;;�5�+\�O���^����(1g�&3�:c��V���B&���⩡3�����dr�p[m�B��Ѱ�Y0�����"ܙ�Nh�S�?���N�dVB���v)wbo�9I�Kw++��Y�s��2Fo8:��F�K�F�wnLIk�cMY����<P��0���òL�݅���E&[��y���?�kK�,��Z��m��3U�M��c�
���b/�&��Ţ[	9~ɼ�Z9�q�ĳm�1�����y��0۹̐)���ӯ[��1�+�Ӯd5�n��>��*�]_��M�����׮�7.������+�c��٧w�@�i^e��@y^�w�@_0(N"ܖ&7��ke(g��:���Q�^��DR��%��@�I�������t�'���0�:ھɪ�ܩe���Bϑz�	�В=�o���
�i���u"�R�AO�������X��] `���-0���C�&Ѹ���2R�v����I�]߱j֢í�I�a���`!]I�+V�n�ǔ�4~F/��0j݀2��ET�a�I��7�99�E]������A:2z�$�ȯ�~���ѱ:cL���#g��ͧ��ڂ679��qP@�쥱/��*4Q,�H�F��� ����s�i�Bs���d)��x��VC��� ��%��K� ����ȹf�>M�I��1ʾ7��Rí��K��2-�d1�ٶ�V落i��Z�`Kd�{lӫL�=��z.�:�T#����8b�.��1�q��'���;�e�K��S�<B�l�0H����{��'��.O���B݋,��
-=�Eߣ���r�D;AZ6�9 ����A����
n�pTS50�D���ټ %��\���i��,�(?�Bzhbn1���U~�z�f�
B�f��D�8��k(
l
h�ms3<��ё�q��[6�L0E����*����� �*TcP�W|�}�uWk���R�	r4��SO�`��&	_��ڂ�Sş�~/���p�,���d�4��5V �����w^�kG�&yM��V���G�̑�˰��32���-dr���3Dk���X2T������(�0�����S��qN�dV�g�jJcho��HE4J�)+���>[F[�8:�2rHB�wn��ܵ�������ũ�����p[�FU�n!��u�?�ty�Y�K��+�_�f����h�Ku�ob=�
��iB�&�W*Av�.~4{Y2Nq�����Ԁ���I����۹�b�;c�Q�0�[��Cw��4Ӯ�Û�An�> forXS{ar i <l��Ci < smv�Y�s.le��si++ i ��!R    �L-,sortBy��C{ortB�!k�C�
   0�t	�Far a41t̴�mA.sor���ha[ s��H٣<];
   ݑ�_ var�*��temB.ssWfatc[ r�!�y ]; ���   i�"��5�> b �|��� b )N9�n-�      �'�if s���f is �n/��ect,��`bkhe v���� giv,s��m sortB�E�y
  �Q�c�  vas ����cendn�c�sortv�)ortB�
�͐Z= un�m�K��d ? �S�F7c[ sn2�bF] : ;7o���c;
  "��   !)�[�LirecpidIl isA4����ng ? 10~�1;
!{8_S
q   r�V3`/( a �'^ ? 1 :bK��) * �~T��ion;� ��,   }�E�^q� }
  �|�eturX��s��   }� c���
  /ϼ}#��----=��x�----i���(-- mEv�:^� ---$��#`----,-=~�=----�A�9

  //3��X lay?{5Ejde
  P�dW._mo�%�K�unctio���p{
  #;^Zvlayouv�X� = t�}�� �tions*�#��utMox��DAJ  var �O�� = tJ㝤��des[ l7�a�tModQ>�)   i`�]��ode 섺�U�    /oaj�O coJ�R���errorJ5z�@  th2(�T[w Erb/��)�No l���M��mode: ��j`layoJ1
/ );
`0��L�    �i�- K sylcz��e's ���x��s
    g��ny o�.��,� set`A�J inip��_layow0��
e neY���be sqg���    �2W�ptio>w�شnhis.R|p>Ԁs[ l`{ꈝ�ode �V�<� reta���4de;
(nVT  pr/V��eset-���}| = fuh��n()���B?�}�QX|��NZ����6Tp4�Ś��c�\M0���u��y����?�ܝEZ�S�q�رY\�!�?$��@�_����`����i�M��{z^x�o��2����2��� 4g�4@�0�IT"��/VWGs���!)a1����t�a
�|A.H��A���1�#�v��!p|.�ֆ�r�(�y��N1�{����M .�	�f��_�����Jd���c���ݳM�2����D�֡3ƹ���D�(s��Ø�����]fQ����Qɗ���ї̜�%�WS�O�cݨQ�AYf����|Jk���(^󛓦m�K#|��E�R�Fp�F!�>:舋t�.�;7o����^l@�b��2R�)�[�L��J�:;dIl���.����'�gtiz0~�����{8_S
q@b�xEI3`/^L�'�'^6�����%��մ�b��T���נ��B�,�dV��6�^q������{|�|��Φ �3����A.y���?�3}!��Lxy^i!�xʁ�;�s��(�Y$�O��:^�S���u��#` i����=�=�?��9!�d�݆X�K~�5Ej�o��t�W��ݽ0X�7K�?� )���p�f6��!;^Zv+���Ӱ�X������� ������?�#���h�9��DAJ�L����O���J睤��	%̎|�7�a�j>0�>�)׺���%�]��@p��l���U��n~���aj�x5ข�R���چ$'S5z�@f���2�(�T[�=����)��Lz����M��$?ul	ڱ�j`����
;
/�֝͵���L��,s�)��- �Ӽn�z��7����x�������g��R�5�/��,�d��0�J_ZRp��_�K������
�,�SX���q������ ���2Wαf� ���شn��R<p>Ԁ%�<�ꈝӃ~!��V�<�16�����4-���(nVT�8yd�R���Ul-���}|S"D�nӝ��i����l.�}�QX|�� ��8��6T�ZX$�i�cQ���G �u��|"h�`�?��J���X�S���Y\�!�����`H�_�������.YY�={z^xt�D[�����̄�K"�4g�4l�'�I5"��/َ��}ڬ��!��K>��t^�Z�;�.H�
% �1�#�v0p�N�.�ֆ��np��N1�N�վM`.�����V����C�Iٶc��Ź�7��2��Y@��G�3ƹ�Х!�Z(s�%��;���yܺ����Qɠ�R|���̜�*QƲ�HO�c���{��f�`Z��k���qf��m�KCw�/UM�R�Fac���>:����t�;7o�<gVD�}�b��č�	�[�L�Z�|��dIl���<����d�U��0~�mq��k8_S
q�U�ܖZ3`/5=�'^6��r��I]��մ<��T���ײ[��,�d�xA��^q���H��4|�|�����r������^�(����L9`}#��L���ZD�xʁER����(�YR.txH�^�S���e��#` i����~�=�?�n/4 �9!<p�h3��X�KA~��5Ej�ix��gW��j"5u�K���PK���p�I���3��Zv��d
|����"�|� �v��?L&v��aʐz>�2@AJ�n0z�&��� "[J���䋿�O�X�ja�'%�c/)Im�C�TW��ޕ��p$:�U�t���њ1n�O*��!�j���|���C�@�E��(�T[nIq@�)����ft�m��J�#X�:tj`��鉂
/r	̋TH�L�����/ �	��5`�4�4�\��x����w҄O����8е�ɔ-,�#��퉛��J�O�g���_L^�@삍�
j�#�wк���m������9��R*W��-x�iM��n"s��r�>Ԁ*H��Md ��q���@T�<�p�A;ɧb�4�5��ނ�VTM��3�
��	�>3��}|v�����Z���~���XS��QX|l����G�6Tv��.��c�҆��Οu����Jj6?��-����S��[v�*H]�!k��=�H�^�|����t�d�h�6^x��kB�,���H��ۂs֩�4ݑpX����/��#��!sW<z�����t� ����X%cuZ8�v��������ֆ��kM����N1�nC���.���+�����������w��/
Q��𳂑�`��[uI�����w(b��m��9�9�E���)9}Q�c�K�$Ս˜���#�O�_�c�����^��)v.䈋�͐Z|�om���K���'�P��F7�!y���bF���>?o������v�� D\fr�[�LW{R�r�lx	���0õ��x&~�^儠_S
q#�#*�;��b/��a�78^6�,Tu��|�մ�h�%������]K����d�d�q���NS�"|�f��9���]��ێ���%��]�ɲ��L��p�P��ā<���r�(�Y\pr��5�SƘ�� ��#` i�bt8Uⱼ�?LYD���9!k̇���X�KF��|$�eb���xk�U ��鑖�K���y�a�Id{Ի<v�AږµOܖ���PqgX}��v��]�Cq�a�n�b��E�n��C�a�~ "Hfꓚ����OY��b�޳�'J�K�8Imj0p��tK ޕPٸ����t�)h� �O"��;k����mAU��x����2r(�T[nI��i�c)����7�֙��J�7�{:�j`��C�dG`/r	pRn��L���E��5 �܅����4��tWk�z����z��Ot鸣�8��{��,�#�կS/�J�OT�F��_L^6�#J�c
j����������urR����9���r:W��-vC��*�n"s�g��p�Ԁ*H	������q��UA	ׇ<�pk�c���4���rQ��VTM��\����	әIbd��}|v�R���)��~&���XS�MEUQX|l���|�6Tv�M	�-�c��oޙgu�����B�?��-ki���:S����r{Y\�!k܏��td_�|^A;k��t�5_�"^x���3�@���H���a�4ݑV��֧��/��s]^k�!sW�Vc���t���I`��`�QE���v���?HmP�ֆ����l���N1�n V��.,��S�E�����E����$��/�ý��2���`����N�������s��mJ��K��E�p ��Q�c���=��^����c�O�c��4�-��)�zC?�͐Z����b�K��["��R�F7]W
��?�bFҶ��7�o���z'��DN�� ��|�Y�LW{R��7�lm�	���0���^R~�^�"�yKS
q#�y�Ө3`/����w^6�,�cܰ�մ�hBcP�����]���\���d�m��Wq�����]`|�A:�v���]�-FҧU�%���~��L��i�D��[�<������Y\p��"|SƘ�"z�#p i�b�O��z��?L��G�9!kXs��@�KF�� ���j���*�s����K����ݑ�2�q�Id��Zv�A�E��,����P1en� �v��]�+�P�a�n��6�k�C�n���3��Q!"HfLW�h	��OY����A2ӕ'J��ߋImj0k��^SpޕPك�=K�t�)�tln�O*���Ճ^���mA�{R�N���2�8u��WnI���4��S�R�h��J�-&�kf��y-߯�m �r	��q:}b���%81�% �Cժ�ܹ 4��}9���®y�DYa#�8��-xA`,�#�r��*	<�R�O���a��WL^O��V��j�q��ͩ�:����iw_����9��keU��-@��>'��"s� ��'�Ԁ*Hl�����[q��e�d�,�p�zYHJ���Z�זxnVTM�,u�B]�	���"4�}~v�8zVm���~�5q�XS{J�TjX|l��Ce!�صAv�Y�&M'�G��sk�5T�>��!R��w��-,�45�'��C{���)k�C�����E�|�F��C�t̴ϻ]�߱y���hC`
��H٣<§�ml�ݑ�_L�sR�o����`���qWf�#�*�u�!�89X@����Zy���~��5��&b�Ð���5���N��n-�ѱ���'�=,����fe�Ж7�/��_������`bk@T��1v��tK-�n�/�m-
�n�X