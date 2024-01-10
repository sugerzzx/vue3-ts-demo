type numOrStr = number | string;

type numOrStrOrUn = numOrStr | undefined;

// interface setOptionType extends CSSStyleDeclaration {
//   x?: numOrStr,
//   y?: numOrStr,
//   scale?: numOrStr,
//   scaleX?: numOrStr,
//   scaleY?: numOrStr,
//   rotate?: numOrStr,
//   opacity?: numOrStr,
// }

type setOptionType = Partial<CSSStyleDeclaration> & {
  x?: numOrStr,
  y?: numOrStr,
  scale?: numOrStr,
  scaleX?: numOrStr,
  scaleY?: numOrStr,
  rotate?: numOrStr,
  opacity?: numOrStr,
};

// type setOptionType = Partial<Omit<CSSStyleDeclaration, 'scale', 'opacity'>> & {
//   x?: numOrStr,
//   y?: numOrStr,
//   scale?: numOrStr,
//   scaleX?: numOrStr,
//   scaleY?: numOrStr,
//   rotate?: numOrStr,
//   opacity?: numOrStr,
// };

interface toOptionType extends setOptionType {
  duration: number,
}

type RefElement = HTMLElement | null;
type elementType = RefElement | Ref<RefElement> | (HTMLElement | Ref<RefElement>)[];