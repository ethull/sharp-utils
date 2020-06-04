import React from "react";
//react searchable/filterable dropdown input
import Select from "react-select";

export default class DropdownSearch extends React.Component {
  constructor(props) {
    super(props);
    //this.state = this.props.location.state;
    this.state = {
      selectedOption: null,
      inputValue: ""
    };
  }

  handleInputChange = inputValue => {
    this.setState({ inputValue });
  };

  handleChange = selectedOption => {
    this.setState({ selectedOption });
    this.props.handleSelect(selectedOption.value);
  };

  handleFocus = () => {
    const { selectedOption } = this.state;
    if (selectedOption && selectedOption.label) {
      this.setState({ inputValue: selectedOption.label });
    }
  };

  render() {
    const { selectedOption, inputValue } = this.state;

    return (
      <Select
        value={selectedOption}
        onChange={this.handleChange}
        inputValue={inputValue}
        onInputChange={this.handleInputChange}
        onFocus={this.handleFocus}
        options={this.props.options}
      />
    );
  }
}
