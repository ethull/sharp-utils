import React, { Component } from "react";
import { FixedSizeList as List } from "react-window";
import { components } from "react-select";

import "./EfficientSearch.css";
import DropdownSearch from "./DropdownSearch";

const height = 35;

//rm options that increase lag
class Option extends Component {
  constructor(props) {
    super(props);
    delete props.innerProps.onMouseMove;
    delete props.innerProps.onMouseOver;
  }
  render() {
    return (
      <components.Option {...this.props}>
        {this.props.children}
      </components.Option>
    );
  }
}

class MenuList extends Component {
  render() {
    const { options, children, maxHeight, getValue } = this.props;
    const [value] = getValue();
    const initialOffset = options.indexOf(value) * height;
    //const initialOffset = selectedValues[0] ? options.indexOf(selectedValues[0]) * height : 0;
    return (
      <List
        height={maxHeight}
        width={""}
        itemSize={height}
        itemCount={children.length}
        initialScrollOffset={initialOffset}
      >
        {({ index, style }) => <div style={style}>{children[index]}</div>}
      </List>
    );
  }
}

export default class EfficientSearch extends React.Component {
  render() {
    return (
      <DropdownSearch
        options={this.props.options}
        placeholder={this.props.placeholder}
        isMulti={this.props.isMulti}
        handleSelect={this.props.handleSelect}
        defaultInputValue={this.props.defaultInputValue}
        components={{ MenuList, Option }}
      />
    );
  }
}
