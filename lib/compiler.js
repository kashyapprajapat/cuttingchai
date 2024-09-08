function lexer(input) {
  const tokens = [];
  let cursor = 0;

  while (cursor < input.length) {
    let char = input[cursor];

    // Skip whitespace
    if (/\s/.test(char)) {
      cursor++;
      continue;
    }

    // Handle string literals (chaistring)
    if (char === '"') {
      let str = "";
      char = input[++cursor]; // Move past the opening quote
      while (char !== '"') {
        str += char;
        char = input[++cursor];
      }
      cursor++; // Move past the closing quote
      tokens.push({
        type: "string",
        value: str,
      });
      continue;
    }

    // Handle identifiers and keywords
    if (/[a-zA-Z]/.test(char)) {
      let word = "";
      while (/[a-zA-Z0-9]/.test(char)) {
        word += char;
        char = input[++cursor];
      }

      if (
        [
          "number",
          "chaiprint",
          "bool",
          "chaistring",
          "GOD",
          "sahichai",
          "galatchai",
          "array",
        ].includes(word)
      ) {
        tokens.push({
          type: "keyword",
          value: word,
        });
      } else if (word === "true" || word === "false") {
        tokens.push({
          type: "boolean",
          value: word === "true",
        });
      } else {
        tokens.push({
          type: "identifier",
          value: word,
        });
      }

      continue;
    }

    // Handle numbers
    if (/[\d]/.test(char)) {
      let num = "";
      while (/[\d]/.test(char)) {
        num += char;
        char = input[++cursor];
      }
      tokens.push({
        type: "number",
        value: parseInt(num, 10),
      });
      continue;
    }

    // Handle operators and equals sign
    if (/[\+\-\*\/=<>]/.test(char)) {
      tokens.push({ type: "operator", value: char });
      cursor++;
      continue;
    }

    // Handle array syntax
    if (char === "[") {
      tokens.push({ type: "arrayStart", value: "[" });
      cursor++;
      continue;
    }
    if (char === "]") {
      tokens.push({ type: "arrayEnd", value: "]" });
      cursor++;
      continue;
    }
    if (char === ",") {
      tokens.push({ type: "comma", value: "," });
      cursor++;
      continue;
    }

    // Skip unrecognized characters
    cursor++;
  }

  return tokens;
}

