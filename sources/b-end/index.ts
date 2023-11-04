/*
  copy index.js from a-start to b-end and follow the instructions below
  1. Rename index.js to index.ts
  2. npm init -y
  3. npm install --save-dev typescript
  4. npx tsc --init
  5. Fix the error of implicit "any"
  6. Build the project using "npx tsc"
  7. Run the project using "node dist/index.js"
*/

// Variable Declaration

// ?? By default, typescript will infer the type of variable
const firstNumber = 100;

// ?? But we can also explicitly declare the type of variable
const secondNumber: number = 200;

// ?? Same as before, but the data type is string
const firstString: string = "Hello";
const secondString: string = "World";

// ?? Data Type for TypeScript
// ?? https://www.typescriptlang.org/docs/handbook/basic-types.html

// ?? Declare array using [] notation
const anArray: number[] = [1, 2, 3, 4, 5];

// ?? Declare combination value using | (union)
const anArrayWithCombination: (number | string | boolean)[] = [
  1,
  "Hello",
  true,
  2.5,
];

// ?? Declare object using {} notation
const anObject: { name: string; age: number } = { name: "John Doe", age: 20 };

// ?? Declare array of object using [] notation
// ?? Declare optional property using ? notation
const anArrayOfObject: { name: string; age: number; PIN?: number }[] = [
  { name: "John Doe", age: 20, PIN: 123456 },
  { name: "Jane Doe", age: 21, PIN: 123457 },
  { name: "Baby Doe", age: 1 },
];

// First Function

// ?? We can also declare the type of parameter and the type of return value
// ?? From a declared function

// ?? After declaration, if you're using VSCode,
// ?? try to hover the function name
const additional = (first: number, second: number): number => {
  return first + second;
};

console.log("Additional", additional(firstNumber, secondNumber));
// End of First Function

// Second Function

// ?? We can also declare the type of parameter and the type of return value
// ?? From a declared function

// ?? After declaration, if you're using VSCode,
// ?? try to hover the function name
const concatenateString = (first: string, second: string): string => {
  return `${first} ${second}`;
};

// ?? Since this function is returning a number
// ?? We declare the return type as number
const countLength = (argString: string): number => {
  return argString.length;
};

const combinedString = concatenateString(firstString, secondString);

console.log("\nConcatenate String", combinedString);
console.log("Count Length", countLength(combinedString));
// End of Second Function

// Callback Function

// ?? This is a function that will be called by another function

// ?? Assumption: result is a number and function won't return anything

// ?? Since this function won't return anything
// ?? We can declare the return type as void
const fnCallbackImplementation = (result: number): void => {
  console.log("\nSubstraction", result);
};

// ?? first is a number, second is a number, fnCallback is a function that will be called
// ?? Assumption: fnCallback is a function that takes 1 arg (number) and won't return anything
const aFunctionWithCallback = (
  first: number,
  second: number,
  fnCallback: (arg0: number) => void
) => {
  fnCallback(first - second);
};

aFunctionWithCallback(firstNumber, secondNumber, fnCallbackImplementation);
// End of Callback Function

// Promise Function

// ?? This is a function that will return a promise
// ?? When declaring a promise, we need to declare the type of return value using "<>"

// ?? Try to hover the then "result" below and see the type of "result"
const aFunctionWithPromise = (
  first: number,
  second: number
): Promise<number> => {
  return new Promise((resolve, _reject) => {
    resolve(first * second);
  });
};

aFunctionWithPromise(firstNumber, secondNumber).then((result) => {
  console.log("\nMultiply", result);
});
// End of Promise Function

// Fetch Function - JSONPlaceholder

// ?? This is a function that will return a promise
// ?? When declaring a promise, we need to declare the type of return value using "<>"
// ?? In this case, we're returning an array of object

// ?? But since the data is coming from an API and the json is already structured
// ?? We can use "interface" to declare the type of the data
interface TodoSuccess {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

interface TodoError {
  message: string;
}

const fetchTodosFromJsonPlaceholder = async () => {
  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/todos");
    const responseJson: TodoSuccess[] | TodoError = await response.json();

    // ?? If the response is not ok, we need to throw an error
    // ?? we can check "message" property from the responseJson
    if (!response.ok && "message" in responseJson) {
      // ?? TypeScript will know that responseJson is TodoError
      throw new Error(responseJson.message);
    }

    // ?? We can force the type of responseJson as TodoSuccess[] using "as"
    return (responseJson as TodoSuccess[]).slice(0, 3);
  } catch (err) {
    return undefined;
  }
};

// IIFE (Since we need to use async / await)
(async () => {
  const data = await fetchTodosFromJsonPlaceholder();

  console.log("\nData from JSONPlaceholder:");
  data?.forEach((todo) => {
    console.log(todo.id, todo.title);
  });
})();
// End of Fetch Function

// Fetch Function - Reqres.in
const fetchUsersFromReqresin = async () => {
  try {
    const response = await fetch("https://reqres.in/api/users");
    const responseJson = await response.json();

    if (!response.ok) {
      throw new Error(responseJson.message);
    }

    return responseJson;
  } catch (err) {
    return undefined;
  }
};

const fetchColorsFromReqresin = async () => {
  try {
    const response = await fetch("https://reqres.in/api/colors");
    const responseJson = await response.json();

    if (!response.ok) {
      throw new Error(responseJson.message);
    }

    return responseJson;
  } catch (err) {
    return undefined;
  }
};

// IIFE (Since we need to use async / await)
(async () => {
  const users = await fetchUsersFromReqresin();

  console.log("\nData from Reqres.in - Users:");
  console.log("Page:", users?.page, "Total:", users?.total);
  users?.data.forEach((user) => {
    console.log(user.id, user.first_name, user.last_name);
  });

  const colors = await fetchColorsFromReqresin();

  console.log("\nData from Reqres.in - Colors:");
  console.log("Page:", colors?.page, "Total:", colors?.total);
  colors?.data.forEach((color) => {
    console.log(
      color.id,
      color.name,
      color.year,
      color.color,
      color.pantone_value
    );
  });
})();
// End of Fetch Function
