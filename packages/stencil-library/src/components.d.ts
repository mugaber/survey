/* eslint-disable */
/* tslint:disable */
/**
 * This is an autogenerated file created by the Stencil compiler.
 * It contains typing information for all components that exist in this project.
 */
import { HTMLStencilElement, JSXBase } from "@stencil/core/internal";
import { RadioQuestionType } from "./utils/types";
export { RadioQuestionType } from "./utils/types";
export namespace Components {
    interface BooleanQuestion {
        "question": any;
        "questionNumber": number;
        "updateAnswers": (key: string, value: string[]) => void;
    }
    interface CheckboxQuestion {
        "question": RadioQuestionType;
        "questionNumber": number;
        "updateAnswers": (key: string, value: string[]) => void;
    }
    interface PageComponent {
        "questions": any;
        "unansweredQuestions": string[];
        "updateAnswers": (key: string, value: string[]) => void;
    }
    interface ProgressBar {
        "progress": number;
        "total": number;
    }
    interface RadioQuestion {
        "question": RadioQuestionType;
        "questionNumber": number;
        "updateAnswers": (key: string, value: string[]) => void;
    }
    interface RecommendationCard {
        "recommendation": any;
    }
    interface SurveyComponent {
        "surveyData": any;
    }
    interface TextQuestion {
        "question": any;
        "questionNumber": number;
        "updateAnswers": (key: string, value: string[]) => void;
    }
}
declare global {
    interface HTMLBooleanQuestionElement extends Components.BooleanQuestion, HTMLStencilElement {
    }
    var HTMLBooleanQuestionElement: {
        prototype: HTMLBooleanQuestionElement;
        new (): HTMLBooleanQuestionElement;
    };
    interface HTMLCheckboxQuestionElement extends Components.CheckboxQuestion, HTMLStencilElement {
    }
    var HTMLCheckboxQuestionElement: {
        prototype: HTMLCheckboxQuestionElement;
        new (): HTMLCheckboxQuestionElement;
    };
    interface HTMLPageComponentElement extends Components.PageComponent, HTMLStencilElement {
    }
    var HTMLPageComponentElement: {
        prototype: HTMLPageComponentElement;
        new (): HTMLPageComponentElement;
    };
    interface HTMLProgressBarElement extends Components.ProgressBar, HTMLStencilElement {
    }
    var HTMLProgressBarElement: {
        prototype: HTMLProgressBarElement;
        new (): HTMLProgressBarElement;
    };
    interface HTMLRadioQuestionElement extends Components.RadioQuestion, HTMLStencilElement {
    }
    var HTMLRadioQuestionElement: {
        prototype: HTMLRadioQuestionElement;
        new (): HTMLRadioQuestionElement;
    };
    interface HTMLRecommendationCardElement extends Components.RecommendationCard, HTMLStencilElement {
    }
    var HTMLRecommendationCardElement: {
        prototype: HTMLRecommendationCardElement;
        new (): HTMLRecommendationCardElement;
    };
    interface HTMLSurveyComponentElement extends Components.SurveyComponent, HTMLStencilElement {
    }
    var HTMLSurveyComponentElement: {
        prototype: HTMLSurveyComponentElement;
        new (): HTMLSurveyComponentElement;
    };
    interface HTMLTextQuestionElement extends Components.TextQuestion, HTMLStencilElement {
    }
    var HTMLTextQuestionElement: {
        prototype: HTMLTextQuestionElement;
        new (): HTMLTextQuestionElement;
    };
    interface HTMLElementTagNameMap {
        "boolean-question": HTMLBooleanQuestionElement;
        "checkbox-question": HTMLCheckboxQuestionElement;
        "page-component": HTMLPageComponentElement;
        "progress-bar": HTMLProgressBarElement;
        "radio-question": HTMLRadioQuestionElement;
        "recommendation-card": HTMLRecommendationCardElement;
        "survey-component": HTMLSurveyComponentElement;
        "text-question": HTMLTextQuestionElement;
    }
}
declare namespace LocalJSX {
    interface BooleanQuestion {
        "question"?: any;
        "questionNumber"?: number;
        "updateAnswers"?: (key: string, value: string[]) => void;
    }
    interface CheckboxQuestion {
        "question"?: RadioQuestionType;
        "questionNumber"?: number;
        "updateAnswers"?: (key: string, value: string[]) => void;
    }
    interface PageComponent {
        "questions"?: any;
        "unansweredQuestions"?: string[];
        "updateAnswers"?: (key: string, value: string[]) => void;
    }
    interface ProgressBar {
        "progress"?: number;
        "total"?: number;
    }
    interface RadioQuestion {
        "question"?: RadioQuestionType;
        "questionNumber"?: number;
        "updateAnswers"?: (key: string, value: string[]) => void;
    }
    interface RecommendationCard {
        "recommendation"?: any;
    }
    interface SurveyComponent {
        "surveyData"?: any;
    }
    interface TextQuestion {
        "question"?: any;
        "questionNumber"?: number;
        "updateAnswers"?: (key: string, value: string[]) => void;
    }
    interface IntrinsicElements {
        "boolean-question": BooleanQuestion;
        "checkbox-question": CheckboxQuestion;
        "page-component": PageComponent;
        "progress-bar": ProgressBar;
        "radio-question": RadioQuestion;
        "recommendation-card": RecommendationCard;
        "survey-component": SurveyComponent;
        "text-question": TextQuestion;
    }
}
export { LocalJSX as JSX };
declare module "@stencil/core" {
    export namespace JSX {
        interface IntrinsicElements {
            "boolean-question": LocalJSX.BooleanQuestion & JSXBase.HTMLAttributes<HTMLBooleanQuestionElement>;
            "checkbox-question": LocalJSX.CheckboxQuestion & JSXBase.HTMLAttributes<HTMLCheckboxQuestionElement>;
            "page-component": LocalJSX.PageComponent & JSXBase.HTMLAttributes<HTMLPageComponentElement>;
            "progress-bar": LocalJSX.ProgressBar & JSXBase.HTMLAttributes<HTMLProgressBarElement>;
            "radio-question": LocalJSX.RadioQuestion & JSXBase.HTMLAttributes<HTMLRadioQuestionElement>;
            "recommendation-card": LocalJSX.RecommendationCard & JSXBase.HTMLAttributes<HTMLRecommendationCardElement>;
            "survey-component": LocalJSX.SurveyComponent & JSXBase.HTMLAttributes<HTMLSurveyComponentElement>;
            "text-question": LocalJSX.TextQuestion & JSXBase.HTMLAttributes<HTMLTextQuestionElement>;
        }
    }
}
