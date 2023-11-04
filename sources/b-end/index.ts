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

// ?? Assumption: custom error from the API
interface TodoError {
  message: string;
}

const fetchTodosFromJsonPlaceholder = async () => {
  try {
    // ?? Fetch data from JSONPlaceholder
    // ?? When using fetch, we need to await the response
    // ?? and the awaited response type is Response
    const response: Response = await fetch(
      "https://jsonplaceholder.typicode.com/todos"
    );

    // ?? After we get the response, we need to await the response.json()
    // ?? and the awaited response type is unknown
    // ?? We can declare the type of responseJson as TodoSuccess[] OR TodoError
    const responseJson: TodoSuccess[] | TodoError = await response.json();

    // ?? If the response is not ok, we need to throw an error
    // ?? we can check "message" property from the responseJson
    if (!response.ok && "message" in responseJson) {
      // ?? TypeScript will know that responseJson is TodoError
      throw new Error(responseJson.message);
    }
    /*
    else if(response.ok && responseJson instanceof Array) {
      // ?? TypeScript will know that responseJson is TodoSuccess[]
      return responseJson.slice(0, 3);
    }
    */

    // ?? We can force the type of responseJson as TodoSuccess[] using "as"
    return (responseJson as TodoSuccess[]).slice(0, 3);
  } catch (err: unknown) {
    // ?? If we want to catch the error, we can use catch
    // ?? But now since we use TypeScript, we need to declare the type of err
    // return undefined;

    // ?? TypeScript will know that err is unknown
    // ?? Now we can check the type of err

    // ?? Since we are throwing an Error, we will check if err is an instance of Error
    if (err instanceof Error) {
      // ?? TypeScript will know that err is Error
      // ?? We can reject with the message
      return Promise.reject(err.message);
    } else {
      // ?? TypeScript will know that err is unknown
      // ?? We can reject with the err itself
      return Promise.reject(err);
    }
  }
};

// IIFE (Since we need to use async / await)
(async () => {
  const data = await fetchTodosFromJsonPlaceholder();

  console.log("\nData from JSONPlaceholder:");

  // ?? Try to hover the "todo" below and see the type of "todo"
  data?.forEach((todo) => {
    // ?? Try to use the console.log below and when you try to write todo. (todo with dot)
    // ?? you will see the available properties (same as TodoSuccess)
    console.log(todo.id, todo.title);
  });
})();
// End of Fetch Function

// Fetch Function - Reqres.in
// ?? Now we will try to fetch data from Reqres.in (https://reqres.in/)
// ?? We will use 2 endpoints: https://reqres.in/api/users and https://reqres.in/api/colors
// ?? Both of them are returning an array of object with "almost" the same structure
// ?? But the data type is different

/*
  {
    "page": 1,
    "per_page": 6,
    "total": 12,
    "total_pages": 2,
    "data": <This will be different for users and colors>
  }

  /api/users data:
  [
    {
      "id": 1,
      "email": "johndoe@mail.com",
      "first_name": "John",
      "last_name": "Doe",
      "avatar": "https://reqres.in/img/faces/7-image.jpg"
    }
  ]

  /api/colors data:
  [
    {
      "id": 1,
      "name": "cerulean",
      "year": 2000,
      "color": "#98B2D1",
      "pantone_value": "15-4020"
    }
  ]
*/

// ?? Now instead of using interface, we will use type
// ?? We can use type for simple structure
type UserData = {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  avatar: string;
};

type ColorData = {
  id: number;
  name: string;
  year: number;
  color: string;
  pantone_value: string;
};

// ?? Difference between interface and type
// ?? https://stackoverflow.com/questions/37233735/typescript-interfaces-vs-types
// ?? https://www.educba.com/typescript-interface-vs-type/

// ?? We can also use type for complex structure
type ReqresinResponse = {
  page: number;
  per_page: number;
  total: number;
  total_pages: number;
  // We can use union for data
  data: UserData[] | ColorData[];
};

type ReqresinErrorResponse = {
  message: string;
};

// ?? But what if we want to make sure that the data is dynamic?
// ?? We can use generics

// ?? We can use generics for dynamic structure
// ?? Declaring generics using <T>,
// ?? T is just a convention (can be anything)
type ReqresinResponseWithGenerics<T> = {
  page: number;
  per_page: number;
  total: number;
  total_pages: number;
  // ?? Since the data will be "a lot"
  // ?? and the data is "T"
  // ?? We can declare the data as T[]
  data: T[];
};

// ?? Now we can use the type using generics
type ReqresinUserResponse = ReqresinResponseWithGenerics<UserData>;
type ReqresinColorResponse = ReqresinResponseWithGenerics<ColorData>;

const fetchUsersFromReqresin = async () => {
  // ?? Let's modify the code with no try catch
  const response = await fetch("https://reqres.in/api/users");
  const responseJson: ReqresinUserResponse | ReqresinErrorResponse =
    await response.json();

  if (!response.ok && "message" in responseJson) {
    throw new Error(responseJson.message);
  }

  return responseJson;
};

const fetchColorsFromReqresin = async () => {
  // ?? Let's modify the code with no try catch
  const response = await fetch("https://reqres.in/api/colors");
  const responseJson: ReqresinColorResponse | ReqresinErrorResponse =
    await response.json();

  if (!response.ok && "message" in responseJson) {
    throw new Error(responseJson.message);
  }

  return responseJson;
};

// IIFE (Since we need to use async / await)
(async () => {
  // ?? Now we will use try catch here
  try {
    const users = await fetchUsersFromReqresin();

    // ?? Now we need to check the type of users
    if (
      // ?? Check not ReqresinErrorResponse
      !("message" in users) &&
      // ?? Check if users.data is an array (ReqresinUserResponse)
      users?.data instanceof Array
    ) {
      console.log("\nData from Reqres.in - Users:");
      // ?? Now we don't need to use optional chaining here
      console.log("Page:", users.page, "Total:", users.total);
      users.data.forEach(
        // ?? user will be inferred automatically as UserData
        (user) => {
          console.log(user.id, user.first_name, user.last_name);
        }
      );
    }
  } catch (err) {
    // ?? Although we know that the err is ReqresinErrorResponse
    // ?? But TypeScript will still know that err is unknown
    // ?? (Every try catch err, err will be unknown)

    // ?? We need to "force" the type of err as ReqresinErrorResponse
    console.log((err as ReqresinErrorResponse).message);
  }

  try {
    const colors = await fetchColorsFromReqresin();

    if (
      // ?? Check not ReqresinErrorResponse
      !("message" in colors) &&
      // ?? Check if colors.data is an array (ReqresinColorResponse)
      colors?.data instanceof Array
    ) {
      console.log("\nData from Reqres.in - Colors:");
      console.log("Page:", colors.page, "Total:", colors.total);
      colors.data.forEach(
        // ?? color will be inferred automatically as ColorData
        (color) => {
          console.log(
            color.id,
            color.name,
            color.year,
            color.color,
            color.pantone_value
          );
        }
      );
    }
  } catch (err) {
    // ?? Although we know that the err is ReqresinErrorResponse
    // ?? But TypeScript will still know that err is unknown

    // ?? We need to "force" the type of err as ReqresinErrorResponse
    console.log((err as ReqresinErrorResponse).message);
  }
})();
// End of Fetch Function
