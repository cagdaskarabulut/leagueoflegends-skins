export function wait(waitTime) {
  return new Promise( res => setTimeout(res, waitTime) );
}