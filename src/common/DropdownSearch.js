import React from "react";
//react searchable/filterable dropdown input
import Select, { createFilter } from "react-select";

export default class DropdownSearch extends React.Component {
  constructor(props) {
    super(props);
    //this.state = this.props.location.state;
    this.state = {
      selectedOption: null
    };
  }

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
      />
    );
  }
}

DropdownSearch.defaultProps = {
  placeholder: "choose value",
  isMulti: false,
  components: false
};
