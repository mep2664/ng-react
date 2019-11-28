// import React from "react"
// import { render, fireEvent, wait } from "@testing-library/react"
// import "@testing-library/jest-dom/extend-expect";
// import { RegisterForm, REGISTER_USER } from "../RegisterForm"
// import { MockedProvider } from '@apollo/react-testing';

// const vars = { email: "EMAIL@EMAILTEST.DNE", password: "PASSWORD", firstName: "TEST", lastName: "USER" };
// let numTimesSubmitted = 0;
// const mocks = [
//     {
//         request: {
//             query: REGISTER_USER,
//             variables: vars,
//         },

//         result: () => {
//             numTimesSubmitted++;
//             return {
//                 data: {
//                     createUser: {
//                         token: "TEST_AUTHTOKEN",
//                         error: "",
//                     },
//                 },
//             };
//         },
//     },
// ];

// const props = {
//     formId: "FORM_ID",
//     onSubmitChange: jest.fn(),
// };

// describe("Tests for the RegisterForm component", () => {
//     beforeEach(() => {
//         numTimesSubmitted = 0;
//         jest.resetAllMocks();
//     })

//     test("Component matches snapshot", async () => {
//         const { container } = render(
//             <MockedProvider mocks={mocks} addTypename={false}>
//                 <RegisterForm {...props} />
//             </MockedProvider>,
//         );
//         await wait();
//         expect(container).toMatchSnapshot();
//     });

//     test("Changes email correctly", async () => {
//         const { getByLabelText } = render(
//             <MockedProvider mocks={mocks} addTypename={false}>
//                 <RegisterForm {...props} />
//             </MockedProvider>,
//         );
//         await wait();
//         const input = getByLabelText("Email");
//         fireEvent.change(input, { target: { value: vars.email } });
//         expect(input).toHaveValue(vars.email);
//     });

//     test("Changes password correctly", async () => {
//         const { getByLabelText } = render(
//             <MockedProvider mocks={mocks} addTypename={false}>
//                 <RegisterForm {...props} />
//             </MockedProvider>,
//         );
//         await wait();
//         const input = getByLabelText("Password");
//         fireEvent.change(input, { target: { value: vars.password } });
//         expect(input).toHaveValue(vars.password);
//     });

//     test("Changes first name correctly", async () => {
//         const { getByLabelText } = render(
//             <MockedProvider mocks={mocks} addTypename={false}>
//                 <RegisterForm {...props} />
//             </MockedProvider>,
//         );
//         await wait();
//         const input = getByLabelText("First Name");
//         fireEvent.change(input, { target: { value: vars.firstName } });
//         expect(input).toHaveValue(vars.firstName);
//     });

//     test("Changes last name correctly", async () => {
//         const { getByLabelText } = render(
//             <MockedProvider mocks={mocks} addTypename={false}>
//                 <RegisterForm {...props} />
//             </MockedProvider>,
//         );
//         await wait();
//         const input = getByLabelText("Last Name");
//         fireEvent.change(input, { target: { value: vars.lastName } });
//         expect(input).toHaveValue(vars.lastName);
//     });

//     test("Handles successful submit correctly", async () => {
//         window.location.assign = jest.fn();
//         const { getByRole, getByLabelText } = render(
//             <MockedProvider mocks={mocks} addTypename={false}>
//                 <RegisterForm {...props} />
//             </MockedProvider>,
//         );
//         await wait();

//         const email = getByLabelText("Email");
//         fireEvent.change(email, { target: { value: vars.email } });

//         const password = getByLabelText("Password");
//         fireEvent.change(password, { target: { value: vars.password } });

//         const firstName = getByLabelText("First Name");
//         fireEvent.change(firstName, { target: { value: vars.firstName } });

//         const lastName = getByLabelText("Last Name");
//         fireEvent.change(lastName, { target: { value: vars.lastName } });

//         const form = getByRole("form");
//         fireEvent.submit(form);
//         await wait();
//         expect(props.onSubmitChange).toHaveBeenCalledTimes(3);
//         expect(props.onSubmitChange).toHaveBeenNthCalledWith(2, true);
//         expect(props.onSubmitChange).toHaveBeenNthCalledWith(3, false);
//         expect(numTimesSubmitted).toEqual(1);
//         expect(window.location.assign).toHaveBeenCalledTimes(1);
//     });

//     test("Handles successful submit correctly without onSubmitChange prop", async () => {
//         const { getByRole, getByLabelText } = render(
//             <MockedProvider mocks={mocks} addTypename={false}>
//                 <RegisterForm {...props} onSubmitChange={undefined} />
//             </MockedProvider>,
//         );
//         await wait();

//         const email = getByLabelText("Email");
//         fireEvent.change(email, { target: { value: vars.email } });

