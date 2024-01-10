import { unref } from "vue";

function handleElement(element: elementType, callBack: (ele: HTMLElement, ...args: any) => void, ...args: any[]): void {
  if (!Array.isArray(element)) {
    const ele = unref(element)!;
    callBack(ele, ...args);
  } else {
    element.forEach(ref => {
      const ele = unref(ref)!;
      callBack(ele, ...args);
    });
  }
};

function getPreStyle(ele: HTMLElement) {
  const preStyle = getComputedStyle(ele);
  const { transform, translate, rotate, scale } = preStyle;
  const matrix = transform.match(/matrix\(([^)]+)\)/)?.pop()?.split(', ').map(Number) || [1, 0, 0, 1, 0, 0];

  const [preX, preY, preA, preB] = matrix.slice(4);

  const preRotateFromMatrix = Math.atan2(matrix[1], matrix[0]) * 180 / Math.PI;
  const preRotateFromStyle = Number(rotate.match(/(\d+)deg/)?.[1]) || 0;
  const preRotate = preRotateFromStyle + preRotateFromMatrix;

  const preScaleFromMatrixX = Math.sqrt(matrix[0] ** 2 + matrix[1] ** 2);
  const preScaleFromMatrixY = Math.sqrt(matrix[2] ** 2 + matrix[3] ** 2);
  const preScaleFromStyleX = scale === 'none' ? 1 : Number(scale.split(', ')[0]);
  const preScaleFromStyleY = scale === 'none' ? 1 : Number(scale.split(', ')[1] || preScaleFromStyleX);
  const preScale = [preScaleFromStyleX * preScaleFromMatrixX, preScaleFromStyleY * preScaleFromMatrixY];
  return {
    preX,
    preY,
    preA,
    preB,
    preRotate,
    preScale,
    translate,
  };
}

function getScale(scale: numOrStrOrUn, scaleX: numOrStrOrUn, scaleY: numOrStrOrUn, preScale: number[]) {
  let _scale: undefined | (string | number)[] = void 0;
  if (scale || scaleX || scaleY) {
    _scale = [scaleX || scale || preScale[0], scaleY || scale || preScale[1]];
  } else if (preScale.join(',') !== '1,1') {
    _scale = preScale;
  }
  return _scale ? `scale(${_scale.join(', ')})` : void 0;
}

function setStyle(ele: HTMLElement, setoption: setOptionType) {
  const { x, y, rotate, scale, scaleX, scaleY, opacity } = setoption;
  const { preX, preY, preRotate, preA, preB, preScale } = getPreStyle(ele);

  if (ele instanceof SVGElement) {
    const a = rotate ? Math.cos(Number(rotate) * Math.PI / 180) : preA;
    const b = rotate ? Math.sin(Number(rotate) * Math.PI / 180) : preB;
    ele.setAttribute('transform', `matrix(${a},${b},${-b},${a},${x || preX},${y || preY})`);
  }

  const style = ele.style;
  style.translate = 'none';
  style.rotate = 'none';
  style.scale = 'none';

  const translate = x || y ? `translate(${x || preX}px, ${y || preY}px)` : '';
  const _rotate = rotate || preRotate ? `rotate(${rotate || preRotate}deg)` : '';
  const _scale = getScale(scale, scaleX, scaleY, preScale);

  style.transform = `${translate} ${_rotate} ${_scale}`;
  if (opacity) style.opacity = `${opacity}`;
}

function createAni(ele: HTMLElement, duration: number, option: any) {

}

class MyGsap {
  set(element: elementType, setoption: setOptionType) {
    handleElement(element, setStyle, setoption);
  }
  to(element: elementType, duration: number, toOption: toOptionType) {
    handleElement(element, createAni, duration, toOption);
  }
}

export default new MyGsap();

