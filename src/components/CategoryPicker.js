import React from "react";
import Button from "./Button";

const CATEGORIES = ["Personal", "Business", "Fitness", "Fun"];

export default function(props) {
  return (
    <div>
      <b>Select Category</b>
      {CATEGORIES.map(cat => (
        <div key={cat} style={{ margin: 5 }}>
          <Button onClick={() => props.onChange && props.onChange(cat)}>
            {cat}
          </Button>
        </div>
      ))}
    </div>
  );
}
