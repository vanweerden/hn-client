// Grabs domain and top-level domain from url
// 'http://www.getdropbox.com/u/2/screencast.html'
// should return 'getdropbox.com'

export function domainGrabber(url) {
  let regex = /(http(s)?:\/\/(www.)?)([a-zA-Z0-9-]+[\w.]+)(\/)?/;
  let result = url.match(regex);
  if (result) return result[4];
  else console.log("Something went wrong with URL grabber");
}
