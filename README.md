# Google Snippet Maker
Lets you create Google snippets from a txt-file.

#### Usage
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
repeat
```

### Changes
1) Do not change bundle.js manually
2) only change script-files in the folder "scripts"
3) after making changes run:
```sh
npm run build && npm run pretty
```

### TODO
1) allow more input files/check input type
2) custom styling, output types, customizable link (see google)
3) basic styling
4) fix bug with black border left/top
