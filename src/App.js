import "./styles.css";
import React from "react";

const RepeatWithClone = ({ for: items = [], children }) => {
  return items.map((item, index) => {
    const childrenWithProps = React.Children.map(children, (child) => {
      // Checking isValidElement is the safe way and avoids a typescript
      // error too.
      if (React.isValidElement(child)) {
        return React.cloneElement(child, {
          item,
          index,
          first: index === 0,
          last: index === items.length - 1
        });
      }
      return child;
    });

    return <div>{childrenWithProps}</div>;
  });
};

const Repeat = ({ for: items = [], children }) => {
  return items.map((item, index) => {
    return children({
      item,
      index,
      first: index === 0,
      last: index === items.length - 1
    });
  });
};

const Span = ({ item, index, children }) => (
  <span>
    {children}, {item}
  </span>
);

export default function App() {
  return (
    <div className="App">
      <h1>Render Props</h1>
      <Repeat for={[1, 2, 3]}>
        {({ item, index }) => (
          <React.Fragment>
            <div>Outer, {item}</div>
            <Repeat for={[4, 5, 6]}>
              {({ item, index }) => (
                <React.Fragment>
                  <div>Inner, {item}</div>
                </React.Fragment>
              )}
            </Repeat>
          </React.Fragment>
        )}
      </Repeat>
      <h1>Clone Children</h1>
      <RepeatWithClone for={[1, 2, 3]}>
        <Span>Outer</Span>
        <RepeatWithClone for={[4, 5, 6]}>
          <Span>Inner</Span>
        </RepeatWithClone>
      </RepeatWithClone>
    </div>
  );
}
