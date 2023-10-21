# ezgit

Ezgit is simple tool to streamline your git process. It uses OpenAI to refactor code and auto-generate git messages.

### Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Features](#features)
- [Dependencies](#dependencies)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)
- [Acknowledgements](#acknowledgements)

### Installation

1. Install the package via npm:

```bash
npm install @robosushie/ezgit
```

### Usage

1. **Initialization**:
   After installing, you need to initialize `ezgit` in your project directory:

```bash
npx ezgit init
```

This will check for the presence of a `package.json` file to ensure you're in a Node.js project directory and then create an `ezgit.config.js` configuration file.

2. **Committing Changes**:
   To auto-generate a detailed commit message using OpenAI:

```bash
npx ezgit commit
```

3. **Refactoring Code**:
   To auto-refactor a file using OpenAI:

```bash
npx ezgit refactor --path <file path>
```

4. **Other Git Commands**:
   You can also use `ezgit` to run other git commands:

```bash
npx ezgit [your-git-command]
```

Replace `[your-git-command]` with any git command you wish to execute.

### Features

- **Auto-Generated Commit Messages**: Uses OpenAI's GPT-3.5-turbo model to generate detailed and context-rich commit messages based on your code changes.
- **Code Refactoring and Optimizations**: Receive recommendations for code improvements and optimizations, ensuring best practices and efficient code. _(pending)_

### Dependencies

- `dotenv`: For environment variable management.
- `openai`: To interact with OpenAI's API.
- `yargs`: For command line argument parsing.

### Contributing

Contributions are what make the open-source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### License

Distributed under the ISC License. See `LICENSE` for more information.

### Contact

**robosushie** - [GitHub Profile](https://github.com/robosushie)

Project Link: [https://github.com/robosushie/ezgit](https://github.com/robosushie/ezgit)

### Acknowledgements

- [OpenAI](https://www.openai.com/)
- [npm](https://www.npmjs.com/)
- [yargs](https://yargs.js.org/)
- [dotenv](https://www.npmjs.com/package/dotenv)
