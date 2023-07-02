import { Interpolation, SpringValue } from "@react-spring/web";
import React from "react";
import { DraggableProvided } from "react-beautiful-dnd";

export interface CardStaticStyles extends React.CSSProperties {
  "--seedx": number;
  "--seedy": number;
  "--cosmosbg": string;
}

export interface CardDynamicStyles extends React.CSSProperties {
  "--pointer-x": Interpolation<string, any>;
  "--pointer-y": Interpolation<string, any>;
  "--pointer-from-center": Interpolation<number, any>;
  "--pointer-from-top": Interpolation<number, any>;
  "--pointer-from-left": Interpolation<number, any>;
  "--card-opacity": SpringValue<number>;
  "--rotate-x": Interpolation<string, any>;
  "--rotate-y": Interpolation<string, any>;
  "--card-scale": SpringValue<number>;
  "--background-x": Interpolation<string, any>;
  "--background-y": Interpolation<string, any>;
  "--translate-x": Interpolation<string, any>;
  "--translate-y": Interpolation<string, any>;
}

export interface CardInteractPointerEvent<T> extends React.PointerEvent<T> {
  clientX: number;
  clientY: number;
}

export interface CardInteractTouchEvent<T> extends React.TouchEvent<T> {
  clientX: number;
  clientY: number;
}
