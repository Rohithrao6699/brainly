export function random(len: number): string {
  const options = "qwertyuioplkjhgfdsamncvbzx1234";
  const lenght = options.length;
  let ans = "";
  for (let i = 0; i < len; i++) {
    ans += options[Math.floor(Math.random() * lenght)];
  }
  return ans;
}
