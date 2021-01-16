//requires
const htmlToImage = require("html-to-image");
const { doc } = require("prettier");
const helper = require("./helper");

function main() {
  //DOM access
  const input_file = document.querySelector(".input_file");
  const button_back = document.querySelector(".button_back");
  const button_next = document.querySelector(".button_next");
  const preview = document.querySelector(".preview_container");
  const button_download = document.querySelector(".button_download");
  const options = document.querySelector(".preview_shortener");
  const button_download_all = document.querySelector(".button_download_all");
  const counter_text = document.querySelector(".counter_text");
  const content_snippets = [];
  let current_snippet = 0;

  input_file.addEventListener("change", () => {
    let content = input_file.files[0];
    let reader = new FileReader();

    reader.onload = () => {
      let arr = reader.result.split("\n");

      if (arr.length % 4 === 0) {
        for (let i = 0; i < arr.length; i += 4) {
          let helper_obj = {};

          helper_obj["id"] = arr[i];
          helper_obj["title"] = arr[i + 1];
          helper_obj["text"] = arr[i + 2];
          helper_obj["url"] = arr[i + 3];

          content_snippets.push(helper_obj);
        }
      } else {
        console.log("corrupted file");
      }
    };

    reader.readAsText(content);
    reader.onloadend = () => {
      button_download.disabled = false;
      button_download_all.disabled = false;
      button_next.disabled = false;

      helper.displayContent(
        preview,
        content_snippets[current_snippet],
        options
      );
      helper.displayCounter(
        counter_text,
        current_snippet,
        content_snippets.length
      );

      button_next.addEventListener("click", (event) => {
        current_snippet = helper.changeSnippet(
          event,
          button_back,
          button_next,
          content_snippets,
          current_snippet,
          preview,
          options
        );
        helper.displayCounter(
          counter_text,
          current_snippet,
          content_snippets.length
        );
      });

      button_back.addEventListener("click", (event) => {
        current_snippet = helper.changeSnippet(
          event,
          button_back,
          button_next,
          content_snippets,
          current_snippet,
          preview,
          options
        );
        helper.displayCounter(
          counter_text,
          current_snippet,
          content_snippets.length
        );
      });
    };
  });

  options.addEventListener("change", () => {
    helper.displayContent(preview, content_snippets[current_snippet], options);
  });

  button_download.addEventListener("click", () => {
    helper.downloadFile(preview);
  });

  button_download_all.addEventListener("click", () => {
    helper.zipFile(content_snippets, preview, options);
  });
}

main();

module.exports = {
  main,
};
