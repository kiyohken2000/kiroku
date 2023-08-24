import React from "react";
import StepIndicator from 'react-native-step-indicator';
import { customStyles, labels } from "./config";
import { generateLabels } from "./functions";

export default function StepCounter(props) {
  const { position, data } = props

  return (
    <StepIndicator
      customStyles={customStyles}
      currentPosition={position}
      labels={generateLabels({data})}
      stepCount={data.length}
      renderLabel={() => <></>}
    />
  )
}