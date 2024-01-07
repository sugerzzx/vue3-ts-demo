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

function getOldStyle(ele: HTMLElement) {
  const oldStyle = getComputedStyle(ele);
  const { transform, translate, rotate, scale } = oldStyle;
  const matrix = transform.match(/matrix\(([^)]+)\)/)?.pop()?.split(', ').map(Number) || [1, 0, 0, 1, 0, 0];

  const [oldX, oldY, oldA, oldB] = matrix.slice(4);

  const oldRotateFromMatrix = Math.atan2(matrix[1], matrix[0]) * 180 / Math.PI;
  const oldRotateFromStyle = Number(rotate.match(/(\d+)deg/)?.[1]) || 0;
  const oldRotate = oldRotateFromStyle + oldRotateFromMatrix;

  const oldScaleFromMatrixX = Math.sqrt(matrix[0] ** 2 + matrix[1] ** 2);
  const oldScaleFromMatrixY = Math.sqrt(matrix[2] ** 2 + matrix[3] ** 2);
  const oldScaleFromStyleX = scale === 'none' ? 1 : Number(scale.split(', ')[0]);
  const oldScaleFromStyleY = scale === 'none' ? 1 : Number(scale.split(', ')[1] || oldScaleFromStyleX);
  const oldScale = [oldScaleFromStyleX * oldScaleFromMatrixX, oldScaleFromStyleY * oldScaleFromMatrixY];
  return {
    oldX,
    oldY,
    oldA,
    oldB,
    oldRotate,
    oldScale,
    translate,
  };
}

function getScale(scale: numOrStrOrUn, scaleX: numOrStrOrUn, scaleY: numOrStrOrUn, oldScale: number[]) {
  let _scale: undefined | (string | number)[] = void 0;
  if (scale || scaleX || scaleY) {
    _scale = [scaleX || scale || oldScale[0], scaleY || scale || oldScale[1]];
  } else if (oldScale.join(',') !== '1,1') {
    _scale = oldScale;
  }
  return _scale ? `scale(${_scale.join(', ')})` : void 0;
}

function setStyle(ele: HTMLElement, setoption: setOptionType) {
  const { x, y, rotate, scale, scaleX, scaleY, opacity } = setoption;
  const { oldX, oldY, oldRotate, oldA, oldB, oldScale } = getOldStyle(ele);

  if (ele instanceof SVGElement) {
    const a = rotate ? Math.cos(Number(rotate) * Math.PI / 180) : oldA;
    const b = rotate ? Math.sin(Number(rotate) * Math.PI / 180) : oldB;
    ele.setAttribute('transform', `matrix(${a},${b},${-b},${a},${x || oldX},${y || oldY})`);
  }

  const style = ele.style;
  style.translate = 'none';
  style.rotate = 'none';
  style.scale = 'none';

  const translate = x || y ? `translate(${x || oldX}px, ${y || oldY}px)` : '';
  const _rotate = rotate || oldRotate ? `rotate(${rotate || oldRotate}deg)` : '';
  const _scale = getScale(scale, scaleX, scaleY, oldScale);

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

