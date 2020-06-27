import React, { Component } from "react";
import Navbar from "../../common/NavBar";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";

export default class Home extends Component {
  /*
   * todo
   * maximum num of items per line
   *
   *
   *
   * */
  constructor() {
    super();
    this.itemData = [
      {
        title: "hashes",
        route: "/hash",
        txt:
          "Take a file or text as input to a calculate a unqiue hash function"
      },
      {
        title: "timezones",
        route: "/time",
        txt: "convert from one timezone to another"
      },
      {
        title: "foo",
        route: "/foo",
        txt: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. "
      },
      {
        title: "bar",
        route: "/bar",
        txt: "Quam viverra orci sagittis eu volutpat odio."
      },
      {
        title: "baz",
        route: "/baz",
        txt:
          "Condimentum id venenatis a condimentum vitae sapien. Tincidunt augue interdum velit euismod."
      }
    ];
  }

  render() {
    return (
      <div>
        <Navbar />
        <div className="container">
          <h1> sharp utils </h1>
          <p> Quality online utilities </p>
          <div className="row justify-content-center no-gutters">
            {this.itemData.map((obj, idx) => (
              <div className="pt-3 px-1 col-10 col-sm-6 col-md-4">
                <Card key={idx} className="" style={{ height: "100%" }}>
                  <Card.Header>{obj.title}</Card.Header>
                  <Card.Body>
                    {/* <Card.Title> {obj.title} </Card.Title> */}
                    <Card.Text>{obj.txt}</Card.Text>
                    <Link to={obj.route} className="stretched-link" />
                  </Card.Body>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
}
