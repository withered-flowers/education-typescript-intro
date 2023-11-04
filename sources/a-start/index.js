// Variable Declaration
const firstNumber = 100;
const secondNumber = 200;

const firstString = "Hello";
const secondString = "World";

const anArray = [1, 2, 3, 4, 5];
const anObject = { name: "John Doe", age: 20 };

// First Function
const additional = (first, second) => {
  return first + second;
};

console.log("Additional", additional(firstNumber, secondNumber));
// End of First Function

// Second Function
const concatenateString = (first, second) => {
  return `${first} ${second}`;
};

const countLength = (string) => {
  return string.length;
};

const combinedString = concatenateString(firstString, secondString);

console.log("\nConcatenate String", combinedString);
console.log("Count Length", countLength(combinedString));
// End of Second Function

// Callback Function
const aFunctionWithCallback = (first, second, fnCallback) => {
  fnCallback(first - second);
};

const fnCallbackImplementation = (result) => {
  console.log("\nSubstraction", result);
};

aFunctionWithCallback(firstNumber, secondNumber, fnCallbackImplementation);
// End of Callback Function

// Promise Function
const aFunctionWithPromise = (first, second) => {
  return new Promise((resolve, reject) => {
    resolve(first * second);
  });
};

aFunctionWithPromise(firstNumber, secondNumber).then((result) => {
  console.log("\nMultiply", result);
});
// End of Promise Function

// Fetch Function - JSONPlaceholder
const fetchTodosFromJsonPlaceholder = async () => {
  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/todos");
    const responseJson = await response.json();

    if (!response.ok) {
      throw new Error(responseJson.message);
    }

    return responseJson.slice(0, 3);
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
