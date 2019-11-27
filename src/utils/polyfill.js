const dom = require('virtual-dom/h');

// Bridge function between what babel expects and virtual-dom needs
const polyfill = (...args) => {
  const name = args[0];
  // In a real framework we would support nesting custom components
  if (typeof name !== 'string') {
    throw new Error('Nesting custom components is not supported');
    // In a real implementation it would be a function/class for another component
    // You should create an instance of it passing the attributes as props
    // and render the component
  } else {
    const children = args.slice(2).filter(x => x);
    const props = args[1] || {}
    const attrs = Object.keys(props).reduce(
      (attrs, name) => {
        if (name.startsWith('data-')) {
          attrs.attributes[name] = props[name]
        } else {
          attrs[name] = props[name]
        }
        return attrs;
      },
      { attributes: {} }
    );
    return dom(name, attrs, children);
  }
};

module.exports.polyfill = polyfill;
