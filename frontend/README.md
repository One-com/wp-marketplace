# wp-marketplace

React-based WordPress plugins marketplace embeddable UI.

This package provides a small React application you can embed inside your React app to list, and manage plugins via API endpoints.


## Highlights
- Framework: React 18+
- Distribution: ES module build via Vite
- Exports:
  - `standalone/index.es.js` (default import)
  - `./style.css` for basic styles
- Zero bundled React; uses your app’s React/ReactDOM (peer dependencies)


## Installation

### Prerequisites for Local Development

This project uses private packages from the `@group.one` scope. To install dependencies locally, you need a GitLab personal access token with `read_api` and `read_registry` scopes.

1.  Create a `.npmrc` file in the `frontend` directory by copying the example:
    ```bash
    cp .npmrc.example .npmrc
    ```
2.  Edit `.npmrc` and replace `YOUR_PERSONAL_ACCESS_TOKEN_HERE` with your actual token.

### Standard Installation

Using npm:
```bash
npm install
```


Peer dependencies you must already provide:
- react: ">=18 || >=19"
- react-dom: ">=18 || >=19"



## License

GPL-2.0-or-later

