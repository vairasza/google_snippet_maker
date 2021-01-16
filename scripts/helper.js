const JSZip = require("jszip");
const htmlToImage = require("html-to-image");

function uniqueFileId() {
    const time = new Date().toISOString().replace(/[-:.]/g, "")
    const random = ("" + Math.random()).substring(2,8)
  return time + random
}

function displayContent(node, obj, options) {
  const url_len = 80;
  const title_len = 58;
  const text_len = 400;

  node.querySelector(".preview_url").innerHTML =
    options.checked && obj["url"].length > url_len
      ? obj["url"].toString().substring(0, url_len) + " ..."
      : obj["url"];
  node.querySelector(".preview_title").innerHTML =
    options.checked && obj["title"].length > title_len
      ? obj["title"].toString().substring(0, title_len) + " ..."
      : obj["title"];
  node.querySelector(".preview_text").innerHTML =
    options.checked && obj["text"].length > text_len
      ? obj["text"].toString().substring(0, text_len) + " ..."
      : obj["text"];
}

async function addElementsToZip(list, preview, zip, options) {
  let arr = [];
  for (let i = 0; i < list.length; i++) {
    displayContent(preview, list[i], options);
    const blob = await htmlToImage.toBlob(preview);
    arr.push(zip.file(`${uniqueFileId()}.jpeg`, blob, { binary: true }));
  }

  displayContent(preview, list[0], options);

  return arr;
}

async function zipFile(list, node, shortText) {
  let zip = new JSZip();
  await addElementsToZip(list, node, zip, shortText);
  zip.generateAsync({ type: "base64" }).then(function (content) {
    let link = document.createElement("a");
    link.download = "output.zip";
    link.href = "data:application/zip;base64," + content;
    link.click();
  });
}

function downloadFile(node) {
  htmlToImage.toJpeg(node, { quality: 0.95 }).then((dataUrl) => {
    let link = document.createElement("a");
    link.download = `${uniqueFileId()}.jpeg`;
    link.href = dataUrl;
    link.click();
  });
}

function changeSnippet(event, back, next, list, counter, preview, options) {
  if (event.target.className === "button_back") {
    counter = counter > 0 ? --counter : counter;
  } else {
    counter = counter < list.length - 1 ? ++counter : counter;
  }

  back.disabled = counter <= 0 ? true : false;
  next.disabled = counter >= list.length - 1 ? true : false;
  displayContent(preview, list[counter], options);

  return counter;
}

function displayCounter(node, current, max) {
  node.innerHTML = `Current Snippet: ${current + 1}/${max}`;
}

module.exports = {
  uniqueFileId,
  displayContent,
  downloadFile,
  zipFile,
  changeSnippet,
  displayCounter,
};
