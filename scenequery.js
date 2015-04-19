/* global Vector, Euler */

var $;

function SceneQuery (nodeList) {
  var i = 0, len = nodeList.length;

  for (i = 0; i < len; i++) {
    this[i] = nodeList[i];
  }

  this.length = len;
}

SceneQuery.findBySelector = function (selector) {
  var results = [];
  var selectors = selector.split(',');

  selectors.forEach(function (s) {
    results = results.concat(document.querySelectorAll(s.trim()));
  });

  return results;
};

SceneQuery.prototype.forEach = [].forEach;

SceneQuery.prototype.click = function (func) {
  this.forEach(function (el) {
    el.addEventListener('click', func);
  });

  return this;
};

SceneQuery.prototype.collide = function (func) {
  this.forEach(function (el) {
    el.addEventListener('collide', func);
  });

  return this;
};

SceneQuery.prototype.remove = function () {
  this.forEach(function (e) {
    e.parentNode.removeChild(e);
  });
};

SceneQuery.prototype.attr = function (name, value) {
  if (value) {
    this.forEach(function (e) {
      e.setAttribute(name, value);
    });
  } else {
    return this[0] && this[0].getAttribute(name);
  }

  return this;
};

SceneQuery.prototype.hasClass = function (classname) {
  return this[0].className.split(' ').filter(function (c) {
    return c === classname;
  }).length === 1;
};

SceneQuery.prototype.addClass = function (classname) {
  this.forEach(function (e) {
    e.className = (e.className === '') ? classname : [e.className, classname].join(' ');
  });

  return this;
};

SceneQuery.prototype.removeClass = function (classname) {
  this.forEach(function (e) {
    e.className = e.className.split(' ').filter(function (c) {
      return c !== classname;
    }).join(' ');
  });

  return this;
};

SceneQuery.prototype.position = function (value) {
  if (value) {
    this.forEach(function (e) {
      e.position = value;
    });
  } else {
    return this[0] && this[0].position;
  }

  return this;
};

SceneQuery.prototype.rotation = function (value) {
  if (value) {
    this.forEach(function (e) {
      e.rotation = value;
    });
  } else {
    return this[0] && this[0].rotation;
  }

  return this;
};

SceneQuery.prototype.scale = function (value) {
  if (value) {
    this.forEach(function (e) {
      e.scale = value;
    });
  } else {
    return this[0] && this[0].scale;
  }

  return this;
};

SceneQuery.prototype.css = function (name, value) {
  if (value) {
    this.forEach(function (e) {
      e.style[name] = value;
    });
  } else {
    return this[0] && this[0].style && this.style[name];
  }

  return this;
};

SceneQuery.prototype.appendTo = function (selector) {
  var target = $(selector);
  target = target && target[0];

  if (target) {
    this.forEach(function (el) {
      target.appendChild(el);
    });
  }

  return this;
};

SceneQuery.prototype.animate = function (properties, duration) {
  this.forEach(function (el) {
    var t1 = new Date().valueOf();
    var start = {};

    start.rotation = el.rotation.clone();
    start.position = el.position.clone();

    if (!duration) {
      duration = 1.0;
    }

    function animate () {
      var t2 = new Date().valueOf();
      var alpha = Math.min(1.0, 1.0 / duration * (t2 - t1));

      if (properties.rotation) {
        // todo replace with quaternion#slerp
        var r = new Vector(start.rotation.x, start.rotation.y, start.rotation.z).lerp(properties.rotation, alpha);
        el.rotation = new Euler(r.x, r.y, r.z);
      }

      if (properties.position) {
        el.position = start.position.clone().lerp(properties.position, alpha);
      }

      if (alpha < 1.0) {
        setTimeout(animate, 1000 / document.scene.ticksPerSecond);
      }
    }

    animate();
  });
};

$ = function (el) {
  var elements;

  if ((typeof el === 'string') && (!el.match(/^</))) {
    elements = SceneQuery.findBySelector(el);
  } else if ((typeof el === 'string') && (el.match(/^</))) {
    elements = [
      document.createElement(el.match(/<(\w+)/)[1])
    ];
  } else if (el instanceof SceneQuery) {
    return el;
  } else if (el.nodeType && el.nodeType === 1) {
    elements = [el];
  } else {
    throw new Error('SceneQuery: not implemented');
  }

  return new SceneQuery(elements);
};
