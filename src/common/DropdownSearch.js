import React from "react";
//react searchable/filterable dropdown input
import Select, { createFilter } from "react-select";

export default class DropdownSearch extends React.Component {
  constructor(props) {
    super(props);
    //this.state = this.props.location.state;
    this.state = {
      selectedOption: null,
      inputValue: this.props.defaultInputValue
    };
  }

  //manual input val control allows for an initial default value
  handleInputChange = inputValue => {
    this.setState({ inputValue });
  };

  handleChange = selectedOption => {
    this.setState({ selectedOption });
    this.props.handleSelect(selectedOption.value);
  };

  render() {
    //const { selectedOption, inputValue } = this.state;

    return (
      <Select
        value={this.state.selectedOption}
        onChange={this.handleChange}
        filterOption={createFilter({ ignoreAccents: false, ignoreCase: true })}
        options={this.props.options}
        placeholder={this.props.placeholder}
        isMulti={this.props.isMulti}
        components={this.props.components}
        inputValue={this.state.inputValue}
        onInputChange={this.handleInputChange}
      />
    );
  }
}

DropdownSearch.defaultProps = {
  placeholder: "choose value",
  isMulti: false,
  components: false,
  defaultInputValue: ""
};
