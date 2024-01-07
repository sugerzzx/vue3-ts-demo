type numOrStr = number | string;

type numOrStrOrUn = numOrStr | undefined;

interface setOptionType {
  x?: numOrStr,
  y?: numOrStr,
  scale?: numOrStr,
  scaleX?: numOrStr,
  scaleY?: numOrStr,
  rotate?: numOrStr,
  opacity?: numOrStr,
}

interface toOptionType extends setOptionType {
  duration: number,
}

type RefElement = HTMLElement | null;
type elementType = RefElement | Ref<RefElement> | (HTMLElement | Ref<RefElement>)[];