
# CuttingChai: A Simple, Desi-Flavored Custom Programming Language.

**CuttingChai** ☕🫖 is a simple programming language designed with an **Indian flavor**. It supports basic data types, variables, conditional logic, and arrays. It lets you write `.chai` files and execute them using an easy-to-use CLI interface.🍵

## Prerequisites

Before installing CuttingChai, ensure you have the following setup on your system:

- **Node.js**: Ensure that Node.js is installed. You can download it from [here](https://nodejs.org/).

## Installation

To install CuttingChai, use npm (Node Package Manager). Run the following command in your terminal:

```bash
npm install -g cuttingchai
```

This will install the cuttingchai compiler 🫖 globally on your system, making the chai command available anywhere in your terminal.

**--------------------------------------------------------------------------------------**
## Usage
After installing, you can create `.chai` files, which are cuttingchai scripts, and run them using the CLI.

Steps:
Create a file with the extension `.chai`. For example, example.chai.
Write your cuttingchai code in this file. (See syntax below)
Run the following command in your terminal:
```bash
chai example.chai
```
The cuttingchai CLI will interpret the code and output the results in the terminal.

**--------------------------------------------------------------------------------------**

## CuttingChai Features

## Supported Data Types
CuttingChai supports the following data types:

1. **number:** Used to store integer values.
2. **bool:** Boolean values representing true or false.
3. **chaistring:** String literals enclosed in double quotes.
4. **GOD:** A constant value (similar to const in JavaScript).
5. **array:** An array to store multiple values of the same type.

**--------------------------------------------------------------------------------------**

Data Types Syntax and Examples
1. # number

**Range**: Integer values (positive or negative).

**Syntax**:`` number <variableName> = <value>``

Example:
```
number age = 25
chaiprint age
```
Output:
```
25

```

**--------------------------------------------------------------------------------------**

2. # bool

**Values**: true or false.

**Syntax**: ``bool <variableName> = <true|false>``

Example:

```
bool isStudent = true
chaiprint isStudent

```
Output:
```
true

```

**--------------------------------------------------------------------------------------**

3. # chaistring

**Description**: String values enclosed in double quotes.

**Syntax**: ``chaistring <variableName> = "<value>"``

Example:

```
chaistring name = "Kashyap"
chaiprint name

```
Output:
```
Kashyap

```

**--------------------------------------------------------------------------------------**

4. # GOD


**Description**: Used to define constants.

**Syntax**: ``GOD <constantName> = <value>``

Example:

```
GOD pi = 314159
chaiprint pi


```
Output:
```
314159


```

**--------------------------------------------------------------------------------------**

5. # array


**Description**: Arrays to store multiple values of the same type.

**Syntax**: ``array <dataType> <arrayName> = [<value1>, <value2>, ...]``

Example:

```
array number masala = [1, 2, 3, 4, 5]
chaiprint masala
array chaistring spices = ["pepper", "salt", "cumin"]
chaiprint spices


```
Output:
```
[1, 2, 3, 4, 5]
["pepper", "salt", "cumin"]


```

**--------------------------------------------------------------------------------------**

# Conditional Statements: ``sahichai`` and ``galatchai``

CuttingChai provides a simple if-else logic using ``sahichai`` (if) and ``galatchai`` (else).

**Syntax**: 

```
sahichai <condition>
      // code to execute if condition is true
galatchai
  // code to execute if condition is false
```
**Example**:

```
number x = 10
sahichai x < 15
  chaiprint "x is less than 15"
galatchai
  chaiprint "x is greater than or equal to 15"

```

**output**:
```
x is less than 15

```

**--------------------------------------------------------------------------------------**

**Example Usage**

Here’s a sample ``.chai`` file demonstrating variable declarations, printing, and conditionals:

example.chai:

```
number x = 10
bool isTrue = true
GOD pi = 314159
chaistring name = "Kashyap"

chaiprint name
chaiprint x

array number masala = [1, 2, 3, 4, 5]
array chaistring spices = ["pepper", "salt", "cumin"]

chaiprint masala
chaiprint spices

sahichai 20 < 29
  chaiprint "20 is smaller than 29"
galatchai
  chaiprint "29 is bigger than 20"

```

To run the code:

**1. Create the .chai file:**

```
touch example.chai

```

**2.Write the code inside example.chai.**

**3.Run it:**

```
chai example.chai
```

Enjoy coding with **CuttingChai! 🍵**

## For Devloper 

--- open to accept any pull request

**Refferance Link**
--- Resources and Articles
https://www.freecodecamp.org/news/the-programming-language-pipeline-91d3f449c919/
https://hackernoon.com/building-your-own-programming-language-from-scratch