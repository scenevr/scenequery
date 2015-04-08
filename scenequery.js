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

SceneQuery.prototype.addClass = function (classname) {
  this.forEach(function (e) {
    e.className = (e.className === '') ? classname : [e.className, classname].join(' ');
  });

  return this;
};

SceneQuery.prototype.position = function (value) {
  if (value) {
    this.forEach(function (e) {
      e.position.copy(value);
    });
  } else {
    return this[0] && this[0].position;
  }

  return this;
};

SceneQuery.prototype.rotation = function (value) {
  if (value) {
    this.forEach(function (e) {
      e.rotation.copy(value);
    });
  } else {
    return this[0] && this[0].rotation;
  }

  return this;
};

SceneQuery.prototype.scale = function (value) {
  if (value) {
    this.forEach(function (e) {
      e.scale.copy(value);
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
