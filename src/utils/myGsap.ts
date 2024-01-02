import { isRef, unref, Ref } from "vue";

interface aniOptionType {

}

function handleMabyRefs(maybeyRefs: Ref<null> | Ref<null>[], callBack: (ele: Element, ...args: any) => void, ...args: any[]): void {
  if (isRef(maybeyRefs)) {
    maybeyRefs = new Array(maybeyRefs);
  } else {
    maybeyRefs.forEach(ref => {
      const element: Element = unref(ref)!;
      callBack(element, ...args);
    });
  }
};


function createAni(ele: Element, duration: number, option: any) {

}

class MyGsap {
  to(target: Ref<null> | Ref<null>[], duration: number, aniOption: aniOptionType) {
    handleMabyRefs(target, createAni, duration, aniOption);
  }
}

export default new MyGsap();

