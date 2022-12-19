import React from "react";
import { PageWrapper } from "./styled";
import FormBuilder from "app/form-builder";
import stepsData from "../../utils/steps";

const Home = () => {
  return (
    <PageWrapper>
      <FormBuilder data={stepsData} />
    </PageWrapper>
  );
};

export default Home;
