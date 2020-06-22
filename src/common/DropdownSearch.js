/*
    reuseable wrapper around the react-select component
    label property is used to display options, label and value properties is used in the search algorithm
*/

import React from "react";
//react searchable/filterable dropdown input
import Select, { createFilter } from "react-select";

export default class DropdownSearch extends React.Component {
  constructor(props) {
    super(props);
    //this.state = this.props.location.state;
    this.state = {
      selectedOption: null,
      inputValue: ""
    };
  }

  //set initial selection and inputValue when component first loads
  componentDidMount() {
    const defaultSelect = this.props.options.filter(
      obj => obj.label === this.props.defaultInputValue
    );

    if (defaultSelect.length === 1) {
      this.handleChange(defaultSelect[0]);
    }
  }

  //manual input val control allows for an initial default value
  handleInputChange = inputValue => {
    this.setState({ inputValue });
  };

  handleChange = selectedOption => {
    this.setState({ selectedOption });
    this.props.handleSelect(selectedOption);
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
