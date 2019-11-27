const diff = require('virtual-dom/diff');
const patch = require('virtual-dom/patch');
const createElement = require('virtual-dom/create-element');
const { polyfill } = require('../utils/polyfill.js');

module.exports.Component = class Component {

  constructor(root) {
    this.root = root;
    this.tree = polyfill('div', null);
    this.rootNode = createElement(this.tree);
    this.root.appendChild(this.rootNode);
    this.state = this.getInitialState();
    this.update();
    this.componentDidMount();
  }

  componentDidMount() {}

  setState(state) {
    this.state = Object.assign(this.state || {}, state);
    this.update();
  }

  update() {
    const newTree = this.render();
    const patches = diff(this.tree, newTree);
    this.rootNode = patch(this.rootNode, patches);
    this.tree = newTree;
  }

  getInitialState() {
    return {};
  }

  render() {
    return null;
  }

};
