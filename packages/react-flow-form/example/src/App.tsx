import React from "react";
import { FormBuilder, Step } from "@cav/react-flow-form";
// import { Step } from "../../lib/utils/steps";

type FormValues = {
  field1: string;
  field2: string;
  field3: string;
  field4: string;
};

const steps: Step<FormValues>[] = [
  {
    id: 1,
    type: "section",
    title: "Hello",
    content: [
      {
        type: "text",
        value:
          'Hey there. We"d love to learn more about you and how our product is helping you.',
      },
      {
        type: "text",
        value: "Can you spare 5 minutes?",
      },
    ],
  },
  {
    id: 2,
    formId: "field1",
    type: "question",
    title:
      "First off, are you using the product for business or personal use? *",
    subtitle: "",
    content: [
      {
        type: "radio-image",
        values: [
          {
            value: "1",
            image: "./business.png",
            label: "Business",
          },
          {
            value: "2",
            image: "./personal.png",
            label: "Personal",
          },
        ],
      },
    ],
  },
  {
    id: 3,
    formId: "field2",
    type: "question",
    title:
      "Great. What is the size of your company? This question is required. *",
    subtitle: "",
    content: [
      {
        type: "checkbox",
        values: [
          {
            value: "1",
            label: "Self-Employed/Freelancer",
          },
          {
            value: "2",
            label: "1-10 employees",
          },
          {
            value: "3",
            label: "11-50 employees",
          },
          {
            value: "4",
            label: "51-200 employees",
          },
        ],
      },
    ],
  },
  {
    id: 4,
    formId: "field3",
    type: "question",
    title:
      "And which type of industry do you work in? This question is required. *",
    subtitle: "",
    content: [
      {
        type: "select",
        values: [
          {
            value: "1",
            label: "Accounting",
          },
          {
            value: "2",
            label: "Animation",
          },
          {
            value: "3",
            label: "Apparel & Fashion",
          },
          {
            value: "4",
            label: "Arts and Crafts",
          },
        ],
      },
    ],
  },
  {
    id: 5,
    formId: "field4",
    type: "question",
    title:
      "If you'd like us to follow up with you, please be sure to leave your email address below :)",
    subtitle: "",
    content: [
      {
        type: "input",
        placeholder: "name@example.com",
      },
    ],
  },
  {
    id: 6,
    type: "section",
    title: "Title",
    hideNextButton: true,
    content: [
      {
        type: "text",
        value: "Your data has been saved :)",
      },
      {
        type: "text",
        value: "It's in your local storage",
      },
    ],
  },
];

function App() {
  return (
    <div className="App">
      <FormBuilder data={steps} />
    </div>
  );
}

export default App;
