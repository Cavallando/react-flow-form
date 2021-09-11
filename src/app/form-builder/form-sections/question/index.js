import React from 'react';
import { RadioImage, Checkbox, Select } from 'app/form-builder/form-types';
import { QuestionWrapper, AnswersWrapper, QuestionTitle, ArrowsWrapper, ArrowsButton } from './styled';

const Question = ({ 
  content, 
  title, 
  control,
  setValue,
  getValues,
  register,
  questionId, 
  onNextStep 
}) => {

  const formType = item => {
    switch (item.type) {
      case 'radio-image':
        return (
          <RadioImage
            control={control}
            getValues={getValues}
            setValue={setValue}
            questionId={questionId}
            values={item.values}
          />
        )
        break;
      case 'checkbox':
        return (
          <Checkbox
            control={control}
            getValues={getValues}
            setValue={setValue}
            questionId={questionId}
            values={item.values}
          />
        )
        break;
      case 'select':
        return (
          <Select
            control={control}
            getValues={getValues}
            setValue={setValue}
            questionId={questionId}
            values={item.values}
          />
        )
        break;
      default:
        break;
    }
  }

  return (
    <QuestionWrapper>
      <QuestionTitle>{title}</QuestionTitle>
      <AnswersWrapper>
        {content.map(item => (
          formType(item)
        ))}

        <ArrowsWrapper>
          <ArrowsButton>a</ArrowsButton>
          <ArrowsButton onClick={onNextStep}>b</ArrowsButton>
        </ArrowsWrapper>
      </AnswersWrapper>
    </QuestionWrapper>
  );
}

export default Question;
