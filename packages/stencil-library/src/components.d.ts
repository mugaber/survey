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
    interface RadioQuestion {
        "question": RadioQuestionType;
        "questionNumber": number;
        "updateAnswers": (key: string, value: string[]) => void;
    }
    interface SurveyComponent {
        "surveyData": any;
    }
}
declare global {
    interface HTMLRadioQuestionElement extends Components.RadioQuestion, HTMLStencilElement {
    }
    var HTMLRadioQuestionElement: {
        prototype: HTMLRadioQuestionElement;
        new (): HTMLRadioQuestionElement;
    };
    interface HTMLSurveyComponentElement extends Components.SurveyComponent, HTMLStencilElement {
    }
    var HTMLSurveyComponentElement: {
        prototype: HTMLSurveyComponentElement;
        new (): HTMLSurveyComponentElement;
    };
    interface HTMLElementTagNameMap {
        "radio-question": HTMLRadioQuestionElement;
        "survey-component": HTMLSurveyComponentElement;
    }
}
declare namespace LocalJSX {
    interface RadioQuestion {
        "question"?: RadioQuestionType;
        "questionNumber"?: number;
        "updateAnswers"?: (key: string, value: string[]) => void;
    }
    interface SurveyComponent {
        "surveyData"?: any;
    }
    interface IntrinsicElements {
        "radio-question": RadioQuestion;
        "survey-component": SurveyComponent;
    }
}
export { LocalJSX as JSX };
declare module "@stencil/core" {
    export namespace JSX {
        interface IntrinsicElements {
            "radio-question": LocalJSX.RadioQuestion & JSXBase.HTMLAttributes<HTMLRadioQuestionElement>;
            "survey-component": LocalJSX.SurveyComponent & JSXBase.HTMLAttributes<HTMLSurveyComponentElement>;
        }
    }
}
