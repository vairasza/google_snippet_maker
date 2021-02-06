# Google Snippet Maker
Lets you create Google snippets from a txt-file.

### Install
Install <a href="https://github.com/Stuk/jszip">JSZip</a> and <a href="https://github.com/bubkoo/html-to-image">html-to-image</a> with yarn:
```sh
yarn install
```

### Allowed Input
txt-file that contains information in the following format:
```sh
(id)
(title)
(text)
(url)
(id)
(title)
(text)
(url)
...
```

### Changes
1) Do not change bundle.js manually
2) only change script-files in the folder "scripts"
3) after making changes run:
```sh
npm run build && npm run pretty
```
4) Run Server with VS-Code Extension "Live Server"

### Usage
1) click button "Choose File"
2) choose txt-file with structure see "Allowed Input"
3) Tick checkbox if you want a shortened URL and title
4) Step through snippets with Back and Next Buttons
5) Click "download currently displayed image" Button if you want the currently displayed image
6) Click "download all images" Button if you want all snippets generated as an image

### TODO
1) allow more input files/check input type
2) custom styling, output types, customizable link (see google)
3) basic styling