function parser(tokens) {
  const ast = {
    type: "Program",
    body: [],
  };

  while (tokens.length > 0) {
    let token = tokens.shift();

    // Handle variable declarations
    if (
      token.type === "keyword" &&
      ["number", "bool", "chaistring", "GOD"].includes(token.value)
    ) {
      let declaration = {
        type: "Declaration",
        dataType: token.value,
        name: null,
        value: null,
      };

      if (tokens.length > 0 && tokens[0].type === "identifier") {
        declaration.name = tokens.shift().value;
      }

      if (
        tokens.length > 0 &&
        tokens[0].type === "operator" &&
        tokens[0].value === "="
      ) {
        tokens.shift(); // Remove the '='
        if (tokens.length > 0) {
          const valueToken = tokens.shift();
          declaration.value =
            valueToken.type === "string" ? valueToken.value : valueToken.value;
        }
      }

      ast.body.push(declaration);
      continue;
    }

    // Handle array declarations
    if (token.type === "keyword" && token.value === "array") {
      let arrayDeclaration = {
        type: "ArrayDeclaration",
        dataType: null,
        name: null,
        elements: [],
      };

      if (
        tokens.length > 0 &&
        tokens[0].type === "keyword" &&
        ["number", "chaistring"].includes(tokens[0].value)
      ) {
        arrayDeclaration.dataType = tokens.shift().value;
      }

      if (tokens.length > 0 && tokens[0].type === "identifier") {
        arrayDeclaration.name = tokens.shift().value;
      }

      if (
        tokens.length > 0 &&
        tokens[0].type === "operator" &&
        tokens[0].value === "="
      ) {
        tokens.shift(); // Remove the '='
        if (tokens.length > 0 && tokens[0].type === "arrayStart") {
          tokens.shift(); // Remove the '['
          while (tokens.length > 0 && tokens[0].type !== "arrayEnd") {
            if (tokens[0].type === "string" || tokens[0].type === "number") {
              arrayDeclaration.elements.push(tokens.shift().value);
              if (tokens.length > 0 && tokens[0].type === "comma") {
                tokens.shift(); // Remove the ','
              }
            } else {
              break;
            }
          }
          if (tokens.length > 0 && tokens[0].type === "arrayEnd") {
            tokens.shift(); // Remove the ']'
          }
        }
      }

      ast.body.push(arrayDeclaration);
      continue;
    }

    // Handle chaiprint
    if (token.type === "keyword" && token.value === "chaiprint") {
      let expression = null;
      if (tokens.length > 0) {
        const valueToken = tokens.shift();
        expression =
          valueToken.type === "string"
            ? `"${valueToken.value}"`
            : valueToken.value;
      }
      ast.body.push({
        type: "Print",
        expression: expression,
      });
      continue;
    }

    // Handle sahichai (if) and galatchai (else)
    if (token.type === "keyword" && token.value === "sahichai") {
      let ifStatement = {
        type: "IfStatement",
        test: null,
        consequent: [],
        alternate: [],
      };

      if (tokens.length > 0) {
        let condition = tokens.shift().value;
        if (tokens.length > 0 && tokens[0].type === "operator") {
          let operator = tokens.shift().value;
          let rightOperand = tokens.length > 0 ? tokens.shift().value : "";
          ifStatement.test = `${condition} ${operator} ${rightOperand}`;
        }
      }

      while (tokens.length > 0 && tokens[0].value !== "galatchai") {
        ifStatement.consequent.push(parser([tokens.shift()]).body[0]);
      }

      if (tokens.length > 0 && tokens[0].value === "galatchai") {
        tokens.shift(); // Remove the 'galatchai' keyword
        while (tokens.length > 0 && tokens[0].type !== "keyword") {
          ifStatement.alternate.push(parser([tokens.shift()]).body[0]);
        }
      }

      ast.body.push(ifStatement);
      continue;
    }
  }

  return ast;
}

function codeGen(node) {
  if (!node) {
    return ""; // Return an empty string if the node is undefined
  }

  switch (node.type) {
    case "Program":
      return node.body.map(codeGen).join("\n");

    case "Declaration":
      if (node.dataType === "chaistring") {
        return `${node.dataType === "GOD" ? "const" : "let"} ${node.name} = "${
          node.value
        }";`;
      }
      return `${node.dataType === "GOD" ? "const" : "let"} ${node.name} = ${
        node.value
      };`;

    case "ArrayDeclaration":
      const arrayElements = node.elements
        .map((el) => (node.dataType === "chaistring" ? `"${el}"` : el))
        .join(", ");
      return `let ${node.name} = [${arrayElements}];`;

    case "Print":
      return `console.log(${node.expression});`;

    case "IfStatement":
      const test = node.test;
      const consequent = node.consequent.map(codeGen).join("\n");
      const alternate =
        node.alternate.length > 0
          ? "else {\n" + node.alternate.map(codeGen).join("\n") + "\n}"
          : "";
      return `if (${test}) {\n${consequent}\n}${alternate}`;

    default:
      return ""; // Return an empty string for unknown node types
  }
}

function compiler(input) {
  const tokens = lexer(input);
  const ast = parser(tokens);
  const executableCode = codeGen(ast);
  return executableCode;
}

function runner(input) {
  try {
    eval(input);
  } catch (error) {
    console.error("Error during execution:", error);
  }
}

module.exports = { compiler, runner };
// const executableCode = compiler(code);
// // Run the generated code
// runner(executableCode);

