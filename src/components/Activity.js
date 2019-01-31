import React from "react";
import styled from "@emotion/styled";
import { basicStyle, containerStyle, themed } from "./common";
import TextareaAutosize from "react-textarea-autosize";
import { Map } from "immutable";

import get from "lodash/get";
import moment from "moment";
import hash from "object-hash";
import { DatetimePicker } from "rc-datetime-picker";
import Button from "./Button";
import CategoryPicker from "./CategoryPicker";
import Color from "color";
import ActivityContext from "../contexts/ActivityContext";

const EDIT_MODES = {
  DUE_DATE: 1,
  CATEGORY: 2,
  STATUS: 3
};

const StyledContainer = themed(
  styled.div`
    ${basicStyle};
    ${containerStyle};
    border-color: lightgrey;
    padding-top: 0px;
    ${props =>
      props.active
        ? `
    border-width: 5px;
    border-color: orange;
    `
        : `cursor: pointer;`}
    :hover {
      background-color: ${props => {
        if (props.active) return Color(props.theme.background).string();
        return Color(props.theme.background)
          .negate()
          .alpha(0.1)
          .string();
      }};
    }
  `
);

const TextArea = themed(styled(TextareaAutosize)`
  ${basicStyle};
  border: none;
  resize: none;
  width: 100%;
  outline: none;
  -webkit-box-shadow: none;
  -moz-box-shadow: none;
  box-shadow: none;
  margin-top: 5px;
`);

const Title = styled(TextArea)`
  font-size: x-large;
  border-bottom: solid 1px lightgrey;
  margin-top: 10px;
  font-weight: bold;
`;

const Controls = themed(styled.div`
  margin-top: 10px;
`);
const ControlEditor = themed(styled.div`
  border-top: solid 1px lightgrey;
  padding-top: 10px;
  margin-top: 10px;
`);

const Actions = themed(styled.div`
  border-top: solid 1px lightgrey;
  padding-top: 10px;
  margin-top: 10px;
  text-align: right;
`);

const XBtn = themed(styled.div`
  ${basicStyle};
  font-size: large;
  float: right;
  cursor: pointer;
  padding: 0px 10px;
`);

const LabeledButton = props => (
  <Button small {...props}>
    {props.value ? (
      <>
        <b>{props.label}: </b>
        {props.value}
      </>
    ) : (
      `Set ${props.label}`
    )}
  </Button>
);

const dateShortcuts = {
  Today: moment(),
  Yesterday: moment().subtract(1, "days"),
  Clear: ""
};

function getInitialState(value) {
  return {
    name: "",
    details: "",
    category: null,
    status: "Incomplete",
    ...value,
    dueDate: value.dueDate && moment(value.dueDate)
  };
}

export default props => {
  const [editMode, setEditMode] = React.useState(null);
  const [changed, setChanged] = React.useState(false);
  const [state, setState] = React.useState(Map(getInitialState(props.value)));
  const activityContext = React.useContext(ActivityContext);

  React.useEffect(
    () => {
      const hasChanged =
        hash(getInitialState(props.value)) !== hash(state.toObject());
      setChanged(hasChanged);
    },
    [state, props.value]
  );

  const dueDateVal =
    state.get("dueDate") && state.get("dueDate").format("YYYY-MM-DD HH:mm");

  return (
    <>
      <StyledContainer {...props}>
        <Title
          placeholder="Activity Name"
          useCacheForDOMMeasurements
          value={state.get("name")}
          onChange={e => {
            const txt = get(e, "target.value");
            setState(oldValue => oldValue.set("name", txt));
          }}
        />
        <TextArea
          useCacheForDOMMeasurements
          placeholder="Details here.."
          value={state.get("details")}
          onChange={e => {
            const txt = get(e, "target.value");
            setState(oldValue => oldValue.set("details", txt));
          }}
        />
        <Controls>
          <LabeledButton
            readOnly={!props.active}
            label="Due Date"
            value={dueDateVal}
            title={dueDateVal}
            onClick={() => {
              setEditMode(EDIT_MODES.DUE_DATE);
              setState(oldState => oldState.set("dueDate", moment()));
            }}
          />
          <LabeledButton
            readOnly={!props.active}
            label="Category"
            value={state.get("category")}
            onClick={() => {
              setEditMode(EDIT_MODES.CATEGORY);
            }}
          />
          <LabeledButton
            readOnly={!props.active}
            label="Status"
            value={`${state.get("status")}${
              state.get("status") === "Completed" ? " ✔" : " ✘"
            }`}
            onClick={() => {
              setState(oldState =>
                oldState.set(
                  "status",
                  state.get("status") === "Completed"
                    ? "Incompleted"
                    : "Completed"
                )
              );
            }}
          />
        </Controls>
        {props.active &&
          (editMode ? (
            <ControlEditor>
              <XBtn onClick={() => setEditMode(null)}>X</XBtn>
              <div style={{ clear: "both" }}>
                <center>
                  {editMode === EDIT_MODES.DUE_DATE && (
                    <>
                      <span>Select Due Date:</span>
                      <DatetimePicker
                        shortcuts={dateShortcuts}
                        moment={state.get("dueDate")}
                        onChange={moment =>
                          setState(oldState => oldState.set("dueDate", moment))
                        }
                      />
                      <span style={{ fontSize: "large" }}>{dueDateVal}</span>
                      <Button
                        small
                        style={{ margin: 5 }}
                        onClick={() => {
                          setEditMode(null);
                        }}
                      >
                        Ok
                      </Button>
                    </>
                  )}
                  {editMode === EDIT_MODES.CATEGORY && (
                    <CategoryPicker
                      onChange={cat => {
                        setState(oldState => oldState.set("category", cat));
                        setEditMode(null);
                      }}
                    />
                  )}
                </center>
              </div>
            </ControlEditor>
          ) : (
            <Actions>
              <Button
                small
                color="blue"
                disabled={!changed}
                onClick={() => {
                  activityContext.editActivity(props.id, state.toObject());
                }}
              >
                Save
              </Button>
              <Button
                small
                color="red"
                onClick={() => activityContext.deleteActivity(props.id)}
              >
                Delete
              </Button>
              <Button
                small
                color="grey"
                onClick={e => {
                  e.stopPropagation();
                  activityContext.setActiveIndex(null);
                }}
              >
                Close
              </Button>
            </Actions>
          ))}
      </StyledContainer>
    </>
  );
};
