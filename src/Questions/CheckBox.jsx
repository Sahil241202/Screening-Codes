import React, { useState } from "react";
import "./CheckBox.css";

const checkBoxData = [
  {
    id: 1,
    name: "Mango",
    children: [
      {
        id: 2,
        name: "Apple",
        children: [
          { id: 3, name: "Banana", children: [] },
          { id: 4, name: "Cherry", children: [] },
        ],
      },
      {
        id: 5,
        name: "Orange",
        children: [
          { id: 6, name: "Grapes", children: [] },
          { id: 7, name: "Pineapple", children: [] },
        ],
      },
    ],
  },
  {
    id: 8,
    name: "Strawberry",
    children: [
      { id: 9, name: "Blueberry", children: [] },
      { id: 10, name: "Raspberry", children: [] },
    ],
  },
  {
    id: 11,
    name: "Peach",
    children: [],
  },
];

const parentMap = {};
const buildParentMap = (data, parent = null) => {
  data.forEach((item) => {
    if (parent) parentMap[item.id] = parent;
    if (item.children.length > 0) buildParentMap(item.children, item);
  });
};
buildParentMap(checkBoxData);

const CheckBoxFunc = ({ data, checked, setChecked }) => {
  const handleChange = (isChecked, data) => {
    setChecked((prev) => {
      const newState = { ...prev, [data.id]: isChecked };

      const updateChildren = (node) => {
        node.children.forEach((child) => {
          newState[child.id] = isChecked;
          updateChildren(child);
        });
      };
      updateChildren(data);

      const updateParents = (node) => {
        const parent = parentMap[node.id];
        if (!parent) return;

        const allChildrenChecked = parent.children.every(
          (child) => newState[child.id]
        );

        newState[parent.id] = allChildrenChecked;
        updateParents(parent);
      };
      updateParents(data);

      return newState;
    });
  };

  return (
    <div>
      {data.map((data) => (
        <div className="parent" key={data.id}>
          <input
            type="checkbox"
            checked={checked[data.id] || false}
            onChange={(e) => handleChange(e.target.checked, data)}
          />
          <span>{data.name}</span>
          {data.children && data.children.length > 0 && (
            <CheckBoxFunc
              data={data.children}
              checked={checked}
              setChecked={setChecked}
            />
          )}
        </div>
      ))}
    </div>
  );
};

function CheckBox() {
  const [checked, setChecked] = useState({});

  return (
    <div>
      <CheckBoxFunc
        data={checkBoxData}
        checked={checked}
        setChecked={setChecked}
      />
    </div>
  );
}

export default CheckBox;
