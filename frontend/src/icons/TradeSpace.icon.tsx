import { FunctionComponent } from "react";

interface TradeSpaceIconProps {
  size: string;
}

const TradeSpaceIcon: FunctionComponent<TradeSpaceIconProps> = ({ size }) => {
  const viewbox = "0 0 " + size + " " + size;
  return (
    <svg
      fill="none"
      height={size}
      viewBox={viewbox}
      width={size}
      version="1.1"
      id="svg6"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs id="defs10" />

      <g id="g1178">
        <rect
          id="rect1122"
          width="111.70938"
          height="77.29216"
          x="11.012558"
          y="44.504745"
          rx="15.801159"
          opacity="0.985127"
          fill="#f9f9f9"
          fill-opacity="1"
          stroke="none"
          stroke-width="4"
          stroke-linecap="round"
          stroke-linejoin="round"
          paint-order="markers fill stroke"
          stop-color="#000000"
        />
        <path
          d="M 4.6207259,127.75419 C 2.3310032,127.21254 0.49520795,125.1686 0.14927744,122.77577 -0.04222889,121.4511 -0.04222889,6.5489036 0.14927744,5.2242344 0.42285908,3.3318416 1.6252441,1.6061749 3.2405423,0.78764138 L 4.0285069,0.38834951 H 64 123.97149 l 0.78797,0.39929187 c 1.6153,0.81853352 2.81768,2.54420022 3.09126,4.43659302 0.19151,1.3246692 0.19151,116.2268656 0,117.5515356 -0.29258,2.02382 -1.52937,3.69327 -3.38862,4.57403 l -1.04462,0.49486 -59.1068,0.0237 c -33.989774,0.0137 -59.3546053,-0.0349 -59.6899541,-0.11421 z M 98.99959,116.59039 c 6.20983,-0.95166 10.46602,-2.8642 13.54428,-6.08618 2.74635,-2.87457 4.03074,-5.85957 4.43221,-10.30067 0.20518,-2.269775 0.0277,-4.893682 -0.4601,-6.800814 -1.57992,-6.177429 -6.11216,-10.278724 -16.01113,-14.488711 -5.242312,-2.229535 -8.085888,-3.836998 -9.738672,-5.505235 -1.281751,-1.293734 -1.659466,-2.103133 -1.731379,-3.710138 -0.05345,-1.194454 -0.02107,-1.366251 0.430282,-2.283085 1.144522,-2.324853 3.920249,-3.718445 8.192362,-4.11309 1.75593,-0.162209 4.305667,-0.03361 6.342557,0.319888 3.10567,0.538986 6.74273,1.834423 8.92117,3.177524 0.62023,0.382397 1.19097,0.695267 1.26831,0.695267 0.0817,0 0.14062,-2.762748 0.14062,-6.596431 v -6.596428 l -1.72946,-0.547638 c -4.0146,-1.271239 -7.54815,-1.714671 -13.649184,-1.712863 -5.128818,0.0016 -6.528874,0.151885 -10.238204,1.099581 -7.862864,2.008881 -12.966575,6.764632 -14.403756,13.42174 -0.386886,1.792077 -0.402385,6.234381 -0.02764,7.92233 1.059281,4.771281 3.695631,8.35929 8.358921,11.376293 2.044975,1.323036 3.379377,1.998857 6.990291,3.540307 7.830973,3.342932 10.542352,5.118285 11.850922,7.759745 0.44348,0.895192 0.49859,1.152758 0.49859,2.330097 0,1.136641 -0.0617,1.449351 -0.43685,2.213271 -0.94136,1.917 -3.41699,3.33933 -6.708779,3.85442 -1.60763,0.25156 -5.342232,0.21136 -7.145631,-0.0769 -4.696306,-0.75073 -8.748916,-2.50408 -12.466019,-5.39342 l -0.970874,-0.754665 v 7.126635 7.12663 l 1.203884,0.54784 c 2.522188,1.14773 6.082982,2.05119 9.902912,2.51262 3.032589,0.36631 3.111099,0.36967 7.456311,0.31846 3.146405,-0.0371 4.512848,-0.12024 6.184056,-0.37636 z M 50.796117,90.409008 V 64.701513 l 9.126213,-0.04008 9.126214,-0.04008 0.0407,-5.864077 0.0407,-5.864078 H 43.495146 17.860342 l 0.0407,5.864078 0.0407,5.864077 9.126213,0.04008 9.126214,0.04008 V 90.409008 116.1165 h 7.300971 7.300971 z"
          id="path926"
          opacity="0.985127"
          fill="#0d9488"
          stroke="none"
          stroke-width="0.621359"
          stroke-linecap="round"
          stroke-linejoin="round"
          paint-order="markers fill stroke"
          stop-color="#000000"
          fill-opacity="1"
        />
      </g>
    </svg>
  );
};

export default TradeSpaceIcon;
