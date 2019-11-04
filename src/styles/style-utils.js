import {css} from "styled-components";
import _ from "lodash";

export const media = {
  handheld: (...args) => css`
    @media (max-width: 420px) {
      ${css(...args)};
    }
  `
};

export const hexToRgb = hex => {
  // http://stackoverflow.com/a/5624139
  let shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
  hex = hex.replace(shorthandRegex, function (m, r, g, b) {
    return r + r + g + g + b + b;
  });

  let result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    }
    : null;
};

export const rgba = (hex, alpha) => {
  const color = hexToRgb(hex);
  return `rgba(${color.r}, ${color.g}, ${color.b}, ${alpha})`;
};

export const autoh = () => css`
  zoom: 1;
  &:before {
    content: " ";
    display: table;
  }
  &:after {
    content: " ";
    display: table;
    clear: both;
  }
`;

export const inlineblock = () => css`
  zoom: 1;
  display: inline-block;
`;

export const vMiddleWrapper = height => css`
  vertical-align: middle;
  height: ${height};
  &:after{
    ${inlineblock()}
    height:${height} ;
    line-height: ${height};
    vertical-align: middle;
    width: 0px;
    content: " ";
  }
`;

export const vMiddleItem = () => css`
  vertical-align: middle;
  ${inlineblock()};
`;

export const slimPx = function (prop, width) {
  return _.map([2, 3, 4], function (dpi) {
    return css`
      @media screen and (-webkit-min-device-pixel-ratio: ${dpi}) {${prop}: ${(width * 1.0) / dpi + "px"};}
      @media screen and (min-device-pixel-ratio: ${dpi}) {${prop}: ${(width * 1.0) / dpi + "px"};}`;
  });
};

export const linearGradient = function (direction) {
  let colorStops = Array.prototype.slice.call(arguments, 1);
  let colors = [];
  for (let i = 0; i < colorStops.length; i++) {
    if (i % 2 !== 0) {
      colors.push(
        " , " + colorStops[i - 1].toString() + "  " + colorStops[i].toString()
      );
    } else {
      continue;
    }
  }

  return css`
    background: ${colorStops[0]};
    background: -webkit-linear-gradient(${direction} ${colors.join(" ")});
    background: linear-gradient(${direction} ${colors.join(" ")});
  `;
};
