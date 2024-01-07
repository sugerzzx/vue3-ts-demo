function handle(obj) {
  // 获取 scale 和 scaleX 的值
  const scale = obj.scale || 1;
  const scaleX = obj.scaleX || 1;

  // 判断 scale 和 scaleX 的顺序
  if (scale < scaleX) {
    // scale 在前
    return scale, scale;
  } else {
    // scaleX 在前
    return scaleX, scale;
  }
}

const obj1 = { scale: 2, scaleX: 3 };
const obj2 = { scaleX: 3, scale: 2 };

console.log(handle(obj1)); // 2
console.log(handle(obj2)); // 3