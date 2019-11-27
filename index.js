const { Component, h } = require('./components/BaseComponent');

class CustomerList extends Component {

  getInitialState() {
    return {
      customers: []
    };
  }

  componentDidMount() {
    this.input = this.root.querySelector('input');

    this.fetchCustomers();

    // event handlers
    this.root.addEventListener('submit', e => {
      e.preventDefault();
      const customer = this.input.value;
      this.input.value = '';
      this.addCustomer(customer);
    });

    this.root.addEventListener('click', e => {
      const id = e.target.getAttribute('data-delete-id');
      if (!id) return; // user clicked something else
      this.removeCustomer(id);
    });
  }

  render() {
    return (
      <div>
        <form>
          <input placeholder="Type a name and hit enter to add a Customer..."/>
        </form>
        {this.state.customers.length === 0 && (
          <p class="help"></p>
        )}
        <ul>
          {this.state.customers.map(cust => (
            <li key={cust.id}>
              <a data-delete-id={cust.id}>delete</a>
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
          }
        })
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
    console.log(id);
    console.log(this.state.customers);
    this.setState({
      customers: this.state.customers.filter(item => item.id.toString() !== id)
    });
  }

}

new CustomerList(document.getElementById("root"));
