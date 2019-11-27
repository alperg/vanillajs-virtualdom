const { Component } = require('./components/BaseComponent');
const { polyfill } = require('./utils/polyfill.js');

module.exports =  class CustomerList extends Component {

  getInitialState() {
    return {
      customers: []
    };
  }

  componentDidMount() {
    this.input = this.root.querySelector('input');

    // fetch data
    this.fetchCustomers();

    // event handlers
    this.root.addEventListener('submit', e => {
      e.preventDefault();
      const customer = this.input.value;
      this.input.value = '';
      this.addCustomer(customer);
    });

    this.root.addEventListener('click', e => {
      const id = e.target.getAttribute('data-id');
      if (!id) return;
      this.removeCustomer(id);
    });
  }

  render() {
    return (
      <div>
        <form>
          <input placeholder="Add a customer..."/>
        </form>
        <ul>
          {this.state.customers.map(cust => (
            <li key={cust.id}>
              <button data-id={cust.id}>🆇</button>
              <span>{cust.name}</span>
            </li>
          ))}
        </ul>
      </div>
    );
  }

  fetchCustomers() {
    fetch('http://api.alperg.com/customers')
      .then(response => response.json())
      .then(json => { 
        const customers = json.map(cust => {
          return {
            id: cust.id,
            name: `${cust.firstName} ${cust.lastName}`
          };
        });
        this.setState({ customers });
      });
  }

  addCustomer(name) {
    const id = this.state.customers[this.state.customers.length - 1].id + 1;
    this.setState({
      customers: this.state.customers.concat({ name, id })
    });
  }

  removeCustomer(id) {
    this.setState({
      customers: this.state.customers.filter(item => item.id.toString() !== id)
    });
  }

};
