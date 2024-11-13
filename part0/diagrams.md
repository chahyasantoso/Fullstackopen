0.4 New note diagram

```mermaid

sequenceDiagram;
    participant browser;
    participant server;

    Note right of browser: browser sends "testnote" from textfield;
    browser->>server: POST https://studies.cs.helsinki.fi/exampleapp/new_note;
    activate server;
    Note left of server: server creates a new note object {"content": "testnote", "date": "2024-1-1"} and adds it to collection;
    server-->>browser: 302 URL redirect to https://studies.cs.helsinki.fi/exampleapp/notes;
    deactivate server;

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/notes;
    activate server;
    server-->>browser: HTML document;
    deactivate server;

    Note right of browser: Links in the HTML code cause the browser to fetch main.css, main.js files

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/main.css;
    activate server;
    server-->>browser: the css file;
    deactivate server;

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/main.js;
    activate server;
    server-->>browser: the JavaScript file;
    deactivate server;

    Note right of browser: The browser starts executing the JavaScript code that fetches the JSON from the server;

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/data.json;
    activate server;
    server-->>browser: [{"content": "HTML is easy", "date": "2023-1-1"}, ..., {"content": "testnote", "date": "2024-1-1"}];
    deactivate server;

    Note right of browser: The browser executes the callback function that renders the notes;

```

0.5: Single page app diagram

```mermaid

sequenceDiagram;
    participant browser;
    participant server;

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/spa;
    activate server;
    server-->>browser: HTML document;
    deactivate server;

    Note right of browser: Links in the HTML code cause the browser to also fetch main.css and spa.js file;

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/main.css;
    activate server;
    server-->>browser: the css file;
    deactivate server;

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/spa.js;
    activate server;
    server-->>browser: the JavaScript file;
    deactivate server;

    Note right of browser: The browser starts executing the JavaScript code that fetches the JSON from the server;

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/data.json;
    activate server;
    server-->>browser: [{"content": "HTML is easy", "date": "2023-1-1"}, ... ];
    deactivate server;

    Note right of browser: The browser executes the function that renders the notes 

```

0.6: New note in Single page app diagram

```mermaid

sequenceDiagram
    participant browser;
    participant server;

    Note right of browser: callback function form-onsubmit invoked when user creates new note "testnote" <br/> It does the followings: <br/>-Prevent default form submit behaviour<br/>-Object note created {"content": "testnote", "date": "2024-1-1"} <br/> -Add new note to collection<br/>-Rerender the notes collection (including the new note) <br/>-Send the new note to server;
     
    browser->>server: POST https://studies.cs.helsinki.fi/exampleapp/new_note_spa <br/> Request header: Content-type: application/json;
    activate server;
    Note left of server: server gets the object that was sent as JSON data and adds it to collection;
    server-->>browser: 201 created with response = {"message":"note created"};
    deactivate server;

```