//         const password = getByLabelText("Password");
//         fireEvent.change(password, { target: { value: vars.password } });

//         const firstName = getByLabelText("First Name");
//         fireEvent.change(firstName, { target: { value: vars.firstName } });

//         const lastName = getByLabelText("Last Name");
//         fireEvent.change(lastName, { target: { value: vars.lastName } });

//         const form = getByRole("form");
//         fireEvent.submit(form);
//         await wait();
//         expect(props.onSubmitChange).toHaveBeenCalledTimes(0);
//         expect(numTimesSubmitted).toEqual(1);
//     });


//     test("Handles submit with returned error correctly", async () => {
//         const mockReturnError = {
//             request: { query: REGISTER_USER, variables: vars },
//             result: () => {
//                 numTimesSubmitted++;
//                 return {
//                     data: { createUser: { token: "", error: "invalid login..." } },
//                 };
//             },
//         };

//         const { getByRole, getByText, getByLabelText } = render(
//             <MockedProvider mocks={[mockReturnError]} addTypename={false}>
//                 <RegisterForm {...props} />
//             </MockedProvider>,
//         );
//         await wait();

//         const email = getByLabelText("Email");
//         fireEvent.change(email, { target: { value: vars.email } });

//         const password = getByLabelText("Password");
//         fireEvent.change(password, { target: { value: vars.password } });

//         const firstName = getByLabelText("First Name");
//         fireEvent.change(firstName, { target: { value: vars.firstName } });

//         const lastName = getByLabelText("Last Name");
//         fireEvent.change(lastName, { target: { value: vars.lastName } });

//         const form = getByRole("form");
//         fireEvent.submit(form);
//         await wait();
//         expect(props.onSubmitChange).toHaveBeenCalledTimes(3);
//         expect(props.onSubmitChange).toHaveBeenNthCalledWith(2, true);
//         expect(props.onSubmitChange).toHaveBeenNthCalledWith(3, false);
//         expect(numTimesSubmitted).toEqual(1);
//         expect(getByText("invalid login...")).toBeDefined();
//     });

//     test("Handles submit with no returned token or error correctly", async () => {
//         const mockReturnError = {
//             request: { query: REGISTER_USER, variables: vars },
//             result: () => {
//                 numTimesSubmitted++;
//                 return {
//                     data: { createUser: { token: "", error: "" } },
//                 };
//             },
//         };

//         const { getByRole, getByText, getByLabelText } = render(
//             <MockedProvider mocks={[mockReturnError]} addTypename={false}>
//                 <RegisterForm {...props} />
//             </MockedProvider>,
//         );
//         await wait();

//         const email = getByLabelText("Email");
//         fireEvent.change(email, { target: { value: vars.email } });

//         const password = getByLabelText("Password");
//         fireEvent.change(password, { target: { value: vars.password } });

//         const firstName = getByLabelText("First Name");
//         fireEvent.change(firstName, { target: { value: vars.firstName } });

//         const lastName = getByLabelText("Last Name");
//         fireEvent.change(lastName, { target: { value: vars.lastName } });

//         const form = getByRole("form");
//         fireEvent.submit(form);
//         await wait();
//         expect(props.onSubmitChange).toHaveBeenCalledTimes(3);
//         expect(props.onSubmitChange).toHaveBeenNthCalledWith(2, true);
//         expect(props.onSubmitChange).toHaveBeenNthCalledWith(3, false);
//         expect(numTimesSubmitted).toEqual(1);
//         expect(getByText("something went wrong...")).toBeDefined();
//     });

//     test("Handles submit with network error correctly", async () => {
//         const mockError = {
//             request: { query: REGISTER_USER, variables: vars },
//             error: new Error("something went wrong..."),
//         };
//         const { getByRole, getByText, getByLabelText } = render(
//             <MockedProvider mocks={[mockError]} addTypename={false}>
//                 <RegisterForm {...props} />
//             </MockedProvider>,
//         );
//         await wait();

//         const email = getByLabelText("Email");
//         fireEvent.change(email, { target: { value: vars.email } });

//         const password = getByLabelText("Password");
//         fireEvent.change(password, { target: { value: vars.password } });

//         const firstName = getByLabelText("First Name");
//         fireEvent.change(firstName, { target: { value: vars.firstName } });

//         const lastName = getByLabelText("Last Name");
//         fireEvent.change(lastName, { target: { value: vars.lastName } });

//         const form = getByRole("form");
//         fireEvent.submit(form);
//         await wait();
//         expect(props.onSubmitChange).toHaveBeenCalledTimes(3);
//         expect(props.onSubmitChange).toHaveBeenNthCalledWith(2, true);
//         expect(props.onSubmitChange).toHaveBeenNthCalledWith(3, false);
//         expect(getByText("Network error: something went wrong...")).toBeDefined();
//     });
// });
